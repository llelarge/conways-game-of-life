const nbrows = 40;  /*number of rows in the grid*/
const nbcols = 40;  /*number of cols in the grid*/

let currentGrid = [nbrows];
let nextGrid = [nbrows];

function createArrays(){
  for (let row=0;row<nbrows;row++){
    currentGrid[row] = newArray(nbcols);
    nextGrid[row] = newArray(nbcols);
  }
}

function initializeArrays(){
  for (let row=0;row<nbrows;row++){
    for (let col=0;col<nbcols;col++){
      currentGrid[row][col]=0;
      nextGrid[row][col]=0;
    }
  }
}

function createGrid() {
    let grid = document.querySelector('#grid');

    let table = document.createElement('table');
    table.setAttribute('id','grid');
    for (let row = 0; row < nbrows; row++) {
        let tr = document.createElement('tr');
        for (let col = 0; col < nbcols; col++) {
            let cell = document.createElement('td');
            cell.setAttribute('id',row+'_'+col);
            cell.setAttribute('class','dead');  /*all the cells are dead at the beginning*/
            cell.addEventListener('click',clickOnCell);
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    grid.appendChild(table);
}

function clickOnCell(){
  let row_col = this.id.split('_');
  let row = row_col[0];
  let col = row_col[1];

  if (this.className=='dead'){
    this.setAttribute('class','alive');
    currentGrid[row][col]=1;
  }else{
    this.setAttribute('class','dead');
    currentGrid[row][col]=0;
  }
}

window.onload=()=>{
    createGrid();
    createArrays();
    initializeArrays();
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
