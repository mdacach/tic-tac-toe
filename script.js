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

console.table(cellsGrid);
console.log(cellsGrid[0][0]);
console.log(cellsGrid[0][1]);

const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener('contextmenu', function(e) {
        if (!e.target.classList.contains('active')){
            e.preventDefault();
            e.target.classList.add('o-cell');
            e.target.classList.add('active');
        }
        else e.preventDefault();
    });
    cells[i].addEventListener('click', function(e) {
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('x-cell');
            e.target.classList.add('active');
        }
        else e.preventDefault();
    });
}

cellsArr = Array.from(cells);

function checkCells () {
    console.clear();
    for (let i = 0; i < cellsArr.length; i++){
        console.log(cellsArr[i].classList);
        console.log(getRow(cellsArr[i]), 
                getCol(cellsArr[i]));

    }
    function isActive (cell) {
        return cell.classList.contains('active');
    }

}

function checkGame () {
    console.clear();
    let xCells = getX(cellsArr);
    let oCells = getO(cellsArr);
    console.log('x: ', xCells);
    xCells.forEach((cell) => console.log(`${getRow(cell)}, ${getCol(cell)}`));
    console.log('o: ', oCells);
    oCells.forEach((cell) => console.log(`${getRow(cell)}, ${getCol(cell)}`));
    console.log(cellsArr.slice(0, 3));
    checkRows();
}

function checkRows () {
    // checking the rows of grid
    for (let row = 0; row < 3; row++){
        let currentRow = cellsGrid[row];
        // console.log('checking row ', row);
        // console.log('checking x: ');
        console.log(currentRow.every((cell) => cell.classList.contains('x-cell')));
        // console.log('checking o: ');
        console.log(currentRow.every((cell) => cell.classList.contains('o-cell')));
    }

    // checking the columns of grid
    for (let col = 0; col < 3; col++){
        let currentColumn = [];
        for (let row = 0; row < 3; row++){
            currentColumn.push(cellsGrid[row][col]);
        }
        // console.log('checking col ', col);
        console.log(currentColumn.every((cell) => cell.classList.contains('x-cell')));
        console.log(currentColumn.every((cell) => cell.classList.contains('o-cell')));
    }

    // checking the principal diagonal
    let principalDiag = []; 
    for (let diag = 0; diag < 3; diag++){
        principalDiag.push(cellsGrid[diag][diag]);
    }
    console.log(principalDiag.every((cell) => cell.classList.contains('x-cell')));
    console.log(principalDiag.every((cell) => cell.classList.contains('o-cell')));

    let secondaryDiag = [];
    for (let row = 0; row < 3; row++){
        secondaryDiag.push(cellsGrid[row][2 - row]);
    }
    console.log(secondaryDiag.every((cell) => cell.classList.contains('x-cell')));
    console.log(secondaryDiag.every((cell) => cell.classList.contains('o-cell')));
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



checkButton = document.getElementById('check');
checkButton.addEventListener('click', checkGame);