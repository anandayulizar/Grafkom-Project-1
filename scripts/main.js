let appState = {
    mouse: {
        x: 0,
        y: 0,
    },
    pickedIdx: -1,
    pickedCoordCount: -1,
}
function main(inputData) {
    // Get A WebGL context
    var canvas = document.querySelector("#glCanvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    // Create a shader progra,
    var program = createProgram(gl);

    // Convert clip space (-1 <-> 1) to pixels

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size
    const needResize =
        canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    drawScene(gl, program, inputData);

    canvas.addEventListener('mousedown', (event) => {
        const bound = canvas.getBoundingClientRect()
        const res = {
            x: event.clientX - bound.left,
            y: canvas.height - (event.clientY - bound.top)
        }
        appState.mouse = res

        pickObject(inputData);
    }, false);

    canvas.addEventListener('mouseup', (event) => {
        console.log('mouseup');
        const bound = canvas.getBoundingClientRect()
        if (appState.pickedIdx != -1) {
            x = event.clientX - bound.left;
            y = canvas.height - (event.clientY - bound.top);

            inputData[appState.pickedIdx].coordinates[appState.pickedCoordCount] = x;
            inputData[appState.pickedIdx].coordinates[appState.pickedCoordCount + 1] = y;

            main(inputData);
        }
        appState.pickedIdx = -1;
    }, false);
}

const pickObject = (inputData) => {
    console.log('pick object');

    let pickedArr = inputData.filter(data => {
        return isInObject(data);
    });

    if (pickedArr.length && pickedArr.length > 0) {
        appState.pickedIdx = pickedArr[0].id - 1;
        document.updateForm.x.value = pickedArr[0].x;
        document.updateForm.y.value = pickedArr[0].y;
        document.updateForm.shape.value = pickedArr[0].shape;
        document.updateForm.length.value = pickedArr[0].length;
    }
}

const isInObject = (object) => {
    if (object.shape == 'square') {
        if (appState.mouse.x > object.coordinates[0] - 10 &&
            appState.mouse.x < object.coordinates[6] + object.length + 10 &&
            appState.mouse.y > object.coordinates[1] - 10 &&
            appState.mouse.y < object.coordinates[7] + object.length + 10) {
            for (let i = 0; i < 8; i += 2) {
                if (appState.mouse.x > object.coordinates[i] - 10 &&
                    appState.mouse.x < object.coordinates[i] + 10 &&
                    appState.mouse.y > object.coordinates[i + 1] - 10 &&
                    appState.mouse.y < object.coordinates[i + 1] + 10) {
                    appState.pickedCoordCount = i;
                }
            }
            return true;
        } else {
            return false;
        }
    }
}

main([{
    x: 100,
    y: 100,
    id: 1,
    color: {
        r: 0,
        g: 0,
        b: 0
    },
    shape: 'square',
    length: 100,
    coordinates: [
        100, 100,
        200, 100,
        100, 200,
        200, 200
    ]
}]);
