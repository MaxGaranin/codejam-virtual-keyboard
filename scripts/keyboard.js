import KEY_ITEMS from './constants.js';
import KEYBOARD_LAYOUTS from './keyboardLayouts.js';

const RU = 'Ru';
const EN = 'En';
const UPPER = 'Upper';
const LANGUAGE_SETTINGS_KEY = 'lang';

const PRINTABLE_FLAG = 'isPrintable';
const MATERIAL_ICON_FLAG = 'isMaterialIcon';
const LARGE_BUTTON_FLAG = 'isLargeBtn';

class Keyboard {
  constructor() {
    this._currentLanguage = 'En';
    this._currentLanguageKeys = [];
    this._textInput = '';
    this._keyItems = [];
    this._isUpperCase = false;
    this._isCapsLockOn = false;
    this._isShiftOn = false;
  }

  init() {
    this._readSettings();

    const keyboardDiv = document.createElement('div');
    keyboardDiv.className = 'keyboard';

    this._keyItems = KEY_ITEMS;

    Object.entries(this._keyItems).forEach(([itemKey, itemValue]) => {
      const itemBtn = document.createElement('button');
      keyboardDiv.append(itemBtn);

      itemBtn.id = itemKey;
      itemBtn.classList.add('keyboard__key');
      itemBtn.textContent = itemValue.defaultKey || this._getLayoutKey(itemKey);

      this._adjustButtonsAppearance(itemKey, itemValue, itemBtn);
    });

    this._addEventHandlers(keyboardDiv);

    const main = this._createMainContainer();
    main.append(keyboardDiv);
    document.body.append(main);
  }

  //-----------------
  // Private methods
  //-----------------

  _addEventHandlers(keyboardDiv) {
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

  _createMainContainer() {
    const main = document.createElement('main');
    main.className = 'main-container';

    const textInput = document.createElement('textarea');
    textInput.className = 'text-input';
    main.append(textInput);
    this._textInput = textInput;

    return main;
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
    if (key) return key; return '';
  }

  _getLayoutKey(keyId) {
    const layout = this._getCurrentLayout();
    return layout[keyId];
  }

  _getCurrentLayout() {
    return KEYBOARD_LAYOUTS[this._currentLanguage + (this._isUpperCase ? UPPER : '')];
  }

  _toggleLanguage() {
    this._currentLanguage = this._currentLanguage === EN ? RU : EN;
    this._readPrintableButtonKeys();
    this._saveSettings();
  }

  _readPrintableButtonKeys() {
    const layout = this._getCurrentLayout();

    document.querySelectorAll('.keyboard__key-printable')
      .forEach((printableBtn) => {
        printableBtn.textContent = layout[printableBtn.id];
      });
  }

  _switchUpperCase() {
    const prevIsUpperCase = this._isUpperCase;
    this._isUpperCase = this._isShiftOn !== this._isCapsLockOn;

    if (prevIsUpperCase !== this._isUpperCase) {
      this._readPrintableButtonKeys();
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
  }

  _onclickArrow(btn) {
    this._textInput.value += this._getPseudoSymbol(btn.id);
  }

  _onclickPrintableSymbol(keyCode) {
    const symbol = this._getLayoutKey(keyCode);
    this._textInput.value += symbol;
  }

  _readSettings() {
    let lang = localStorage.getItem(LANGUAGE_SETTINGS_KEY);
    if (!lang) lang = EN;
    this._currentLanguage = lang;
  }

  _saveSettings() {
    localStorage.setItem(LANGUAGE_SETTINGS_KEY, this._currentLanguage);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
