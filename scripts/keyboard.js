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
    if (event.shiftKey && event.ctrlKey) {
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
        onclickCapsLock();
    }
    else if (event.code.includes('Arrow')) {
        onclickArrow(event.code);
    }
    else {
        onclickNormalSymbol(event.key);
    }
});

document.addEventListener('keyup', () => {
});

document.querySelectorAll('.keyboard__key').forEach(keyBtn => {
    changeKeysForLanguage();

    keyBtn.addEventListener('mousedown', (event) => {
        const elem = event.target;
        if (elem.classList.contains('keyboard__key-shift')) {
            allKeys.forEach(keyButton => keyButton.classList.add('keyboard__key_uppercase'));
            isShiftPressed = true;
        }
    });

    keyBtn.addEventListener('mouseup', (event) => {
        const elem = event.target;
        if (elem.classList.contains('keyboard__key-shift') && isShiftPressed) {
            allKeys.forEach(keyButton => keyButton.classList.remove('keyboard__key_uppercase'));
            isShiftPressed = false;
        }
    });

    keyBtn.addEventListener('click', (event) => {
        const elem = event.currentTarget;

        animateClick(elem);

        if (elem.classList.contains('keyboard__key-service')) {
            return;
        }
        else if (elem.classList.contains('keyboard__key-enter')) {
            onclickEnter();
        }
        else if (elem.classList.contains('keyboard__key-backspace')) {
            onclickBackspace();
        }
        else if (elem.classList.contains('keyboard__key-del')) {
            onclickDelete();
        }
        else if (elem.classList.contains('keyboard__key-capslock')) {
            onclickCapsLock();
        }
        else if (elem.classList.contains('keyboard__key-arrow')) {
            onclickArrow(elem);
        }
        else {
            onclickNormalSymbol(elem.textContent);
        }
    });
});

function onclickDelete() {
    let start = textInput.selectionStart;
    if (start < textInput.textContent.length) {
        textInput.textContent =
            textInput.textContent.slice(0, start) +
            textInput.textContent.slice(start + 1);
        textInput.selectionStart = start;
    }
}

function onclickBackspace() {
    let start = textInput.selectionStart;
    if (start > 0) {
        textInput.textContent =
            textInput.textContent.slice(0, start - 1) +
            textInput.textContent.slice(start);
        textInput.selectionStart = start - 1;
    }
}

function onclickEnter() {
    let start = textInput.selectionStart;
    textInput.textContent =
        textInput.textContent.slice(0, start - 1) + '\r\n' +
        textInput.textContent.slice(start);
    textInput.selectionStart = start;
}

function onclickCapsLock() {
    printableKeys.forEach(keyButton => {
        keyButton.classList.toggle('keyboard__key_uppercase');
    });
    capsLockKey.classList.toggle('keyboard__key-capslock-on');
}

function onclickArrow(elemId) {
    textInput.textContent += getPseudoSymbol(elemId);
}

function onclickNormalSymbol(symbol) {
    textInput.textContent += symbol;
}

//-------------------
// Private functions

const PSEUDO_KEYS = {
    'ArrowUp': '▲',
    'ArrowDown': '▼',
    'ArrowLeft': '◀',
    'ArrowRight': '▶',
}

function getPseudoSymbol(elemId) {
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
    document.querySelectorAll('.keyboard__key').forEach(keyBtn => {
        const lg = LANGUAGES[currentLanguage];
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

function animateClick(elem) {
    elem.classList.add('keyboard__key_clicked');
    setTimeout(() => { elem.classList.remove('keyboard__key_clicked'); }, 200);
}