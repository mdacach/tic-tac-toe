const container = document.querySelector('.container');

let cellsGrid = [];
for (let row = 0; row < 3; row++){
    let elts = [];
    for (let col = 0; col < 3; col++){
        const div = document.createElement('div');
        div.classList.add('cell');
        div.setAttribute('row', row);
        div.setAttribute('col', col);
        container.appendChild(div);
        // console.log(container);
        elts.push(div);
    }
    cellsGrid.push(elts);
}

const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener('contextmenu', function(e) {
        if (!e.target.classList.contains('active')){
            e.preventDefault();
            e.target.classList.add('o-cell');
            e.target.classList.add('active');
            update();
        }
        else e.preventDefault();
    });
    cells[i].addEventListener('click', function(e) {
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('x-cell');
            e.target.classList.add('active');
            update();
        }
        else e.preventDefault();
    });
}

cellsArr = Array.from(cells);

function update() {
    if (checkGame()) {
        console.log('we have a winner', checkGame());
    }
    else {
        if (checkDraw ()) {
            console.log('it is a draw!');
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

    // checkDraw();

}

function getX () {
    return cellsArr.filter((cell) => cell.classList.contains('x-cell'));
}

function getO () {
    return cellsArr.filter((cell) => cell.classList.contains('o-cell'));
}

function getRow (cell) {
    return cell.getAttribute('row');
}

function getCol (cell) {
    return cell.getAttribute('col');
}

setInterval(checkGame, 1000);

checkButton = document.getElementById('check');
checkButton.addEventListener('click', checkGame);