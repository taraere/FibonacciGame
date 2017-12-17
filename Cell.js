/** Cell Object */

function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  // position (x,y) is index (i,j) * length of edge (w)
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.number = 0;

  this.red = 244;
  this.green = 244;
  this.blue = 244;
}

/** attach function to protoype. Each object has this method now. */
Cell.prototype.show = function() {
  stroke(255, 0, 0);
  noFill();
  // draw square
  rect(this.x, this.y, this.w, this.w);
  fill(this.red, this.green, this.blue);
  rect(this.x, this.y, this.w, this.w);
  if (this.number == 0) {
    textAlign(CENTER);
    fill(0);
    text(this.number, this.x + this.w * 0.5, this.y + this.w * 0.6);
  }
  if (this.number > 0) {
    textAlign(CENTER);
    fill(0, 100, 150);
    stroke(0, 100, 150);
    text(this.number, this.x + this.w * 0.5, this.y + this.w * 0.6);
  }
}
/** check if mouse clicked on cell, i.e. point is inside parameters */
Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.update = function(x, y) {
  return this.number += 1;
}

/* flash color of new cell */
Cell.prototype.flashcolor = function(r, g, b) {
  var savedRed    = this.red;
  var savedGreen  = this.green;
  var savedBlue   = this.blue;

  this.red    = r;
  this.green  = g;
  this.blue   = b;

  var cell = this;
  var animation = setTimeout(function () {
    cell.red    = 255;
    cell.green  = 255;
    cell.blue   = 255;
  }, 500);
}

/* toString function */
Cell.prototype.toString = function() {
  var str = "\n[(" + this.i + ", " + this.j + "), " + this.number + "]\n";
  return str;
}
