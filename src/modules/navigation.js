/**
 * Navigation Module
 * Handles navigation menu interactions, mobile menu toggle, smooth scrolling,
 * and active link highlighting based on scroll position.
 * 
 * Requirements: 1.4, 5.2, 5.3
 */

export class Navigation {
  constructor(navElement) {
    if (!navElement) {
      throw new Error('Navigation element is required');
    }

    this.nav = navElement;
    this.hamburger = this.nav.querySelector('.navigation__hamburger');
    this.menu = this.nav.querySelector('.navigation__menu');
    this.overlay = this.nav.querySelector('.navigation__overlay');
    this.menuLinks = this.nav.querySelectorAll('.navigation__menu a');
    this.isMenuOpen = false;

    this.init();
  }

  /**
   * Initialize navigation event listeners
   */
  init() {
    // Hamburger menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Overlay click to close menu
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Menu link clicks for smooth scrolling
    this.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        
        // Close mobile menu after clicking a link
        if (this.isMenuOpen) {
          this.toggleMobileMenu();
        }
      });
    });

    // ESC key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.toggleMobileMenu();
      }
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => this.handleScroll());

    // Initial active link update
    this.handleScroll();
  }

  /**
   * Toggle mobile menu open/closed
   */
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // Toggle classes
    this.menu.classList.toggle('navigation__menu--open');
    this.overlay.classList.toggle('navigation__overlay--visible');
    this.hamburger.classList.toggle('navigation__hamburger--active');

    // Update ARIA attributes
    this.hamburger.setAttribute('aria-expanded', this.isMenuOpen);
    this.hamburger.setAttribute('aria-label', this.isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç');

    // Prevent body scroll when menu is open
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Smooth scroll to a section by ID
   * @param {string} sectionId - The ID of the section to scroll to
   */
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (!section) {
      console.warn(`Section with ID "${sectionId}" not found`);
      return;
    }

    // Get navigation height for offset
    const navHeight = this.nav.offsetHeight;
    const sectionTop = section.offsetTop - navHeight;

    // Check if smooth scroll is supported
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    } else {
      // Fallback for browsers that don't support smooth scroll
      window.scrollTo(0, sectionTop);
    }
  }

  /**
   * Update active link based on current scroll position
   * @param {string} currentSection - The ID of the current section
   */
  updateActiveLink(currentSection) {
    this.menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Handle scroll event to update active link
   */
  handleScroll() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    const navHeight = this.nav.offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100; // Offset for better UX

    let currentSection = '';

    // Find which section is currently in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Default to first section if at top of page
    if (window.scrollY < 100 && sections.length > 0) {
      currentSection = sections[0].getAttribute('id');
    }

    // Update active link
    if (currentSection) {
      this.updateActiveLink(currentSection);
    }
  }
}
