/**
 * LazyLoader - Image and video lazy loading utility
 * Uses Intersection Observer API with fallback for older browsers
 * Validates: Requirements 6.2, 6.3
 */

class LazyLoader {
  /**
   * Initialize LazyLoader with custom options
   * @param {Object} options - Configuration options
   * @param {number} options.rootMargin - Margin around viewport (default: '50px')
   * @param {number} options.threshold - Intersection threshold (default: 0.01)
   */
  constructor(options = {}) {
    this.options = {
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.01
    };

    this.observer = null;
    this.supportsIntersectionObserver = 'IntersectionObserver' in window;

    if (this.supportsIntersectionObserver) {
      this.initObserver();
    }
  }

  /**
   * Initialize Intersection Observer
   * @private
   */
  initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadElement(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      }
    );
  }

  /**
   * Observe elements for lazy loading
   * @param {NodeList|Array|Element} elements - Elements to observe
   */
  observe(elements) {
    // Convert single element to array
    if (elements instanceof Element) {
      elements = [elements];
    }

    // Convert NodeList to Array
    const elementsArray = Array.from(elements);

    if (this.supportsIntersectionObserver) {
      // Use Intersection Observer
      elementsArray.forEach((element) => {
        if (element) {
          this.observer.observe(element);
        }
      });
    } else {
      // Fallback: Load all images immediately for older browsers
      elementsArray.forEach((element) => {
        if (element) {
          this.loadElement(element);
        }
      });
    }
  }

  /**
   * Load an image or video element
   * @param {Element} element - Element to load
   */
  loadElement(element) {
    if (!element) return;

    const tagName = element.tagName.toLowerCase();

    if (tagName === 'img') {
      this.loadImage(element);
    } else if (tagName === 'video') {
      this.loadVideo(element);
    } else if (tagName === 'picture') {
      this.loadPicture(element);
    }
  }

  /**
   * Load an image with WebP support and fallback
   * @param {HTMLImageElement} img - Image element to load
   */
  loadImage(img) {
    // Get data attributes
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    const srcWebp = img.dataset.srcWebp;

    if (!src && !srcset) return;

    // Add loading class for transition effects
    img.classList.add('lazy-loading');

    // Handle WebP with fallback
    if (srcWebp && this.supportsWebP()) {
      img.src = srcWebp;
    } else if (src) {
      img.src = src;
    }

    // Handle srcset for responsive images
    if (srcset) {
      img.srcset = srcset;
    }

    // Handle load success
    img.onload = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
      img.removeAttribute('data-src');
      img.removeAttribute('data-srcset');
      img.removeAttribute('data-src-webp');
    };

    // Handle load error
    img.onerror = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
      console.error(`Failed to load image: ${src || srcWebp}`);
      
      // Try fallback to JPEG if WebP failed
      if (srcWebp && src && img.src === srcWebp) {
        img.src = src;
      }
    };
  }

  /**
   * Load a video element
   * @param {HTMLVideoElement} video - Video element to load
   */
  loadVideo(video) {
    const sources = video.querySelectorAll('source');
    
    sources.forEach((source) => {
      const src = source.dataset.src;
      if (src) {
        source.src = src;
        source.removeAttribute('data-src');
      }
    });

    // Load the video
    video.load();
    video.classList.add('lazy-loaded');
  }

  /**
   * Load a picture element with multiple sources
   * @param {HTMLPictureElement} picture - Picture element to load
   */
  loadPicture(picture) {
    const sources = picture.querySelectorAll('source');
    const img = picture.querySelector('img');

    sources.forEach((source) => {
      const srcset = source.dataset.srcset;
      if (srcset) {
        source.srcset = srcset;
        source.removeAttribute('data-srcset');
      }
    });

    if (img) {
      this.loadImage(img);
    }
  }

  /**
   * Check if browser supports WebP format
   * @returns {boolean} True if WebP is supported
   */
  supportsWebP() {
    // Check if we've already tested
    if (this._webpSupport !== undefined) {
      return this._webpSupport;
    }

    // Create a test canvas
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      // Check if toDataURL supports WebP
      this._webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } else {
      this._webpSupport = false;
    }

    return this._webpSupport;
  }

  /**
   * Disconnect the observer and clean up
   */
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Static method to initialize lazy loading on page
   * @param {string} selector - CSS selector for elements to lazy load (default: '[data-src]')
   * @param {Object} options - LazyLoader options
   * @returns {LazyLoader} LazyLoader instance
   */
  static init(selector = '[data-src]', options = {}) {
    const loader = new LazyLoader(options);
    const elements = document.querySelectorAll(selector);
    loader.observe(elements);
    return loader;
  }
}

export default LazyLoader;
