const menu = document.getElementById("navMenu");

function showMenu() {
    menu.classList.toggle("none");
}

function getStarted() {
    window.location.href = '#help'
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-64px";
  }
  prevScrollpos = currentScrollPos;
}