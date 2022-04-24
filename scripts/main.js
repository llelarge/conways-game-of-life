import * as Model from './modules/model.mjs'
import * as Controller from './modules/controller.mjs'
import * as View from './modules/view.mjs'


/*
function gameloop(){
  console.log("Hello World!")

  requestAnimationFrame(gameloop)

  const container = conways-game-of-life.getElementById("container");
  let rows = conways-game-of-life.getElementByClassName("gridRow")
  let cells = conways-game-of-life.getElementByClassName("cell");

  function defaultGrid() {
    makeRows(20);
    makeColumns(20);
  }

  function makeRows(rowNum) {

    for (r=0;r<rowNum;r++) {
      let row=conways-game-of-life.createElement("div");
      container.appendChild(row).className = "gridRow";
    };
  };

  function makeColumns(cellNum) {

    for (i=0;i<rows.length;i++) {
      for (j=0;j<cellNum;j++) {
        let newCell=conways-game-of-life.createElement("div");
        rows[j].appendChild(newCell).className = "cell";
      };
    };
  };
*/
/*  cell.innerHTML = "TEXT";
  container.appendChild(cell);
*/
/*
}
// let's Go!
gameloop()
*/
function gameloop(){
  console.log("Hello World!")

  requestAnimationFrame(gameloop)

  let rows = 50;
  let cols = 66;

  let isPlaying = false;

  let grid = new Array(rows);
  let nextGrid = new Array (rows);

  let timer;
  let timerInterval = 100;


  function initialize(){
    createTable();
    setupButtonControls();
    initializeGrid();
    resetGrids();
  }

  function createTable(){
    const grid = conways-game-of-life.getElementById("grid");

    if (!gridContainer){
      console.error("Error : no gridContainer found");
    }

    const table = conways-game-of-life.createElement("table");

    for (let row = 0; row<rows; row++){
      const tr = conways-game-of-life.createElement("tr");
      for (let col=0; col<cols; col++){
        const cell = conways-game-of-life.createElement("td");
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
    const startButton = conways-game-of-life.getElementById("start");
    startButton.onclick = startButtonHandler;

    const clearButton = conways-game-of-life.getElementById("clear");
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
    const startButton = conways-game-of-life.getElementById("start");
    startButton.innerHTML = "Start";

    clearTimeout(timer);

    const liveCellList = conways-game-of-life.getElementByClassName("isAlive");
    let cells = [];
    for (let i=0;i<liveCellList.length;i++){
      cells.push(liveCellList[i]);
    }
    for (let i=0;i<cells.length;i++){
      cells[i].setAttribute("class","isDead");
    }
    resetGrids();
  }

  function playGame(){
    console.log("Play game");
    computeNextGrid();

    if (isPlaying){
      timer = setTimeout(playGame,timerInterval);
    }
  }

  function updateView(){
    for (let row=0;row<rows;row++){
      for (let col=0;col<cols;col++){
        const cell = conways-game-of-life.getElementById(row+"_"+col);
        if (grid[row][col]==0){
          cell.setAttribute("class","isDead");
        } else {
            cell.setAttribute("class","isAlive");
        }
      }
    }
  }

  window.onload = initialize;

}

// let's Go!
gameloop()
