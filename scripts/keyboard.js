class Keyboard {
    _currentLanguage = "En";
    _currentLanguageKeys = [];
    _isShiftPressed = false;
    _textInput = null;

    init() {
        this._initLanguage();

        const main = document.createElement('main');
        main.className = 'main-container';
        document.body.append(main);

        const textInput = document.createElement('textarea');
        textInput.className = 'text-input';
        main.append(textInput);
        this._textInput = textInput;

        const keyboardDiv = document.createElement('div');
        keyboardDiv.className = 'keyboard';
        main.append(keyboardDiv);

        for (const item of this._keyItems) {
            const itemBtn = document.createElement('button');
            keyboardDiv.append(itemBtn);

            itemBtn.id = item.id;
            itemBtn.classList.add('keyboard__key');

            if (this._hasFlag(item, 'isLargeBtn')) {
                this._arrangeLargeButtons(itemBtn);
            }

            itemBtn.textContent = item.defaultKey
                ? item.defaultKey
                : this._getLocalizedKey(item.id);

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
                    this._switchShift(!this._isShiftPressed);
                }
            });

            itemBtn.addEventListener('mouseup', (event) => {
                const btn = event.target;
                if (this._isShiftKey(btn.id)) {
                    this._switchShift(!this._isShiftPressed);
                }
            });

            itemBtn.addEventListener('click', (event) => {
                const btn = event.currentTarget;
                this._keyAnimate(btn);

                this._handleActivatedKey(btn, btn.id, btn.textContent);
            });
        }

        document.addEventListener('keydown', (event) => {
            const btn = document.getElementById(event.code);
            this._keyAnimateOn(btn);

            if (event.shiftKey && event.altKey) {
                this._toggleLanguage();
            }
            else if (this._isShiftKey(event.key)) {
                this._switchShift(!this._isShiftPressed);
            }
            else {
                this._handleActivatedKey(btn, event.code, event.key);
            }

            event.stopPropagation();
        });

        document.addEventListener('keyup', (event) => {
            const btn = document.getElementById(event.code);
            this._keyAnimateOff(btn);

            if (this._isShiftKey(event.key)) {
                this._switchShift(!this._isShiftPressed);
            }
        });
    }

    _keyItems = [
        { id: 'Backquote', flags: ['isPrintable'] },
        { id: 'Digit1', flags: ['isPrintable'] },
        { id: 'Digit2', flags: ['isPrintable'] },
        { id: 'Digit3', flags: ['isPrintable'] },
        { id: 'Digit4', flags: ['isPrintable'] },
        { id: 'Digit5', flags: ['isPrintable'] },
        { id: 'Digit6', flags: ['isPrintable'] },
        { id: 'Digit7', flags: ['isPrintable'] },
        { id: 'Digit8', flags: ['isPrintable'] },
        { id: 'Digit9', flags: ['isPrintable'] },
        { id: 'Digit0', flags: ['isPrintable'] },
        { id: 'Minus', flags: ['isPrintable'] },
        { id: 'Equal', flags: ['isPrintable'] },
        { id: 'Backspace', defaultKey: 'Backspace', flags: ['isMaterialIcon', 'isLargeBtn'] },
        { id: 'Tab', defaultKey: 'Tab', flags: [] },
        { id: 'KeyQ', flags: ['isPrintable'] },
        { id: 'KeyW', flags: ['isPrintable'] },
        { id: 'KeyE', flags: ['isPrintable'] },
        { id: 'KeyR', flags: ['isPrintable'] },
        { id: 'KeyT', flags: ['isPrintable'] },
        { id: 'KeyY', flags: ['isPrintable'] },
        { id: 'KeyU', flags: ['isPrintable'] },
        { id: 'KeyI', flags: ['isPrintable'] },
        { id: 'KeyO', flags: ['isPrintable'] },
        { id: 'KeyP', flags: ['isPrintable'] },
        { id: 'BracketLeft', flags: ['isPrintable'] },
        { id: 'BracketRight', flags: ['isPrintable'] },
        { id: 'Backslash', flags: ['isPrintable'] },
        { id: 'Delete', defaultKey: 'Del', flags: [] },
        { id: 'CapsLock', defaultKey: 'CapsLock', flags: ['isMaterialIcon', 'isLargeBtn'] },
        { id: 'KeyA', flags: ['isPrintable'] },
        { id: 'KeyS', flags: ['isPrintable'] },
        { id: 'KeyD', flags: ['isPrintable'] },
        { id: 'KeyF', flags: ['isPrintable'] },
        { id: 'KeyG', flags: ['isPrintable'] },
        { id: 'KeyH', flags: ['isPrintable'] },
        { id: 'KeyJ', flags: ['isPrintable'] },
        { id: 'KeyK', flags: ['isPrintable'] },
        { id: 'KeyL', flags: ['isPrintable'] },
        { id: 'Semicolon', flags: ['isPrintable'] },
        { id: 'Quote', flags: ['isPrintable'] },
        { id: 'Enter', defaultKey: 'Enter', flags: ['isMaterialIcon', 'isLargeBtn'] },
        { id: 'ShiftLeft', defaultKey: 'Shift', flags: ['isLargeBtn'] },
        { id: 'KeyZ', flags: ['isPrintable'] },
        { id: 'KeyX', flags: ['isPrintable'] },
        { id: 'KeyC', flags: ['isPrintable'] },
        { id: 'KeyV', flags: ['isPrintable'] },
        { id: 'KeyB', flags: ['isPrintable'] },
        { id: 'KeyN', flags: ['isPrintable'] },
        { id: 'KeyM', flags: ['isPrintable'] },
        { id: 'Comma', flags: ['isPrintable'] },
        { id: 'Period', flags: ['isPrintable'] },
        { id: 'Slash', flags: ['isPrintable'] },
        { id: 'ArrowUp', flags: ['isMaterialIcon'] },
        { id: 'ShiftRight', defaultKey: 'Shift', flags: ['isLargeBtn'] },
        { id: 'ControlLeft', defaultKey: 'Ctrl', flags: [] },
        { id: 'MetaLeft', defaultKey: 'Win', flags: [] },
        { id: 'AltLeft', defaultKey: 'Alt', flags: [] },
        { id: 'Space', flags: ['isLargeBtn'] },
        { id: 'AltRight', defaultKey: 'Alt', flags: [] },
        { id: 'ArrowLeft', flags: ['isMaterialIcon'] },
        { id: 'ArrowDown', flags: ['isMaterialIcon'] },
        { id: 'ArrowRight', flags: ['isMaterialIcon'] },
        { id: 'ControlRight', defaultKey: 'Ctrl', flags: [] },
    ];

    _handleActivatedKey(btn, keyCode, keyValue) {
        if (keyCode === 'Enter') {
            this._onclickEnter();
        }
        else if (keyCode === 'Backspace') {
            this._onclickBackspace();
        }
        else if (keyCode === 'Delete') {
            this._onclickDelete();
        }
        else if (keyCode === 'CapsLock') {
            this._onclickCapsLock(btn);
        }
        else if (keyCode.includes('Arrow')) {
            this._onclickArrow(btn);
        }
        else if (btn.classList.contains('keyboard__key-printable')) {
            this._onclickPrintableSymbol(keyValue);
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
            'Backspace': '-backspace',
            'CapsLock': '-capslock',
            'Enter': '-enter',
            'ShiftLeft': '-left-shift',
            'Space': '-space',
            'ShiftRight': '-right-shift',
        }

        itemBtn.classList.add(`keyboard__key${map[itemBtn.id]}`);
    }

    _getPseudoSymbol(btnId) {
        const PSEUDO_KEYS = {
            'ArrowUp': '▲',
            'ArrowDown': '▼',
            'ArrowLeft': '◀',
            'ArrowRight': '▶',
        };

        let key = PSEUDO_KEYS[btnId];
        if (key) return key; else return '';
    }

    _getLocalizedKey(keyId) {
        return this._currentLanguageKeys[keyId];
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
            : 'En'

        this._readPrintableButtonKeys();
        this._saveLanguage();
    }

    _readPrintableButtonKeys() {
        const lang = LANGUAGES[this._currentLanguage + 
            (this._isShiftPressed ? 'Shift' : '')];

        document.querySelectorAll('.keyboard__key-printable')
            .forEach(printableBtn => {
                printableBtn.textContent = lang[printableBtn.id];
            });
    }

    _switchShift(on) {
        this._isShiftPressed = on;
        this._readPrintableButtonKeys();
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
        if (start < this._textInput.textContent.length) {
            this._textInput.textContent =
                this._textInput.textContent.slice(0, start) +
                this._textInput.textContent.slice(start + 1);
            this._textInput.selectionStart = start;
        }
    }

    _onclickBackspace() {
        this._textInput.textContent = this._textInput.textContent.slice(0, this._textInput.textContent.length - 1);
    }

    _onclickEnter() {
        this._textInput.textContent += '\r\n';
    }

    _onclickCapsLock(capsLockBtn) {
        this._switchShift(!this._isShiftPressed);
        capsLockBtn.classList.toggle('keyboard__key-capslock_on');
    }

    _onclickArrow(btn) {
        this._textInput.textContent += this._getPseudoSymbol(btn.id);
    }

    _onclickPrintableSymbol(symbol) {
        this._textInput.textContent += symbol;
    }
}

window.addEventListener('DOMContentLoaded', function () {
    const keyboard = new Keyboard();
    keyboard.init();
});
