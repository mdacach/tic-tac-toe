const gameBoard = (() => {
    const container = document.querySelector('.container');

    let divsGrid = []; 

    for (let i = 0; i < 3; i++){
        let row = []; 
        for (let j = 0; j < 3; j++){
            const div = document.createElement('div');
            div.classList.add('cell');
            container.appendChild(div);
            row.push(div);
        }
        divsGrid.push(row); 
    }


    function addClickFunctions(cell) {
    // add left click for 'x' event
        cell.addEventListener('click', function(e) {
            e.preventDefault();
            gameFlow.markCell(e.target, 'x');
        });

        // add right click for 'o' event 
        cell.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            gameFlow.markCell(e.target, 'o');
        });
    };

    // public functions 
    function start() {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                addClickFunctions(divsGrid[i][j]);
            }
        }
    };

    return {
        container,
        divsGrid,
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

    let playComputer = false; 
    let userInput = prompt('would you like to play against the computer? (y/n)');
    console.log(playComputer);
    if (userInput == 'y') playComputer = true;
    console.log(playComputer);
    // private functions 
    function checkDraw() {
        function isActive (cell) {
            return cell.classList.contains('active');
        }
        if(gameBoard.divsGrid.every((array) => array.every(isActive))){
            winner = 'draw';
            return true;
        };
    };

    function checkGame() {

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
            let currentRow = gameBoard.divsGrid[row];
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
                currentCol.push(gameBoard.divsGrid[row][col]);
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
            principalDiag.push(gameBoard.divsGrid[diag][diag]);
        }
        if (checkWinner(principalDiag)) {
            winner = checkWinner(principalDiag);
            addWinnerClass(principalDiag, winner);
            return gameFlow.winner =  winner; 
        }

        // check secondary diag
        let secondaryDiag = [];
        for (let row = 0; row < 3; row++){
            secondaryDiag.push(gameBoard.divsGrid[row][2 - row]);
        }
        if (checkWinner(secondaryDiag)) {
            winner = checkWinner(secondaryDiag);
            addWinnerClass(secondaryDiag, winner);
            return gameFlow.winner = winner; 
        }

        return ''; 
    };

    // public functions

    function markCell(cell, marker){
        // mark cells if they are not active, the turn is correct and there is no winner yet
        if (cell.classList.contains('active') || gameFlow.turn !== marker || gameFlow.winner){
            // do not mark the cell
            return; 
        }
        else {
            cell.classList.add(marker + '-cell');
            cell.classList.add('active');
            gameFlow.updateGame(marker);
        }
    };

    function updateGame(previousTurn) {
        if (checkGame()) {
            displayController.addWinnerText();
            displayController.addNewGameButton();
            return; 
        }
        else {
            if (checkDraw ()) {
                displayController.addDrawText();
                displayController.addNewGameButton();
                return; 
            }
        }

        if (previousTurn === 'x') {
            // if playing against computer
            if (playComputer) {
                gameFlow.turn = 'o';
                computerModule.play();
                gameFlow.turn = 'x';
            }
            else gameFlow.turn = 'o';
        }
        else if (previousTurn === 'o') 
            gameFlow.turn = 'x';


    };

    return {
        turn,
        winner,
        markCell,
        updateGame,
    };
})(); 

gameBoard.start(); 

const computerModule = (() => {

    // we want a copy of the cells grid to not change anything with the minimax calculations
    let copyCells = gameBoard.divsGrid.slice();

    // we get all the available plays
    let possiblePlays = 0;

    let boardArr = [['', '', ''],
                    ['', '', ''], 
                    ['', '', '']];

    // update board array works globally
    function updateBoardArr(){

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (gameBoard.divsGrid[i][j].classList.contains('x-cell')){
                    boardArr[i][j] = 'x';
                }
                if (gameBoard.divsGrid[i][j].classList.contains('o-cell')){
                    boardArr[i][j] = 'o'; 
                }
            }
        }
    };

    function minimax (board = boardArr, player = 'x') {
        updateBoardArr(); 
        console.log('minimaxing with board')
        console.table(board)
        console.log('player ', player)

        let full = true; 
        for (let i = 0; i < 3; i++) {
            console.log(board[i]);
            // console.log(board[i].some());
            if (board[i].some((elt) => elt === '')){
                full = false; 
            }
        }

        if (full){
            console.log('minimax terminated');
            return getValueOfBoard(board);
        }

        
        let availableIndexes = []; 
        let possibleValues = []; 
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (board[i][j] === ''){
                    // available spots 
                    availableIndexes.push([i, j]); 
                    // let boardCopy = board.slice(); 
                    // boardCopy[i][j] = player; //play on that spot
                    // if (player === 'x') player = 'o';
                    // else player = 'x'; // change players

                    // // and evaluate the new board 
                    // return minimax(boardCopy, player); 
                    // boardCopy[i][j] = '';
                }
            }
        }
        let allValues = [] ; 
        for (i = 0; i < availableIndexes.length; i++){
            let row = availableIndexes[i][0];
            let col = availableIndexes[i][1];
            board[row][col] = player; 
            if (player === 'x') player = 'o';
            else player = 'x'; // change players
            console.log('minimaxing with board:');
            console.table(board);
            allValues.push(minimax(board, player));

            board[row][col] = ''; 
        }


        // if (player === 'x') return Math.min(allValues); 
        // else return Math.max(allValues); 
        console.log('possible values for the plays: ', possibleValues);
    }

    function getValueOfBoard(board) {
        /*
        check rows, columns and diagonals for a winner
        will return 1 if computer wins, 0 for a draw and -1 for computer loses
        */
        
        // check rows 
        for (let row = 0; row < 3; row++){
            let currentRow = board[row];
            if (currentRow.every((elt) => elt === 'x')) return -1;
            if (currentRow.every((elt) => elt === 'o')) return 1;
        }

        // check cols 
        for (let col = 0; col < 3; col++){
            let currentCol = [];
            for (let row = 0; row < 3; row++){
                currentCol.push(board[row][col]);
            }
            if (currentCol.every((elt) => elt === 'x')) return -1;
            if (currentCol.every((elt) => elt === 'o')) return 1;
        }

        // check principal diag
        let principalDiag = [];
        for (let diag = 0; diag < 3; diag++){
            principalDiag.push(board[diag][diag]);
        }
        if (principalDiag.every((elt) => elt === 'x')) return -1; 
        if (principalDiag.every((elt) => elt === 'o')) return 1; 
    
        // check secondary diag
        let secondaryDiag = [];
        for (let row = 0; row < 3; row++){
            secondaryDiag.push(board[row][2 - row]);
        }

        if (secondaryDiag.every((elt) => elt === 'x')) return -1; 
        if (secondaryDiag.every((elt) => elt === 'o')) return 1; 

        return 0; 

    }
    // function getValue()

    function getAvailable(type = '') {
        if (type === 'copy'){
            let available = [];
            
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    if (!copyCells[i][j].classList.contains('active')){
                        available.push(copyCells[i][j]);
                    }
                }
            }

            return available; 

        }


        let available = [];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (!gameBoard.divsGrid[i][j].classList.contains('active')){
                    available.push(gameBoard.divsGrid[i][j]);
                }
            }
        }
        return available; 
    };

    function getRandom(array) {
        let len = array.length;
        let rn = Math.random();
        rn = Math.floor(rn * len);
        return array[rn];
    }

    function play() {
        let available = getAvailable();
        if (available.length === 0){
            gameFlow.updateGame('o');
            return; 
        }
        let randomCell = getRandom(available);
        gameFlow.markCell(randomCell, 'o');

    }

    return {
        updateBoardArr,
        boardArr,
        play,
        minimax, 
    };

})();







