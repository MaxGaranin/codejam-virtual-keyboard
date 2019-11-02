const textInput = document.querySelector('.text-input');
const keyboard = document.querySelector('.keyboard');

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const keyDiv = document.getElementById(event.key);
    keyDiv.click();
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
        if (elem.classList.contains('keyboard__key-service')) return;

        textInput.textContent += elem.textContent;
    });
});