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
}

main([]);
