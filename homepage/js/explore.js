const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

const placesWrapper = document.getElementById('placesWrapper');
const placesContainer = document.getElementById('placesContainer');

placesContainer.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        placesWrapper.scrollLeft += e.deltaY;
    }
});

let isDown = false;
let startX;
let scrollLeft;

placesWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    placesWrapper.style.cursor = 'grab'
});

placesWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    placesWrapper.style.cursor = 'grab';
});

placesWrapper.addEventListener('mouseup', () => {
    isDown = false;
    placesWrapper.style.cursor = 'grab';
});

placesWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - placesWrapper.offsetLeft;

    const walk = (x - (startX || x)) * 2;
    placesWrapper.scrollLeft = (scrollLeft || placesWrapper.scrollLeft) - walk;
});

