/* eslint-disable import/extensions */
import KEY_ITEMS from './constants.js';
import LANGUAGES from './languages.js';

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
    this._keyItems = KEY_ITEMS;
    this._initLanguage();

    const main = document.createElement('main');
    main.className = 'main-container';

    const textInput = document.createElement('textarea');
    textInput.className = 'text-input';
    main.append(textInput);
    this._textInput = textInput;

    const keyboardDiv = document.createElement('div');
    keyboardDiv.className = 'keyboard';
    main.append(keyboardDiv);

    this._keyItems.forEach((item) => {
      const itemBtn = document.createElement('button');
      keyboardDiv.append(itemBtn);

      itemBtn.id = item.id;
      itemBtn.classList.add('keyboard__key');

      if (this._hasFlag(item, 'isLargeBtn')) {
        this._arrangeLargeButtons(itemBtn);
      }

      itemBtn.textContent = item.defaultKey || this._getLocalizedKey(item.id);

      if (this._hasFlag(item, 'isMaterialIcon')) {
        const htmlIcon = this._getMaterialIcon(item.id);
        itemBtn.innerHTML = htmlIcon;
      }

      if (this._hasFlag(item, 'isPrintable')) {
        itemBtn.classList.add('keyboard__key-printable');
      }

      // Event handlers
      itemBtn.addEventListener('mousedown', (event) => {
        const btn = event.target;
        if (this._isShiftKey(btn.id)) {
          this._isShiftOn = true;
          this._switchUpperCase();
        }
      });

      itemBtn.addEventListener('mouseup', (event) => {
        const btn = event.target;
        if (this._isShiftKey(btn.id)) {
          this._isShiftOn = false;
          this._switchUpperCase();
        }
      });

      itemBtn.addEventListener('click', (event) => {
        const btn = event.currentTarget;
        this._keyAnimate(btn);

        this._handleActivatedKey(btn, btn.id);
      });
    });

    document.addEventListener('keydown', (event) => {
      const btn = document.getElementById(event.code);
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
      this._keyAnimateOff(btn);

      if (this._isShiftKey(event.key)) {
        this._isShiftOn = false;
        this._switchUpperCase();
      }
    });

    document.body.append(main);
  }

  // Methods

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

  _isShiftKey(keyValue) {
    return keyValue.includes('Shift');
  }

  _hasFlag(item, flag) {
    return (item.flags.includes(flag));
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

  _getLocalizedKey(keyId) {
    const lang = LANGUAGES[this._currentLanguage
      + (this._isUpperCase ? 'Shift' : '')];

    return lang[keyId];
  }

  _initLanguage() {
    this._currentLanguage = this._getLanguage();
    this._currentLanguageKeys = LANGUAGES[this._currentLanguage];
  }

  _getLanguage() {
    let lang = localStorage.getItem('lang');
    if (!lang) lang = 'En';
    return lang;
  }

  _saveLanguage() {
    localStorage.setItem('lang', this._currentLanguage);
  }

  _toggleLanguage() {
    this._currentLanguage = this._currentLanguage === 'En'
      ? 'Ru'
      : 'En';
    this._currentLanguageKeys = LANGUAGES[this._currentLanguage];

    this._readPrintableButtonKeys();
    this._saveLanguage();
  }

  _readPrintableButtonKeys() {
    const lang = LANGUAGES[this._currentLanguage
      + (this._isUpperCase ? 'Shift' : '')];

    document.querySelectorAll('.keyboard__key-printable')
      .forEach((printableBtn) => {
        // eslint-disable-next-line no-param-reassign
        printableBtn.textContent = lang[printableBtn.id];
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
    const symbol = this._getLocalizedKey(keyCode);
    this._textInput.value += symbol;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
