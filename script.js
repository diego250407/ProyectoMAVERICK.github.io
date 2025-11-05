class ScrollManager {
  constructor() {
    this.sections = document.querySelectorAll('.section');
    this.nav = document.getElementById('mainNav');
    this.scrollToTop = document.getElementById('scrollToTop');
    this.navLinks = document.querySelectorAll('.nav-links a');
    this.emailButton = document.getElementById('emailButton');
    this.emailList = document.getElementById('emailList');
    this.closeEmails = document.getElementById('closeEmails');
    
    this.observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.init();
  }

  init() {
    
    this.handleLoading();
    
    
    this.handleNavigation();
    
    
    this.setupScrollAnimations();
    
    
    this.setupScrollToTop();
    
    
    this.setupSmoothScrolling();
    
    
    this.setupParallax();
    
    
    this.setupEmailList();
  }

  handleLoading() {
    window.addEventListener('load', () => {
      const intro = document.getElementById('intro');
      setTimeout(() => {
        intro.classList.add('hidden');
        // Show nav after loading
        setTimeout(() => {
          this.nav.classList.add('visible');
        }, 500);
      }, 4000);
    });
  }

  handleNavigation() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        this.nav.classList.remove('scrolled');
      } else {
        this.nav.classList.add('scrolled');
      }
      
      lastScrollY = currentScrollY;
      
      
      this.updateActiveNavLink();
    });
  }

  updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    this.navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          
          this.animateChildElements(entry.target);
        }
      });
    }, this.observerOptions);

    
    this.sections.forEach(section => {
      observer.observe(section);
    });

    
    const descriptionCards = document.querySelectorAll('.description-card');
    descriptionCards.forEach((card, index) => {
      observer.observe(card);
      card.style.transitionDelay = `${index * 0.2}s`;
    });

    
    const featuresList = document.querySelector('.features-list');
    if (featuresList) observer.observe(featuresList);

    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      observer.observe(item);
      item.style.transitionDelay = `${index * 0.3}s`;
    });

    
    const mediaItems = document.querySelectorAll('.media-item');
    mediaItems.forEach((item, index) => {
      observer.observe(item);
      item.style.transitionDelay = `${index * 0.1}s`;
    });

    
    const blooperItems = document.querySelectorAll('.blooper-item');
    blooperItems.forEach((item, index) => {
      observer.observe(item);
      item.style.transitionDelay = `${index * 0.1}s`;
    });

    
    const blooperVideo = document.querySelector('.blooper-video');
    if (blooperVideo) observer.observe(blooperVideo);
  }

  animateChildElements(parent) {
    const animatableElements = parent.querySelectorAll('.description-card, .media-item, .blooper-item');
    animatableElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 100);
    });
  }

  setupScrollToTop() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.scrollToTop.classList.add('visible');
      } else {
        this.scrollToTop.classList.remove('visible');
      }
    });

    this.scrollToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.hash);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          
          this.emailList.classList.remove('active');
        }
      });
    });
  }

  setupParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.main-header');
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  setupEmailList() {
    
    this.emailButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.emailList.classList.toggle('active');
    });

    
    this.closeEmails.addEventListener('click', (e) => {
      e.stopPropagation();
      this.emailList.classList.remove('active');
    });

     
    document.addEventListener('click', (e) => {
      if (!this.emailList.contains(e.target) && !this.emailButton.contains(e.target)) {
        this.emailList.classList.remove('active');
      }
    });

     
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.emailList.classList.remove('active');
      }
    });

     
    const emailItems = this.emailList.querySelectorAll('.emails li');
    emailItems.forEach(item => {
      item.addEventListener('click', () => {
        const email = item.querySelector('span').textContent;
        this.copyToClipboard(email);
        this.showCopyFeedback(item);
      });
    });
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Email copiado al portapapeles: ' + text);
    }).catch(err => {
      console.error('Error al copiar email: ', err);
    });
  }

  showCopyFeedback(element) {
    const originalBackground = element.style.backgroundColor;
    element.style.backgroundColor = 'var(--accent)';
    
    setTimeout(() => {
      element.style.backgroundColor = originalBackground;
    }, 500);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new ScrollManager();
});


const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--primary) !important;
  }
  .nav-links a.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);