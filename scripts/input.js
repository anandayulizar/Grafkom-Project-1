const addButton = document.getElementById('add-button');
const formsContainer = document.querySelector('.form-container');
const showInputContainer = document.querySelector('.show-input-container');
const firstForm = document.querySelector('form');

const inputData = [];

addButton.addEventListener('click', () => {
  let newForm = document.createElement('form');

  newForm.innerHTML += `
          <div class="toolbox">
            <input type="radio" id="square" name="shape" value="square" onclick="getShapeOpt(this.value)" />
            <label for="square">Square</label><br />
            <input type="radio" id="triangle" name="shape" value="triangle" onclick="getShapeOpt(this.value)" />
            <label for="triangle">Triangle</label><br />
            <input type="radio" id="polygon" name="shape" value="polygon" onclick="getShapeOpt(this.value)" />
            <label for="polygon">Polygon</label><br />
            <select name="n-side" id="nSide" class="n-side" style='font-family: "Poppins";'>
              <option hidden>How many sides?</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
        
            <div class="input-container">
              <label for="x">X</label>
              <input required type="text" class="draw-input" name="x">
            </div>
            <div class="input-container">
              <label for="y">Y</label>
              <input required type="text" class="draw-input" name="y">
            </div>

            <div class="input-container">
              <label for="length">Length</label>
              <input required type="text" class="draw-input" name="length">
            </div>

            <button type="submit">Draw Item</button>   
          </div>
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