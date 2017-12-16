/** Cell Object */

function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  // position (x,y) is index (i,j) * length of edge (w)
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.number = 0;
}

/** attach function to protoype. Each object has this method now. */
Cell.prototype.show = function() {
  colour = 240;
  stroke(0);
  noFill();
  // draw square
  rect(this.x, this.y, this.w, this.w);
  fill(colour);
  rect(this.x, this.y, this.w, this.w);
  if (this.number >= 0) {
    textAlign(CENTER);
    fill(0);
    text(this.number, this.x + this.w * 0.5, this.y + this.w - 6);
  }
}
/** check if mouse clicked on cell, i.e. point is inside parameters */
Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.update = function(x, y) {
  // change color to yellow briefly
  return this.number += 1;
  noFill();
  fill(255,255,0);
}
