const container = document.querySelector('.container');


for (let row = 1; row <= 3; row++){
    for (let col = 1; col <= 3; col++){
        const div = document.createElement('div');
        div.classList.add('cell');
        div.innerHTML = row + ' ' + col; 
        container.appendChild(div);
        console.log(container)
    }
}

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