/**
 * Gallery Module Unit Tests
 * Tests for gallery rendering, lightbox functionality, and keyboard navigation
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { Gallery } from './gallery.js';

describe('Gallery Component', () => {
  let galleryElement;
  let lightboxElement;
  let mockImages;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="gallery-grid"></div>
      <div class="lightbox" id="lightbox" aria-hidden="true">
        <button class="lightbox__close" aria-label="Galeriyi kapat">X</button>
        <button class="lightbox__prev" aria-label="Önceki görsel">←</button>
        <button class="lightbox__next" aria-label="Sonraki görsel">→</button>
        <div class="lightbox__content">
          <img class="lightbox__image" src="" alt="" />
          <video class="lightbox__video" controls style="display: none;">
            <source src="" type="video/mp4">
          </video>
        </div>
        <div class="lightbox__counter"></div>
      </div>
    `;

    galleryElement = document.getElementById('gallery-grid');
    lightboxElement = document.getElementById('lightbox');

    mockImages = [
      {
        id: 'img-001',
        src: '/test-image-1.jpg',
        thumbnail: '/test-thumb-1.jpg',
        alt: 'Test image 1',
        type: 'image'
      },
      {
        id: 'img-002',
        src: '/test-image-2.jpg',
        thumbnail: '/test-thumb-2.jpg',
        alt: 'Test image 2',
        type: 'image'
      },
      {
        id: 'video-001',
        src: '/test-video.mp4',
        thumbnail: '/test-video-thumb.jpg',
        alt: 'Test video',
        type: 'video'
      }
    ];
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should throw error if gallery element is not provided', () => {
    expect(() => new Gallery(null, mockImages)).toThrow('Gallery element is required');
  });

  test('should render gallery items correctly', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    const items = galleryElement.querySelectorAll('.gallery__item');
    expect(items.length).toBe(3);
  });

  test('should render images with correct attributes', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    const firstImage = galleryElement.querySelector('.gallery__image');
    expect(firstImage.src).toContain('test-thumb-1.jpg');
    expect(firstImage.alt).toBe('Test image 1');
    expect(firstImage.loading).toBe('lazy');
  });

  test('should add video class to video items', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    const items = galleryElement.querySelectorAll('.gallery__item');
    const videoItem = items[2]; // Third item is video
    expect(videoItem.classList.contains('gallery__item--video')).toBe(true);
  });

  test('should open lightbox on image click', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    expect(lightboxElement.classList.contains('lightbox--active')).toBe(true);
    expect(lightboxElement.getAttribute('aria-hidden')).toBe('false');
  });

  test('should display correct image in lightbox', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    const lightboxImage = lightboxElement.querySelector('.lightbox__image');
    expect(lightboxImage.src).toContain('test-image-1.jpg');
    expect(lightboxImage.alt).toBe('Test image 1');
  });

  test('should close lightbox on close button click', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open lightbox
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    // Close lightbox
    const closeButton = lightboxElement.querySelector('.lightbox__close');
    closeButton.click();
    
    expect(lightboxElement.classList.contains('lightbox--active')).toBe(false);
    expect(lightboxElement.getAttribute('aria-hidden')).toBe('true');
  });

  test('should close lightbox on ESC key', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open lightbox
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    // Press ESC
    const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escEvent);
    
    expect(lightboxElement.classList.contains('lightbox--active')).toBe(false);
  });

  test('should navigate to next image on arrow right key', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open lightbox with first image
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    // Press arrow right
    const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(arrowEvent);
    
    const lightboxImage = lightboxElement.querySelector('.lightbox__image');
    expect(lightboxImage.src).toContain('test-image-2.jpg');
  });

  test('should navigate to previous image on arrow left key', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open lightbox with second image
    const items = galleryElement.querySelectorAll('.gallery__item');
    items[1].click();
    
    // Press arrow left
    const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(arrowEvent);
    
    const lightboxImage = lightboxElement.querySelector('.lightbox__image');
    expect(lightboxImage.src).toContain('test-image-1.jpg');
  });

  test('should navigate to next image on next button click', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open lightbox with first image
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    // Click next button
    const nextButton = lightboxElement.querySelector('.lightbox__next');
    nextButton.click();
    
    const lightboxImage = lightboxElement.querySelector('.lightbox__image');
    expect(lightboxImage.src).toContain('test-image-2.jpg');
  });

  test('should navigate to previous image on prev button click', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open lightbox with second image
    const items = galleryElement.querySelectorAll('.gallery__item');
    items[1].click();
    
    // Click prev button
    const prevButton = lightboxElement.querySelector('.lightbox__prev');
    prevButton.click();
    
    const lightboxImage = lightboxElement.querySelector('.lightbox__image');
    expect(lightboxImage.src).toContain('test-image-1.jpg');
  });

  test('should display video in lightbox when video item is clicked', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Click on video item (third item)
    const items = galleryElement.querySelectorAll('.gallery__item');
    items[2].click();
    
    const lightboxVideo = lightboxElement.querySelector('.lightbox__video');
    const lightboxImage = lightboxElement.querySelector('.lightbox__image');
    
    expect(lightboxVideo.style.display).toBe('block');
    expect(lightboxImage.style.display).toBe('none');
  });

  test('should update counter correctly', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open first image
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    const counter = lightboxElement.querySelector('.lightbox__counter');
    expect(counter.textContent).toBe('1 / 3');
  });

  test('should update counter when navigating', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open first image
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    // Navigate to next
    const nextButton = lightboxElement.querySelector('.lightbox__next');
    nextButton.click();
    
    const counter = lightboxElement.querySelector('.lightbox__counter');
    expect(counter.textContent).toBe('2 / 3');
  });

  test('should wrap around to last image when navigating prev from first', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open first image
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    // Navigate to previous (should wrap to last)
    const prevButton = lightboxElement.querySelector('.lightbox__prev');
    prevButton.click();
    
    const counter = lightboxElement.querySelector('.lightbox__counter');
    expect(counter.textContent).toBe('3 / 3');
  });

  test('should wrap around to first image when navigating next from last', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open last image
    const items = galleryElement.querySelectorAll('.gallery__item');
    items[2].click();
    
    // Navigate to next (should wrap to first)
    const nextButton = lightboxElement.querySelector('.lightbox__next');
    nextButton.click();
    
    const counter = lightboxElement.querySelector('.lightbox__counter');
    expect(counter.textContent).toBe('1 / 3');
  });

  test('should make gallery items keyboard accessible', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    const firstItem = galleryElement.querySelector('.gallery__item');
    expect(firstItem.getAttribute('tabindex')).toBe('0');
    expect(firstItem.getAttribute('role')).toBe('button');
    expect(firstItem.getAttribute('aria-label')).toBe('Test image 1');
  });

  test('should open lightbox on Enter key press on gallery item', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    const firstItem = galleryElement.querySelector('.gallery__item');
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    firstItem.dispatchEvent(enterEvent);
    
    expect(lightboxElement.classList.contains('lightbox--active')).toBe(true);
  });

  test('should open lightbox on Space key press on gallery item', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    const firstItem = galleryElement.querySelector('.gallery__item');
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    firstItem.dispatchEvent(spaceEvent);
    
    expect(lightboxElement.classList.contains('lightbox--active')).toBe(true);
  });

  test('should prevent body scroll when lightbox is open', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open lightbox
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('should restore body scroll when lightbox is closed', () => {
    const gallery = new Gallery(galleryElement, mockImages);
    
    // Open lightbox
    const firstItem = galleryElement.querySelector('.gallery__item');
    firstItem.click();
    
    // Close lightbox
    const closeButton = lightboxElement.querySelector('.lightbox__close');
    closeButton.click();
    
    expect(document.body.style.overflow).toBe('');
  });
});
