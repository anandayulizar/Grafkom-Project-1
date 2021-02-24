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
    if (pair[0] != 'shape') {
      pair[1] = parseInt(pair[1]);
    }
    itemObj[pair[0]] = pair[1];
    itemObj["color"] = hexToRgb(document.newForm.color.value);
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

  inputData[globalState.pickedIdx] = {
    ...itemObj,
    id: globalState.pickedIdx,
    coordinates: inputData[globalState.pickedIdx].coordinates
  }
  main(inputData);
}

const getObjCoordinates = (data) => {
  let coordinates = [];
  if (data.shape == 'square') {
    coordinates.push(data.x - (data.length / 2), data.y - (data.length / 2));
    coordinates.push(data.x + (data.length / 2), data.y - (data.length / 2));
    coordinates.push(data.x - (data.length / 2), data.y + (data.length / 2));
    coordinates.push(data.x + (data.length / 2), data.y + (data.length / 2));

    // coordinates.push(data.x, data.y);
    // coordinates.push(data.x + data.length, data.y);
    // coordinates.push(data.x, data.y + data.length);
    // coordinates.push(data.x + data.length, data.y + data.length);
    // console.log(coordinates)
  } else if (data.shape == 'line') {
    coordinates.push(data.x, data.y);
    coordinates.push(data.x + data.length, data.y);
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