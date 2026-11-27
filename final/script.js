(() => {
    'use strict';


// DOM Stuff
const shiftButtons = document.querySelectorAll('.shift-btn');
const slots = Array.from(document.querySelectorAll('.phone-slot'));
const phoneValue = document.getElementById('phone-value');
const backspaceBtn = document.getElementById('backspace-btn');
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

// Arrow Keys
function rotate(arr, toStart) {
    return toStart
        ? [...arr.slice(1), arr[0]]
        : [arr[arr.length - 1], ...arr.slice(0, -1)];
}

function renderBoard() {
    for (let r = 0; r < 3; r++){
        for (let c = 0; c < 3; c++){
            cellEls[r][c].querySelector('.cube-digit').textContent = grid[r][c];
        }
    }
}

function shift(axis, index, direction) {
    const toStart = direction === 'left' || direction === 'up';

    if(axis === 'row'){
        grid[index] = rotate(grid[index], toStart);
    }
    else {
        const column = rotate(grid.map((row) =>row[index]), toStart);
        column.forEach((digit, r) => {grid[r][index] = digit; });
    }

    renderBoard();
}

// Backspace

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

})();
