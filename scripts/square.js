function drawSquare(data, gl, color) {
  // generate square's points

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...data.coordinates]), gl.STATIC_DRAW);

  // draw square on canvas
  var primitiveType = gl.TRIANGLE_STRIP;
  var offset = 0;
  var count = 4;
  gl.drawArrays(primitiveType, offset, count);

  let coord = data.coordinates;

  for (let i = 0; i < 8; i += 2) {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      coord[i] - 10, coord[i + 1] - 10,
      coord[i] - 10, coord[i + 1] + 10,
      coord[i] + 10, coord[i + 1] - 10,
      coord[i] + 10, coord[i + 1] + 10,
    ]), gl.STATIC_DRAW);

    gl.uniform4f(color, 0, 0, 0, 0.5);

    gl.drawArrays(primitiveType, offset, count);
  }

}