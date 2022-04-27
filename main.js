const nbrows = 40;
const nbcols = 40;
function createGrid() {
    let grid = document.querySelector('#grid');

    let table = document.createElement('table');
    table.setAttribute('id','grid');
    for (let row = 0; row < nbrows; row++) {
        let tr = document.createElement('tr');
        for (let col = 0; col < nbcols; col++) {
            let cell = document.createElement('td');

            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    grid.appendChild(table);
}
window.onload=()=>{
    createGrid();
}

/*

function play(){

}

function pause(){

}

function reset(){

}

/*window.onload = initialize;*/
/*
// let's Go!
gameloop()
*/
