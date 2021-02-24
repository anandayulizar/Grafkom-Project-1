function drawPolygon(data, gl, color) {

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...data.coordinates]), gl.STATIC_DRAW);

  // draw polygon on canvas
  var primitiveType = gl.TRIANGLE_FAN;
  var offset = 0;
  var count = data.side;
  gl.drawArrays(primitiveType, offset, count);
  drawPoints(data.coordinates, gl, color);
}

function rad(degree) {
  return degree * (Math.PI / 180);
}