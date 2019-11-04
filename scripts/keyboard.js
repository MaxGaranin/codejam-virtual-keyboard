const textInput = document.querySelector('.text-input');
const keyboard = document.querySelector('.keyboard');
const keyButtons = document.querySelectorAll('.keyboard__key');

let currentLanguage = "Ru";
let isShiftPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.code === "ShiftRight") {
        if (currentLanguage === "En") {
            currentLanguage = "Ru";
        }
        else {
            currentLanguage = "En";
        }
        changeLanguage();
    }
});

function changeLanguage() {
    document.querySelectorAll('.keyboard__key').forEach(keyBtn => {
        const lg = LANGUAGES[currentLanguage];
        const key = lg[keyBtn.id];
        if (key) {
            keyBtn.innerHTML = key;
        }
    });
}

document.addEventListener('keyup', () => {
});

document.querySelectorAll('.keyboard__key').forEach(keyBtn => {
    changeLanguage();

    keyBtn.addEventListener('mousedown', (event) => {
        const elem = event.target;
        elem.style.background = 'green';
        if (elem.classList.contains('keyboard__key-shift')) {
            keyButtons.forEach(keyButton => keyButton.classList.add('keyboard__key_uppercase'));
            isShiftPressed = true;
        }
    });

    keyBtn.addEventListener('mouseup', (event) => {
        const elem = event.target;
        elem.style.background = '';
        if (elem.classList.contains('keyboard__key-shift') && isShiftPressed) {
            keyButtons.forEach(keyButton => keyButton.classList.remove('keyboard__key_uppercase'));
            isShiftPressed = false;
        }
    });

    keyBtn.addEventListener('click', (event) => {
        const elem = event.target;
        if (elem.classList.contains('keyboard__key-service')) {
            return;
        }
        else if (elem.classList.contains('keyboard__key-enter')) {
            let start = textInput.selectionStart;
            textInput.textContent =
                textInput.textContent.slice(0, start - 1) + '\r\n' +
                textInput.textContent.slice(start);
            textInput.selectionStart = start;
        }
        else if (elem.classList.contains('keyboard__key-backspace')) {
            let start = textInput.selectionStart;
            if (start > 0) {
                textInput.textContent =
                    textInput.textContent.slice(0, start - 1) +
                    textInput.textContent.slice(start);
                textInput.selectionStart = start - 1;
            }
        }
        else if (elem.classList.contains('keyboard__key-del')) {
            let start = textInput.selectionStart;
            if (start < textInput.textContent.length) {
                textInput.textContent =
                    textInput.textContent.slice(0, start) +
                    textInput.textContent.slice(start + 1);
                textInput.selectionStart = start;
            }
        }
        else if (elem.classList.contains('keyboard__key-capslock')) {
            keyButtons.forEach(keyButton => {
                keyButton.classList.toggle('keyboard__key_uppercase');
            });
            elem.classList.toggle('keyboard__key-capslock-on');            
        }
        else if (elem.classList.contains('material-icons')) {
            if (elem.parentElement.classList.contains('keyboard__key-arrow-up')) {
                textInput.textContent += '▲';
            }
            else if (elem.parentElement.classList.contains('keyboard__key-arrow-down')) {
                textInput.textContent += '▼';
            }            
            else if (elem.parentElement.classList.contains('keyboard__key-arrow-left')) {
                textInput.textContent += '◀';
            }            
            else if (elem.parentElement.classList.contains('keyboard__key-arrow-right')) {
                textInput.textContent += '▶';
            }            
        }
        else {
            textInput.textContent += elem.textContent;
        }

        event.stopPropagation();
    });
});