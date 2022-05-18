'use strict';


// Make navbar transparent when it is on the top

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// const navbar = document.getElementById('navbar');
// const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    console.log(`navbar height: ${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
})

