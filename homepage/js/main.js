document.addEventListener('DOMContentLoaded', () => {


    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function initSlider() {
            slides.forEach((slide, index) => {
                slide.style.display = (index === 0) ? 'flex' : 'none';
            });
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[0].classList.add('active');
            }
            startAutoSlide();
        }

        function goToSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            slides.forEach(slide => slide.style.display = 'none');
            dots.forEach(dot => dot.classList.remove('active'));

            if (slides[index]) slides[index].style.display = 'flex';
            if (dots[index]) dots[index].classList.add('active');

            currentSlide = index;
        }

        function startAutoSlide() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(index);
                startAutoSlide();
            });
        });

        initSlider();
    }



    const categoryIcons = document.querySelectorAll('.filter-icon');
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    const cards = document.querySelectorAll('.restaurant-card');
    const searchInput = document.getElementById('searchInput'); // Search Input
    const searchBtn = document.querySelector('.search-btn');   // Search Button

    if (cards.length > 0) {

        let selectedCategory = document.querySelector('.filter-icon.active')?.getAttribute('data-target') || 'all';
        let activeFeatures = [];
        let searchQuery = "";

        filterCards();


        categoryIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                categoryIcons.forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                selectedCategory = icon.getAttribute('data-target');
                filterCards();
            });
        });


        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                const feature = toggle.getAttribute('data-filter');

                if (toggle.classList.contains('active')) {
                    if (!activeFeatures.includes(feature)) activeFeatures.push(feature);
                } else {
                    activeFeatures = activeFeatures.filter(f => f !== feature);
                }
                filterCards();
            });
        });


        if (searchInput) {
            searchInput.addEventListener('input', (e) => {

                searchQuery = e.target.value.toLowerCase().trim();
                filterCards();
            });

            r
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchInput.blur();
                }
            });
        }


        if (searchBtn) {
            searchBtn.addEventListener('click', () => {

                const exploreSection = document.getElementById('explore');
                if (exploreSection) {
                    exploreSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }


        function filterCards() {
            cards.forEach(card => {

                const cardCategory = card.getAttribute('data-category');
                const cardFeatures = card.getAttribute('data-features') || "";


                const title = card.querySelector('h2').textContent.toLowerCase();
                const desc = card.querySelector('.restaurant-description').textContent.toLowerCase();
                const meta = card.querySelector('.restaurant-meta').textContent.toLowerCase();

                const isCategoryMatch = (selectedCategory === 'all') || (selectedCategory === cardCategory);

                const isFeaturesMatch = activeFeatures.every(feature => cardFeatures.includes(feature));


                const isSearchMatch = (searchQuery === "") ||
                    title.includes(searchQuery) ||
                    desc.includes(searchQuery) ||
                    meta.includes(searchQuery);

                if (isCategoryMatch && isFeaturesMatch && isSearchMatch) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; }, 10);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        }
    }


    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const action = this.textContent.trim();
            alert(`${action} özelliği yakında eklenecek!`);
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

});