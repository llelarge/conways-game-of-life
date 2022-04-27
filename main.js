const nbrows = 40;  /*number of rows in the grid*/
const nbcols = 40;  /*number of cols in the grid*/

let currentGrid = [nbrows];     //creates an array of nbrows rows
let nextGrid = [nbrows];        //creates an array of nbrows rows

function createArrays(){
  for (let row=0;row<nbrows;row++){         //for each row in these arrays
    currentGrid[row] = newArray(nbcols);    //creates an array of nbcols columns (we have an array of array = 2D array)
    nextGrid[row] = newArray(nbcols);       //creates an array of nbcols columns
  }
}

function initializeArrays(){
  for (let row=0;row<nbrows;row++){     //for each row
    for (let col=0;col<nbcols;col++){   //for each column
      currentGrid[row][col]=0;          //all the cells are dead at the beginning
      nextGrid[row][col]=0;             //all the cells are dead at the beginning
    }
  }
}

function createGrid() {
    let grid = document.querySelector('#grid');       //points to the element '#grid' in css file (to display it on the html document)

    let table = document.createElement('table');      //creates a table in this grid
    table.setAttribute('id','grid');                  // sets the attribute 'id' with the value 'grid' to the element 'table'
    for (let row = 0; row < nbrows; row++) {          // for each row
        let tr = document.createElement('tr');        //creates the element 'tr'
        for (let col = 0; col < nbcols; col++) {      //for each column in each row (= for each cell)
            let cell = document.createElement('td');  //creates the element 'cell'
            cell.setAttribute('id',row+'_'+col);      //sets the attribute 'id' with the value 'row_col' to the element 'cell' => each cell will be refered as row_col, for example cell 1_2
            cell.setAttribute('class','dead');        //sets the attribute 'class' with value 'dead' to 'cell' -- all the cells are dead at the beginning//
            cell.addEventListener('click',clickOnCell); //when the user click on the cell, the function clickOnCell() is run
            tr.appendChild(cell);                       //I don't really understand this command but apperently we have to do it to attach the cell to the row
        }
        table.appendChild(tr);                          //I don't really understand this command but apperently we have to do it to attach the row to the table
    }
    grid.appendChild(table);                            //I don't really understand this command but apperently we have to do it to attach the table to the grid
}

function clickOnCell(){
  let row_col = this.id.split('_');     //creates a table with the row index as the first case and the column index as the second
  let row = row_col[0];                 // the row index is equal to the first case of the table 'row_col'
  let col = row_col[1];                 // the column index is equal to the second case of the table 'row_col'

  if (this.className=='dead'){          //this points to the current cell, if this cell is 'dead', that is to say 'black' in the css file
    this.setAttribute('class','alive'); //then this cell becomes 'alive', that is to say 'yellow' in the css file
// /!\ this is not the same thing as currentGrid and nextGrid, when we click on the cell, this command setAttribute just change the color of the cell
//and then we have to change the value or this cell is the currentGrid because our cell is no longer 'dead'
    currentGrid[row][col]=1;            //sets the cell as alive in the table currentGrid
  }else{                                //if the cell is alive
    this.setAttribute('class','dead');  //it becomes dead
    currentGrid[row][col]=0;            //and we have to sets the cell in the table currentGrid as dead also
  }
}

function countNeighborsAlive(row,col){
  let neighbors_alive=0;              //starting the counter at 0

  if (row-1 >= 0 && col-1 >= 0){          // if the cell has an upper-left-corner neighbor
    if (currentGrid[row-1][col-1]==1){    //if this neighbor is alive
      neighbors_alive++;                  //neighbors_alive = neighbors_alive+1
    }
  }

  if (row-1 >= 0){                        // if the cell has an upper neighbor
    if (currentGrid[row-1][col]==1){      //if this neighbor is alive
      neighbors_alive++;                   //neighbors_alive = neighbors_alive+1
    }
  }

  if (row-1 >= 0 && col+1 <= nbcols){     // if the cell has an upper-right-corner neighbor
    if (currentGrid[row-1][col+1]==1){    //if this neighbor is alive
      neighbors_alive++;                  //neighbors_alive = neighbors_alive+1
    }
  }

  if (col+1 <= nbcols ){                  // if the cell has an right neighbor
    if (currentGrid[row][col+1]==1){      //if this neighbor is alive
      neighbors_alive++;                  //neighbors_alive = neighbors_alive+1
    }
  }

  if (row+1 <= nbrows && col+1 <= nbcols){  // if the cell has an lower-right-corner neighbor
    if (currentGrid[row+1][col+1]==1){      //if this neighbor is alive
      neighbors_alive++;                    //neighbors_alive = neighbors_alive+1
    }
  }

  if (row+1 <= nbrows){                     // if the cell has an lower neighbor
    if (currentGrid[row+1][col]==1){        //if this neighbor is alive
      neighbors_alive++;                    //neighbors_alive = neighbors_alive+1
    }
  }

  if (row+1 <= nbrows && col-1 >= 0){       // if the cell has an lower-left-corner neighbor
    if (currentGrid[row+1][col-1]==1){      //if this neighbor is alive
      neighbors_alive++;                    //neighbors_alive = neighbors_alive+1
    }
  }

  if (col-1 >= 0){                          // if the cell has an left neighbor
    if (currentGrid[row][col-1]==1){        //if this neighbor is alive
      neighbors_alive++;                    //neighbors_alive = neighbors_alive+1
    }
  }

  return neighbors_alive;
}

function createNextGrid(){
  for (let row=0;row<nbrows;row++){     //for each row
    for (let col=0;col<ncols;col++){    // for each column in each row (=> for each cell)
      let neighbors_alive = countNeighborsAlive(row,col);  //count the number of neighbors alive
      if (currentGrid[row][col]==1) {                     // if this cell is alive
        if (neighbors_alive==2 || neighbors_alive==3) {   // and if the number of neighbors alive of this cell is 2 or 3
          nextGrid[row][col]=1;                           // this cell stays alive in the next grid
        }else{                                            // if the number of neighbors alive of this cell is lower than 2 or superior to 3
          nextGrid[row][col]=0;                           // this cell will be dead in the next grid
        }
      }else{                                              // if this cell is dead
        if (neighbors_alive==3){                          // if it has 3 neighbors alive
          nextGrid[row][col]=1;                           // it will become alive in the next grid
        }else{                                            // otherwise
          nextGrid[row][col]=0;                           // it will remains dead
        }
      }
    }
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
