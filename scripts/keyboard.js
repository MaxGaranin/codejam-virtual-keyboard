const textInput = document.querySelector('.text-input');
const keyboard = document.querySelector('.keyboard');

document.addEventListener('keydown', () => {
});

document.addEventListener('keyup', () => {
});

document.querySelectorAll('.keyboard__key').forEach(keyDiv => {
    keyDiv.addEventListener('mousedown', (event) => {
        const elem = event.target;
        elem.style.background = 'green';
    });

    keyDiv.addEventListener('mouseup', (event) => {
        const elem = event.target;
        elem.style.background = '';
    });

    keyDiv.addEventListener('click', (event) => {
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
        else {
            textInput.textContent += elem.textContent;
        }
    });
});