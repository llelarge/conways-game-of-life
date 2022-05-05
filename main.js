//import java.util.Random;

const nbrows = 50;  /*number of rows in the grid*/
const nbcols = 50;  /*number of cols in the grid*/

//const height = document.getElementById('canvas').nbrows;
//const width = document.getElementById('canvas').nbcols;

let currentGrid = [nbrows];     //creates an array of nbrows rows
let nextGrid = [nbrows];        //creates an array of nbrows rows

let playing = false;
let timer;
let ageOfPop = 0;

function createArrays(){
  for (let row=0;row<nbrows;row++){         //for each row in these arrays
    currentGrid[row] = new Array(nbcols);    //creates an array of nbcols columns (we have an array of array = 2D array)
    nextGrid[row] = new Array(nbcols);       //creates an array of nbcols columns
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

function model1(){
  let nbrows_;
  if (nbrows % 2 ==0){
    nbrows_ = nbrows;
  }else{
    nbrows_ = nbrows-1;
  }
  let nbcols_;
  if (nbcols % 2 ==0){
    nbcols_ = nbcols;
  }else{
    nbcols_ = nbcols-1;
  }
  for (let row=0;row<(nbrows_/2)-1;row++){
    for (let col=0;col<nbcols;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=0;
      cell.setAttribute('class','dead');
    }
  }
  for (let row=(nbrows_/2)-1;row<nbrows_/2+1;row++){
    for (let col=0;col<(nbcols_/2)-1;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=0;
      cell.setAttribute('class','dead');
    }
  }
  for (let row=(nbrows_/2)-1;row<nbrows_/2+1;row++){
    for (let col=(nbcols_/2)-1;col<nbcols_/2+1;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=1;
      cell.setAttribute('class','alive');
    }
  }
  for (let row=(nbrows_/2)-1;row<nbrows_/2+1;row++){
    for (let col=nbcols_/2+1;col<nbcols;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=0;
      cell.setAttribute('class','dead');
    }
  }
  for (let row=(nbrows_/2)+1;row<nbrows;row++){
    for (let col=0;col<nbcols;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=0;
      cell.setAttribute('class','dead');
    }
  }
  ageOfPop=0;
}

function model2(){
  let nbrows_;
  if (nbrows % 2 ==0){
    nbrows_ = nbrows;
  }else{
    nbrows_ = nbrows-1;
  }
  let nbcols_;
  if (nbcols % 2 ==0){
    nbcols_ = nbcols;
  }else{
    nbcols_ = nbcols-1;
  }
  for (let row=0;row<(nbrows_/2);row++){
    for (let col=0;col<nbcols;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=0;
      cell.setAttribute('class','dead');
    }
  }
  for (let col=0;col<(nbcols_/2)-2;col++){
    let cell = document.getElementById(nbrows_/2+'_'+col);
    currentGrid[nbrows_/2][col]=0;
    cell.setAttribute('class','dead');
  }
  for (let col=(nbcols_/2)-2;col<nbcols_/2+1;col++){
    let cell = document.getElementById(nbrows_/2+'_'+col);
    currentGrid[nbrows_/2][col]=1;
    cell.setAttribute('class','alive');
  }
  for (let col=nbcols_/2+1;col<nbcols;col++){
    let cell = document.getElementById(nbrows_/2+'_'+col);
    currentGrid[nbrows_/2][col]=0;
    cell.setAttribute('class','dead');
  }
  for (let row=(nbrows_/2)+1;row<nbrows;row++){
    for (let col=0;col<nbcols;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=0;
      cell.setAttribute('class','dead');
    }
  }
  ageOfPop=0;
}

function model3(){
  let nbrows_;
  if (nbrows % 2 ==0){
    nbrows_ = nbrows;
  }else{
    nbrows_ = nbrows-1;
  }
  let nbcols_;
  if (nbcols % 2 ==0){
    nbcols_ = nbcols;
  }else{
    nbcols_ = nbcols-1;
  }
  for (let row=0;row<(nbrows_/2);row++){
    for (let col=0;col<nbcols;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=0;
      cell.setAttribute('class','dead');
    }
  }
  for (let col=0;col<(nbcols_/2)-1;col++){
    let cell = document.getElementById(nbrows_/2+'_'+col);
    currentGrid[nbrows_/2][col]=0;
    cell.setAttribute('class','dead');
  }
  for (let col=(nbcols_/2)-1;col<nbcols_/2+2;col++){
    let cell = document.getElementById(nbrows_/2+'_'+col);
    currentGrid[nbrows_/2][col]=1;
    cell.setAttribute('class','alive');
  }
  for (let col=nbcols_/2+2;col<nbcols;col++){
    let cell = document.getElementById(nbrows_/2+'_'+col);
    currentGrid[nbrows_/2][col]=0;
    cell.setAttribute('class','dead');
  }
  for (let col=0;col<nbcols_/2;col++){
    let cell = document.getElementById(nbrows_/2+1+'_'+col);
    currentGrid[nbrows_/2+1][col]=0;
    cell.setAttribute('class','dead');
  }
  let cell = document.getElementById(nbrows_/2+1+'_'+nbcols_/2);
  currentGrid[nbrows_/2+1][nbcols_/2]=1;
  cell.setAttribute('class','alive');
  for (let col=nbcols_/2+1;col<nbcols;col++){
    let cell = document.getElementById(nbrows_/2+1+'_'+col);
    currentGrid[nbrows_/2+1][col]=0;
    cell.setAttribute('class','dead');
  }
  for (let row=(nbrows_/2)+2;row<nbrows;row++){
    for (let col=0;col<nbcols;col++){
      let cell = document.getElementById(row+'_'+col);
      currentGrid[row][col]=0;
      cell.setAttribute('class','dead');
    }
  }
  ageOfPop=0;
}

function random(){
  for (let row=0;row<nbrows;row++){
    for (let col=0;col<nbcols;col++){
      let cell = document.getElementById(row+'_'+col);
      //let tmp = Random.nextInt(2);
      let tmp = Math.floor(Math.random()*2);
      currentGrid[row][col]=tmp;
      if (currentGrid[row][col]==1){
        cell.setAttribute('class','alive');
      }else{
        cell.setAttribute('class','dead');
      }
    }
  }
  ageOfPop=0;
}

function createGrid() {
    let grid = document.querySelector('#grid');       //points to the element '#grid' in css file (to display it on the html document)
    //const canvas = document.getElementById('canvas');  //points to the element 'canvas' in html file
    //const ctx = canvas.getContext('2d');

    let table = document.createElement('table');      //creates a table in this grid
    table.setAttribute('id','gridd');                  // sets the attribute 'id' with the value 'grid' to the element 'table'
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
  ageOfPop = 0;
  document.getElementById("ageofpop").innerHTML = ageOfPop;
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
  let neighbors_alive=0;

  if (row-1<0){
    if (col-1<0){
      if (currentGrid[row][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col]==1){
        neighbors_alive++;
      }
    }else if (col+1>=nbcols){
      if (currentGrid[row][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col]==1){
        neighbors_alive++;
      }
    }else{
      if (currentGrid[row][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row][col+1]==1){
        neighbors_alive++;
      }
    }
  }else if (row+1>=nbrows){
    if (col-1<0){
      if (currentGrid[row][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col]==1){
        neighbors_alive++;
      }
    }else if (col+1>=nbcols){
      if (currentGrid[row][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col]==1){
        neighbors_alive++;
      }
    }else{
      if (currentGrid[row][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row][col+1]==1){
        neighbors_alive++;
      }
    }
  }else{
    if (col-1<0){
      if (currentGrid[row-1][col]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col]==1){
        neighbors_alive++;
      }
    }else if (col+1>=nbcols){
      if (currentGrid[row-1][col]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col]==1){
        neighbors_alive++;
      }
    }else{
      if (currentGrid[row-1][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col]==1){
        neighbors_alive++;
      }
      if (currentGrid[row-1][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col+1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col]==1){
        neighbors_alive++;
      }
      if (currentGrid[row+1][col-1]==1){
        neighbors_alive++;
      }
      if (currentGrid[row][col-1]==1){
        neighbors_alive++;
      }
    }
  }
  return neighbors_alive;
}

function createNextGrid(){
  for (let row=0;row<nbrows;row++){     //for each row
    for (let col=0;col<nbcols;col++){    // for each column in each row (=> for each cell)
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
          nextGrid[row][col]=0;                           // it will remain dead
        }
      }
    }
  }
}

function setupNextGrid(){
  for (let row=0;row<nbrows;row++){
    for (let col=0;col<nbcols;col++){
      currentGrid[row][col]=nextGrid[row][col];          //nextGrid becomes the currentGrid
      nextGrid[row][col]=0;                              //reset nextGrid with only dead cells
      let cell = document.getElementById(row+'_'+col);
      if (currentGrid[row][col]==0){
        cell.setAttribute('class','dead');
      }else{
        cell.setAttribute('class','alive');
      }
    }
  }
}

function play(){        //When the user press the 'play' button
  createNextGrid();
  setupNextGrid();
  if (playing){
    timer = setTimeout(play,1000);
    ageOfPop++;
    document.getElementById("ageofpop").innerHTML = ageOfPop;
  }
}

function startStop(){
  let startstop = document.querySelector('#startstop');
  if (!playing){
    playing=true;
    startstop.value='Stop';
    play();
  }else{
    playing=false;
    startstop.value='Start';
    clearTimeout(timer);
  }
}

function playSingleEvolution(){
  let playsingleevolution = document.querySelector('#playsingleevolution');
  createNextGrid();
  setupNextGrid();
  ageOfPop++;
  document.getElementById("ageofpop").innerHTML = ageOfPop;
}

function reset(){
  location.reload();
}

const zoomElement = document.querySelector(".zoom");
let zoom = 1;
const ZOOM_SPEED = 0.1;

document.addEventListener("wheel", function(e) {

    if(e.deltaY > 0){
        zoomElement.style.transform = `scale(${zoom += ZOOM_SPEED})`;
    }else{
        zoomElement.style.transform = `scale(${zoom -= ZOOM_SPEED})`;  }

});



window.onload=()=>{
    createGrid();
    createArrays();
    initializeArrays();
}
