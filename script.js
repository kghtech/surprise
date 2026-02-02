// ========================================
// GLOBAL VARIABLES
// ========================================
let musicPlaying = false;
let heartsInterval;

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initFloatingHearts();
    initEnvelope();
    initSurpriseButtons();
    initGalleryItems();
    initScrollAnimations();
});

// ========================================
// FLOATING HEARTS BACKGROUND
// ========================================
function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 1000);
    }
    
    // Continue creating hearts
    heartsInterval = setInterval(createHeart, 2000);
}

// ========================================
// ENVELOPE INTERACTION
// ========================================
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    
    envelope.addEventListener('click', function() {
        this.classList.toggle('open');
        
        if (this.classList.contains('open')) {
            // Play a soft sound effect or animation
            createSparkles(envelope);
        }
    });
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + rect.width / 2) + 'px';
        sparkle.style.top = (rect.top + rect.height / 2) + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / sparkleCount;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        sparkle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        }).onfinish = () => sparkle.remove();
    }
}

const envelope = document.getElementById("envelope");
const openBtn = document.querySelector(".envelope-text");
const surpriseImage = document.getElementById("surpriseImage");
const backdrop = document.getElementById("surpriseBackdrop"); // if used
const flap = document.querySelector(".envelope-flap");

let isOpen = false;

openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isOpen) return;
    isOpen = true;

    // Open envelope
    envelope.classList.add("open");

    // Hide button
    openBtn.style.opacity = "0";
    openBtn.style.pointerEvents = "none";
});

// When envelope opening animation ends → show image
flap.addEventListener("animationend", () => {
    if (!isOpen) return;

    if (backdrop) backdrop.classList.add("show");
    surpriseImage.classList.add("show");

    // Auto close after 12 seconds
    setTimeout(closeEverything, 12000);
});

function closeEverything() {
    // Hide image
    surpriseImage.classList.remove("show");
    surpriseImage.style.transform = "translate(-50%, -50%) scale(0)";
    if (backdrop) backdrop.classList.remove("show");

    // Reset envelope
    envelope.classList.remove("open");

    // Bring button back
    openBtn.style.opacity = "1";
    openBtn.style.pointerEvents = "auto";

    isOpen = false;
}





// ========================================
// SURPRISE BUTTONS
// ========================================
function initSurpriseButtons() {
    const musicBtn = document.getElementById('musicBtn');
    const confettiBtn = document.getElementById('confettiBtn');
    const wishBtn = document.getElementById('wishBtn');
    const memoryBtn = document.getElementById('memoryBtn');
    const modal = document.getElementById('wishModal');
    const modalClose = document.getElementById('modalClose');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Music Button
    musicBtn.addEventListener('click', function() {
        if (!musicPlaying) {
            backgroundMusic.play();
            musicPlaying = true;
            this.querySelector('.btn-text').textContent = 'Pause Music';
            createFloatingNotes(this);
        } else {
            backgroundMusic.pause();
            musicPlaying = false;
            this.querySelector('.btn-text').textContent = 'Play Our Song';
        }
    });
    
    // Confetti Button
    confettiBtn.addEventListener('click', function() {
        launchConfetti();
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
    
    // Wish Button - Opens Modal
    wishBtn.addEventListener('click', function() {
        modal.classList.add('active');
        createSparkles(this);
    });
    
    // Close Modal
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Memory Button - Random Quote
    memoryBtn.addEventListener('click', function() {
        changeQuote();
        createHeartBurst(this);
    });
}

// ========================================
// FLOATING MUSIC NOTES
// ========================================
function createFloatingNotes(element) {
    const notes = ['🎵', '🎶', '🎼'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
            note.style.position = 'fixed';
            note.style.left = (rect.left + Math.random() * rect.width) + 'px';
            note.style.top = rect.top + 'px';
            note.style.fontSize = '25px';
            note.style.pointerEvents = 'none';
            note.style.zIndex = '9999';
            document.body.appendChild(note);
            
            note.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: 'translateY(-200px) rotate(360deg)', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => note.remove();
        }, i * 100);
    }
}

// ========================================
// CONFETTI ANIMATION
// ========================================
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#8b4367', '#c97b8e', '#f4d4db', '#d4af37', '#ff69b4'];
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                return false;
            }
            return true;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new Confetti());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            if (confettiPieces[i].update()) {
                confettiPieces[i].draw();
            } else {
                confettiPieces.splice(i, 1);
            }
        }
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// ========================================
// HEART BURST ANIMATION
// ========================================
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.fontSize = '25px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        document.body.appendChild(heart);
        
        const angle = (Math.PI * 2 * i) / heartCount;
        const velocity = 150 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        heart.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0.3)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        }).onfinish = () => heart.remove();
    }
}

// ========================================
// RANDOM QUOTE GENERATOR
// ========================================
function changeQuote() {
    const quotes = [
        {
            text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
            author: "Unknown"
        },
        {
            text: "A successful marriage requires falling in love many times, always with the same person.",
            author: "Mignon McLaughlin"
        },
        {
            text: "The best thing to hold onto in life is each other.",
            author: "Audrey Hepburn"
        },
        {
            text: "Love doesn't make the world go round. Love is what makes the ride worthwhile.",
            author: "Franklin P. Jones"
        },
        {
            text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
            author: "Maya Angelou"
        },
        {
            text: "The greatest marriages are built on teamwork, mutual respect, a healthy dose of admiration, and a never-ending portion of love and grace.",
            author: "Fawn Weaver"
        },
        {
            text: "A happy marriage is a long conversation which always seems too short.",
            author: "Andre Maurois"
        },
        {
            text: "Love is composed of a single soul inhabiting two bodies.",
            author: "Aristotle"
        }
    ];
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    const currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteDisplay.style.opacity = '0';
    
    setTimeout(() => {
        quoteDisplay.innerHTML = `
            ${currentQuote.text}
            <footer>— ${currentQuote.author}</footer>
        `;
        quoteDisplay.style.transition = 'opacity 0.5s ease';
        quoteDisplay.style.opacity = '1';
    }, 300);
}

// ========================================
// GALLERY ITEMS INTERACTION
// ========================================
function initGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a pulsing animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
            
            // Create a visual feedback
            const placeholder = this.querySelector('.photo-placeholder');
            const originalText = placeholder.querySelector('p').textContent;
            
            placeholder.querySelector('p').textContent = '📸 Photo slot reserved!';
            createSparkles(this);
            
            setTimeout(() => {
                placeholder.querySelector('p').textContent = originalText;
            }, 2000);
        });
        
        // Hover effect with floating hearts
        item.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'fixed';
            heart.style.left = (rect.right - 30) + 'px';
            heart.style.top = (rect.top + 10) + 'px';
            heart.style.fontSize = '25px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            
            heart.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-50px) scale(1.5)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => heart.remove();
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
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
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.gallery, .love-letter, .surprises, .quote-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// ========================================
// RESPONSIVE CANVAS RESIZE
// ========================================
window.addEventListener('resize', function() {
    const canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Super confetti explosion!
    for (let i = 0; i < 5; i++) {
        setTimeout(() => launchConfetti(), i * 200);
    }
    
    // Rainbow background effect
    document.body.style.animation = 'rainbow 3s ease infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// ========================================
// CSS ANIMATION FOR EASTER EGG
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ========================================
// SPECIAL MESSAGE ON PAGE LOAD
// ========================================
console.log('%c💕 Happy 24th Anniversary! 💕', 'font-size: 24px; color: #8b4367; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cMade with ❤️ for the most amazing parents', 'font-size: 14px; color: #c97b8e; font-style: italic;');

const scrollBtn = document.getElementById("scrollDown");

scrollBtn.addEventListener("click", () => {
    window.scrollBy({
        top: window.innerHeight, // scroll one viewport height
        behavior: "smooth"
    });
});

function scrollToNext() {
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth"
    });
}
