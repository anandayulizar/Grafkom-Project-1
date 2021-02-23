const addButton = document.getElementById('add-button');
const formsContainer = document.querySelector('.form-container');
const showInputContainer = document.querySelector('.show-input-container');
const newForm = document.querySelector('.new-form');
const updateForm = document.querySelector('.update-form');


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

  itemObj["coordinates"] = getObjData(itemObj);
  itemObj["id"] = itemObj.length;

  inputData.push(itemObj);
  main(inputData);
}

const onUpdate = e => {
  e.preventDefault();
  if (appState.pickedIdx < 0) {
    return;
  }
  console.log(appState)
  let formData = new FormData(e.target);
  let itemObj = {};
  for (let pair of formData.entries()) {
    if (pair[0] != 'shape') {
      pair[1] = parseInt(pair[1]);
    }
    itemObj[pair[0]] = pair[1];
    itemObj["color"] = hexToRgb(document.updateForm.color.value);
  }

  itemObj["coordinates"] = getObjData(itemObj);
  inputData[appState.pickedIdx] = {
    ...itemObj,
    id: appState.pickedIdx + 1
  }
  main(inputData);
}

const getObjData = (data) => {
  let coordinates = [];
  if (data.shape == 'square') {
    coordinates.push(data.x, data.y);
    coordinates.push(data.x + data.length, data.y);
    coordinates.push(data.x, data.y + data.length);
    coordinates.push(data.x + data.length, data.y + data.length);
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

console.log(inputData);