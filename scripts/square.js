function drawSquare(x, y, length, gl) {
  // generate square's points
  let t1 = [x, y];
  let t2 = [x, y + length];
  let t3 = [x + length, y];
  let t4 = [x + length, y + length];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    ...t1,
    ...t2,
    ...t3,
    ...t3,
    ...t2,
    ...t4,
  ]), gl.STATIC_DRAW);

  // draw square on canvas
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}