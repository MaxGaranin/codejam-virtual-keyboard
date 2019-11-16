export const KEY_ITEMS = {
  Backquote: { flags: ['isPrintable'] },
  Digit1: { flags: ['isPrintable'] },
  Digit2: { flags: ['isPrintable'] },
  Digit3: { flags: ['isPrintable'] },
  Digit4: { flags: ['isPrintable'] },
  Digit5: { flags: ['isPrintable'] },
  Digit6: { flags: ['isPrintable'] },
  Digit7: { flags: ['isPrintable'] },
  Digit8: { flags: ['isPrintable'] },
  Digit9: { flags: ['isPrintable'] },
  Digit0: { flags: ['isPrintable'] },
  Minus: { flags: ['isPrintable'] },
  Equal: { flags: ['isPrintable'] },
  Backspace: { defaultKey: 'Backspace', flags: ['isMaterialIcon', 'isLargeBtn'] },
  Tab: { defaultKey: 'Tab', flags: [] },
  KeyQ: { flags: ['isPrintable'] },
  KeyW: { flags: ['isPrintable'] },
  KeyE: { flags: ['isPrintable'] },
  KeyR: { flags: ['isPrintable'] },
  KeyT: { flags: ['isPrintable'] },
  KeyY: { flags: ['isPrintable'] },
  KeyU: { flags: ['isPrintable'] },
  KeyI: { flags: ['isPrintable'] },
  KeyO: { flags: ['isPrintable'] },
  KeyP: { flags: ['isPrintable'] },
  BracketLeft: { flags: ['isPrintable'] },
  BracketRight: { flags: ['isPrintable'] },
  Backslash: { flags: ['isPrintable'] },
  Delete: { defaultKey: 'Del', flags: [] },
  CapsLock: { defaultKey: 'CapsLock', flags: ['isMaterialIcon', 'isLargeBtn'] },
  KeyA: { flags: ['isPrintable'] },
  KeyS: { flags: ['isPrintable'] },
  KeyD: { flags: ['isPrintable'] },
  KeyF: { flags: ['isPrintable'] },
  KeyG: { flags: ['isPrintable'] },
  KeyH: { flags: ['isPrintable'] },
  KeyJ: { flags: ['isPrintable'] },
  KeyK: { flags: ['isPrintable'] },
  KeyL: { flags: ['isPrintable'] },
  Semicolon: { flags: ['isPrintable'] },
  Quote: { flags: ['isPrintable'] },
  Enter: { defaultKey: 'Enter', flags: ['isMaterialIcon', 'isLargeBtn'] },
  ShiftLeft: { defaultKey: 'Shift', flags: ['isLargeBtn'] },
  KeyZ: { flags: ['isPrintable'] },
  KeyX: { flags: ['isPrintable'] },
  KeyC: { flags: ['isPrintable'] },
  KeyV: { flags: ['isPrintable'] },
  KeyB: { flags: ['isPrintable'] },
  KeyN: { flags: ['isPrintable'] },
  KeyM: { flags: ['isPrintable'] },
  Comma: { flags: ['isPrintable'] },
  Period: { flags: ['isPrintable'] },
  Slash: { flags: ['isPrintable'] },
  ArrowUp: { defaultKey: 'Backspace', flags: ['isMaterialIcon'] },
  ShiftRight: { defaultKey: 'Shift', flags: ['isLargeBtn'] },
  ControlLeft: { defaultKey: 'Ctrl', flags: [] },
  MetaLeft: { defaultKey: 'Win', flags: [] },
  AltLeft: { defaultKey: 'Alt', flags: [] },
  Space: { flags: ['isPrintable', 'isLargeBtn'] },
  AltRight: { defaultKey: 'Alt', flags: [] },
  ArrowLeft: { defaultKey: 'Backspace', flags: ['isMaterialIcon'] },
  ArrowDown: { defaultKey: 'Backspace', flags: ['isMaterialIcon'] },
  ArrowRight: { defaultKey: 'Backspace', flags: ['isMaterialIcon'] },
  ControlRight: { defaultKey: 'Ctrl', flags: [] },
};

const EN_LAYOUT = {
  Backquote: { normal: '`', upper: '~' },
  Digit1: { normal: '1', upper: '!' },
  Digit2: { normal: '2', upper: '@' },
  Digit3: { normal: '3', upper: '#' },
  Digit4: { normal: '4', upper: '$' },
  Digit5: { normal: '5', upper: '%' },
  Digit6: { normal: '6', upper: '^' },
  Digit7: { normal: '7', upper: '&' },
  Digit8: { normal: '8', upper: '*' },
  Digit9: { normal: '9', upper: '(' },
  Digit0: { normal: '0', upper: ')' },
  Minus: { normal: '-', upper: '_' },
  Equal: { normal: '=', upper: '+' },
  KeyQ: { normal: 'q', upper: 'Q' },
  KeyW: { normal: 'w', upper: 'W' },
  KeyE: { normal: 'e', upper: 'E' },
  KeyR: { normal: 'r', upper: 'R' },
  KeyT: { normal: 't', upper: 'T' },
  KeyY: { normal: 'y', upper: 'Y' },
  KeyU: { normal: 'u', upper: 'U' },
  KeyI: { normal: 'i', upper: 'I' },
  KeyO: { normal: 'o', upper: 'O' },
  KeyP: { normal: 'p', upper: 'P' },
  BracketLeft: { normal: '[', upper: '{' },
  BracketRight: { normal: ']', upper: '}' },
  Backslash: { normal: '\\', upper: '|' },
  KeyA: { normal: 'a', upper: 'A' },
  KeyS: { normal: 's', upper: 'S' },
  KeyD: { normal: 'd', upper: 'D' },
  KeyF: { normal: 'f', upper: 'F' },
  KeyG: { normal: 'g', upper: 'G' },
  KeyH: { normal: 'h', upper: 'H' },
  KeyJ: { normal: 'j', upper: 'J' },
  KeyK: { normal: 'k', upper: 'K' },
  KeyL: { normal: 'l', upper: 'L' },
  Semicolon: { normal: ';', upper: ':' },
  Quote: { normal: '\'', upper: '"' },
  KeyZ: { normal: 'z', upper: 'Z' },
  KeyX: { normal: 'x', upper: 'X' },
  KeyC: { normal: 'c', upper: 'C' },
  KeyV: { normal: 'v', upper: 'V' },
  KeyB: { normal: 'b', upper: 'B' },
  KeyN: { normal: 'n', upper: 'N' },
  KeyM: { normal: 'm', upper: 'M' },
  Comma: { normal: ',', upper: '<' },
  Period: { normal: '.', upper: '>' },
  Slash: { normal: '/', upper: '?' },
  Space: { normal: ' ', upper: ' ' },
};

const RU_LAYOUT = {
  Backquote: { normal: 'ё', upper: 'Ё' },
  Digit1: { normal: '1', upper: '!' },
  Digit2: { normal: '2', upper: '"' },
  Digit3: { normal: '3', upper: '№' },
  Digit4: { normal: '4', upper: ';' },
  Digit5: { normal: '5', upper: '%' },
  Digit6: { normal: '6', upper: ':' },
  Digit7: { normal: '7', upper: '?' },
  Digit8: { normal: '8', upper: '*' },
  Digit9: { normal: '9', upper: '(' },
  Digit0: { normal: '0', upper: ')' },
  Minus: { normal: '-', upper: '_' },
  Equal: { normal: '=', upper: '+' },
  KeyQ: { normal: 'й', upper: 'Й' },
  KeyW: { normal: 'ц', upper: 'Ц' },
  KeyE: { normal: 'у', upper: 'У' },
  KeyR: { normal: 'к', upper: 'К' },
  KeyT: { normal: 'е', upper: 'Е' },
  KeyY: { normal: 'н', upper: 'Н' },
  KeyU: { normal: 'г', upper: 'Г' },
  KeyI: { normal: 'ш', upper: 'Ш' },
  KeyO: { normal: 'щ', upper: 'Щ' },
  KeyP: { normal: 'з', upper: 'З' },
  BracketLeft: { normal: 'х', upper: 'Х' },
  BracketRight: { normal: 'ъ', upper: 'Ъ' },
  Backslash: { normal: '\\', upper: '/' },
  KeyA: { normal: 'ф', upper: 'Ф' },
  KeyS: { normal: 'ы', upper: 'Ы' },
  KeyD: { normal: 'в', upper: 'В' },
  KeyF: { normal: 'а', upper: 'А' },
  KeyG: { normal: 'п', upper: 'П' },
  KeyH: { normal: 'р', upper: 'Р' },
  KeyJ: { normal: 'о', upper: 'О' },
  KeyK: { normal: 'л', upper: 'Л' },
  KeyL: { normal: 'д', upper: 'Д' },
  Semicolon: { normal: 'ж', upper: 'Ж' },
  Quote: { normal: 'э', upper: 'Э' },
  KeyZ: { normal: 'я', upper: 'Я' },
  KeyX: { normal: 'ч', upper: 'Ч' },
  KeyC: { normal: 'с', upper: 'С' },
  KeyV: { normal: 'м', upper: 'М' },
  KeyB: { normal: 'и', upper: 'И' },
  KeyN: { normal: 'т', upper: 'Т' },
  KeyM: { normal: 'ь', upper: 'Ь' },
  Comma: { normal: 'б', upper: 'Б' },
  Period: { normal: 'ю', upper: 'Ю' },
  Slash: { normal: '.', upper: ',' },
  Space: { normal: ' ', upper: ' ' },
};

export const CAPS_LOCK = 'CapsLock';
export const ENTER = 'Enter';
export const BACKSPACE = 'Backspace';
export const ARROW_UP = 'ArrowUp';
export const ARROW_DOWN = 'ArrowDown';
export const ARROW_LEFT = 'ArrowLeft';
export const ARROW_RIGHT = 'ArrowRight';
export const SHIFT_LEFT = 'ShiftLeft';
export const SHIFT_RIGHT = 'ShiftRight';
export const SPACE = 'Space';

export const EN = 'En';
export const RU = 'Ru';
export const NORMAL = 'normal';
export const UPPER = 'upper';

export const LAYOUTS = {
  [EN]: EN_LAYOUT,
  [RU]: RU_LAYOUT,
};
