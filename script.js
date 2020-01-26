const container = document.querySelector('.container');
const textContainer = document.querySelector('.text-container');

// create a 2d array from cells
let cellsGrid = [];
for (let row = 0; row < 3; row++){
    let elts = [];
    for (let col = 0; col < 3; col++){
        const div = document.createElement('div');
        div.classList.add('cell');
        container.appendChild(div);
        elts.push(div);
    }
    cellsGrid.push(elts);
}

const cells = document.querySelectorAll('.cell');
cellsArr = Array.from(cells);

for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener('contextmenu', function(e) {
        if (turn !== 'o' || winner) {
            e.preventDefault();
            return; 
        }
        if (!e.target.classList.contains('active')){ // if it's not already active
            e.preventDefault();
            e.target.classList.add('o-cell');
            e.target.classList.add('active');
            turn = 'x';
            updateGame();
        }
        else e.preventDefault();
    });
    cells[i].addEventListener('click', function(e) {
        if (turn !== 'x' || winner) {
            e.preventDefault();
            return; 
        } 
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('x-cell');
            e.target.classList.add('active');
            turn = 'o';
            updateGame();
        }
        else e.preventDefault();
    });
}

let turn = 'x'; 
let winner = '';

function addWinnerText () {
    winner = checkGame();
    let winnerText = document.createElement('h2');
    winnerText.classList.add('winner-text');
    winnerText.textContent = winner + ' won!';
    textContainer.appendChild(winnerText);winner = checkGame();
}

function addDrawText () {
    winner = 'draw'; 
    console.log('it is a draw!');
    let winnerText = document.createElement('h2');
    winnerText.classList.add('winner-text');
    winnerText.textContent = 'it was a draw!';
    textContainer.appendChild(winnerText);
}

function addNewGameButton () {
    let newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game-button');
    newGameButton.textContent = 'new game';
    textContainer.appendChild(newGameButton);

    newGameButton.addEventListener('click', function (e) {
        window.location.reload();
    });
    
}

function updateGame() {
    if (checkGame()) {
        addWinnerText();
        addNewGameButton();
    }
    else {
        if (checkDraw ()) {
            addDrawText();
            addNewGameButton();
        }
    }
}

function checkDraw () {
    function isActive (cell) {
        return cell.classList.contains('active');
    }

    return cellsArr.every(isActive);

}

function checkGame () {

    function checkWinner (array) {
        if (array.every((cell) => cell.classList.contains('x-cell'))) {
            return 'x';
        }
        if (array.every((cell) => cell.classList.contains('o-cell'))) {
            return 'o';
        }
        return false; 
    }

    // check rows 
    for (let row = 0; row < 3; row++){
        let currentRow = cellsGrid[row];
        if (checkWinner (currentRow)) {
            return winner = checkWinner(currentRow);
            console.log('row winner is ', winner);
        }
    }

    // check cols 
    for (let col = 0; col < 3; col++){
        let currentCol = [];
        for (let row = 0; row < 3; row++){
            currentCol.push(cellsGrid[row][col]);
        }
        if (checkWinner (currentCol)) {
            return winner = checkWinner(currentCol);
            console.log('col winner is ', winner )
        }
    }

    // check principal diag
    let principalDiag = [];
    for (let diag = 0; diag < 3; diag++){
        principalDiag.push(cellsGrid[diag][diag]);
    }
    if (checkWinner(principalDiag)) {
        return winner = checkWinner(principalDiag);
        console.log('diag winner is ', winner);
    }

    // check secondary diag
    let secondaryDiag = [];
    for (let row = 0; row < 3; row++){
        secondaryDiag.push(cellsGrid[row][2 - row]);
    }
    if (checkWinner(secondaryDiag)) {
        return winner = checkWinner(secondaryDiag);
        console.log('secondary diag winner is ', winner);
    }

    return false; 
}


