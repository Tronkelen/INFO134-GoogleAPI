/****---------------^----------------------^---------------*****/
/*            Main JavaScript functions for the pages.         */
/****---------------_----------------------_---------------*****/
/*-------------- fixedNav() --------------*/
// fixedNav() sets the navigation to be fixed when the width of the device is lower than 745px.
function fixedNav() {
    "use strict";
    const nav = document.querySelector('nav');
    const topofNav = nav.offsetTop;
    var windowW = window.innerWidth;
    if (windowW <= 745) {
        if (window.scrollY >= topofNav) {
            document.body.classList.add('fixedNav');
            document.body.style.paddingTop = nav.offsetHeight + 'px';
        } else {
            document.body.classList.remove('fixedNav');
            document.body.style.paddingTop = 0 + 'px';
        }
    }
}

/*-------------- menuIcon(x) --------------*/
// Changes the menu Icon.
function menuIcon(x) {
    "use strict";
    x.classList.toggle("change");
}

/*-------------- dropdown() --------------*/
// Toggle to show or hide the navigation menu.
function dropdown() {
    "use strict";
    document.getElementById("sideNav").classList.toggle("show");
}

/*-------------- toggleNav() --------------*/
// If the sidenav is not showing the three lines will be used to open the side navigation. Otherwise it will be closed with the press of the x. 
function toggleNav() {
    "use strict";
    var navSize;
    navSize = document.getElementById("sideNav").style.width;
    if (navSize === "100%") {
        return slideLeft();
    }
    return slideRight();
}

/*-------------- slideRight() --------------*/
// Slides right.
function slideRight() {
    "use strict";
    document.getElementById("mainContent").style.marginLeft = "0px";
    document.getElementById("sideNav").style.width = "100%";
    document.getElementById("navIcon").style.marginLeft = "90%";
    document.getElementById('navIcon').style.zIndex = "100";
}

/*-------------- slideLeft() --------------*/
// Slides left.
function slideLeft() {
    "use strict";
    document.getElementById("mainContent").style.marginLeft = "0px";
    document.getElementById("sideNav").style.width = "0px";
    document.getElementById("navIcon").style.marginLeft = "0px";
}

/*-------------- Event Listener --------------*/
// Runs the function fixedNav() when the user scrolls.
window.addEventListener('scroll', fixedNav);