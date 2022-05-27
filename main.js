'use strict';


// Make navbar transparent when it is on the top

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbar height: ${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});


// Navbar toggle button for small screen

const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});


// Handle click on "contact me" button on home

const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
    scrollIntoView('#contact')
});


// Make home slowly fade to transparent as the window scrolls down

const home = document.querySelector(".section__container.home")
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});


// Show "arrow up" button when scrolling down

const arrowUp = document.querySelector('#arrow-up');

document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
})


// Projects 

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // Remove selection from the previous item and select the new one

    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode; // Ternary operator.
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        })
        projectContainer.classList.remove('anim-out');
    }, 300);
    
    // for (let project of projects) {
    // }
    
    // let project;
    // for(let i = 0; i < projects.length; i++) {
    //     project = projects[i];
    // }
});


// 1. Brings in all section elements and menu items.
// 2. All sections are observed using IntersectionObserver.
// 3. Activates the menu item corresponding to the visible section.

const sectionIds = [
    '#home', 
    '#about', 
    '#skills', 
    '#work', 
    '#testimonial', 
    '#contact',
];
// ▲ Storing all ids as strings in the sectionIds array as an array.
const sections = sectionIds.map(id => document.querySelector(id));
// ▲ Allocate all section elements to an array called sections.
const navItems = sectionIds.map(id => 
    document.querySelector(`[data-link="${id}"]`)
);
// ▲ Assign navigation menu item elements as navItems.

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
};
// ▲ When a new menu item is selected, 
// it deletes the previously activated element and assigns a new one to specify the .actve class.

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // Scrolling down to bring up the page.
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    })
};
// ▲ Whenever a section goes out of the window using the Intersection Observer API, 
// the index corresponding to the next is calculated and assigned.

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});
// ▲ When the user scrolls using the index, 
// if the position is at the top, set the index at the top, 
// if the position is in the middle, find the menu item using the navIndex calculated by IntersectionObserver,
// and if it is the bottom, select the last menu item.