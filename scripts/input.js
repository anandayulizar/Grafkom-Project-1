const addButton = document.getElementById("add-button");
const formsContainer = document.querySelector(".form-container");
const showInputContainer = document.querySelector(".show-input-container");
const firstForm = document.querySelector("form");

let inputData = [];

firstForm.addEventListener("submit", (e) => onSubmit(e));

var saveData = (function () {
    var a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
})();

const onSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("fileName").textContent = '';
    let formData = new FormData(e.target);
    let itemObj = {};
    for (let pair of formData.entries()) {
        if (pair[0] != "shape") {
            pair[1] = parseInt(pair[1]);
        }
        itemObj[pair[0]] = pair[1];
        itemObj["color"] = hexToRgb(document.getElementById("color").value);
    }

    inputData.push(itemObj);
    main(inputData);

    let fileName = prompt(
        "Do you want to save the data? \n\n If yes give your filename then press 'OK', otherwise press 'Cancel'"
    );

    if (fileName) {
        let file = `${fileName}.json`;
        await saveData(itemObj, file);
    }
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16) / 255,
              g: parseInt(result[2], 16) / 255,
              b: parseInt(result[3], 16) / 255,
          }
        : null;
}

const importFile = () => {
    let file = document.getElementById("file");

    let { files } = file;
    let [uploaded] = files;

    console.log(files, uploaded);

    if (files) {
        let fileNameEl = document.getElementById("fileName");
        fileNameEl.textContent = `${uploaded.name} is uploaded!`;

        var reader = new FileReader();
        reader.readAsText(uploaded, "UTF-8");

        reader.onload = function (e) {
            itemObj = JSON.parse(e.target.result);
            inputData.push(itemObj);
            main(inputData);
        };
        reader.onerror = function (e) {
            alert("Error importing file!");
        };
    }
};

console.log(inputData);
