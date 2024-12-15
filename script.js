// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
});

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

// Event klik pada tombol
searchButton.addEventListener("click", () => {
    // Toggle visibilitas kotak input
    if (searchInput.style.display === "none" || searchInput.style.display === "") {
        searchInput.style.display = "block"; // Tampilkan input
        searchInput.focus(); // Fokus ke kotak input
    } else {
        searchInput.style.display = "none"; // Sembunyikan input
    }
});

// Initialize carousel with custom options
var heroCarousel = new bootstrap.Carousel(document.querySelector('#heroCarousel'), {
    interval: 5000,
    pause: 'hover',
    wrap: true
});

// Add animation to quick link items on scroll
const quickLinkItems = document.querySelectorAll('.quick-link-item');
const animateOnScroll = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1
});

quickLinkItems.forEach(item => {
    observer.observe(item);
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

// Fungsi untuk mengecek apakah elemen terlihat
function checkVisibility() {
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        
        // Cek jika elemen sudah terlihat di layar
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
            if (!counter.classList.contains('counting')) { // Pastikan hanya satu kali animasi
                counter.classList.add('counting'); // Tandai elemen sudah dihitung
                
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10); // Animasi lebih mulus
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount(); // Mulai animasi
            }
        }
    });
}

// Panggil fungsi saat halaman di-scroll
window.addEventListener('scroll', checkVisibility);

// Panggil fungsi langsung saat halaman dimuat
window.addEventListener('load', checkVisibility);


// News Cards Animation on Scroll
const newsCards = document.querySelectorAll('.news-card');

const animateNewsCards = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
};

const newsObserver = new IntersectionObserver(animateNewsCards, {
    threshold: 0.1
});

newsCards.forEach(card => {
    newsObserver.observe(card);
});

// Service Items Interaction
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.services-container');
    const wrapper = document.querySelector('.services-wrapper');
    const items = document.querySelectorAll('.service-item');
    const itemWidth = items[0].offsetWidth;
    
    // Clone items for infinite scroll
    const itemsToClone = Array.from(items).slice(0, items.length);
    itemsToClone.forEach(item => {
        const clone = item.cloneNode(true);
        wrapper.appendChild(clone);
    });

    function updateActiveItem() {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        const allItems = document.querySelectorAll('.service-item');
        allItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(containerCenter - itemCenter);
            
            const circle = item.querySelector('.service-circle');
            const scale = 1 + Math.max(0, 1 - distance / (containerRect.width / 4)) * 0.2;
            
            if (distance < 50) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
            
            circle.style.transform = `scale(${scale})`;
        });
    }

    function handleInfiniteScroll() {
        const scrollLeft = container.scrollLeft;
        const maxScroll = wrapper.scrollWidth - container.clientWidth;
        
        if (scrollLeft >= maxScroll) {
            container.scrollLeft = 1;
        } else if (scrollLeft <= 0) {
            container.scrollLeft = maxScroll - 1;
        }
    }

    let isScrolling;
    container.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        updateActiveItem();
        
        isScrolling = setTimeout(() => {
            handleInfiniteScroll();
        }, 66);
    });

    window.addEventListener('resize', updateActiveItem);
    updateActiveItem();

    // Touch scroll handling
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
});

// Smooth Scroll for Service Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Add scroll-to-top button functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
    }
});

// Add lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp button click handler
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Replace with your actual WhatsApp number and message
        const phoneNumber = '6281234567890';
        const message = 'Halo, saya ingin bertanya tentang Rumah Sakit Sido Sehat';
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
    });

    // Responsive adjustments
    function adjustLayout() {
        const card = document.querySelector('.hospital-card');
        const windowWidth = window.innerWidth;

        if (windowWidth < 576) {
            card.style.width = '90%';
        } else {
            card.style.width = '100%';
        }
    }

    // Initial call and event listener for window resize
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
});

//berita,js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Add fade-in animation to cards as they scroll into view
    const cards = document.querySelectorAll('.article-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

