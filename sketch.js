// Fibonacci Game

function make2DArray(rows, cols) {
  var arr = new Array(rows);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}
// visuals
var grid;
var cols;
var rows;

// number of pixels for each cell.
var squareSide = 30;

// gameboard 50 x 50. 
var boardSide = 50;
var sidePixels = squareSide * boardSide + 1;

function setup() {
  createCanvas(sidePixels, sidePixels);
  cols = boardSide;
  rows = boardSide;
  grid = make2DArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // initialize every position to become a fresh cell.
      grid[i][j] = new Cell(i, j,squareSide);
    }
  }
}

/* when cell clicked, updates values and checks for Fibonacci sequence */
function mousePressed() {
  var i = rowIndex(mouseX);
  var j = colIndex(mouseY);

  // exception of clicking outside grid.
  if (i < 0 || i >= rows || j < 0 || j >= cols) {
    return;
  }

  var cell = grid[i][j];

  // increase value of cell that's clicked on
  if (cell.number == 0) {
    add(cell);
  } else {
    crossAdd(cell);
  }

  // check every cell for possible sequences
  for (var k = 0; k < rows; k ++) {
    for (var l = 0; l < cols; l ++) {
      aCell = grid[k][l];
      if (aCell.number >= 5) {
        // check if it's a Fibonacci number
        var prevValue = isFibonacci(aCell)
        if (prevValue != null) {
          findSequence(aCell, prevValue);
        }
      }
    }
  }
}

/* check for a sequence of five consecutive Fibonacci numbers */
function findSequence(aCell, prevValue) {
  // keep track of how often you loop. Limit to 5.
  var count = 0;
  var oldCount = -1;

  // list of cell indexes to store sequence
  var listCells = [aCell];

  // check nieghours a maximum of five times, 
  // max 8 neighors for each of the 5 cells in the sequence.
  while (count < 8*5) {
    if (oldCount == count) {
      break;
    } else {
      oldCount = count;
      // check neighbors.
      var checked = checkNeighbors(listCells, aCell, prevValue, count);
      if (checked != null) {
        count = checked[0];
        aCell = checked[1];
        prevValue = checked[2];

        if (listCells.length >= 5) {
          console.log("list: " + listCells);
          console.log("length: " + listCells.length);
          
          // then set items in list to zero
          for (var p = 0; p < listCells.length; p++) {
            var item = listCells[p];
            // red
            item.flashcolor(227, 38, 54, 50);
            // item.flashcolor(255, 103, 0, 50);
            // item.flashcolor(254, 38, 54, 50);
            item.number = 0;
          }
          break;
        }
      }
    }
  }
}

/* check the neighbors only */
function checkNeighbors(listCells, aCell, prevValue, count) {
  var k = aCell.i;
  var l = aCell.j;

  // search neighboring cells
  for (var m = -1; m <= 1; m ++) {
    var new_k =  k + m;

    for (var n = -1; n <= 1; n ++) {
      var new_l = l + n

      // is outside board edges?
      if (new_k < 0 || new_k >= rows || new_l < 0 || new_l >= cols) {
        continue;
      }

      var nextCell = grid[new_k][new_l];

      // has cell been visited already?
      if (listCells.contains(nextCell)) {
        continue;
      }

      // if neighbor equals next item in sequence
      if (nextCell.number == prevValue) {
        // remember locations
        listCells.push(grid[new_k][new_l]);
        prevValue = fibonacciLower(aCell, prevValue);
        // anchor on that new cell
        aCell = nextCell;
        count += 1;
        // return new list, current cell, and value to search for
        return [count, aCell, prevValue];
      }
    }
  }
  return null;
}

/* calculate the next, lower value in sequence of Fibonacci numbers */
function fibonacciLower(aCell, prevValue) {
  var i = aCell.i;
  var j = aCell.j;
  var currentValue = aCell.number;
  // formula to find lower values
  var prevprevValue = currentValue - prevValue;
  return prevprevValue;
}

/* Start calculating the sequence. Each new value, check if it's */
function isFibonacci(aCell) {
  // lowest value sequence could start at is 5. [1, 1, 2, 3, 5]
  var seq = 2;
  // starting terms
  var seq1 = 1;
  var seq2 = 2;
  while(seq < aCell.number) {
    seq = seq1 + seq2;
    if (seq == aCell.number) {
      var lowerValue = seq2;
      return lowerValue;
    } else {
      // update terms
      seq1 = seq2;
      seq2 = seq;
    }
  }
  return null;
}

/* adds one to a single cell */
function add(cell) {
  cell.flashcolor(255, 255, 53, 500);
  cell.update();
}

/* crossAdd(i, j) function:
update all on (i , j + something) and (i + something, j) */
function crossAdd(cell) {
  var i = cell.i;
  var j = cell.j;
  // light green color
  cell.flashcolor(144, 238, 144, 5);
  cell.update();

  // increase vertical values
  for (var k = 0; k < rows; k++) {
    if (k != j) {
      grid[i][k].flashcolor(144, 238, 144, 10);
      grid[i][k].update();
    }
  }

  // increase horizontal values
  for (var k = 0; k < cols; k++) {
    if (k != i) {
      grid[k][j].flashcolor(144, 238, 144, 10);
      grid[k][j].update();
    }
  }
}

Array.prototype.contains = function(object) {
  for (var i = 0; i < this.length; i ++) {
    if (object == this[i]) {
      return true;
    }
  }
  return false;
}

/** find column index */
function colIndex(mouseY) {
  return floor(mouseY / squareSide);
}

/** find row index */
function rowIndex(mouseX) {
  return floor(mouseX / squareSide);
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
