function drawSquare(data, gl, color) {
  // generate square's points

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...data.coordinates]), gl.STATIC_DRAW);

  // draw square on canvas
  var primitiveType = gl.TRIANGLE_STRIP;
  var offset = 0;
  var count = 4;
  gl.drawArrays(primitiveType, offset, count);

  let coord = data.coordinates;

  drawPoints(coord, gl, color);

}

