/**
 * Main JavaScript entry point
 * Initializes all modules and components
 */

import { Navigation } from './modules/navigation.js';
import { ContactForm } from './modules/form.js';
import { AnimationController } from './modules/animations.js';
import LazyLoader from './utils/lazyload.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Oto Kurtarma Website - Initializing...');

  // Initialize Navigation
  const navElement = document.getElementById('navigation');
  if (navElement) {
    const navigation = new Navigation(navElement);
    console.log('Navigation initialized');
  }

  // Initialize Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const form = new ContactForm(contactForm);
    console.log('Contact form initialized');
  }

  // Initialize Animation Controller
  const animationController = new AnimationController();
  console.log('Animation controller initialized');

  // Initialize Lazy Loading for images
  const lazyLoader = LazyLoader.init('[data-src], img[loading="lazy"]', {
    rootMargin: '50px',
    threshold: 0.01
  });
  console.log('Lazy loading initialized');
});
