import {
  KEY_ITEMS, LAYOUTS, EN, RU, NORMAL, UPPER,
} from './constants.js';

const LANGUAGE_SETTINGS_KEY = 'codejam-keyboard';

const PRINTABLE_FLAG = 'isPrintable';
const MATERIAL_ICON_FLAG = 'isMaterialIcon';
const LARGE_BUTTON_FLAG = 'isLargeBtn';

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
    this._main = this._createMainContainer();
    document.body.append(this._main);

    this._updateKeyboard();
    this._addKeysEventHandlers();
  }

  //-----------------
  // Private methods
  //-----------------

  /* #endregion */

  /* #region  Event Handlers */

  _addMouseEventHandlers(keyboardDiv) {
    keyboardDiv.addEventListener('mousedown', (event) => {
      const btn = event.target.closest('.keyboard__key');
      if (!btn) return;

      if (this._isShiftKey(btn.id)) {
        this._isShiftOn = true;
        this._switchUpperCase();
      }
    });

    keyboardDiv.addEventListener('mouseup', (event) => {
      const btn = event.target.closest('.keyboard__key');
      if (!btn) return;

      if (this._isShiftKey(btn.id)) {
        this._isShiftOn = false;
        this._switchUpperCase();
      }
    });

    keyboardDiv.addEventListener('click', (event) => {
      const btn = event.target.closest('.keyboard__key');
      if (!btn) return;

      this._keyAnimate(btn);
      this._handleActivatedKey(btn, btn.id);
    });
  }

  _addKeysEventHandlers() {
    document.addEventListener('keydown', (event) => {
      const btn = document.getElementById(event.code);
      if (!btn) return;

      this._keyAnimateOn(btn);

      if (event.shiftKey && event.altKey) {
        this._toggleLanguage();
      } else if (this._isShiftKey(event.key)) {
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

      this._keyAnimateOff(btn);

      if (this._isShiftKey(event.key)) {
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
      this._onclickCapsLock(btn);
    } else if (keyCode.includes('Arrow')) {
      this._onclickArrow(btn);
    } else if (btn.classList.contains('keyboard__key-printable')) {
      this._onclickPrintableSymbol(keyCode);
    }
  }

  _keyAnimate(btn) {
    this._keyAnimateOn(btn);
    setTimeout(() => this._keyAnimateOff(btn), 200);
  }

  _keyAnimateOn(btn) {
    btn.classList.add('keyboard__key_clicked');
  }

  _keyAnimateOff(btn) {
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
    this._textInput.value = this._textInput.value
      .slice(0, this._textInput.value.length - 1);
  }

  _onclickEnter() {
    this._textInput.value += '\r\n';
  }

  _onclickCapsLock(capsLockBtn) {
    this._isCapsLockOn = !this._isCapsLockOn;
    capsLockBtn.classList.toggle('keyboard__key-capslock_on');
    this._switchUpperCase();
    this._saveSettings();
  }

  _onclickArrow(btn) {
    this._textInput.value += this._getPseudoSymbol(btn.id);
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
    this._readSettings();

    const prevKeyboard = document.querySelector('.keyboard');
    if (prevKeyboard) prevKeyboard.remove();

    const keyboard = this._createKeyboard();
    this._main.append(keyboard);

    const capsLockBtn = document.getElementById('CapsLock');
    if (this._isCapsLockOn) {
      capsLockBtn.classList.add('keyboard__key-capslock_on');
    }
  }

  _createKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';

    Object.entries(KEY_ITEMS).forEach(([itemKey, itemValue]) => {
      const itemBtn = document.createElement('button');
      keyboard.append(itemBtn);

      itemBtn.id = itemKey;
      itemBtn.classList.add('keyboard__key');
      itemBtn.textContent = itemValue.defaultKey || this._getKey(itemKey);

      this._adjustButtonsAppearance(itemKey, itemValue, itemBtn);
    });

    this._addMouseEventHandlers(keyboard);

    return keyboard;
  }

  _adjustButtonsAppearance(itemKey, itemValue, itemBtn) {
    if (this._isLargeButtonKey(itemValue)) {
      this._arrangeLargeButtons(itemBtn);
    }

    if (this._isMaterialIconKey(itemValue)) {
      const htmlIcon = this._getMaterialIcon(itemKey);
      itemBtn.innerHTML = htmlIcon;
    }

    if (this._isPrintableKey(itemValue)) {
      itemBtn.classList.add('keyboard__key-printable');
    }
  }

  _isPrintableKey(itemValue) {
    return this._hasFlag(itemValue, PRINTABLE_FLAG);
  }

  _isMaterialIconKey(itemValue) {
    return this._hasFlag(itemValue, MATERIAL_ICON_FLAG);
  }

  _isLargeButtonKey(itemValue) {
    return this._hasFlag(itemValue, LARGE_BUTTON_FLAG);
  }

  _isShiftKey(keyCode) {
    return keyCode.includes('Shift');
  }

  _hasFlag(itemValue, flag) {
    return (itemValue.flags.includes(flag));
  }

  _getMaterialIcon(keyId) {
    const codes = {
      Backspace: 'keyboard_backspace',
      CapsLock: 'keyboard_capslock',
      Enter: 'keyboard_return',
      ArrowUp: 'keyboard_arrow_up',
      ArrowRight: 'keyboard_arrow_right',
      ArrowLeft: 'keyboard_arrow_left',
      ArrowDown: 'keyboard_arrow_down',
    };

    return `<i class="material-icons">${codes[keyId]}</i>`;
  }

  _arrangeLargeButtons(itemBtn) {
    const map = {
      Backspace: '-backspace',
      CapsLock: '-capslock',
      Enter: '-enter',
      ShiftLeft: '-left-shift',
      Space: '-space',
      ShiftRight: '-right-shift',
    };

    itemBtn.classList.add(`keyboard__key${map[itemBtn.id]}`);
  }

  _getPseudoSymbol(btnId) {
    const PSEUDO_KEYS = {
      ArrowUp: '▲',
      ArrowDown: '▼',
      ArrowLeft: '◀',
      ArrowRight: '▶',
    };

    const key = PSEUDO_KEYS[btnId];
    return key || '';
  }

  /* #endregion */

  /* #region  Switch language and uppercase */

  _toggleLanguage() {
    this._currentLanguage = this._currentLanguage === EN ? RU : EN;
    this._currentLayout = LAYOUTS[this._currentLanguage];
    this._saveSettings();
    this._updateKeyboard();
  }

  _getLayoutProp() {
    return this._isUpperCase ? UPPER : NORMAL;
  }

  _getKey(keyId) {
    const prop = this._getLayoutProp();
    return this._currentLayout[keyId][prop];
  }

  _readPrintableButtonKeys() {
    document.querySelectorAll('.keyboard__key-printable')
      .forEach((btn) => {
        const key = this._getKey(btn.id, this._currentLayout);
        btn.textContent = key;
      });
  }

  _switchUpperCase() {
    const prevIsUpperCase = this._isUpperCase;
    this._isUpperCase = this._isShiftOn !== this._isCapsLockOn;

    if (prevIsUpperCase !== this._isUpperCase) {
      this._updateKeyboard();
    }
  }

  /* #endregion */

  /* #region  Settings */

  _createDefaultSettings() {
    return {
      lang: EN,
      capsLockOn: false,
    };
  }

  _readSettings() {
    let settings = JSON.parse(localStorage.getItem(LANGUAGE_SETTINGS_KEY));
    if (!settings) {
      settings = this._createDefaultSettings();
    }

    this._currentLanguage = settings.lang;
    this._isCapsLockOn = settings.capsLockOn;
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
