import * as Model from './modules/model.mjs'
import * as Controller from './modules/controller.mjs'
import * as View from './modules/view.mjs'


function gameloop(){
  console.log("Hello World!")

  requestAnimationFrame(gameloop)
}


let rows = 20;
let cols = 20;

let isPlaying = false;

let grid = new Array(rows);
let nextGrid = new Array (rows);

function initialize(){
  createTable();
  setupButtonControls();
  initializeGrid();
  resetGrids();
}

function createTable(){
  let gridContainer = document.getElementById("gridContainer");
  let table = document.createElement("table");
  for (let row = 0; row<rows; row++){
    let tr = document.createElement("tr");
    for (let col=0; col<cols; col++){
      let cell = document.createElement("td");
      cell.setAttribute("id",row+"_"+col);
      cell.setAttribute("class","isDead");
      cell.onclick = cellClicked;
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

function initializeGrid(){
  for (let row=0; row<rows; row++){
    grid[row] = new Array(cols);
    nextGrid[row] = new Array(cols);
  }
}

function resetGrids(){
  for (let row=0;row<rows;row++){
    for (let col=0;col<cols;col++){
      grid[row][col] = 0;
      nextGrid[row][col] = 0;
    }
  }
}

function copyAndResetGrid(){
  for (let row=0;row<rows;row++){
    for (let col=0;col<cols;col++){
      grid[row][col] = nextGrid[row][col];
      nextGrid[row][col] = 0;
    }
  }
}

function computeNextGrid(){
  for (let row=0;row<rows;row++){
    for (let col=0;col<cols;col++){
      rules(row,col);
    }
  }
  copyAndResetGrid();
  updateView();
}

function rules(row,col){
  let numNeighbors = countNeighbors(row,col);
  if (grid[row][col]==1){
    if (numNeighbors<2){
      nextGrid[row][col]=0;
    } else if (numNeighbors==2 || numNeighbors==3){
        nextGrid[row][col]=1;
    } else if (numNeighbors>3){
      nextGrid[row][col]=0;
    }
  } else if (grid[row][col]==0){
    if (numNeighbors==3){
        nextGrid[row][col]=1;
    }
  }
}

function countNeighbors(row,col){
  let neighbors=0;

  if (row-1 >= 0 && col-1 >= 0){
    if (grid[row-1][col-1]==1){
      neighbors++;
    }
  }

  if (row-1 >= 0){
    if (grid[row-1][col]==1){
      neighbors++;
    }
  }

  if (row-1 >= 0 && col+1 <= cols){
    if (grid[row-1][col+1]==1){
      neighbors++;
    }
  }

  if (col+1 <= cols ){
    if (grid[row][col+1]==1){
      neighbors++;
    }
  }

  if (row+1 <= rows && col+1 <= cols){
    if (grid[row+1][col+1]==1){
      neighbors++;
    }
  }

  if (row+1 <= rows){
    if (grid[row+1][col]==1){
      neighbors++;
    }
  }

  if (row+1 <= rows && col-1 >= 0){
    if (grid[row+1][col-1]==1){
      neighbors++;
    }
  }

  if (col-1 >= 0){
    if (grid[row][col-1]==1){
      neighbors++;
    }
  }

  return neighbors;
}

function cellClicked(){
  let row = this.id.split("_")[0];
  let col = this.id.split("_")[1];

  let classes = this.getAttribute("class");
  console.info(classes);
  if (classes.indexOf("isAlive") > -1){
    this.setAttribute("class","isDead");
    grid[row][col]=0;
  } else {
      this.setAttribute("class","isAlive");
      grid[row][col]=1;
  }
}

function setupButtonControls(){
  let startButton = document.getElementById("start");
  startButton.onclick = startButtonHandler;

  let clearButton = document.getElementById("clear");
  clearButton.onclick = clearButtonHandler;
}

function startButtonHandler(){
  if (isPlaying){
    console.log("Pause");
    isPlaying=false;
    this.innerHTML = "Continue";
  } else {
    console.log("Continue");
    isPlaying=true;
    this.innerHTML="Pause";
    playGame();
  }
}

function clearButtonHandler(){
  console.log("Clear the game and clear the grid");
  isPlaying=false;
  let startButton = document.getElementById("start");
  startButton.innerHTML = "Start";
}

function playGame(){
  console.log("Play game");
  computeNextGrid();
}

function updateView(){
  for (let row=0;row<rows;row++){
    for (let col=0;col<cols;col++){
      let cell = document.getElementById(row+"_"+col);
      if (grid[row][col]==0){
        cell.setAttribute("class","isDead");
      } else {
          cell.setAttribute("class","isAlive");
      }
    }
  }
}

window.onload = initialize;

// Let's Go!
gameloop() {



}
