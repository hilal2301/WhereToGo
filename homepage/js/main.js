document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. HERO SLIDER (OTOMATİK GEÇİŞLİ)
       ========================================================== */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function initSlider() {
            slides.forEach((slide, index) => {
                slide.style.display = (index === 0) ? 'flex' : 'none';
            });
            if(dots.length > 0) {
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

            if(slides[index]) slides[index].style.display = 'flex';
            if(dots[index]) dots[index].classList.add('active');
            
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


    /* ==========================================================
       2. GELİŞMİŞ FİLTRELEME & ARAMA SİSTEMİ
       ========================================================== */
    const categoryIcons = document.querySelectorAll('.filter-icon');
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    const cards = document.querySelectorAll('.restaurant-card');
    const searchInput = document.getElementById('searchInput'); // Search Input
    const searchBtn = document.querySelector('.search-btn');   // Search Button

    if (cards.length > 0) {
        // Durum Değişkenleri
        let selectedCategory = document.querySelector('.filter-icon.active')?.getAttribute('data-target') || 'all';
        let activeFeatures = [];
        let searchQuery = ""; // Arama metni burada tutulacak

        // Başlangıçta çalıştır
        filterCards();

        // --- A) Kategori Seçimi ---
        categoryIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                categoryIcons.forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                selectedCategory = icon.getAttribute('data-target');
                filterCards();
            });
        });

        // --- B) Özellik (Switch) Seçimi ---
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

        // --- C) Arama Kutusu (Input) ---
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                // Yazılanı küçük harfe çevirip kaydet
                searchQuery = e.target.value.toLowerCase().trim();
                filterCards();
            });

            // "Enter" tuşuna basınca da klavye kapanır veya işlem yapılır
            searchInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    searchInput.blur(); // Mobilde klavyeyi kapatır
                }
            });
        }

        // --- D) Arama Butonu (Tıklayınca odağı inputa verir) ---
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                // Zaten input eventi her harfte filtreliyor, 
                // butona basınca sayfayı aşağı kaydırabiliriz.
                const exploreSection = document.getElementById('explore');
                if(exploreSection) {
                    exploreSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // --- ANA FİLTRELEME MANTIĞI ---
        function filterCards() {
            cards.forEach(card => {
                // 1. Kart Verilerini Al
                const cardCategory = card.getAttribute('data-category');
                const cardFeatures = card.getAttribute('data-features') || "";
                
                // Kartın Başlığı ve Açıklaması (Arama için)
                const title = card.querySelector('h2').textContent.toLowerCase();
                const desc = card.querySelector('.restaurant-description').textContent.toLowerCase();
                const meta = card.querySelector('.restaurant-meta').textContent.toLowerCase();

                // 2. Kategori Kontrolü
                const isCategoryMatch = (selectedCategory === 'all') || (selectedCategory === cardCategory);

                // 3. Özellik Kontrolü
                const isFeaturesMatch = activeFeatures.every(feature => cardFeatures.includes(feature));

                // 4. Arama Kontrolü (Başlıkta, açıklamada VEYA meta bilgide geçiyor mu?)
                const isSearchMatch = (searchQuery === "") || 
                                      title.includes(searchQuery) || 
                                      desc.includes(searchQuery) ||
                                      meta.includes(searchQuery);

                // 5. Karar: Göster / Gizle
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

    /* ==========================================================
       3. DİĞER FONKSİYONLAR (SCROLL, BUTONLAR)
       ========================================================== */

    // Action Buttons (Rezervasyon vb.)
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            alert(`${action} özelliği yakında eklenecek!`);
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href') !== "#") {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

});