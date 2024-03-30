// Get the navbar element
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Function to add/remove the "sticky" class when scrolling
function stickNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// Listen for the scroll event and call stickNavbar function
window.onscroll = function() {
  stickNavbar();
};
