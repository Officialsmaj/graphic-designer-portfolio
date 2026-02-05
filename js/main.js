// ==========================
// Push Menu Toggle
// ==========================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
    navLinks.classList.remove('show');
    document.body.classList.remove('menu-open');
});

// ==========================
// Hero Section Rotating Titles
// ==========================
const titles = [
    "Graphic Design",
    "Digital Design",
    "Web Design",
    "Branding",
    "Packaging Design",
    "3D Design"
];

let currentIndex = 0;
const titleElement = document.getElementById('rotating-titles');

// Function to rotate titles
function rotateTitle() {
    // Fade out
    titleElement.style.opacity = 0;

    setTimeout(() => {
        // Change text
        currentIndex = (currentIndex + 1) % titles.length;
        titleElement.textContent = titles[currentIndex];

        // Fade in
        titleElement.style.opacity = 1;
    }, 500); // matches CSS transition duration
}

// Rotate every 3 seconds
setInterval(rotateTitle, 3000);

// ==========================
// Optional: GSAP Animations (fade-in sections)
// ==========================
if (typeof gsap !== 'undefined') {
    gsap.utils.toArray('.section-title, .work-item, .service-item, .cta-section').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
}

// ==========================
// Portfolio Filtering
// ==========================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                gsap.to(item, {opacity: 1, y: 0, duration: 0.5});
            } else {
                gsap.to(item, {opacity: 0, y: 50, duration: 0.5, onComplete: () => {
                    item.style.display = 'none';
                }});
            }
        });
    });
});

// Horizontal auto-scroll using GSAP
const gallery = document.getElementById('gallery');
const items = document.querySelectorAll('.item');

let galleryWidth = gallery.scrollWidth;
let xPos = 0;

gsap.to({}, {
  duration: 0.016,
  repeat: -1,
  onRepeat: () => {
    xPos -= 0.5; // auto-scroll speed (px/frame)
    if(xPos <= -galleryWidth/2) xPos = 0;
    gallery.style.transform = `translateX(${xPos}px)`;
  }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');

items.forEach(item => {
  item.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = item.querySelector('img').src;
  });
});

closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => { 
  if(e.target === lightbox) lightbox.style.display = 'none';
});

// Optional: drag to scroll (desktop)
const wrapper = document.getElementById('galleryWrapper');
let isDown = false;
let startX;
let scrollLeft;

wrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  wrapper.classList.add('active');
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener('mouseleave', () => isDown = false);
wrapper.addEventListener('mouseup', () => isDown = false);

wrapper.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 2; // scroll speed
  wrapper.scrollLeft = scrollLeft - walk;
});