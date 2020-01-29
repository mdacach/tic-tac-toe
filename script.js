const gameBoard = (() => {
    const container = document.querySelector('.container');


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
            if (gameFlow.turn !== 'x' || gameFlow.winner) {
                e.preventDefault();
                return; 
            } 
            if (!e.target.classList.contains('active')) {
                e.target.classList.add('x-cell');
                e.target.classList.add('active');
                gameFlow.turn = 'o';
                gameFlow.updateGame();
            }
            else e.preventDefault();
        });

        // add right click for 'o' event 
        cell.addEventListener('contextmenu', function(e) {
            if (gameFlow.turn !== 'o' || gameFlow.winner) {
                e.preventDefault();
                return; 
            }
            if (!e.target.classList.contains('active')){ // if it's not already active
                e.preventDefault();
                e.target.classList.add('o-cell');
                e.target.classList.add('active');
                gameFlow.turn = 'x';
                gameFlow.updateGame();
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
        cellsGrid,
        start,
    };
})();

const displayController = (() => {
    const textContainer = document.querySelector('.text-container');

    function addWinnerText () {
        let winnerText = document.createElement('h2');
        winnerText.classList.add('winner-text');
        winnerText.textContent = gameFlow.winner + ' won!';
        textContainer.appendChild(winnerText);
    };

    function addDrawText () {
        let winnerText = document.createElement('h2');
        winnerText.classList.add('winner-text');
        winnerText.textContent = 'it was a draw!';
        textContainer.appendChild(winnerText);
    };

    function addNewGameButton () {
        let newGameButton = document.createElement('button');
        newGameButton.classList.add('new-game-button');
        newGameButton.textContent = 'new game';
        textContainer.appendChild(newGameButton);

        newGameButton.addEventListener('click', function (e) {
            window.location.reload();
        });
        
    };

    return {
        textContainer,
        addWinnerText,
        addDrawText,
        addNewGameButton,
    }


})();

const gameFlow = (() => {
    let turn = 'x'; 
    let winner = ''; 

    // private functions 
    function checkDraw () {
        function isActive (cell) {
            return cell.classList.contains('active');
        }
        if(gameBoard.cellsGrid.every((array) => array.every(isActive))){
            winner = 'draw';
            return true;
        };
    };

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
                return gameFlow.winner = winner; 
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
                return gameFlow.winner = winner; 
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
            return gameFlow.winner =  winner; 
        }

        // check secondary diag
        let secondaryDiag = [];
        for (let row = 0; row < 3; row++){
            secondaryDiag.push(gameBoard.cellsGrid[row][2 - row]);
        }
        if (checkWinner(secondaryDiag)) {
            winner = checkWinner(secondaryDiag);
            addWinnerClass(secondaryDiag, winner);
            return gameFlow.winner = winner; 
        }

        return ''; 
    };

    // public functions
    function updateGame() {
        if (checkGame()) {
            displayController.addWinnerText();
            displayController.addNewGameButton();
        }
        else {
            if (checkDraw ()) {
                displayController.addDrawText();
                displayController.addNewGameButton();
            }
        }
    };

    return {
        turn,
        winner,
        updateGame,
    };
})(); 

gameBoard.start(); 





