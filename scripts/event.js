const menu = document.getElementById("navMenu");

function showMenu() {
    menu.classList.toggle("none");
}

function getStarted() {
    window.location.href = "#help";
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-64px";
        menu.classList.add("none");
    }
    prevScrollpos = currentScrollPos;
};

const type = document.querySelector('input[name="type"]:checked');
const nSides = document.getElementById("nSide");

const getShapeOpt = value => {
    if (value === "polygon") {
        nSides.classList.remove("hide");
    } else {
        nSides.classList.add("hide")
    }
}

let drawnShapes = inputData.map(item => {
    return (
        `
        <input type="radio" />
        `
    )
})