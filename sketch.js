// Fibonacci game

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
// number of pixels for each cell.
var w = 20;

function setup() {
  // gameboard
  createCanvas(1001, 1001);
  // floor for rounding to integers
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // initialize every position to become a new cell
      grid[i][j] = new Cell(i, j, w);
    }
  }

}

// when click on cell
function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        // increase value of cell that's clicked on
        if (grid[i][j].number == 0) {
          // grid[i][j].flashcolor();
          grid[i][j].update();
        } else {
          grid[i][j].update();
          // TODO
          /* crossAdd() function: update all on (i , j + something) and
           (i + something, j) */
        }

        if (grid[i][j].number >= 5) {
          // keep track of how often you loop, only limited amount of time
          count = 1
          // list of cell indexes to store sequence
          listCells = [grid[i][j]];
          // TODO
          /* check for Fibonacci sequence */
          // checkSequence(grid[i][j]);
        }
      }
    }
  }
}

// function checkSequence() {
//   while (count <= 5) {
//     // if a neighbor is the next value in a Fibonacci sequence, higher and/or lower
//     // go only one direction for now, let's say down.
//     // otherwise i can get into an infinite loop, so I need to remember the sequence.
//     if (searchNeighbors()) {
//       listCells.add(grid[][])
//     }
//   }
// }
// TODO
/* check the neighbors only */
// function searchNeighbors() {
//   for neighbors
//     for ...
//       if neighbor == goldenValueLower():
//         listCells.add(neighbor);
//         count += 1;
//         if (count == 5) {
//           for elements in listCells
//             elements = zero
//             briefly turn cells green
//         } else {
//           searchNeighbors()
//         }
//        else {
//          nothing
//        }
// }
// TODO
/* calculate the next Lower Fibonacci number using the golden ratio */
// function goldenValueLower() {
//
// }

function draw() {
  background(255);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].show();
      }
    }
  }
