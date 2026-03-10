/**
 * Animation Controller Module
 * Handles scroll animations (fade in, slide up) and hover effects
 * for enhanced user experience with smooth transitions.
 * 
 * Requirements: 8.5
 */

export class AnimationController {
  constructor() {
    this.animatedElements = [];
    this.observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    this.init();
  }

  /**
   * Initialize animation controller
   */
  init() {
    this.initScrollAnimations();
    this.addHoverEffects();
  }

  /**
   * Initialize scroll-based animations using Intersection Observer
   */
  initScrollAnimations() {
    // Select elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll(
      '.service-card, .gallery__item, .contact__form, .contact__info, .hero__content'
    );

    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateOnScroll(entry.target);
            observer.unobserve(entry.target); // Animate only once
          }
        });
      }, this.observerOptions);

      // Observe each element
      elementsToAnimate.forEach(element => {
        // Add initial animation class
        element.classList.add('animate-on-scroll');
        observer.observe(element);
        this.animatedElements.push(element);
      });
    } else {
      // Fallback: show all elements immediately without animation
      elementsToAnimate.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }
  }

  /**
   * Animate element when it enters viewport
   * @param {HTMLElement} element - The element to animate
   */
  animateOnScroll(element) {
    // Determine animation type based on element
    if (element.classList.contains('service-card')) {
      element.classList.add('fade-in');
    } else if (element.classList.contains('gallery__item')) {
      element.classList.add('fade-in');
    } else if (element.classList.contains('contact__form') || 
               element.classList.contains('contact__info')) {
      element.classList.add('slide-up');
    } else if (element.classList.contains('hero__content')) {
      element.classList.add('fade-in');
    } else {
      // Default animation
      element.classList.add('fade-in');
    }
  }

  /**
   * Add hover effects to interactive elements
   */
  addHoverEffects() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.classList.add('hover-scale');
    });

    // Gallery items hover effect
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach(item => {
      item.classList.add('hover-scale');
    });

    // Buttons hover effect
    const buttons = document.querySelectorAll('button, .btn, .hero__cta');
    buttons.forEach(button => {
      button.classList.add('hover-lift');
    });

    // Navigation links hover effect
    const navLinks = document.querySelectorAll('.navigation__menu a');
    navLinks.forEach(link => {
      link.classList.add('hover-underline');
    });
  }

  /**
   * Reset animations (useful for testing or dynamic content)
   */
  reset() {
    this.animatedElements.forEach(element => {
      element.classList.remove('fade-in', 'slide-up', 'animate-on-scroll');
    });
    this.animatedElements = [];
  }

  /**
   * Manually trigger animation on specific element
   * @param {HTMLElement} element - The element to animate
   * @param {string} animationType - Type of animation ('fade-in' or 'slide-up')
   */
  triggerAnimation(element, animationType = 'fade-in') {
    if (!element) {
      console.warn('Element not found for animation');
      return;
    }

    element.classList.add('animate-on-scroll');
    
    // Small delay to ensure CSS transition works
    setTimeout(() => {
      element.classList.add(animationType);
    }, 10);
  }
}
