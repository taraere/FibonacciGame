// Fibonacci game

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// visuals
var grid;
var cols;
var rows;

// number of pixels for each cell.
var squareSide = 30;

// gameboard 50 x 50 TODO Change back to fifty.
var boardSide = 5;
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
  var i = colIndex(mouseX);
  var j = rowIndex(mouseY);
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
        if (isFibonacci(aCell) != null) {
          var xn = isFibonacci(aCell);
          var previousValue = isFibonacci(aCell)[1];
          findSequence(aCell, xn);
        }
        // hardcoded for WIP
        if (aCell.number == 5) {
          findSequence(aCell, 5);
        }
      }
    }
  }
}

/* check for a sequence of five consecutive Fibonacci numbers */
function findSequence(aCell, pos) {
  // keep track of how often you loop. Limit to 5.
  var count = 0;
  var oldCount = -1;

  // list of cell indexes to store sequence
  var listCells = [aCell];

  // check nieghours a maximum of five times, sequence length is 5.
  while (count < 5) {
    if (oldCount == count) {
      break;
    }
    oldCount = count;

    // check neighbors.
    checkNeighbors(listCells, aCell, pos);

    count += 1;
    console.log("list cells:  " + listCells);

    if (listCells.length == 5) {
      // then set items in list to zero
      for (var p = 0; p < listCells.length; p++) {
        var item = listCells[p];
        item.flashcolor(255, 0, 0);
        item.number = 0;
        break;
      }
    }
  }
}

/* check the neighbors only */
function checkNeighbors(listCells, aCell, pos) {
  console.log("checkNeighbors");
  var k = aCell.i;
  var l = aCell.j;
  // check neighboring cells
  for (var m = -1; m <= 1; m ++) {
    var new_k =  k + m;
    for (var n = -1; n <= 1; n ++) {
      var new_l = l + n
      // check outside board or itself
      if (new_k < 0 || new_k >= rows || new_l < 0 || new_l >= cols) {
        continue;
      }
      // check if same cell
      if (n == 0 && m == 0) {
        continue;
      }
      // if neighbor equals next item in sequence
      var fibonacciL = fibonacciLower(aCell, pos)
      if (grid[k + m][l + n].number == fibonacciL) {
        // remember locations
        listCells.push(grid[new_k][new_l]);
        // anchor on that cell
        aCell = grid[new_k][new_l];
      }
    }
  }
  return listCells;
}

/* calculate the next, lower value in sequence of Fibonacci numbers */
function fibonacciLower(aCell, position) {
  var i = aCell.i;
  var j = aCell.j;
  var currentValue = aCell.number;
  // formula to find lower values
  var golden = 1.618034;
  Math.pow(
    (Math.pow(golden, position)
    - Math.pow((1 - golden), position)
     / currentValue), 2);
  // var nextValue = (Math.pow(golden, position)
  //                  - Math.pow((1 - golden), position))
  //                  / Math.pow(aCell.number, 1/2);
  if (prevValue < 1) {
    prevValue = -1;
  }
  console.log("FibLower previous value " + prevValue.toString());
  return floor(prevValue);
}

/* Start calculating the sequence. Each new value, check if it's */
function isFibonacci(aCell) {
  // lowest value sequence could start at is 5. [1, 1, 2, 3, 5]
  var seq = 2;
  // starting terms
  var seq1 = 1;
  var seq2 = 2;
  // position
  var pos = 3;
  while(seq < aCell.number) {
    seq = seq1 + seq2;
    pos += 1;
    if (seq == aCell.number) {
      var lowerValue = seq2;
      return [pos, lowerValue];
    } else {
      // update terms
      seq2 = seq;
      seq1 = seq2;
    }
  }
  return null;
}

/* adds one to a single cell */
function add(cell) {
  cell.flashcolor(255, 255, 0);
  cell.update();
}

/* crossAdd(i, j) function:
update all on (i , j + something) and (i + something, j) */
function crossAdd(cell) {
  var i = cell.i;
  var j = cell.j;
  cell.flashcolor(0, 255, 0);
  cell.update();

  // increase vertical values
  for (var k = 0; k < rows; k++) {
    if (k != j) {
      grid[i][k].flashcolor(0, 255, 0);
      grid[i][k].update();
    }
  }

  // increase horizontal values
  for (var k = 0; k < cols; k++) {
    if (k != i) {
      grid[k][j].flashcolor(0, 255, 0);
      grid[k][j].update();
    }
  }
}

/** find column index */
function colIndex(mouseX) {
  return floor(mouseX / squareSide);
}

/** find row index */
function rowIndex(mouseY) {
  return floor(mouseY / squareSide);
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
