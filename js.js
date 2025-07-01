// DOM yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling için navigation linklerini seç
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    // Her navigation linkine smooth scrolling ekle
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Header scroll efekti
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basit validasyon
            if (!name || !email || !message) {
                showNotification('Lütfen tüm alanları doldurun!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Geçerli bir e-posta adresi girin!', 'error');
                return;
            }
            
            // Başarılı gönderim simülasyonu
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            this.reset();
        });
    }
    
    // CTA button click event
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Hakkımızda bölümüne scroll
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Scroll animasyonları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animasyonlu elementleri gözlemle
    const animatedElements = document.querySelectorAll('.service-card, .stat, .about-text, .contact-info');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // E-posta validasyon fonksiyonu
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
   
    

    
    // Service card hover efektleri
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Stat counter animasyonu
    const stats = document.querySelectorAll('.stat h3');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 30);
    };
    
    // Stats görünür olduğunda animasyonu başlat
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const targetValue = parseInt(statElement.textContent);
                animateCounter(statElement, targetValue);
                statsObserver.unobserve(statElement);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // --- TomWins Ayakkabı Model Gruplama ve Ana Sayfa Ürünleri ---

    // Admin panelinden gelen ürünleri yükle
    function loadProductsFromAdmin() {
        const savedProducts = localStorage.getItem('tomwins_products_public');
        if (savedProducts) {
            return JSON.parse(savedProducts);
        }
        return null;
    }

    // Varsayılan ürünleri oluştur (admin paneli yoksa)
    function createDefaultProducts() {
        const shoeImageList = [
            "1194207_SSRT1907CİLTF_4.jpg","1194208_SSRT1907CİLTF_6.jpg","1194209_SSRT1907CİLTF_10.jpg","1194210_SSRT1907CİLTF_8.jpg","1194211_SSRT1907CİLTF_11.jpg","1194212_SSRT1907CİLTF_3.jpg","1194213_SSRT1907CİLTF_9.jpg","1194214_SSRT1907CİLTF_5.jpg","1194215_SSRT1907CİLTF_1.jpg","1194216_SSRT1907CİLTF_2.jpg","1195404_TOMWS1017BOTP_120.jpg","1195404_TOMWS1017BOTP_121.jpg","1195404_TOMWS1017BOTP_122.jpg","1195407_TOMWS1017BOTP_117.jpg","1195407_TOMWS1017BOTP_118.jpg","1195407_TOMWS1017BOTP_119.jpg","1195411_TOMWS1017BOTF_114.jpg","1195411_TOMWS1017BOTF_115.jpg","1195411_TOMWS1017BOTF_116.jpg","1195412_TOMWS1017BOTF_111.jpg","1195412_TOMWS1017BOTF_112.jpg","1195412_TOMWS1017BOTF_113.jpg","1195413_TOMWS1017BOTF_1.jpg","1195413_TOMWS1017BOTF_2.jpg","1195413_TOMWS1017BOTF_3.jpg","1195414_TOMWS1017BOTF_4.jpg","1195414_TOMWS1017BOTF_5.jpg","1195414_TOMWS1017BOTF_6.jpg","1195415_TOMWS1017BOTF_108.jpg","1195415_TOMWS1017BOTF_109.jpg"
        ];
        const kategoriList = ["Sportswear","Originals","Yürüyüş","TERREX"];
        const renkList = ["3 renk","6 renk","2 renk","5 renk"];
        const fiyatList = [2749, 2249, 1999, 2349, 2929, 1899, 2599, 1649];
        const products = [];
        
        for(let i=0; i<30; i++) {
            products.push({
                model: `${i+1}`,
                name: `TomWins Model ${i+1}`,
                age: ["0-2 Yaş","3-6 Yaş","7-12 Yaş"][i%3],
                gender: ["Unisex","Kız","Erkek"][i%3],
                desc: `Bu model ${i+1} için açıklama örneği.`,
                image: shoeImageList[i % shoeImageList.length],
                price: fiyatList[i%fiyatList.length],
                category: kategoriList[i%kategoriList.length],
                color: renkList[i%renkList.length]
            });
        }
        return products;
    }

    // Ürünleri yükle
    let products = loadProductsFromAdmin() || createDefaultProducts();

    // Model koduna göre gruplama fonksiyonu
    function groupShoesByModel(images) {
        const groups = {};
        images.forEach(filename => {
            // Model kodunu ayıkla (ilk alt çizgiye kadar ve son rakamdan önce)
            const match = filename.match(/^([\w\d]+_[\w\d]+)/);
            if (match) {
                const model = match[1];
                if (!groups[model]) groups[model] = [];
                groups[model].push(filename);
            }
        });
        // Her modeldeki görselleri numaraya göre sırala
        Object.values(groups).forEach(arr => arr.sort((a, b) => {
            const na = parseInt(a.match(/_(\d+)\./)?.[1] || '0');
            const nb = parseInt(b.match(/_(\d+)\./)?.[1] || '0');
            return na - nb;
        }));
        return groups;
    }

    // Model koduna göre görselleri eşleştir
    const shoeGroups = groupShoesByModel(products.map(p => p.image));

    // Ana sayfa ürün gridini dinamik oluştur (butonsuz, kart tıklanabilir)
    function renderProductGrid() {
        const grid = document.querySelector('.products-grid');
        if (!grid) return;
        grid.innerHTML = '';
        
        // Ürünleri son eklenen en üstte olacak şekilde sırala
        const sortedProducts = [...products].sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB - dateA; // Azalan sıralama (en yeni en üstte)
        });
        
        sortedProducts.forEach(product => {
            let mainImg;
            if (product.image && product.image.startsWith('data:')) {
                // Upload edilen resim (data URL)
                mainImg = product.image;
            } else {
                // Mevcut resim dosyası
                mainImg = product.image ? `images/${product.image}` : 'https://dummyimage.com/300x200/ff9800/fff&text=TomWins';
            }
            
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <img src="${mainImg}" alt="${product.name}" class="product-img-center">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-meta">
                        <span class="product-category">${product.category}</span> · <span class="product-color">${product.color}</span>
                    </div>
                    <div class="product-row-flex">
                        <div class="product-price">${product.price.toLocaleString('tr-TR')} TL</div>
                        <div class="product-tags">
                            <span class="tag age">${product.age}</span>
                            <span class="tag gender">${product.gender}</span>
                        </div>
                    </div>
                </div>
            `;
            card.addEventListener('click', function() {
                window.location.href = `product.html?model=${product.model}`;
            });
            grid.appendChild(card);
        });
    }

    renderProductGrid();

    // === SLIDER HERO ===
    const sliderImgs = document.querySelectorAll('.slider-img');
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    let sliderIndex = 0;
    let sliderInterval;

    function showSlider(idx) {
        sliderImgs.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
        sliderDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        sliderIndex = idx;
    }

    function nextSlider() {
        let idx = (sliderIndex + 1) % sliderImgs.length;
        showSlider(idx);
    }
    function prevSlider() {
        let idx = (sliderIndex - 1 + sliderImgs.length) % sliderImgs.length;
        showSlider(idx);
    }
    function startSliderAuto() {
        sliderInterval = setInterval(nextSlider, 5200);
    }
    function stopSliderAuto() {
        clearInterval(sliderInterval);
    }

    if (sliderImgs.length > 0) {
        showSlider(0);
        startSliderAuto();
        sliderNext.addEventListener('click', () => { nextSlider(); stopSliderAuto(); startSliderAuto(); });
        sliderPrev.addEventListener('click', () => { prevSlider(); stopSliderAuto(); startSliderAuto(); });
        sliderDots.forEach((dot, i) => {
            dot.addEventListener('click', () => { showSlider(i); stopSliderAuto(); startSliderAuto(); });
        });
        // Slider üzerine gelince otomatik geçişi durdur
        const sliderArea = document.querySelector('.slider-right');
        if (sliderArea) {
            sliderArea.addEventListener('mouseenter', stopSliderAuto);
            sliderArea.addEventListener('mouseleave', startSliderAuto);
        }
    }

    const filtersToggle = document.getElementById('filtersToggle');
    const filtersPanel = document.getElementById('filtersPanel');
    if (filtersToggle && filtersPanel) {
        filtersToggle.addEventListener('click', function() {
            filtersPanel.classList.toggle('closed');
            if (filtersPanel.classList.contains('closed')) {
                filtersToggle.innerHTML = 'Filtreler &#9650;';
            } else {
                filtersToggle.innerHTML = 'Filtreler &#9660;';
            }
        });
    }
});

// Sayfa yüklendiğinde loading animasyonu
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
