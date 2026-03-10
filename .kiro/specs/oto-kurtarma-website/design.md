# Design Document: Oto Kurtarma Website

## Overview

Bu tasarım dokümanı, yerel bir oto kurtarma işletmesi için modern, responsive ve performanslı bir web sitesinin teknik mimarisini tanımlar. Web sitesi, müşterilere hizmet bilgisi sunmak, güven oluşturmak ve kolay iletişim sağlamak amacıyla tasarlanmıştır.

### Teknoloji Stack

- **Frontend Framework**: HTML5, CSS3, Vanilla JavaScript (framework-free, lightweight approach)
- **CSS Methodology**: BEM (Block Element Modifier) naming convention
- **Image Optimization**: WebP format with JPEG fallback
- **Build Tool**: Vite (for development server and production build)
- **Deployment**: Static hosting (Netlify, Vercel, or similar)

### Tasarım Prensipleri

1. **Mobile-First**: Tasarım küçük ekranlardan başlayarak büyük ekranlara doğru genişler
2. **Progressive Enhancement**: Temel işlevsellik tüm tarayıcılarda çalışır, modern özellikler ek deneyim sağlar
3. **Performance-First**: Lazy loading, image optimization, ve minimal JavaScript kullanımı
4. **Accessibility**: WCAG 2.1 AA standartlarına uygun semantik HTML ve kontrast oranları
5. **Simplicity**: Sade, profesyonel ve kullanıcı dostu arayüz

## Architecture

### Sistem Mimarisi

Web sitesi statik bir single-page application (SPA) olarak tasarlanmıştır. Tüm içerik client-side'da render edilir ve backend gerektirmez.

```
┌─────────────────────────────────────────┐
│         Static Web Hosting              │
│  (Netlify / Vercel / GitHub Pages)      │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         HTML Entry Point                │
│           (index.html)                  │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│   CSS Files  │        │  JS Modules  │
│  (styles/)   │        │   (src/)     │
└──────────────┘        └──────────────┘
        │                       │
        └───────────┬───────────┘
                    ▼
        ┌───────────────────────┐
        │   Static Assets       │
        │  (images, videos)     │
        └───────────────────────┘
```

### Modül Yapısı

```
oto-kurtarma-website/
├── index.html              # Ana HTML dosyası
├── src/
│   ├── main.js            # Ana JavaScript entry point
│   ├── modules/
│   │   ├── navigation.js  # Navigation ve mobile menu
│   │   ├── gallery.js     # Gallery ve lightbox
│   │   ├── form.js        # Contact form validation
│   │   └── animations.js  # Scroll animations ve effects
│   └── utils/
│       ├── lazyload.js    # Image lazy loading
│       └── helpers.js     # Utility functions
├── styles/
│   ├── main.css           # Ana CSS dosyası
│   ├── base/
│   │   ├── reset.css      # CSS reset
│   │   ├── typography.css # Font ve text styles
│   │   └── variables.css  # CSS custom properties
│   ├── components/
│   │   ├── hero.css       # Hero section styles
│   │   ├── services.css   # Services section styles
│   │   ├── gallery.css    # Gallery styles
│   │   ├── contact.css    # Contact section styles
│   │   └── navigation.css # Navigation styles
│   └── utilities/
│       └── responsive.css # Media queries
├── assets/
│   ├── images/            # Optimized images
│   └── videos/            # Video files
└── public/
    └── favicon.ico        # Favicon
```

## Components and Interfaces

### 1. Navigation Component

**Sorumluluk**: Site içi navigasyon ve mobile menu yönetimi

**Interface**:
```javascript
class Navigation {
  constructor(navElement)
  toggleMobileMenu()
  scrollToSection(sectionId)
  updateActiveLink(currentSection)
  handleScroll()
}
```

**Davranış**:
- Desktop'ta horizontal menu, mobile'da hamburger menu
- Smooth scroll navigation
- Active link highlighting based on scroll position
- Mobile menu overlay with close button

### 2. Hero Section Component

**Sorumluluk**: Ana sayfa hero bölümü ve CTA yönetimi

**Özellikler**:
- Background image (arkaplan.jpg) with overlay
- Business name ve tagline
- CTA button (scroll to contact)
- Responsive text sizing

**CSS Structure**:
```css
.hero {
  background-image: url('../assets/images/arkaplan.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.hero__overlay {
  background: rgba(0, 0, 0, 0.5); /* Readability için */
}

.hero__content {
  /* Centered content */
}

.hero__cta {
  /* Call-to-action button */
}
```

### 3. Services Component

**Sorumluluk**: Hizmet kartlarını grid layout'ta gösterme

**Interface**:
```javascript
class ServicesGrid {
  constructor(servicesData)
  renderServiceCards()
  createServiceCard(service)
}
```

**Service Data Model**:
```javascript
{
  icon: 'icon-name',
  title: 'Hizmet Başlığı',
  description: 'Hizmet açıklaması'
}
```

**Services List**:
1. 24/7 Çekici Hizmeti
2. Oto Kurtarma
3. Yol Yardımı
4. Araç Taşıma

**Layout**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

### 4. Gallery Component

**Sorumluluk**: Fotoğraf galerisi ve lightbox yönetimi

**Interface**:
```javascript
class Gallery {
  constructor(galleryElement, images)
  renderGallery()
  openLightbox(imageIndex)
  closeLightbox()
  navigateLightbox(direction)
  lazyLoadImages()
}
```

**Özellikler**:
- Responsive grid (2 columns mobile, 4 columns desktop)
- Lightbox modal for enlarged view
- Keyboard navigation (arrow keys, ESC)
- Video player integration
- Lazy loading for performance

**Image Sources**:
- 15 JPEG images from fotolar directory
- 1 MP4 video file

### 5. Contact Form Component

**Sorumluluk**: İletişim formu ve validation

**Interface**:
```javascript
class ContactForm {
  constructor(formElement)
  validateField(field)
  validateForm()
  handleSubmit(event)
  showSuccessMessage()
  showErrorMessage(field, message)
  resetForm()
}
```

**Form Fields**:
```javascript
{
  name: { required: true, minLength: 2 },
  phone: { required: true, pattern: /^[0-9]{10,11}$/ },
  message: { required: true, minLength: 10 }
}
```

**Validation Rules**:
- Name: En az 2 karakter
- Phone: 10-11 rakam
- Message: En az 10 karakter
- Real-time validation on blur
- Submit button disabled until valid

### 6. Contact Information Component

**Sorumluluk**: İletişim bilgilerini gösterme

**Özellikler**:
- Clickable phone number (tel: link)
- WhatsApp button with pre-filled message
- Email link (mailto:)
- Address information
- Business hours
- Social media links (optional)

### 7. Lazy Loading Utility

**Sorumluluk**: Görüntülerin performanslı yüklenmesi

**Interface**:
```javascript
class LazyLoader {
  constructor(options)
  observe(elements)
  loadImage(element)
  disconnect()
}
```

**Implementation**:
- Intersection Observer API kullanımı
- Placeholder blur effect
- Progressive image loading
- Fallback for older browsers

### 8. Animation Controller

**Sorumluluk**: Scroll animations ve hover effects

**Interface**:
```javascript
class AnimationController {
  constructor()
  initScrollAnimations()
  animateOnScroll(element)
  addHoverEffects()
}
```

**Animation Types**:
- Fade in on scroll
- Slide up on scroll
- Hover scale effects on cards
- Smooth transitions

## Data Models

### Service Model

```javascript
interface Service {
  id: string;
  icon: string;        // Icon class name or SVG path
  title: string;       // Service title
  description: string; // Brief description (max 100 chars)
}
```

**Example**:
```javascript
{
  id: 'cekici-hizmeti',
  icon: 'truck-icon',
  title: '24/7 Çekici Hizmeti',
  description: 'Gece gündüz kesintisiz çekici hizmeti ile yanınızdayız.'
}
```

### Gallery Image Model

```javascript
interface GalleryImage {
  id: string;
  src: string;         // Image path
  srcWebP: string;     // WebP version path
  alt: string;         // Alt text for accessibility
  thumbnail: string;   // Thumbnail version
  width: number;       // Original width
  height: number;      // Original height
  type: 'image' | 'video';
}
```

**Example**:
```javascript
{
  id: 'img-001',
  src: '/assets/images/work-1.jpg',
  srcWebP: '/assets/images/work-1.webp',
  alt: 'Oto kurtarma çalışması - araç taşıma',
  thumbnail: '/assets/images/work-1-thumb.jpg',
  width: 1200,
  height: 800,
  type: 'image'
}
```

### Contact Form Data Model

```javascript
interface ContactFormData {
  name: string;
  phone: string;
  message: string;
  timestamp: Date;
}
```

### Validation Error Model

```javascript
interface ValidationError {
  field: string;
  message: string;
  isValid: boolean;
}
```

### Configuration Model

```javascript
interface SiteConfig {
  business: {
    name: string;
    tagline: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    hours: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
  };
}
```

**Example Configuration**:
```javascript
{
  business: {
    name: 'Oto Kurtarma',
    tagline: 'Güvenilir ve Hızlı Hizmet',
    phone: '+90 XXX XXX XX XX',
    whatsapp: '+90 XXX XXX XX XX',
    email: 'info@otokurtarma.com',
    address: 'Adres bilgisi',
    hours: '7/24 Hizmet'
  },
  seo: {
    title: 'Oto Kurtarma - 24/7 Çekici ve Yol Yardım Hizmeti',
    description: 'Profesyonel oto kurtarma, çekici ve yol yardım hizmeti. 7/24 hizmetinizdeyiz.',
    keywords: ['oto kurtarma', 'çekici', 'yol yardım', 'araç taşıma'],
    ogImage: '/assets/images/og-image.jpg'
  },
  theme: {
    primaryColor: '#1a1a1a',
    secondaryColor: '#f4f4f4',
    accentColor: '#ff6b00',
    textColor: '#333333'
  }
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Text Contrast Accessibility

*For any* text element on the website, the color contrast ratio between the text and its background must be at least 4.5:1 to ensure readability and WCAG AA compliance.

**Validates: Requirements 1.5, 7.6**

### Property 2: Service Card Structure Completeness

*For any* service card rendered on the services section, it must contain exactly three required elements: an icon, a title, and a description.

**Validates: Requirements 2.2**

### Property 3: Responsive Grid Adaptation

*For any* viewport width, the services grid and gallery grid must adapt their column count appropriately: single column for widths ≤768px, and multiple columns for widths >768px.

**Validates: Requirements 2.4**

### Property 4: Gallery Lightbox Interaction

*For any* gallery image element, clicking on it must trigger the lightbox modal to open and display the enlarged version of that specific image.

**Validates: Requirements 3.3**

### Property 5: Form Validation Enforcement

*For any* contact form submission attempt, if any required field (name, phone, or message) is empty or invalid, the form must prevent submission and display appropriate validation error messages.

**Validates: Requirements 4.3**

### Property 6: Form Success Feedback

*For any* contact form submission with valid data (non-empty name with min 2 chars, valid phone number with 10-11 digits, and message with min 10 chars), the system must display a success message to the user.

**Validates: Requirements 4.4**

### Property 7: Body Text Readability

*For any* body text element (paragraphs, descriptions, form labels), the computed font size must be between 16px and 18px inclusive to maintain readability across devices.

**Validates: Requirements 5.4**

### Property 8: Touch Target Accessibility

*For any* interactive element (buttons, links, form inputs) on mobile devices (viewport width ≤768px), the touch target area must be at least 44x44 pixels to ensure usability.

**Validates: Requirements 5.6**

### Property 9: Initial Load Performance

*For any* initial page load on a standard 4G connection, the time to interactive (TTI) must be 3 seconds or less, ensuring users can quickly access information.

**Validates: Requirements 6.1**

### Property 10: Below-Fold Image Lazy Loading

*For any* image element that is positioned below the initial viewport (below the fold), it must be configured for lazy loading using either the loading="lazy" attribute or Intersection Observer API.

**Validates: Requirements 6.2**

### Property 11: Image Format Optimization

*For any* image asset used in the gallery or throughout the site, it must be available in WebP format for modern browsers with a JPEG fallback for compatibility, and the file size must not exceed 200KB for optimal performance.

**Validates: Requirements 6.3, 6.5**

### Property 12: Image Alternative Text

*For any* img element in the HTML, it must include a descriptive alt attribute that accurately describes the image content for screen readers and accessibility.

**Validates: Requirements 7.3**

### Property 13: Semantic Heading Hierarchy

*For any* sequence of heading elements (h1, h2, h3, h4, h5, h6) in the document, they must follow proper hierarchical order without skipping levels (e.g., h1 → h2 → h3, not h1 → h3).

**Validates: Requirements 7.5**

## Error Handling

### Client-Side Error Scenarios

#### 1. Form Validation Errors

**Scenario**: User submits form with invalid data

**Handling**:
- Validate each field on blur and on submit
- Display inline error messages below each invalid field
- Prevent form submission until all validations pass
- Maintain user input (don't clear fields on error)
- Focus on first invalid field

**Error Messages**:
```javascript
{
  name: {
    empty: 'Lütfen adınızı girin',
    tooShort: 'Ad en az 2 karakter olmalıdır'
  },
  phone: {
    empty: 'Lütfen telefon numaranızı girin',
    invalid: 'Geçerli bir telefon numarası girin (10-11 rakam)'
  },
  message: {
    empty: 'Lütfen mesajınızı girin',
    tooShort: 'Mesaj en az 10 karakter olmalıdır'
  }
}
```

#### 2. Image Loading Failures

**Scenario**: Gallery image fails to load

**Handling**:
- Display placeholder image with error icon
- Log error to console for debugging
- Don't break gallery layout
- Provide alt text for context

**Implementation**:
```javascript
image.onerror = function() {
  this.src = '/assets/images/placeholder-error.jpg';
  this.classList.add('image-error');
  console.error(`Failed to load image: ${this.dataset.originalSrc}`);
};
```

#### 3. Video Playback Errors

**Scenario**: Gallery video fails to load or play

**Handling**:
- Display video thumbnail with play icon
- Show error message on playback failure
- Provide download link as fallback
- Don't block other gallery items

#### 4. Lazy Loading Fallback

**Scenario**: Intersection Observer not supported (old browsers)

**Handling**:
- Feature detection for Intersection Observer
- Fallback to immediate image loading
- Ensure all images eventually load

**Implementation**:
```javascript
if ('IntersectionObserver' in window) {
  // Use lazy loading
  lazyLoader.observe(images);
} else {
  // Load all images immediately
  images.forEach(img => loadImage(img));
}
```

#### 5. Navigation Scroll Errors

**Scenario**: Smooth scroll not supported or target section doesn't exist

**Handling**:
- Feature detection for smooth scroll
- Fallback to instant scroll
- Validate section ID exists before scrolling
- Handle hash changes gracefully

**Implementation**:
```javascript
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  
  if (!section) {
    console.warn(`Section ${sectionId} not found`);
    return;
  }
  
  if ('scrollBehavior' in document.documentElement.style) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    section.scrollIntoView();
  }
}
```

#### 6. Mobile Menu State Errors

**Scenario**: Mobile menu gets stuck open/closed

**Handling**:
- Track menu state in data attribute
- Reset menu state on window resize
- Ensure body scroll is restored
- Handle ESC key to close menu

#### 7. Lightbox Navigation Errors

**Scenario**: User tries to navigate beyond gallery bounds

**Handling**:
- Disable previous button on first image
- Disable next button on last image
- Handle keyboard navigation edge cases
- Ensure ESC key always closes lightbox

### Performance Degradation Handling

#### Slow Network Conditions

**Handling**:
- Show loading indicators for images
- Progressive image loading (blur-up technique)
- Prioritize above-the-fold content
- Defer non-critical JavaScript

#### Low-End Devices

**Handling**:
- Reduce animation complexity on low-end devices
- Use CSS containment for performance
- Minimize JavaScript execution
- Optimize paint and layout operations

### Accessibility Error Prevention

#### Keyboard Navigation

**Handling**:
- Ensure all interactive elements are keyboard accessible
- Maintain logical tab order
- Provide visible focus indicators
- Trap focus in modal (lightbox)

#### Screen Reader Support

**Handling**:
- Provide ARIA labels where needed
- Announce dynamic content changes
- Use semantic HTML elements
- Ensure alt text is descriptive

## Testing Strategy

### Dual Testing Approach

Bu proje için hem unit testler hem de property-based testler kullanılacaktır. Her iki test türü birbirini tamamlar ve kapsamlı test coverage sağlar:

- **Unit Tests**: Spesifik örnekler, edge case'ler ve hata durumları için
- **Property Tests**: Tüm inputlar üzerinde geçerli olan evrensel özellikler için

### Testing Tools

**Unit Testing**:
- **Framework**: Vitest (fast, Vite-native test runner)
- **DOM Testing**: @testing-library/dom (DOM manipulation testing)
- **Assertions**: Vitest built-in assertions

**Property-Based Testing**:
- **Library**: fast-check (JavaScript property-based testing library)
- **Configuration**: Minimum 100 iterations per property test
- **Integration**: Works seamlessly with Vitest

**E2E Testing**:
- **Framework**: Playwright (cross-browser testing)
- **Visual Regression**: Playwright screenshots
- **Accessibility**: axe-core integration

### Unit Test Coverage

#### 1. Navigation Component Tests

```javascript
describe('Navigation Component', () => {
  test('should toggle mobile menu on hamburger click', () => {
    // Test specific interaction
  });
  
  test('should close mobile menu on ESC key', () => {
    // Test keyboard interaction
  });
  
  test('should highlight active section on scroll', () => {
    // Test scroll behavior
  });
  
  test('should smooth scroll to section on link click', () => {
    // Test navigation behavior
  });
});
```

#### 2. Contact Form Tests

```javascript
describe('Contact Form Validation', () => {
  test('should show error for empty name field', () => {
    // Test specific validation case
  });
  
  test('should show error for invalid phone format', () => {
    // Test phone validation
  });
  
  test('should show success message on valid submission', () => {
    // Test success path
  });
  
  test('should reset form after successful submission', () => {
    // Test form reset
  });
});
```

#### 3. Gallery Component Tests

```javascript
describe('Gallery Component', () => {
  test('should open lightbox on image click', () => {
    // Test lightbox opening
  });
  
  test('should close lightbox on ESC key', () => {
    // Test keyboard interaction
  });
  
  test('should navigate to next image on arrow key', () => {
    // Test keyboard navigation
  });
  
  test('should handle video playback', () => {
    // Test video element
  });
});
```

#### 4. Lazy Loading Tests

```javascript
describe('Lazy Loading', () => {
  test('should not load images below fold initially', () => {
    // Test lazy loading behavior
  });
  
  test('should load images when scrolled into view', () => {
    // Test intersection observer
  });
  
  test('should fallback to immediate loading if IntersectionObserver not supported', () => {
    // Test fallback behavior
  });
});
```

### Property-Based Test Coverage

Property-based testler her biri minimum 100 iterasyon ile çalıştırılacak ve tasarım dokümanındaki property'lere referans verecektir.

#### Property Test 1: Text Contrast

```javascript
import fc from 'fast-check';

// Feature: oto-kurtarma-website, Property 1: Text Contrast Accessibility
describe('Property: Text Contrast Accessibility', () => {
  test('all text elements must have contrast ratio >= 4.5:1', () => {
    fc.assert(
      fc.property(
        fc.hexaColor(), // text color
        fc.hexaColor(), // background color
        (textColor, bgColor) => {
          const contrast = calculateContrastRatio(textColor, bgColor);
          // If used on site, must meet minimum
          if (isUsedOnSite(textColor, bgColor)) {
            expect(contrast).toBeGreaterThanOrEqual(4.5);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 2: Service Card Structure

```javascript
// Feature: oto-kurtarma-website, Property 2: Service Card Structure Completeness
describe('Property: Service Card Structure', () => {
  test('all service cards must have icon, title, and description', () => {
    fc.assert(
      fc.property(
        fc.record({
          icon: fc.string(),
          title: fc.string(),
          description: fc.string()
        }),
        (serviceData) => {
          const card = createServiceCard(serviceData);
          expect(card.querySelector('.service-card__icon')).toBeTruthy();
          expect(card.querySelector('.service-card__title')).toBeTruthy();
          expect(card.querySelector('.service-card__description')).toBeTruthy();
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 3: Responsive Grid

```javascript
// Feature: oto-kurtarma-website, Property 3: Responsive Grid Adaptation
describe('Property: Responsive Grid Adaptation', () => {
  test('grid columns must adapt based on viewport width', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }), // viewport width
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          const grid = document.querySelector('.services-grid');
          const columns = getComputedColumns(grid);
          
          if (viewportWidth <= 768) {
            expect(columns).toBe(1);
          } else {
            expect(columns).toBeGreaterThan(1);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 4: Gallery Lightbox

```javascript
// Feature: oto-kurtarma-website, Property 4: Gallery Lightbox Interaction
describe('Property: Gallery Lightbox Interaction', () => {
  test('clicking any gallery image must open lightbox', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 14 }), // image index
        (imageIndex) => {
          const images = document.querySelectorAll('.gallery__image');
          const image = images[imageIndex];
          
          image.click();
          
          const lightbox = document.querySelector('.lightbox');
          expect(lightbox.classList.contains('lightbox--active')).toBe(true);
          expect(lightbox.querySelector('img').src).toBe(image.src);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 5: Form Validation

```javascript
// Feature: oto-kurtarma-website, Property 5: Form Validation Enforcement
describe('Property: Form Validation Enforcement', () => {
  test('form with invalid data must prevent submission', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string(),
          phone: fc.string(),
          message: fc.string()
        }),
        (formData) => {
          const isValid = validateForm(formData);
          const hasEmptyField = !formData.name || !formData.phone || !formData.message;
          const hasInvalidPhone = !/^[0-9]{10,11}$/.test(formData.phone);
          const hasShortName = formData.name.length < 2;
          const hasShortMessage = formData.message.length < 10;
          
          if (hasEmptyField || hasInvalidPhone || hasShortName || hasShortMessage) {
            expect(isValid).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 6: Form Success

```javascript
// Feature: oto-kurtarma-website, Property 6: Form Success Feedback
describe('Property: Form Success Feedback', () => {
  test('valid form data must show success message', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2 }), // valid name
        fc.stringOf(fc.integer({ min: 0, max: 9 }), { minLength: 10, maxLength: 11 }), // valid phone
        fc.string({ minLength: 10 }), // valid message
        (name, phone, message) => {
          const result = submitForm({ name, phone, message });
          expect(result.success).toBe(true);
          expect(result.message).toContain('başarı');
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 7: Font Size

```javascript
// Feature: oto-kurtarma-website, Property 7: Body Text Readability
describe('Property: Body Text Readability', () => {
  test('all body text must have font size between 16-18px', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('p', '.service-card__description', '.contact__info', 'label'),
        (selector) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            const fontSize = parseFloat(getComputedStyle(element).fontSize);
            expect(fontSize).toBeGreaterThanOrEqual(16);
            expect(fontSize).toBeLessThanOrEqual(18);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 8: Touch Targets

```javascript
// Feature: oto-kurtarma-website, Property 8: Touch Target Accessibility
describe('Property: Touch Target Accessibility', () => {
  test('all interactive elements on mobile must be at least 44x44px', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'a', 'input', '.service-card'),
        (selector) => {
          setViewportWidth(375); // mobile viewport
          const elements = document.querySelectorAll(selector);
          
          elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            expect(rect.width).toBeGreaterThanOrEqual(44);
            expect(rect.height).toBeGreaterThanOrEqual(44);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 9: Load Performance

```javascript
// Feature: oto-kurtarma-website, Property 9: Initial Load Performance
describe('Property: Initial Load Performance', () => {
  test('page must load within 3 seconds on 4G', () => {
    fc.assert(
      fc.property(
        fc.constant('4G'), // network condition
        async (networkCondition) => {
          const startTime = performance.now();
          await loadPage(networkCondition);
          const loadTime = performance.now() - startTime;
          
          expect(loadTime).toBeLessThanOrEqual(3000);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 10: Lazy Loading

```javascript
// Feature: oto-kurtarma-website, Property 10: Below-Fold Image Lazy Loading
describe('Property: Below-Fold Image Lazy Loading', () => {
  test('images below fold must have lazy loading enabled', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 14 }), // image index
        (imageIndex) => {
          const images = document.querySelectorAll('.gallery__image');
          const image = images[imageIndex];
          const isAboveFold = image.getBoundingClientRect().top < window.innerHeight;
          
          if (!isAboveFold) {
            expect(
              image.loading === 'lazy' || image.dataset.lazyLoad === 'true'
            ).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 11: Image Optimization

```javascript
// Feature: oto-kurtarma-website, Property 11: Image Format Optimization
describe('Property: Image Format Optimization', () => {
  test('all images must have WebP version with JPEG fallback and size < 200KB', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 14 }), // image index
        async (imageIndex) => {
          const images = document.querySelectorAll('.gallery__image');
          const image = images[imageIndex];
          
          // Check WebP version exists
          const webpSrc = image.dataset.srcWebp;
          expect(webpSrc).toBeTruthy();
          expect(webpSrc).toMatch(/\.webp$/);
          
          // Check JPEG fallback exists
          expect(image.src).toMatch(/\.jpe?g$/);
          
          // Check file size
          const fileSize = await getFileSize(image.src);
          expect(fileSize).toBeLessThanOrEqual(200 * 1024); // 200KB
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 12: Alt Text

```javascript
// Feature: oto-kurtarma-website, Property 12: Image Alternative Text
describe('Property: Image Alternative Text', () => {
  test('all images must have descriptive alt text', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('.hero', '.gallery', '.services'),
        (section) => {
          const images = document.querySelectorAll(`${section} img`);
          
          images.forEach(image => {
            expect(image.alt).toBeTruthy();
            expect(image.alt.length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### Property Test 13: Heading Hierarchy

```javascript
// Feature: oto-kurtarma-website, Property 13: Semantic Heading Hierarchy
describe('Property: Semantic Heading Hierarchy', () => {
  test('headings must follow proper hierarchy without skipping levels', () => {
    fc.assert(
      fc.property(
        fc.constant(document),
        (doc) => {
          const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
          const levels = headings.map(h => parseInt(h.tagName[1]));
          
          for (let i = 1; i < levels.length; i++) {
            const diff = levels[i] - levels[i - 1];
            // Can stay same, go down one, or go up any amount
            // But cannot skip levels going down (diff > 1)
            if (diff > 0) {
              expect(diff).toBeLessThanOrEqual(1);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### E2E Test Coverage

#### Visual Regression Tests

```javascript
test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('mobile menu visual regression', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.click('.hamburger-menu');
  await expect(page).toHaveScreenshot('mobile-menu.png');
});
```

#### Accessibility Tests

```javascript
test('homepage accessibility', async ({ page }) => {
  await page.goto('/');
  const results = await injectAxe(page);
  expect(results.violations).toHaveLength(0);
});
```

#### Cross-Browser Tests

```javascript
test.describe('cross-browser compatibility', () => {
  test('works in Chrome', async ({ page }) => {
    // Test in Chrome
  });
  
  test('works in Firefox', async ({ page }) => {
    // Test in Firefox
  });
  
  test('works in Safari', async ({ page }) => {
    // Test in Safari
  });
});
```

### Test Execution

**Development**:
```bash
npm run test          # Run all tests
npm run test:unit     # Run unit tests only
npm run test:property # Run property tests only
npm run test:e2e      # Run E2E tests
npm run test:watch    # Watch mode for development
```

**CI/CD**:
```bash
npm run test:ci       # Run all tests with coverage
npm run test:coverage # Generate coverage report
```

### Coverage Goals

- **Unit Tests**: 80% code coverage minimum
- **Property Tests**: All 13 correctness properties implemented
- **E2E Tests**: Critical user paths covered
- **Accessibility**: Zero violations on axe-core

