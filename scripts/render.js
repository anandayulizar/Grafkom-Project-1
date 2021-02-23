function drawScene(gl, program, inputData) {
  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);
  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // look up uniform locations
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);

  inputData.forEach(data => {
    //Change color
    var fColorLocation = gl.getUniformLocation(program, "fColor");

    // at render time
    gl.uniform4f(fColorLocation, data.color.r, data.color.g, data.color.b, 1);
    // if (data.shape == 'square') {
    //   console.log('Is a square');
    // } else {
    //   console.log('Is not a square')
    // }

    if (data.shape == 'line') {
      drawLine(data, gl, fColorLocation);
    } else {
      drawSquare(data, gl, fColorLocation);
    }

  })
}