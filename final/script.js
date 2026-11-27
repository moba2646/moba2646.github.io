(() => {
    'use strict';


// DOM Stuff
const shiftButtons = document.querySelectorAll('.shift-btn');
const slots = Array.from(document.querySelectorAll('.phone-slot'));
const phoneValue = document.getElementById('phone-value');
const backspaceBtn = document.getElementById('backspace-btn');
const lockBtn = document.getElementById('lock-btn');
const lockDigit = document.getElementById('lock-digit');
// 

const cellEls = [[], [], []];
document.querySelectorAll('.cube-cell').forEach((cell) => {
    cellEls[Number(cell.dataset.row)][Number(cell.dataset.col)] = cell;
});

// 

const grid = cellEls.map((row) =>
    row.map((cell) => cell.querySelector('.cube-digit').textContent.trim())
);

// 

const digits = [];
const phoneLength = 10;
const center = 1;

let spare = '0';

// Arrow Keys

// New function for hidden number
function slide(line, toStart){
    const pushedOff = toStart ? line[0] : line[line.length - 1];

    const newLine = toStart
        ?[...line.slice(1), spare]
        :[spare, ...line.slice(0, -1)];

    spare = pushedOff;
    return newLine;
}


// function rotate(arr, toStart) {
//     return toStart
//         ? [...arr.slice(1), arr[0]]
//         : [arr[arr.length - 1], ...arr.slice(0, -1)];
// }

function renderBoard() {
    for (let r = 0; r < 3; r++){
        for (let c = 0; c < 3; c++){
            cellEls[r][c].querySelector('.cube-digit').textContent = grid[r][c];
        }
    }

    lockDigit.textContent = grid[center][center];
}

function shift(axis, index, direction) {
    const toStart = direction === 'left' || direction === 'up';

    if(axis === 'row'){
        grid[index] = slide(grid[index], toStart);
    }
    else {
        const column = slide(grid.map((row) =>row[index]), toStart);
        column.forEach((digit, r) => {grid[r][index] = digit; });
    }

    renderBoard();
}

// Add Random Digit
function randomDigit(){
    return String(Math.floor(Math.random() * 10));
}


// Lock in Number
function lockIn() {
    if (digits.length >= phoneLength){
        return;
    }

    digits.push(grid[center][center]);

    // grid[center][center] = randomDigit();

    // renderBoard();
    renderPhone();
}

//

function renderPhone() {
    slots.forEach((slot, i) => {
        slot.textContent = digits[i] ?? '';
    });
    phoneValue.value = digits.join('');
}

function backspace() {
    if (digits.length === 0){
        return;
    }
    digits.pop();
    renderPhone();
}

// Event Listeners

shiftButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        shift(btn.dataset.axis, Number(btn.dataset.index), btn.dataset.direction);
    });
});

backspaceBtn.addEventListener('click', backspace);
lockBtn.addEventListener('click', lockIn);

renderBoard();

})();
