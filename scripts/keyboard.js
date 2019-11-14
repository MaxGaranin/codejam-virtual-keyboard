import {
  KEY_ITEMS,
  LAYOUTS,
  EN,
  RU,
  NORMAL,
  UPPER,
  CAPS_LOCK,
  ENTER,
  BACKSPACE,
  SHIFT_LEFT,
  SHIFT_RIGHT,
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  SPACE,
} from './constants.js';

const LANGUAGE_SETTINGS_KEY = 'codejam-keyboard';

const PRINTABLE_FLAG = 'isPrintable';
const MATERIAL_ICON_FLAG = 'isMaterialIcon';
const LARGE_BUTTON_FLAG = 'isLargeBtn';

const KEYBOARD_CLASS = 'keyboard';
const KEY_CLASS = 'keyboard__key';
const PRINTABLE_KEY_CLASS = 'keyboard__key-printable';
const CAPSLOCK_ON_KEY_CLASS = 'keyboard__key-capslock_on';

class Keyboard {
  constructor() {
    this._main = null;
    this._currentLanguage = EN;
    this._currentLayout = LAYOUTS[EN];
    this._textInput = '';
    this._isUpperCase = false;
    this._isCapsLockOn = false;
    this._isShiftOn = false;
  }

  init() {
    this._readSettings();

    this._main = this._createMainContainer();
    document.body.append(this._main);

    this._updateKeyboard();
    this._addKeysEventHandlers();

    window.addEventListener('unload', () => {
      this._saveSettings();
    });
  }

  //-----------------
  // Private methods
  //-----------------

  /* #region  Event Handlers */

  _addMouseEventHandlers(keyboardDiv) {
    keyboardDiv.addEventListener('mousedown', (event) => {
      const btn = event.target.closest('.keyboard__key');
      if (!btn) return;

      if (Keyboard._isShiftKey(btn.id)) {
        this._isShiftOn = true;
        this._switchUpperCase();
      }
    });

    keyboardDiv.addEventListener('mouseup', (event) => {
      const btn = event.target.closest('.keyboard__key');
      if (!btn) return;

      if (Keyboard._isShiftKey(btn.id)) {
        this._isShiftOn = false;
        this._switchUpperCase();
      }
    });

    keyboardDiv.addEventListener('click', (event) => {
      const btn = event.target.closest('.keyboard__key');
      if (!btn) return;

      Keyboard._keyAnimate(btn);
      this._handleActivatedKey(btn, btn.id);
    });
  }

  _addKeysEventHandlers() {
    document.addEventListener('keydown', (event) => {
      const btn = document.getElementById(event.code);
      if (!btn) return;

      Keyboard._keyAnimateOn(btn);

      if (event.shiftKey && event.altKey) {
        this._toggleLanguage();
      } else if (Keyboard._isShiftKey(event.key)) {
        this._isShiftOn = true;
        this._switchUpperCase();
      } else {
        this._handleActivatedKey(btn, event.code);
      }

      event.preventDefault();
    });

    document.addEventListener('keyup', (event) => {
      const btn = document.getElementById(event.code);
      if (!btn) return;

      Keyboard._keyAnimateOff(btn);

      if (Keyboard._isShiftKey(event.key)) {
        this._isShiftOn = false;
        this._switchUpperCase();
      }
    });
  }

  _handleActivatedKey(btn, keyCode) {
    if (keyCode === 'Enter') {
      this._onclickEnter();
    } else if (keyCode === 'Backspace') {
      this._onclickBackspace();
    } else if (keyCode === 'Delete') {
      this._onclickDelete();
    } else if (keyCode === 'CapsLock') {
      this._onclickCapsLock();
    } else if (keyCode.includes('Arrow')) {
      this._onclickArrow(btn);
    } else if (btn.classList.contains('keyboard__key-printable')) {
      this._onclickPrintableSymbol(keyCode);
    }
  }

  static _keyAnimate(btn) {
    Keyboard._keyAnimateOn(btn);
    setTimeout(() => Keyboard._keyAnimateOff(btn), 200);
  }

  static _keyAnimateOn(btn) {
    btn.classList.add('keyboard__key_clicked');
  }

  static _keyAnimateOff(btn) {
    btn.classList.remove('keyboard__key_clicked');
  }

  _onclickDelete() {
    const start = this._textInput.selectionStart;
    if (start < this._textInput.value.length) {
      this._textInput.value = this._textInput.value.slice(0, start)
        + this._textInput.value.slice(start + 1);

      this._textInput.selectionStart = start;
    }
  }

  _onclickBackspace() {
    this._textInput.value = this._textInput.value.slice(0, this._textInput.value.length - 1);
  }

  _onclickEnter() {
    this._textInput.value += '\r\n';
  }

  _onclickCapsLock() {
    this._isCapsLockOn = !this._isCapsLockOn;
    this._switchUpperCase();
  }

  _onclickArrow(btn) {
    this._textInput.value += Keyboard._getPseudoSymbol(btn.id);
  }

  _onclickPrintableSymbol(keyCode) {
    const symbol = this._getKey(keyCode);
    this._textInput.value += symbol;
  }

  /* #endregion */

  /* #region  Create DOM */

  _createMainContainer() {
    const main = document.createElement('main');
    main.className = 'main-container';

    const textInput = document.createElement('textarea');
    textInput.className = 'text-input';
    main.append(textInput);
    this._textInput = textInput;

    return main;
  }

  _updateKeyboard() {
    const prevKeyboard = document.querySelector(`.${KEYBOARD_CLASS}`);
    if (prevKeyboard) prevKeyboard.remove();

    const keyboard = this._createKeyboard();
    this._main.append(keyboard);
  }

  _createKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.className = KEYBOARD_CLASS;

    Object.entries(KEY_ITEMS).forEach(([itemKey, itemValue]) => {
      const itemBtn = document.createElement('button');
      keyboard.append(itemBtn);

      itemBtn.id = itemKey;
      itemBtn.classList.add(KEY_CLASS);

      if (Keyboard._isMaterialIconKey(itemValue)) {
        const htmlIcon = Keyboard._getMaterialIcon(itemKey);
        itemBtn.innerHTML = htmlIcon;
      } else {
        itemBtn.textContent = itemValue.defaultKey || this._getKey(itemKey);
      }

      this._adjustButtonsAppearance(itemKey, itemValue, itemBtn);
    });

    this._addMouseEventHandlers(keyboard);

    return keyboard;
  }

  _adjustButtonsAppearance(itemKey, itemValue, itemBtn) {
    if (Keyboard._isLargeButtonKey(itemValue)) {
      Keyboard._arrangeLargeButtons(itemBtn);
    }

    if (itemKey === CAPS_LOCK) {
      if (this._isCapsLockOn) {
        itemBtn.classList.add(CAPSLOCK_ON_KEY_CLASS);
      }
    }

    if (Keyboard._isPrintableKey(itemValue)) {
      itemBtn.classList.add(PRINTABLE_KEY_CLASS);
    }
  }

  static _isPrintableKey(itemValue) {
    return Keyboard._hasFlag(itemValue, PRINTABLE_FLAG);
  }

  static _isMaterialIconKey(itemValue) {
    return Keyboard._hasFlag(itemValue, MATERIAL_ICON_FLAG);
  }

  static _isLargeButtonKey(itemValue) {
    return Keyboard._hasFlag(itemValue, LARGE_BUTTON_FLAG);
  }

  static _isShiftKey(keyCode) {
    return keyCode === SHIFT_LEFT || keyCode === SHIFT_RIGHT;
  }

  static _hasFlag(itemValue, flag) {
    return itemValue.flags.includes(flag);
  }

  static _getMaterialIcon(keyId) {
    const codes = {
      [BACKSPACE]: 'keyboard_backspace',
      [CAPS_LOCK]: 'keyboard_capslock',
      [ENTER]: 'keyboard_return',
      [ARROW_UP]: 'keyboard_arrow_up',
      [ARROW_DOWN]: 'keyboard_arrow_down',
      [ARROW_LEFT]: 'keyboard_arrow_left',
      [ARROW_RIGHT]: 'keyboard_arrow_right',
    };

    return `<i class="material-icons">${codes[keyId]}</i>`;
  }

  static _arrangeLargeButtons(itemBtn) {
    const map = {
      [BACKSPACE]: '-backspace',
      [CAPS_LOCK]: '-capslock',
      [ENTER]: '-enter',
      [SHIFT_LEFT]: '-left-shift',
      [SPACE]: '-space',
      [SHIFT_RIGHT]: '-right-shift',
    };

    itemBtn.classList.add(`${KEY_CLASS}${map[itemBtn.id]}`);
  }

  static _getPseudoSymbol(btnId) {
    const PSEUDO_KEYS = {
      [ARROW_UP]: '▲',
      [ARROW_DOWN]: '▼',
      [ARROW_LEFT]: '◀',
      [ARROW_RIGHT]: '▶',
    };

    const key = PSEUDO_KEYS[btnId];
    return key || '';
  }

  /* #endregion */

  /* #region  Switch language and uppercase */

  _toggleLanguage() {
    this._currentLanguage = this._currentLanguage === EN ? RU : EN;
    this._currentLayout = LAYOUTS[this._currentLanguage];
    this._updateKeyboard();
  }

  _getLayoutProp() {
    return this._isUpperCase ? UPPER : NORMAL;
  }

  _getKey(keyId) {
    const prop = this._getLayoutProp();
    return this._currentLayout[keyId][prop];
  }

  _calcIsUpperCase() {
    return this._isShiftOn !== this._isCapsLockOn;
  }

  _switchUpperCase() {
    const prevIsUpperCase = this._isUpperCase;
    this._isUpperCase = this._calcIsUpperCase();

    if (prevIsUpperCase !== this._isUpperCase) {
      this._updateKeyboard();
    }
  }

  /* #endregion */

  /* #region  Settings */

  static _createDefaultSettings() {
    return {
      lang: EN,
      capsLockOn: false,
    };
  }

  _readSettings() {
    let settings = JSON.parse(localStorage.getItem(LANGUAGE_SETTINGS_KEY));
    if (!settings) {
      settings = Keyboard._createDefaultSettings();
    }

    this._currentLanguage = settings.lang;
    this._currentLayout = LAYOUTS[this._currentLanguage];

    this._isCapsLockOn = settings.capsLockOn;
    this._isUpperCase = this._calcIsUpperCase();
  }

  _saveSettings() {
    const settings = {
      lang: this._currentLanguage,
      capsLockOn: this._isCapsLockOn,
    };

    localStorage.setItem(LANGUAGE_SETTINGS_KEY, JSON.stringify(settings));
  }

  /* #endregion */
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
