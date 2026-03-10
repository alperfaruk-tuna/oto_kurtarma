/**
 * Gallery Module
 * Handles gallery rendering, lightbox modal, keyboard navigation,
 * and video player integration.
 * 
 * Requirements: 3.3, 3.7
 */

export class Gallery {
  constructor(galleryElement, images) {
    if (!galleryElement) {
      throw new Error('Gallery element is required');
    }

    this.gallery = galleryElement;
    this.images = images || [];
    this.currentIndex = 0;
    this.lightbox = null;
    this.lightboxImage = null;
    this.lightboxVideo = null;
    this.lightboxCounter = null;
    this.prevButton = null;
    this.nextButton = null;
    this.closeButton = null;

    this.init();
  }

  /**
   * Initialize gallery
   */
  init() {
    // Get lightbox elements
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = this.lightbox?.querySelector('.lightbox__image');
    this.lightboxVideo = this.lightbox?.querySelector('.lightbox__video');
    this.lightboxCounter = this.lightbox?.querySelector('.lightbox__counter');
    this.prevButton = this.lightbox?.querySelector('.lightbox__prev');
    this.nextButton = this.lightbox?.querySelector('.lightbox__next');
    this.closeButton = this.lightbox?.querySelector('.lightbox__close');

    // Render gallery
    this.renderGallery();

    // Setup lightbox event listeners
    this.setupLightboxListeners();
  }

  /**
   * Render gallery grid with images and video
   */
  renderGallery() {
    if (!this.gallery || this.images.length === 0) {
      return;
    }

    // Clear existing content
    this.gallery.innerHTML = '';

    // Create gallery items
    this.images.forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery__item';
      galleryItem.dataset.index = index;

      if (item.type === 'video') {
        // Add video class for CSS styling
        galleryItem.classList.add('gallery__item--video');
        
        // Create video thumbnail image
        const img = document.createElement('img');
        img.className = 'gallery__image';
        img.src = item.thumbnail;
        img.alt = item.alt;
        img.loading = 'lazy';
        
        galleryItem.appendChild(img);
      } else {
        // Create image element
        const img = document.createElement('img');
        img.className = 'gallery__image';
        img.src = item.thumbnail || item.src;
        img.alt = item.alt;
        img.loading = 'lazy';
        img.dataset.fullSrc = item.src;
        
        galleryItem.appendChild(img);
      }

      // Add click event to open lightbox
      galleryItem.addEventListener('click', () => {
        this.openLightbox(index);
      });

      // Add keyboard support for gallery items
      galleryItem.setAttribute('tabindex', '0');
      galleryItem.setAttribute('role', 'button');
      galleryItem.setAttribute('aria-label', item.alt);
      
      galleryItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(index);
        }
      });

      this.gallery.appendChild(galleryItem);
    });
  }

  /**
   * Setup lightbox event listeners
   */
  setupLightboxListeners() {
    if (!this.lightbox) return;

    // Close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeLightbox());
    }

    // Previous button
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.navigateLightbox('prev'));
    }

    // Next button
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.navigateLightbox('next'));
    }

    // Click outside content to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('lightbox--active')) return;

      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.navigateLightbox('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.navigateLightbox('next');
          break;
      }
    });
  }

  /**
   * Open lightbox with specific image/video
   * @param {number} imageIndex - Index of the image/video to display
   */
  openLightbox(imageIndex) {
    if (!this.lightbox || imageIndex < 0 || imageIndex >= this.images.length) {
      return;
    }

    this.currentIndex = imageIndex;
    const item = this.images[this.currentIndex];

    // Show/hide appropriate media element
    if (item.type === 'video') {
      // Show video, hide image
      this.lightboxImage.style.display = 'none';
      this.lightboxVideo.style.display = 'block';
      
      // Set video source
      const source = this.lightboxVideo.querySelector('source');
      source.src = item.src;
      this.lightboxVideo.load();
    } else {
      // Show image, hide video
      this.lightboxImage.style.display = 'block';
      this.lightboxVideo.style.display = 'none';
      
      // Pause video if it was playing
      if (this.lightboxVideo) {
        this.lightboxVideo.pause();
      }
      
      // Set image source
      this.lightboxImage.src = item.src;
      this.lightboxImage.alt = item.alt;
    }

    // Update counter
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    // Update navigation button states
    this.updateNavigationButtons();

    // Show lightbox
    this.lightbox.classList.add('lightbox--active');
    this.lightbox.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (this.closeButton) {
      this.closeButton.focus();
    }
  }

  /**
   * Close lightbox
   */
  closeLightbox() {
    if (!this.lightbox) return;

    // Pause video if playing
    if (this.lightboxVideo) {
      this.lightboxVideo.pause();
    }

    // Hide lightbox
    this.lightbox.classList.remove('lightbox--active');
    this.lightbox.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to the gallery item that was clicked
    const galleryItems = this.gallery.querySelectorAll('.gallery__item');
    if (galleryItems[this.currentIndex]) {
      galleryItems[this.currentIndex].focus();
    }
  }

  /**
   * Navigate lightbox (previous/next)
   * @param {string} direction - 'prev' or 'next'
   */
  navigateLightbox(direction) {
    if (direction === 'prev') {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    } else if (direction === 'next') {
      this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    }

    const item = this.images[this.currentIndex];

    // Update media display
    if (item.type === 'video') {
      this.lightboxImage.style.display = 'none';
      this.lightboxVideo.style.display = 'block';
      
      const source = this.lightboxVideo.querySelector('source');
      source.src = item.src;
      this.lightboxVideo.load();
    } else {
      this.lightboxImage.style.display = 'block';
      this.lightboxVideo.style.display = 'none';
      
      if (this.lightboxVideo) {
        this.lightboxVideo.pause();
      }
      
      this.lightboxImage.src = item.src;
      this.lightboxImage.alt = item.alt;
    }

    // Update counter
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    // Update navigation button states
    this.updateNavigationButtons();
  }

  /**
   * Update navigation button states (enable/disable)
   */
  updateNavigationButtons() {
    if (!this.prevButton || !this.nextButton) return;

    // Always enable both buttons for circular navigation
    this.prevButton.disabled = false;
    this.nextButton.disabled = false;
    
    // Update ARIA labels with current position
    this.prevButton.setAttribute('aria-label', `Önceki görsel (${this.currentIndex} / ${this.images.length})`);
    this.nextButton.setAttribute('aria-label', `Sonraki görsel (${this.currentIndex + 2} / ${this.images.length})`);
  }

  /**
   * Lazy load images as they come into view
   */
  lazyLoadImages() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately
      const images = this.gallery.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        if (img.dataset.fullSrc) {
          img.src = img.dataset.fullSrc;
        }
      });
      return;
    }

    // Use Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.fullSrc) {
            img.src = img.dataset.fullSrc;
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px' // Start loading 50px before image enters viewport
    });

    // Observe all lazy images
    const lazyImages = this.gallery.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}


/**
 * GalleryPage Class
 * Handles the separate gallery page with captions
 */
export class GalleryPage {
  constructor(galleryElement, images) {
    if (!galleryElement) {
      throw new Error('Gallery element is required');
    }

    this.gallery = galleryElement;
    this.images = images || [];
    this.currentIndex = 0;
    this.lightbox = null;
    this.lightboxImage = null;
    this.lightboxVideo = null;
    this.lightboxCounter = null;
    this.prevButton = null;
    this.nextButton = null;
    this.closeButton = null;

    this.init();
  }

  /**
   * Initialize gallery page
   */
  init() {
    // Get lightbox elements
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = this.lightbox?.querySelector('.lightbox__image');
    this.lightboxVideo = this.lightbox?.querySelector('.lightbox__video');
    this.lightboxCounter = this.lightbox?.querySelector('.lightbox__counter');
    this.prevButton = this.lightbox?.querySelector('.lightbox__prev');
    this.nextButton = this.lightbox?.querySelector('.lightbox__next');
    this.closeButton = this.lightbox?.querySelector('.lightbox__close');

    // Render gallery with captions
    this.renderGalleryPage();

    // Setup lightbox event listeners
    this.setupLightboxListeners();
  }

  /**
   * Render gallery page grid with images and captions
   */
  renderGalleryPage() {
    if (!this.gallery || this.images.length === 0) {
      return;
    }

    // Clear existing content
    this.gallery.innerHTML = '';

    // Determine if we're on the main page or gallery page based on parent class
    const isMainPage = this.gallery.classList.contains('gallery-section__grid') || 
                       this.gallery.id === 'gallery-grid';
    const cardClass = isMainPage ? 'gallery-page__card' : 'gallery-page__card';
    const imageContainerClass = 'gallery-page__image-container';
    const imageClass = 'gallery-page__image';
    const captionClass = 'gallery-page__caption';

    // Create gallery items with captions
    this.images.forEach((item, index) => {
      const galleryCard = document.createElement('article');
      galleryCard.className = cardClass;
      galleryCard.dataset.index = index;

      // Create image container
      const imageContainer = document.createElement('div');
      imageContainer.className = imageContainerClass;

      // Create image element
      const img = document.createElement('img');
      img.className = imageClass;
      img.src = item.thumbnail || item.src;
      img.alt = item.alt;
      img.loading = 'lazy';
      img.dataset.fullSrc = item.src;

      imageContainer.appendChild(img);

      // Add click event to open lightbox
      imageContainer.addEventListener('click', () => {
        this.openLightbox(index);
      });

      // Add keyboard support
      imageContainer.setAttribute('tabindex', '0');
      imageContainer.setAttribute('role', 'button');
      imageContainer.setAttribute('aria-label', `${item.alt} - Büyütmek için tıklayın`);

      imageContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(index);
        }
      });

      // Create caption
      const caption = document.createElement('p');
      caption.className = captionClass;
      caption.textContent = item.caption || item.alt;

      // Append elements
      galleryCard.appendChild(imageContainer);
      galleryCard.appendChild(caption);
      this.gallery.appendChild(galleryCard);
    });
  }

  /**
   * Setup lightbox event listeners
   */
  setupLightboxListeners() {
    if (!this.lightbox) return;

    // Close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeLightbox());
    }

    // Previous button
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.navigateLightbox('prev'));
    }

    // Next button
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.navigateLightbox('next'));
    }

    // Click outside content to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('lightbox--active')) return;

      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.navigateLightbox('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.navigateLightbox('next');
          break;
      }
    });
  }

  /**
   * Open lightbox with specific image
   * @param {number} imageIndex - Index of the image to display
   */
  openLightbox(imageIndex) {
    if (!this.lightbox || imageIndex < 0 || imageIndex >= this.images.length) {
      return;
    }

    this.currentIndex = imageIndex;
    const item = this.images[this.currentIndex];

    // Show image, hide video
    this.lightboxImage.style.display = 'block';
    this.lightboxVideo.style.display = 'none';

    // Set image source
    this.lightboxImage.src = item.src;
    this.lightboxImage.alt = item.alt;

    // Update counter
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    // Update navigation button states
    this.updateNavigationButtons();

    // Show lightbox
    this.lightbox.classList.add('lightbox--active');
    this.lightbox.setAttribute('aria-hidden', 'false');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (this.closeButton) {
      this.closeButton.focus();
    }
  }

  /**
   * Close lightbox
   */
  closeLightbox() {
    if (!this.lightbox) return;

    // Hide lightbox
    this.lightbox.classList.remove('lightbox--active');
    this.lightbox.setAttribute('aria-hidden', 'true');

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to the gallery item that was clicked
    const galleryCards = this.gallery.querySelectorAll('.gallery-page__card');
    if (galleryCards[this.currentIndex]) {
      const imageContainer = galleryCards[this.currentIndex].querySelector('.gallery-page__image-container');
      if (imageContainer) {
        imageContainer.focus();
      }
    }
  }

  /**
   * Navigate lightbox (previous/next)
   * @param {string} direction - 'prev' or 'next'
   */
  navigateLightbox(direction) {
    if (direction === 'prev') {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    } else if (direction === 'next') {
      this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    }

    const item = this.images[this.currentIndex];

    // Update image
    this.lightboxImage.src = item.src;
    this.lightboxImage.alt = item.alt;

    // Update counter
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    // Update navigation button states
    this.updateNavigationButtons();
  }

  /**
   * Update navigation button states
   */
  updateNavigationButtons() {
    if (!this.prevButton || !this.nextButton) return;

    // Always enable both buttons for circular navigation
    this.prevButton.disabled = false;
    this.nextButton.disabled = false;

    // Update ARIA labels with current position
    this.prevButton.setAttribute('aria-label', `Önceki görsel (${this.currentIndex} / ${this.images.length})`);
    this.nextButton.setAttribute('aria-label', `Sonraki görsel (${this.currentIndex + 2} / ${this.images.length})`);
  }
}
