// Плавная прокрутка для навигации
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для ссылок навигации
    const navLinks = document.querySelectorAll('.nav-link');
    
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

    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдение за элементами для анимации
    const animateElements = document.querySelectorAll('.competency-card, .skill-category, .project-card, .feature');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Обработка формы контактов
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получение данных формы
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля формы.');
                return;
            }
            
            // Здесь можно добавить отправку данных на сервер
            alert('Спасибо за сообщение! Я свяжусь с вами в ближайшее время.');
            this.reset();
        });
    }

    // Анимация счетчиков для навыков
    function animateCounters() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // Запуск анимации счетчиков при загрузке страницы
    setTimeout(animateCounters, 1000);

    // Параллакс эффект для главной секции
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Анимация иконок в карточках компетенций
    const competencyCards = document.querySelectorAll('.competency-card');
    competencyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Плавное появление элементов при скролле
    function checkScroll() {
        const elements = document.querySelectorAll('.competency-card, .skill-category, .project-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Проверяем при загрузке страницы
});

// Добавление CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    .competency-card, .skill-category, .project-card, .feature {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-item {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.3s ease;
    }
    
    .card-icon i {
        transition: all 0.3s ease;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style); 

// Анимированная россыпь звезд на фоне
(function() {
    const canvas = document.getElementById('stars-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    let stars = [];
    // Уменьшаем количество звезд
    const STAR_COUNT = Math.floor((w * h) / 3500);

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        createStars();
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.1 + 0.2,
                o: Math.random() * 0.3 + 0.2, // менее яркие
                tw: Math.random() * Math.PI * 2,
                tws: Math.random() * 0.02 + 0.01
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, w, h);
        for (let star of stars) {
            ctx.save();
            ctx.globalAlpha = star.o * (0.5 + 0.3 * Math.sin(star.tw)); // менее яркие
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 2; // менее яркое свечение
            ctx.fill();
            ctx.restore();
            star.tw += star.tws;
        }
        requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', resize);
    resize();
    drawStars();
})(); 