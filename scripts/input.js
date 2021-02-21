const addButton = document.getElementById('add-button');
const formsContainer = document.querySelector('.form-container');
const showInputContainer = document.querySelector('.show-input-container');
const firstForm = document.querySelector('form');

let inputData = [];

firstForm.addEventListener("submit", e => onSubmit(e));


const onSubmit = e => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let itemObj = {};
  for (let pair of formData.entries()) {
    if (pair[0] != 'shape') {
      pair[1] = parseInt(pair[1]);
    }
    itemObj[pair[0]] = pair[1];
    itemObj["color"] = hexToRgb(document.getElementById("color").value);
  }

  inputData.push(itemObj);
  main(inputData);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16)/255,
    g: parseInt(result[2], 16)/255,
    b: parseInt(result[3], 16)/255
  } : null;
}

console.log(inputData);