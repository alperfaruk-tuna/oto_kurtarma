# Requirements Document

## Introduction

Bu doküman, yerel bir oto kurtarma işletmesi için profesyonel ve sade bir web sitesinin gereksinimlerini tanımlar. Web sitesi, müşterilere hizmet bilgisi sunacak, iletişim sağlayacak ve işletmenin güvenilirliğini yansıtacak şekilde tasarlanacaktır.

## Glossary

- **Website**: Oto kurtarma işletmesinin web sitesi
- **User**: Web sitesini ziyaret eden potansiyel müşteri
- **Contact_Form**: Kullanıcıların iletişim bilgilerini gönderebileceği form
- **Gallery**: İşletmenin çalışma fotoğraflarını gösteren galeri bölümü
- **Hero_Section**: Web sitesinin ilk görünen ana bölümü
- **Service_Card**: Hizmet bilgilerini gösteren kart bileşeni
- **Mobile_Device**: Ekran genişliği 768px ve altındaki cihazlar
- **Desktop_Device**: Ekran genişliği 768px üzerindeki cihazlar

## Requirements

### Requirement 1: Ana Sayfa ve Hero Bölümü

**User Story:** As a potential customer, I want to see a professional landing page with clear service information, so that I can quickly understand what services are offered.

#### Acceptance Criteria

1. THE Website SHALL display a Hero_Section with background image (arkaplan.jpg)
2. THE Hero_Section SHALL display the business name and tagline prominently
3. THE Hero_Section SHALL include a call-to-action button for contacting the service
4. WHEN a User clicks the call-to-action button, THE Website SHALL scroll to the contact section
5. THE Hero_Section SHALL maintain readability with proper text contrast over the background image

### Requirement 2: Hizmetler Bölümü

**User Story:** As a potential customer, I want to see what services are available, so that I can determine if the business meets my needs.

#### Acceptance Criteria

1. THE Website SHALL display a services section with at least 4 Service_Cards
2. EACH Service_Card SHALL include an icon, title, and brief description
3. THE Website SHALL list services including: 24/7 çekici hizmeti, oto kurtarma, yol yardımı, araç taşıma
4. THE services section SHALL use a grid layout that adapts to screen size
5. WHEN viewed on Mobile_Device, THE Website SHALL display Service_Cards in a single column
6. WHEN viewed on Desktop_Device, THE Website SHALL display Service_Cards in multiple columns

### Requirement 3: Galeri Bölümü

**User Story:** As a potential customer, I want to see photos of previous work, so that I can trust the service quality.

#### Acceptance Criteria

1. THE Website SHALL display a Gallery with images from the fotolar directory
2. THE Gallery SHALL display at least 8 images in a responsive grid layout
3. WHEN a User clicks on a gallery image, THE Website SHALL display the image in a larger view (lightbox)
4. THE Gallery SHALL optimize images for web performance
5. WHEN viewed on Mobile_Device, THE Gallery SHALL display 2 images per row
6. WHEN viewed on Desktop_Device, THE Gallery SHALL display 4 images per row
7. THE Gallery SHALL include the video file (WhatsApp Video 2026-03-06 at 16.44.30.mp4) as a playable element

### Requirement 4: İletişim Bölümü

**User Story:** As a potential customer, I want to easily contact the business, so that I can request service or ask questions.

#### Acceptance Criteria

1. THE Website SHALL display a contact section with phone number, address, and email information
2. THE Website SHALL display a Contact_Form with fields for name, phone, and message
3. WHEN a User submits the Contact_Form, THE Website SHALL validate that all required fields are filled
4. WHEN a User submits the Contact_Form with valid data, THE Website SHALL display a success message
5. THE contact section SHALL include clickable phone number links that initiate calls on mobile devices
6. THE contact section SHALL include a WhatsApp button that opens WhatsApp with pre-filled message
7. THE Website SHALL display business hours information

### Requirement 5: Responsive Tasarım

**User Story:** As a user, I want the website to work well on my device, so that I can access information regardless of screen size.

#### Acceptance Criteria

1. THE Website SHALL be fully responsive across Mobile_Device and Desktop_Device
2. WHEN viewed on Mobile_Device, THE Website SHALL display a hamburger menu for navigation
3. WHEN viewed on Desktop_Device, THE Website SHALL display a horizontal navigation menu
4. THE Website SHALL maintain readability with font sizes between 16px-18px for body text
5. THE Website SHALL use a mobile-first design approach
6. ALL interactive elements SHALL have touch targets of at least 44x44 pixels on Mobile_Device

### Requirement 6: Performans ve Optimizasyon

**User Story:** As a user, I want the website to load quickly, so that I can access information without waiting.

#### Acceptance Criteria

1. THE Website SHALL load the initial view within 3 seconds on standard 4G connection
2. THE Website SHALL lazy-load images below the fold
3. THE Website SHALL compress and optimize all images to web-appropriate sizes
4. THE Website SHALL minify CSS and JavaScript files for production
5. THE Website SHALL use modern image formats (WebP with JPEG fallback) where supported

### Requirement 7: SEO ve Erişilebilirlik

**User Story:** As a business owner, I want the website to be discoverable and accessible, so that I can reach more customers.

#### Acceptance Criteria

1. THE Website SHALL include proper meta tags (title, description, keywords) for SEO
2. THE Website SHALL include semantic HTML5 elements (header, nav, main, section, footer)
3. ALL images SHALL include descriptive alt text
4. THE Website SHALL include a favicon
5. THE Website SHALL use proper heading hierarchy (h1, h2, h3)
6. THE Website SHALL have a minimum color contrast ratio of 4.5:1 for text
7. THE Website SHALL include Open Graph tags for social media sharing

### Requirement 8: Profesyonel ve Sade Tasarım

**User Story:** As a business owner, I want a professional and clean design, so that customers trust my service.

#### Acceptance Criteria

1. THE Website SHALL use a limited color palette (maximum 4 primary colors)
2. THE Website SHALL use professional, readable fonts (sans-serif for body, optional serif for headings)
3. THE Website SHALL maintain consistent spacing and alignment throughout
4. THE Website SHALL avoid cluttered layouts with appropriate white space
5. THE Website SHALL use subtle animations for user interactions (hover effects, scroll animations)
6. THE Website SHALL display the business logo or name consistently across all pages
7. ALL design elements SHALL convey professionalism and reliability

