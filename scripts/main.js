let globalState = {
    mouse: {
        x: 0,
        y: 0,
    },
    pickedIdx: -1,
    pickedCoordCount: -1,
    offset: 5,
}

function main() {
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
        globalState.mouse = res

        pickObject();
    }, false);

    canvas.addEventListener('mouseup', (event) => {
        console.log('mouseup');
        const bound = canvas.getBoundingClientRect()
        if (globalState.pickedIdx != -1 && globalState.pickedCoordCount != -1) {
            const res = {
                x: event.clientX - bound.left,
                y: canvas.height - (event.clientY - bound.top)
            }
            globalState.mouse = res

            let selectedObj = { ...inputData[globalState.pickedIdx] }

            if (selectedObj.shape != 'square') {
                selectedObj.coordinates[globalState.pickedCoordCount] = res.x;
                selectedObj.coordinates[globalState.pickedCoordCount + 1] = res.y;
            } else {
                // Berdasarkan spek, square saat memindahkan titik sudt
                // Harus rescale
                let xDiff = res.x - selectedObj.x;
                let yDiff = res.y - selectedObj.y;
                selectedObj.length = Math.max(Math.abs(xDiff), Math.abs(yDiff)) * 2;
                selectedObj.coordinates = getObjCoordinates(selectedObj);
            }


            inputData[globalState.pickedIdx] = selectedObj

            main();
        }
        globalState.pickedCoordCount = -1;
    }, false);
}

const pickObject = () => {
    console.log('pick object');

    let pickedArr = inputData.filter(data => {
        return isInObject(data);
    });

    if (pickedArr.length && pickedArr.length > 0) {
        globalState.pickedIdx = pickedArr[0].id;
    } else {
        globalState.pickedIdx = -1;
    }
}

const isInObject = (object) => {
    if (object.shape == 'square') {
        if (globalState.mouse.x > object.coordinates[0] - globalState.offset &&
            globalState.mouse.x < object.coordinates[6] + object.length + globalState.offset &&
            globalState.mouse.y > object.coordinates[1] - globalState.offset &&
            globalState.mouse.y < object.coordinates[7] + object.length + globalState.offset) {
            let coordinatePicked = false;
            for (let i = 0; i < 8; i += 2) {
                if (globalState.mouse.x > object.coordinates[i] - globalState.offset &&
                    globalState.mouse.x < object.coordinates[i] + globalState.offset &&
                    globalState.mouse.y > object.coordinates[i + 1] - globalState.offset &&
                    globalState.mouse.y < object.coordinates[i + 1] + globalState.offset) {
                    globalState.pickedCoordCount = i;
                    coordinatePicked = true;
                }
            }
            if (!coordinatePicked) {
                globalState.pickedCoordCount = -1;
            }
            return true;
        } else {
            return false;
        }
    } else {
        let coordinatePicked = false;
        for (let i = 0; i < object.coordinates.length; i += 2) {
            if (globalState.mouse.x > object.coordinates[i] - globalState.offset &&
                globalState.mouse.x < object.coordinates[i] + globalState.offset &&
                globalState.mouse.y > object.coordinates[i + 1] - globalState.offset &&
                globalState.mouse.y < object.coordinates[i + 1] + globalState.offset) {
                globalState.pickedCoordCount = i;
                coordinatePicked = true;
            }
        }
        if (!coordinatePicked) {
            globalState.pickedCoordCount = -1;
        }

        return coordinatePicked;
    }
}

main()
