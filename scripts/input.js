const addButton = document.getElementById('add-button');
const formsContainer = document.querySelector('.form-container');
const showInputContainer = document.querySelector('.show-input-container');
const firstForm = document.querySelector('form');

const inputData = [];

addButton.addEventListener('click', () => {
  let newForm = document.createElement('form');

  newForm.innerHTML += `
            <div class="input-container">
              <label for="x">X</label>
              <input required type="text" class="draw-input" name="x">
            </div>
            <div class="input-container">
              <label for="y">Y</label>
              <input required type="text" class="draw-input" name="y">
            </div>

            <div class="input-container">
              <label for="shape">Shape</label>
              <select name="shape" id="">
                <option value="line">Line</option>
                <option value="square">Square</option>
                <option value="polygon">Polygon</option>
              </select>
            </div>

            <div class="input-container">
              <label for="length">Length</label>
              <input required type="text" class="draw-input" name="length">
            </div>

            <button type="submit">Draw Item</button>   
    `

  formsContainer.appendChild(newForm);
  inputData.push({});
  let idx = whichChild(newForm);
  newForm.addEventListener('submit', (e) => onSubmit(e, idx - 1));
})

function whichChild(elem) {
  var i = 0;
  while ((elem = elem.previousSibling) != null) ++i;
  return i;
}

const onSubmit = (e, idx) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let itemObj = {};
  for (let pair of formData.entries()) {
    if (pair[0] != 'shape') {
      pair[1] = parseInt(pair[1]);
    }
    itemObj[pair[0]] = pair[1];
  }

  inputData[idx] = itemObj;
  main(inputData);
}