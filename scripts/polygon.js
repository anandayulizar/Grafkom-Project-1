function drawPolygon(x, y, length, side, gl) {
  let side = 7;
  let tetha = 360/side;
  
  let pos;
  
  // generate poly's points
  if(side == 5){
    let x1 = length * Math.sin(rad(tetha));
    let y1 = length * Math.sin(rad(90-tetha));

    let x2 = length * Math.sin(rad(tetha/2));
    let y2 = length * Math.sin(rad(90-(tetha/2)));

    pos = new Float32Array([
      x, y + length,
      x, y,
      x + x1, y + y1,
      x + x1, y + y1,
      x, y,
      x + x2, y - y2,
      x + x2, y - y2,
      x, y,
      x - x2, y - y2,
      x - x2, y - y2,
      x, y,
      x - x1, y + y1,
      x - x1, y + y1,
      x, y,
      x, y + length,
    ]);

  }else if(side == 6){
    let xvar = length * (Math.sin(rad(tetha)) * Math.sin(rad(90-(1/2)*tetha)))/Math.sin(rad((180-tetha)/2));
    let yvar = length - (xvar*((Math.sin(rad(tetha/2)))/Math.sin(rad(90-(tetha/2)))));
    console.log(xvar);
    console.log(length * 1/2 * Math.sqrt(3));
    console.log(yvar);
    console.log(length - length * 1/2);

    pos = new Float32Array([
      x, y + length,
      x, y,
      x + xvar, y + yvar,
      x + xvar, y + yvar,
      x, y,
      x + xvar, y - yvar,
      x + xvar, y - yvar,
      x, y,
      x, y - length,
      x, y - length,
      x, y,
      x - xvar, y - yvar,
      x - xvar, y - yvar,
      x, y,
      x - xvar, y + yvar,
      x - xvar, y + yvar,
      x, y,
      x, y + length,

    ]);
    
  }else if(side == 7){
    let x1 = length * Math.sin(rad(tetha));
    let y1 = length * Math.sin(rad(90-tetha));

    let x2 = length * Math.sin(rad(3/2*tetha));
    let y2 = length * Math.sin(rad(90-(3/2*tetha)));

    let x3 = length * Math.sin(rad(tetha/2));
    let y3 = length * Math.sin(rad(90-(tetha/2)));

    pos = new Float32Array([
      x, y + length,
      x, y,
      x + x1, y + y1,
      x + x1, y + y1,
      x, y, 
      x + x2, y - y2,
      x + x2, y - y2,
      x, y,
      x + x3, y - y3,
      x + x3, y - y3,
      x, y,
      x - x3, y - y3,
      x - x3, y - y3,
      x, y,
      x - x2, y - y2,
      x - x2, y - y2,
      x, y,
      x - x1, y + y1,
      x - x1, y + y1, 
      x, y,
      x, y +length,
    ]);

  }else if(side==8){
    
    let xvar = length * (Math.sin(rad(tetha)) * Math.sin(rad(90-(1/2)*tetha)))/Math.sin(rad((180-tetha)/2));
    let yvar = length - (xvar*((Math.sin(rad(tetha/2)))/Math.sin(rad(90-(tetha/2)))));
    console.log(yvar);
    pos = new Float32Array([
      x, y + length,
      x, y,
      x + xvar, y + yvar,
      x + xvar, y + yvar,
      x, y,
      x + length, y,
      x + length, y,
      x, y,
      x + xvar, y - yvar,
      x + xvar, y - yvar,
      x, y,
      x, y - length,
      x, y - length,
      x, y,
      x - xvar, y - yvar,
      x - xvar, y - yvar,
      x, y,
      x - length, y,
      x - length, y,
      x, y,
      x - xvar, y + yvar,
      x - xvar, y + yvar,
      x, y,
      x, y + length,
    ]);

  }

  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

  // draw polygon on canvas
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = side*3;
  gl.drawArrays(primitiveType, offset, count);
}

function rad(degree) {
  return degree * (Math.PI / 180);
}