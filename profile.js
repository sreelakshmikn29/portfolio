/* ==========================================
   PORTFOLIO SCRIPT
   Part 3A
   - Typing Animation
   - Dark / Light Mode
   - Mobile Navigation
   - Smooth Scrolling
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       TYPING EFFECT
    ========================================== */

    const typingElement = document.getElementById("typing");

    const titles = [

        "Instructional Designer",

        "Learning Experience Designer",

        "eLearning Developer",

        "AI-Powered Content Creator",

        "Storyline 360 Specialist",

        "Visual Storytelling Expert"

    ];

    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentTitle = titles[titleIndex];

        if (!deleting) {

            typingElement.textContent =
                currentTitle.substring(0, charIndex++);

            if (charIndex > currentTitle.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        } else {

            typingElement.textContent =
                currentTitle.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                titleIndex++;

                if (titleIndex >= titles.length) {

                    titleIndex = 0;

                }

            }

        }

        setTimeout(typeEffect, deleting ? 45 : 90);

    }

    if (typingElement) {

        typeEffect();

    }

    /* ==========================================
       DARK / LIGHT MODE
    ========================================== */

    const body = document.body;

    const themeButton = document.getElementById("theme-toggle");

    function setTheme(mode) {

        if (mode === "dark") {

            body.classList.add("dark");

            themeButton.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            body.classList.remove("dark");

            themeButton.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

        localStorage.setItem("theme", mode);

    }

    const savedTheme =
        localStorage.getItem("theme") || "light";

    setTheme(savedTheme);

    themeButton.addEventListener("click", () => {

        if (body.classList.contains("dark")) {

            setTheme("light");

        } else {

            setTheme("dark");

        }

    });

    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuButton =
        document.getElementById("menu-btn");

    const navLinks =
        document.querySelector(".nav-links");

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {

            menuButton.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

            body.classList.add("no-scroll");

        } else {

            menuButton.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            body.classList.remove("no-scroll");

        }

    });

    /* ==========================================
       CLOSE MENU AFTER CLICK
    ========================================== */

    document.querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                body.classList.remove("no-scroll");

                menuButton.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (!target) return;

                window.scrollTo({

                    top: target.offsetTop - 80,

                    behavior: "smooth"

                });

            });

        });

});

/* ==========================================
   PORTFOLIO SCRIPT
   Part 3B
   - Animated Counters
   - Skill Progress Bars
   - Scroll Reveal
   - Timeline Animation
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       INTERSECTION OBSERVER
    ========================================== */

    const observerOptions = {

        threshold: 0.25,

        rootMargin: "0px 0px -50px 0px"

    };

    /* ==========================================
       ANIMATED COUNTERS
    ========================================== */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target = parseInt(counter.dataset.target);

        let current = 0;

        const increment = Math.ceil(target / 100);

        function updateCounter() {

            current += increment;

            if (current >= target) {

                current = target;

            }

            counter.textContent = current + "+";

            if (current < target) {

                requestAnimationFrame(updateCounter);

            }

        }

        updateCounter();

    }

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, observerOptions);

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ==========================================
       SKILL PROGRESS BARS
    ========================================== */

    const progressBars = document.querySelectorAll(".progress-bar");

    const progressObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const width = entry.target.dataset.width;

                entry.target.style.width = width;

                progressObserver.unobserve(entry.target);

            }

        });

    }, observerOptions);

    progressBars.forEach(bar => {

        progressObserver.observe(bar);

    });

    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealItems = document.querySelectorAll(

        ".glass, .project-card, .achievement-card, .education-card"

    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-in");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold:0.15

    });

    revealItems.forEach(item => {

        revealObserver.observe(item);

    });

    /* ==========================================
       TIMELINE ANIMATION
    ========================================== */

    const timelineItems =

        document.querySelectorAll(".timeline-item");

    const timelineObserver =

        new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                    timelineObserver.unobserve(entry.target);

                }

            });

        },{

            threshold:.2

        });

    timelineItems.forEach(item=>{

        timelineObserver.observe(item);

    });

    /* ==========================================
       PARALLAX HERO IMAGE
    ========================================== */

    const profile = document.querySelector(".profile-card");

    window.addEventListener("scroll",()=>{

        if(!profile) return;

        const offset = window.pageYOffset;

        profile.style.transform =

        `translateY(${offset*0.08}px)`;

    });

    /* ==========================================
       FLOATING BLOBS PARALLAX
    ========================================== */

    const blobs = document.querySelectorAll(".background-blobs span");

    window.addEventListener("mousemove",(e)=>{

        const x = e.clientX / window.innerWidth;

        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob,index)=>{

            const speed = (index+1)*8;

            blob.style.transform=

            `translate(${x*speed}px,${y*speed}px)`;

        });

    });

    /* ==========================================
       PROJECT CARD HOVER TILT
    ========================================== */

    const cards=document.querySelectorAll(".project-card");

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateX=(y-rect.height/2)/18;

            const rotateY=(rect.width/2-x)/18;

            card.style.transform=

            `rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-12px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

});

/* ==========================================
   PORTFOLIO SCRIPT
   Part 3C
   - Scroll To Top
   - Active Navigation
   - Sticky Navbar
   - Contact Form Validation
   - Utility Functions
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const scrollTopBtn = document.getElementById("scrollTop");
    const navbar = document.querySelector("header");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const contactForm = document.getElementById("contact-form");

    /* ==========================================
       SCROLL TO TOP BUTTON
    ========================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            scrollTopBtn.classList.add("show");

        } else {

            scrollTopBtn.classList.remove("show");

        }

    });

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

    function highlightNav() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", highlightNav);

    /* ==========================================
       STICKY NAVBAR
    ========================================== */

    function navbarEffect() {

        if (window.scrollY > 40) {

            navbar.style.padding = "10px 0";

            navbar.style.backdropFilter = "blur(20px)";

            navbar.style.background =
                "rgba(255,255,255,.15)";

        } else {

            navbar.style.padding = "18px 0";

            navbar.style.background = "transparent";

        }

    }

    window.addEventListener("scroll", navbarEffect);

    /* ==========================================
       CONTACT FORM VALIDATION
    ========================================== */

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            this.querySelector('input[type="text"]').value.trim();

        const email =
            this.querySelector('input[type="email"]').value.trim();

        const subject =
            this.querySelectorAll('input[type="text"]')[1].value.trim();

        const message =
            this.querySelector("textarea").value.trim();

        if (!name ||
            !email ||
            !subject ||
            !message) {

            alert("Please fill all fields.");

            return;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert(
            "Thank you for reaching out! I'll get back to you soon."
        );

        contactForm.reset();

    });

    /* ==========================================
       OPTIONAL EMAILJS
    ========================================== */

    /*
    Replace the above alert() with EmailJS:

    emailjs.sendForm(
        "SERVICE_ID",
        "TEMPLATE_ID",
        contactForm,
        "PUBLIC_KEY"
    )
    .then(()=>{
        alert("Message Sent");
        contactForm.reset();
    })
    .catch(()=>{
        alert("Failed to send");
    });
    */

    /* ==========================================
       UTILITIES
    ========================================== */

    function debounce(func, wait = 100) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                func.apply(this, args);

            }, wait);

        };

    }

    const debouncedScroll = debounce(() => {

        highlightNav();

        navbarEffect();

    }, 20);

    window.addEventListener("scroll", debouncedScroll);

    /* ==========================================
       IMAGE LAZY LOADING
    ========================================== */

    const images =
        document.querySelectorAll("img");

    const imageObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const img = entry.target;

                    if (img.dataset.src) {

                        img.src = img.dataset.src;

                    }

                    observer.unobserve(img);

                }

            });

        });

    images.forEach(img => {

        imageObserver.observe(img);

    });

    /* ==========================================
       COPYRIGHT YEAR
    ========================================== */

    const year =
        new Date().getFullYear();

    const copyright =
        document.querySelector(".copyright");

    if (copyright) {

        copyright.innerHTML =
            `© ${year} Sreelakshmi KN. All Rights Reserved.`;

    }

    /* ==========================================
       INITIALIZE
    ========================================== */

    highlightNav();

    navbarEffect();

});
