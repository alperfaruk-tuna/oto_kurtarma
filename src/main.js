/**
 * Main JavaScript entry point
 * Initializes all modules and components
 */

import { Navigation } from './modules/navigation.js';
import { ContactForm } from './modules/form.js';
import { AnimationController } from './modules/animations.js';
import { GalleryPage } from './modules/gallery.js';
import LazyLoader from './utils/lazyload.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Oto Kurtarma Website - Initializing...');

  // GPS share button (opens Google Maps with current coords)
  const gpsButton = document.getElementById('share-gps-button');
  if (gpsButton) {
    if (!('geolocation' in navigator)) {
      gpsButton.disabled = true;
      gpsButton.setAttribute('aria-disabled', 'true');
    } else {
      gpsButton.addEventListener('click', async () => {
        try {
          gpsButton.disabled = true;
          gpsButton.textContent = 'Konum alınıyor...';

          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 0,
            });
          });

          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}`;
          window.open(mapsUrl, '_blank', 'noopener,noreferrer');
        } catch (err) {
          console.error('GPS konumu alınamadı:', err);
          alert('Konum izni verilmedi veya konum alınamadı. Lütfen konum servislerini açıp tekrar deneyin.');
        } finally {
          gpsButton.disabled = false;
          gpsButton.textContent = 'Konumumu Paylaş';
        }
      });
    }
  }

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

  // Initialize Gallery on homepage (first 6 images)
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    try {
      const response = await fetch('/assets/images/gallery-data.json');
      const data = await response.json();
      
      // Take only first 6 images
      const firstSixImages = data.images.slice(0, 6);
      
      // Initialize gallery with first 6 images
      new GalleryPage(galleryGrid, firstSixImages);
      console.log('Gallery initialized with 6 images');
    } catch (error) {
      console.error('Failed to load gallery:', error);
    }
  }

  // Initialize Lazy Loading for images
  const lazyLoader = LazyLoader.init('[data-src], img[loading="lazy"]', {
    rootMargin: '50px',
    threshold: 0.01
  });
  console.log('Lazy loading initialized');
});
