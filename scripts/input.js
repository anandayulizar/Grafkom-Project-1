const addButton = document.getElementById('add-button');
const formsContainer = document.querySelector('.form-container');
const showInputContainer = document.querySelector('.show-input-container');
const newForm = document.querySelector('.new-form');
const updateForm = document.querySelector('.update-form');


// let inputData = [{
//   x: 100,
//   y: 100,
//   id: 0,
//   color: {
//     r: 0,
//     g: 0,
//     b: 0
//   },
//   shape: 'square',
//   length: 100,
//   coordinates: [
//     100, 100,
//     200, 100,
//     100, 200,
//     200, 200
//   ]
// }];

let inputData = [];

newForm.addEventListener("submit", e => onSubmit(e));
updateForm.addEventListener("submit", e => onUpdate(e));


const onSubmit = e => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let itemObj = {};
  for (let pair of formData.entries()) {
    if (pair[0] != 'shape' && pair[0] !== 'color') {
      itemObj[pair[0]] = parseInt(pair[1]);
    } else {
      itemObj[pair[0]] = pair[1];
    }

  }

  itemObj["coordinates"] = getObjCoordinates(itemObj);
  itemObj["id"] = inputData.length;

  inputData.push(itemObj);
  main(inputData);
}

const onUpdate = e => {
  e.preventDefault();
  if (globalState.pickedIdx < 0) {
    return;
  }
  let itemObj = {};
  itemObj["color"] = hexToRgb(document.updateForm.color.value);

  inputData[globalState.pickedIdx].color = { ...itemObj.color }
  main(inputData);
}

const getObjCoordinates = (data) => {

  let coordinates = [];
  if (data.shape == 'square') {
    coordinates.push(data.x - (data.length / 2), data.y - (data.length / 2));
    coordinates.push(data.x + (data.length / 2), data.y - (data.length / 2));
    coordinates.push(data.x - (data.length / 2), data.y + (data.length / 2));
    coordinates.push(data.x + (data.length / 2), data.y + (data.length / 2));
  } else if (data.shape == 'line') {
    coordinates.push(data.x, data.y);
    coordinates.push(data.x + data.length, data.y);
  } else if (data.side) {
    let tetha = 360 / data.side;
    if (data.side == 5) {
      let x1 = data.length * Math.sin(rad(tetha));
      let y1 = data.length * Math.sin(rad(90 - tetha));

      let x2 = data.length * Math.sin(rad(tetha / 2));
      let y2 = data.length * Math.sin(rad(90 - (tetha / 2)));

      coordinates = [
        data.x, data.y + data.length,
        data.x + x1, data.y + y1,
        data.x + x1, data.y + y1,
        data.x + x2, data.y - y2,
        data.x + x2, data.y - y2,
        data.x - x2, data.y - y2,
        data.x - x2, data.y - y2,
        data.x - x1, data.y + y1,
        data.x - x1, data.y + y1,
        data.x, data.y + data.length,
      ];
    } else if (data.side == 6) {
      let xvar = data.length * (Math.sin(rad(tetha)) * Math.sin(rad(90 - (1 / 2) * tetha))) / Math.sin(rad((180 - tetha) / 2));
      let yvar = data.length - (xvar * ((Math.sin(rad(tetha / 2))) / Math.sin(rad(90 - (tetha / 2)))));
      // console.log(xvar);
      // console.log(data.length * 1 / 2 * Math.sqrt(3));
      // console.log(yvar);
      // console.log(data.length - data.length * 1 / 2);

      coordinates = [
        data.x, data.y + data.length,
        data.x + xvar, data.y + yvar,
        data.x + xvar, data.y + yvar,
        data.x + xvar, data.y - yvar,
        data.x + xvar, data.y - yvar,
        data.x, data.y - data.length,
        data.x, data.y - data.length,
        data.x - xvar, data.y - yvar,
        data.x - xvar, data.y - yvar,
        data.x - xvar, data.y + yvar,
        data.x - xvar, data.y + yvar,
        data.x, data.y + data.length,

      ];
    } else if (data.side == 7) {
      let x1 = data.length * Math.sin(rad(tetha));
      let y1 = data.length * Math.sin(rad(90 - tetha));

      let x2 = data.length * Math.sin(rad(3 / 2 * tetha));
      let y2 = data.length * Math.sin(rad(90 - (3 / 2 * tetha)));

      let x3 = data.length * Math.sin(rad(tetha / 2));
      let y3 = data.length * Math.sin(rad(90 - (tetha / 2)));

      coordinates = [
        data.x, data.y + data.length,
        data.x + x1, data.y + y1,
        data.x + x1, data.y + y1,
        data.x + x2, data.y - y2,
        data.x + x2, data.y - y2,
        data.x + x3, data.y - y3,
        data.x + x3, data.y - y3,
        data.x - x3, data.y - y3,
        data.x - x3, data.y - y3,
        data.x - x2, data.y - y2,
        data.x - x2, data.y - y2,
        data.x - x1, data.y + y1,
        data.x - x1, data.y + y1,
        data.x, data.y + data.length,
      ];
    } else if (data.side == 8) {
      let xvar = data.length * (Math.sin(rad(tetha)) * Math.sin(rad(90 - (1 / 2) * tetha))) / Math.sin(rad((180 - tetha) / 2));
      let yvar = data.length - (xvar * ((Math.sin(rad(tetha / 2))) / Math.sin(rad(90 - (tetha / 2)))));

      coordinates = [
        data.x, data.y + data.length,
        data.x + xvar, data.y + yvar,
        data.x + xvar, data.y + yvar,
        data.x + data.length, data.y,
        data.x + data.length, data.y,
        data.x + xvar, data.y - yvar,
        data.x + xvar, data.y - yvar,
        data.x, data.y - data.length,
        data.x, data.y - data.length,
        data.x - xvar, data.y - yvar,
        data.x - xvar, data.y - yvar,
        data.x - data.length, data.y,
        data.x - data.length, data.y,
        data.x - xvar, data.y + yvar,
        data.x - xvar, data.y + yvar,
        data.x, data.y + data.length,
      ];
    }
  }

  return coordinates;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

function rad(degree) {
  return degree * (Math.PI / 180);
}