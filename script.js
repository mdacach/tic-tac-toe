const gameBoard = (() => {
    const container = document.querySelector('.container');
    const textContainer = document.querySelector('.text-container');

    let cellsGrid = [];
    // private functions 
    function constructGrid(){
    // construct the cells and put them in a 2D array
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
    };    

    function addClickFunctions(cell) {
    // add left click for 'x' event
        cell.addEventListener('click', function(e) {
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

        // add right click for 'o' event 
        cell.addEventListener('contextmenu', function(e) {
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
    };

    // public functions 
    function start() {
        constructGrid();
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                addClickFunctions(cellsGrid[i][j]);
            }
        }
    };

    return {
        container,
        textContainer,
        cellsGrid,
        start,
    };
})();

gameBoard.start(); 

let turn = 'x'; 
let winner = '';

function addWinnerText () {
    winner = checkGame();
    let winnerText = document.createElement('h2');
    winnerText.classList.add('winner-text');
    winnerText.textContent = winner + ' won!';
    gameBoard.textContainer.appendChild(winnerText);winner = checkGame();
}

function addDrawText () {
    winner = 'draw'; 
    console.log('it is a draw!');
    let winnerText = document.createElement('h2');
    winnerText.classList.add('winner-text');
    winnerText.textContent = 'it was a draw!';
    gameBoard.textContainer.appendChild(winnerText);
}

function addNewGameButton () {
    let newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game-button');
    newGameButton.textContent = 'new game';
    gameBoard.textContainer.appendChild(newGameButton);

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

    return gameBoard.cellsGrid.every((array) => array.every(isActive));

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

    function addWinnerClass (array, winner) {
        for (let i = 0; i < array.length; i++){
            array[i].classList.add(winner + '-winner');
        }

    }

    // check rows 
    for (let row = 0; row < 3; row++){
        let currentRow = gameBoard.cellsGrid[row];
        if (checkWinner (currentRow)) {
            winner = checkWinner(currentRow);
            addWinnerClass(currentRow, winner);
            return winner; 
        }
    }

    // check cols 
    for (let col = 0; col < 3; col++){
        let currentCol = [];
        for (let row = 0; row < 3; row++){
            currentCol.push(gameBoard.cellsGrid[row][col]);
        }
        if (checkWinner (currentCol)) {
            winner = checkWinner(currentCol);
            addWinnerClass(currentCol, winner);
            return winner; 
        }
    }

    // check principal diag
    let principalDiag = [];
    for (let diag = 0; diag < 3; diag++){
        principalDiag.push(gameBoard.cellsGrid[diag][diag]);
    }
    if (checkWinner(principalDiag)) {
        winner = checkWinner(principalDiag);
        addWinnerClass(principalDiag, winner);
        return winner; 
    }

    // check secondary diag
    let secondaryDiag = [];
    for (let row = 0; row < 3; row++){
        secondaryDiag.push(gameBoard.cellsGrid[row][2 - row]);
    }
    if (checkWinner(secondaryDiag)) {
        winner = checkWinner(secondaryDiag);
        addWinnerClass(secondaryDiag, winner);
        return winner; 
    }

    return false; 
}


