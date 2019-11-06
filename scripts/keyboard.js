const EN_LANGUAGE = "En";
const RU_LANGUAGE = "Ru";

const textInput = document.querySelector('.text-input');
const keyboard = document.querySelector('.keyboard');
const allKeys = document.querySelectorAll('.keyboard__key');
const printableKeys = document.querySelectorAll('.keyboard__key-print');
const capsLockKey = document.getElementById('CapsLock');

let currentLanguage = getLanguage();
let isShiftPressed = false;

document.addEventListener('keydown', (event) => {
    const btn = document.getElementById(event.code);
    if (btn) keyAnimateOn(btn);

    if (event.shiftKey && event.altKey) {
        toggleLanguage();
    }
    else if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        return;
    }
    else if (event.code === 'Enter') {
        onclickEnter();
    }
    else if (event.code === 'Backspace') {
        onclickBackspace();
    }
    else if (event.code === 'Delete') {
        onclickDelete();
    }
    else if (event.code === 'CapsLock') {
        onclickCapsLock(btn);
    }
    else if (event.code.includes('Arrow')) {
        onclickArrow(event.code);
    }
    else {
        onclickPrintableSymbol(event.key);
    }

    event.stopPropagation();
});

document.addEventListener('keyup', (event) => {
    const elem = document.getElementById(event.code);
    if (elem) keyAnimateOff(elem);
});

document.querySelectorAll('.keyboard__key').forEach(itemBtn => {
    changeKeysForLanguage();

    itemBtn.addEventListener('mousedown', (event) => {
        const elem = event.target;
        if (elem.classList.contains('keyboard__key-shift')) {
            printableKeys.forEach(keyButton => keyButton.classList.add('keyboard__key_uppercase'));
            isShiftPressed = true;
        }
    });

    itemBtn.addEventListener('mouseup', (event) => {
        const elem = event.target;
        if (elem.classList.contains('keyboard__key-shift') && isShiftPressed) {
            printableKeys.forEach(keyButton => keyButton.classList.remove('keyboard__key_uppercase'));
            isShiftPressed = false;
        }
    });

    itemBtn.addEventListener('click', (event) => {
        const btn = event.currentTarget;

        keyAnimate(btn);

        if (btn.classList.contains('keyboard__key-service')) {
            return;
        }
        else if (btn.classList.contains('keyboard__key-enter')) {
            onclickEnter();
        }
        else if (btn.classList.contains('keyboard__key-backspace')) {
            onclickBackspace();
        }
        else if (btn.classList.contains('keyboard__key-del')) {
            onclickDelete();
        }
        else if (btn.classList.contains('keyboard__key-capslock')) {
            onclickCapsLock(btn);
        }
        else if (btn.classList.contains('keyboard__key-arrow')) {
            onclickArrow(btn);
        }
        else {
            onclickPrintableSymbol(btn.textContent);
        }
    });
});

function onclickDelete() {
    const start = textInput.selectionStart;
    if (start < textInput.textContent.length) {
        textInput.textContent =
            textInput.textContent.slice(0, start) +
            textInput.textContent.slice(start + 1);
        textInput.selectionStart = start;
    }
}

function onclickBackspace() {
    textInput.textContent = textInput.textContent.slice(0, textInput.textContent.length - 1);
}

function onclickEnter() {
    textInput.textContent += '\r\n';
}

function onclickCapsLock(capsLockBtn) {
    printableKeys.forEach(btn => {
        btn.classList.toggle('keyboard__key_uppercase');
    });
    capsLockBtn.classList.toggle('keyboard__key-capslock_on');
}

function onclickArrow(elemId) {
    textInput.textContent += getPseudoSymbol(elemId);
}

function onclickPrintableSymbol(symbol) {
    textInput.textContent += symbol;
}

//-------------------
// Private functions

function getPseudoSymbol(elemId) {
    const PSEUDO_KEYS = {
        'ArrowUp': '▲',
        'ArrowDown': '▼',
        'ArrowLeft': '◀',
        'ArrowRight': '▶',
    };

    let key = PSEUDO_KEYS[elemId];
    if (key) return key; else return '';
}

function toggleLanguage() {
    currentLanguage = currentLanguage === EN_LANGUAGE
        ? RU_LANGUAGE
        : EN_LANGUAGE;

    changeKeysForLanguage();
    saveLanguage();
}

function changeKeysForLanguage() {
    const lg = LANGUAGES[currentLanguage];

    document.querySelectorAll('.keyboard__key').forEach(keyBtn => {
        const key = lg[keyBtn.id];
        if (key) {
            keyBtn.innerHTML = key;
        }
    });
}

function getLanguage() {
    let lang = localStorage.getItem('lang');
    if (!lang) lang = EN_LANGUAGE;
    return lang;
}

function saveLanguage() {
    localStorage.setItem('lang', currentLanguage);
}

function keyAnimate(btn) {
    keyAnimateOn(btn);
    setTimeout(() => keyAnimateOff(btn), 200);
}

function keyAnimateOn(btn) {
    btn.classList.add('keyboard__key_clicked');
}

function keyAnimateOff(btn) {
    btn.classList.remove('keyboard__key_clicked');
}