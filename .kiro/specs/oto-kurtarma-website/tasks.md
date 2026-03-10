# Implementation Plan: Oto Kurtarma Website

## Overview

Bu implementation plan, modern ve responsive bir oto kurtarma web sitesini Vanilla JavaScript, HTML5 ve CSS3 kullanarak oluşturmak için adım adım görevleri içerir. Proje Vite build tool kullanacak ve statik hosting için optimize edilecektir.

## Tasks

- [x] 1. Proje yapısını ve temel dosyaları oluştur
  - Vite projesi başlat ve gerekli bağımlılıkları yükle
  - Klasör yapısını oluştur (src/, styles/, assets/, public/)
  - index.html dosyasını oluştur ve temel HTML5 yapısını kur
  - SEO meta tags, Open Graph tags ve favicon referanslarını ekle
  - _Requirements: 7.1, 7.2, 7.4, 7.7_

- [ ] 2. CSS temellerini ve değişkenleri oluştur
  - [x] 2.1 CSS reset, variables ve typography dosyalarını oluştur
    - styles/base/reset.css ile CSS reset uygula
    - styles/base/variables.css ile CSS custom properties tanımla (renkler, spacing, font sizes)
    - styles/base/typography.css ile font tanımları ve text styles oluştur
    - _Requirements: 8.1, 8.2, 5.4_
  
  - [ ]* 2.2 CSS değişkenleri için property test yaz
    - **Property 1: Text Contrast Accessibility**
    - **Validates: Requirements 1.5, 7.6**

- [ ] 3. Hero section'ı implement et
  - [x] 3.1 Hero section HTML ve CSS'ini oluştur
    - Hero section HTML yapısını index.html'e ekle
    - styles/components/hero.css dosyasını oluştur
    - Background image (arkaplan.jpg) ile overlay uygula
    - Business name, tagline ve CTA button ekle
    - Responsive text sizing ve mobile uyumluluğu sağla
    - _Requirements: 1.1, 1.2, 1.3, 1.5_
  
  - [ ]* 3.2 Hero section için unit testler yaz
    - CTA button click davranışını test et
    - Text contrast oranını test et
    - _Requirements: 1.4, 1.5_

- [ ] 4. Navigation component'ini implement et
  - [x] 4.1 Navigation HTML ve CSS'ini oluştur
    - Navigation HTML yapısını oluştur
    - styles/components/navigation.css dosyasını oluştur
    - Desktop horizontal menu ve mobile hamburger menu stilleri ekle
    - _Requirements: 5.2, 5.3_
  
  - [x] 4.2 Navigation JavaScript modülünü oluştur
    - src/modules/navigation.js dosyasını oluştur
    - Navigation class'ını implement et (toggleMobileMenu, scrollToSection, updateActiveLink)
    - Smooth scroll navigation ekle
    - Mobile menu overlay ve close button işlevselliği ekle
    - ESC key ile menu kapatma ekle
    - _Requirements: 1.4, 5.2, 5.3_
  
  - [ ]* 4.3 Navigation için unit testler yaz
    - Mobile menu toggle davranışını test et
    - ESC key ile menu kapatmayı test et
    - Smooth scroll davranışını test et
    - _Requirements: 5.2, 5.3_

- [x] 5. Checkpoint - Temel yapı ve navigation kontrolü
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Services section'ı implement et
  - [x] 6.1 Services section HTML ve CSS'ini oluştur
    - Services section HTML yapısını oluştur
    - styles/components/services.css dosyasını oluştur
    - Grid layout ile responsive tasarım uygula (1 column mobile, 4 columns desktop)
    - Service card stilleri oluştur (icon, title, description)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  
  - [ ]* 6.2 Services için property testler yaz
    - **Property 2: Service Card Structure Completeness**
    - **Validates: Requirements 2.2**
    - **Property 3: Responsive Grid Adaptation**
    - **Validates: Requirements 2.4**
  
  - [ ]* 6.3 Services için unit testler yaz
    - Service card render davranışını test et
    - Grid column sayısını farklı viewport'larda test et
    - _Requirements: 2.4, 2.5, 2.6_

- [ ] 7. Gallery component'ini implement et
  - [x] 7.1 Gallery HTML ve CSS'ini oluştur
    - Gallery section HTML yapısını oluştur
    - styles/components/gallery.css dosyasını oluştur
    - Responsive grid layout (2 columns mobile, 4 columns desktop)
    - Lightbox modal stilleri oluştur
    - _Requirements: 3.1, 3.2, 3.5, 3.6_
  
  - [x] 7.2 Gallery JavaScript modülünü oluştur
    - src/modules/gallery.js dosyasını oluştur
    - Gallery class'ını implement et (renderGallery, openLightbox, closeLightbox, navigateLightbox)
    - Lightbox keyboard navigation ekle (arrow keys, ESC)
    - Video player integration ekle
    - _Requirements: 3.3, 3.7_
  
  - [ ]* 7.3 Gallery için property testler yaz
    - **Property 4: Gallery Lightbox Interaction**
    - **Validates: Requirements 3.3**
  
  - [ ]* 7.4 Gallery için unit testler yaz
    - Lightbox açma/kapama davranışını test et
    - Keyboard navigation'ı test et
    - Video playback'i test et
    - _Requirements: 3.3, 3.7_

- [ ] 8. Image optimization ve lazy loading implement et
  - [x] 8.1 Lazy loading utility'sini oluştur
    - src/utils/lazyload.js dosyasını oluştur
    - LazyLoader class'ını implement et (Intersection Observer API)
    - Fallback for older browsers ekle
    - _Requirements: 6.2, 6.3_
  
  - [x] 8.2 Görselleri optimize et ve WebP versiyonları oluştur
    - fotolar klasöründeki görselleri assets/images/'a kopyala
    - Görselleri optimize et (max 200KB)
    - WebP versiyonları oluştur
    - Thumbnail versiyonları oluştur
    - _Requirements: 6.3, 6.5_
  
  - [ ]* 8.3 Image optimization için property testler yaz
    - **Property 10: Below-Fold Image Lazy Loading**
    - **Validates: Requirements 6.2**
    - **Property 11: Image Format Optimization**
    - **Validates: Requirements 6.3, 6.5**
    - **Property 12: Image Alternative Text**
    - **Validates: Requirements 7.3**
  
  - [ ]* 8.4 Lazy loading için unit testler yaz
    - Intersection Observer davranışını test et
    - Fallback davranışını test et
    - _Requirements: 6.2_

- [x] 9. Checkpoint - Gallery ve image optimization kontrolü
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Contact section'ı implement et
  - [x] 10.1 Contact section HTML ve CSS'ini oluştur
    - Contact section HTML yapısını oluştur
    - styles/components/contact.css dosyasını oluştur
    - Contact form ve contact info layout'unu oluştur
    - Form field stilleri ve error message stilleri ekle
    - _Requirements: 4.1, 4.2, 4.5, 4.6, 4.7_
  
  - [x] 10.2 Contact form JavaScript modülünü oluştur
    - src/modules/form.js dosyasını oluştur
    - ContactForm class'ını implement et (validateField, validateForm, handleSubmit)
    - Real-time validation (on blur) ekle
    - Success ve error message handling ekle
    - Form reset functionality ekle
    - _Requirements: 4.3, 4.4_
  
  - [ ]* 10.3 Contact form için property testler yaz
    - **Property 5: Form Validation Enforcement**
    - **Validates: Requirements 4.3**
    - **Property 6: Form Success Feedback**
    - **Validates: Requirements 4.4**
  
  - [ ]* 10.4 Contact form için unit testler yaz
    - Field validation davranışını test et
    - Form submission davranışını test et
    - Success message gösterimini test et
    - Error message gösterimini test et
    - _Requirements: 4.3, 4.4_

- [ ] 11. Animation ve scroll effects ekle
  - [x] 11.1 Animation controller modülünü oluştur
    - src/modules/animations.js dosyasını oluştur
    - AnimationController class'ını implement et
    - Scroll animations ekle (fade in, slide up)
    - Hover effects ekle (card scale, button transitions)
    - _Requirements: 8.5_
  
  - [ ]* 11.2 Animations için unit testler yaz
    - Scroll animation davranışını test et
    - Hover effect davranışını test et
    - _Requirements: 8.5_

- [ ] 12. Responsive design ve accessibility iyileştirmeleri
  - [x] 12.1 Responsive utilities ve media queries oluştur
    - styles/utilities/responsive.css dosyasını oluştur
    - Tüm breakpoint'ler için media queries ekle
    - Mobile-first approach ile responsive stilleri tamamla
    - _Requirements: 5.1, 5.5_
  
  - [x] 12.2 Accessibility iyileştirmeleri yap
    - Semantic HTML5 elementleri kontrol et ve düzelt
    - Alt text'leri tüm görsellere ekle
    - Heading hierarchy'yi kontrol et (h1, h2, h3)
    - ARIA labels ekle (where needed)
    - Focus indicators ekle
    - Keyboard navigation'ı test et ve iyileştir
    - _Requirements: 7.2, 7.3, 7.5_
  
  - [ ]* 12.3 Responsive ve accessibility için property testler yaz
    - **Property 7: Body Text Readability**
    - **Validates: Requirements 5.4**
    - **Property 8: Touch Target Accessibility**
    - **Validates: Requirements 5.6**
    - **Property 13: Semantic Heading Hierarchy**
    - **Validates: Requirements 7.5**

- [ ] 13. Main JavaScript entry point ve integration
  - [x] 13.1 Main.js dosyasını oluştur ve tüm modülleri entegre et
    - src/main.js dosyasını oluştur
    - Tüm modülleri import et (navigation, gallery, form, animations, lazyload)
    - Component'leri initialize et
    - Event listeners ekle
    - _Requirements: All_
  
  - [ ]* 13.2 Integration testler yaz
    - End-to-end flow'ları test et
    - Component interaction'ları test et
    - _Requirements: All_

- [ ] 14. Production build ve optimization
  - [x] 14.1 Vite production build konfigürasyonu
    - vite.config.js dosyasını oluştur
    - CSS ve JS minification ayarlarını yap
    - Asset optimization ayarlarını yap
    - _Requirements: 6.4_
  
  - [x] 14.2 Performance optimization
    - CSS ve JS dosyalarını minify et
    - Critical CSS'i inline et (optional)
    - Production build oluştur ve test et
    - _Requirements: 6.1, 6.4_
  
  - [ ]* 14.3 Performance için property test yaz
    - **Property 9: Initial Load Performance**
    - **Validates: Requirements 6.1**

- [x] 15. Final checkpoint - Tüm testler ve production build
  - Ensure all tests pass, ask the user if questions arise.
  - Production build'i test et
  - Tüm requirements'ların karşılandığını doğrula

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from design document
- Unit tests validate specific examples and edge cases
- Vite development server: `npm run dev` (run manually in terminal)
- Production build: `npm run build`
