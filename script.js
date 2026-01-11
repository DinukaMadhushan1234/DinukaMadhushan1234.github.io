// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 255, 136, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
    }
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate circular progress and expertise bars on scroll
const animateSkills = () => {
    // Animate circular progress
    const circularProgress = document.querySelectorAll('.circular-progress');
    circularProgress.forEach(circle => {
        circle.classList.add('animate');
    });
    
    // Animate expertise bars
    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach(item => {
        item.classList.add('animate');
    });
};

let skillsAnimated = false;
window.addEventListener('scroll', () => {
    if (!skillsAnimated) {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const skillsPosition = skillsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (skillsPosition < screenPosition - 100) {
                animateSkills();
                skillsAnimated = true;
            }
        }
    }
});
// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .education-card, .stat-item, .skill-category, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Projects Carousel - 3D Effect
let currentProject = 0;
const projects = document.querySelectorAll('.project-card-large');
const totalProjects = projects.length;

function showProject(index) {
    if (index >= totalProjects) {
        currentProject = 0;
    } else if (index < 0) {
        currentProject = totalProjects - 1;
    } else {
        currentProject = index;
    }
    
    projects.forEach((project, i) => {
        project.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2');
        
        if (i === currentProject) {
            project.classList.add('active');
        } else if (i === (currentProject - 1 + totalProjects) % totalProjects) {
            project.classList.add('prev-1');
        } else if (i === (currentProject - 2 + totalProjects) % totalProjects) {
            project.classList.add('prev-2');
        } else if (i === (currentProject + 1) % totalProjects) {
            project.classList.add('next-1');
        } else if (i === (currentProject + 2) % totalProjects) {
            project.classList.add('next-2');
        }
    });
    
    updateDots();
}

function updateDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalProjects; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentProject) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => showProject(i));
        dotsContainer.appendChild(dot);
    }
}

document.querySelector('.prev-btn').addEventListener('click', () => {
    showProject(currentProject - 1);
});

document.querySelector('.next-btn').addEventListener('click', () => {
    showProject(currentProject + 1);
});

// Click on side cards to navigate
projects.forEach((project, index) => {
    project.addEventListener('click', () => {
        if (index !== currentProject) {
            showProject(index);
        }
    });
});

// Initialize carousel
showProject(0);

// Auto-advance carousel
let autoPlayInterval = setInterval(() => {
    showProject(currentProject + 1);
}, 7000);

// Pause autoplay on hover
document.querySelector('.projects-wrapper').addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

document.querySelector('.projects-wrapper').addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        showProject(currentProject + 1);
    }, 7000);
});

// Particle Animation for Hero Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(0, 255, 136, 0.5)' : 'rgba(0, 102, 255, 0.5)';
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const distance = Math.sqrt(
                Math.pow(particlesArray[a].x - particlesArray[b].x, 2) +
                Math.pow(particlesArray[a].y - particlesArray[b].y, 2)
            );
            
            if (distance < 120) {
                ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / 120})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// Scroll indicator click
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    const offset = 80;
    const targetPosition = aboutSection.offsetTop - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #666, #888)';
    submitBtn.style.transition = 'all 0.5s ease';
    
    // Create mailto link
    const mailtoLink = `mailto:dinukamadhushan1234@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
    
    setTimeout(() => {
        window.location.href = mailtoLink;
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Email Client Opened!';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
        submitBtn.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 200);
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            submitBtn.disabled = false;
            document.getElementById('contactForm').reset();
        }, 5000);
    }, 500);
});

// Make email text clickable
document.querySelectorAll('.contact-details p').forEach(element => {
    const text = element.textContent;
    if (text.includes('@')) {
        element.innerHTML = `<a href="mailto:${text}" style="color: inherit; text-decoration: none;">${text}</a>`;
    }
});