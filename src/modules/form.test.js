/**
 * Unit tests for ContactForm module
 * Tests Requirements 4.3, 4.4
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { ContactForm } from './form.js';

describe('ContactForm', () => {
  let form;
  let formElement;
  let contactForm;

  beforeEach(() => {
    // Create a mock form element
    document.body.innerHTML = `
      <form id="contact-form">
        <div class="form__group">
          <label for="name">Adınız *</label>
          <input type="text" id="name" name="name" required minlength="2">
          <span class="form__error" id="name-error"></span>
        </div>
        <div class="form__group">
          <label for="phone">Telefon *</label>
          <input type="tel" id="phone" name="phone" required pattern="[0-9]{10,11}">
          <span class="form__error" id="phone-error"></span>
        </div>
        <div class="form__group">
          <label for="message">Mesajınız *</label>
          <textarea id="message" name="message" rows="5" required minlength="10"></textarea>
          <span class="form__error" id="message-error"></span>
        </div>
        <button type="submit" class="form__submit">Gönder</button>
        <div class="form__success" id="form-success" style="display: none;">
          Mesajınız başarıyla gönderildi!
        </div>
      </form>
    `;

    formElement = document.getElementById('contact-form');
    contactForm = new ContactForm(formElement);
  });

  describe('Field Validation', () => {
    test('should show error for empty name field', () => {
      const nameField = document.getElementById('name');
      const nameError = document.getElementById('name-error');

      nameField.value = '';
      const isValid = contactForm.validateField('name');

      expect(isValid).toBe(false);
      expect(nameError.textContent).toBe('Lütfen adınızı girin');
      expect(nameField.classList.contains('form__input--error')).toBe(true);
    });

    test('should show error for name shorter than 2 characters', () => {
      const nameField = document.getElementById('name');
      const nameError = document.getElementById('name-error');

      nameField.value = 'A';
      const isValid = contactForm.validateField('name');

      expect(isValid).toBe(false);
      expect(nameError.textContent).toBe('Ad en az 2 karakter olmalıdır');
    });

    test('should validate correct name', () => {
      const nameField = document.getElementById('name');
      const nameError = document.getElementById('name-error');

      nameField.value = 'Ahmet Yılmaz';
      const isValid = contactForm.validateField('name');

      expect(isValid).toBe(true);
      expect(nameError.textContent).toBe('');
      expect(nameField.classList.contains('form__input--error')).toBe(false);
    });

    test('should show error for empty phone field', () => {
      const phoneField = document.getElementById('phone');
      const phoneError = document.getElementById('phone-error');

      phoneField.value = '';
      const isValid = contactForm.validateField('phone');

      expect(isValid).toBe(false);
      expect(phoneError.textContent).toBe('Lütfen telefon numaranızı girin');
    });

    test('should show error for invalid phone format', () => {
      const phoneField = document.getElementById('phone');
      const phoneError = document.getElementById('phone-error');

      phoneField.value = '123';
      const isValid = contactForm.validateField('phone');

      expect(isValid).toBe(false);
      expect(phoneError.textContent).toBe('Geçerli bir telefon numarası girin (10-11 rakam)');
    });

    test('should validate correct 10-digit phone', () => {
      const phoneField = document.getElementById('phone');

      phoneField.value = '5551234567';
      const isValid = contactForm.validateField('phone');

      expect(isValid).toBe(true);
    });

    test('should validate correct 11-digit phone', () => {
      const phoneField = document.getElementById('phone');

      phoneField.value = '05551234567';
      const isValid = contactForm.validateField('phone');

      expect(isValid).toBe(true);
    });

    test('should show error for empty message field', () => {
      const messageField = document.getElementById('message');
      const messageError = document.getElementById('message-error');

      messageField.value = '';
      const isValid = contactForm.validateField('message');

      expect(isValid).toBe(false);
      expect(messageError.textContent).toBe('Lütfen mesajınızı girin');
    });

    test('should show error for message shorter than 10 characters', () => {
      const messageField = document.getElementById('message');
      const messageError = document.getElementById('message-error');

      messageField.value = 'Merhaba';
      const isValid = contactForm.validateField('message');

      expect(isValid).toBe(false);
      expect(messageError.textContent).toBe('Mesaj en az 10 karakter olmalıdır');
    });

    test('should validate correct message', () => {
      const messageField = document.getElementById('message');

      messageField.value = 'Merhaba, oto kurtarma hizmeti hakkında bilgi almak istiyorum.';
      const isValid = contactForm.validateField('message');

      expect(isValid).toBe(true);
    });
  });

  describe('Form Validation', () => {
    test('should return false when form has invalid data', () => {
      document.getElementById('name').value = '';
      document.getElementById('phone').value = '123';
      document.getElementById('message').value = 'Hi';

      const isValid = contactForm.validateForm();

      expect(isValid).toBe(false);
    });

    test('should return true when all fields are valid', () => {
      document.getElementById('name').value = 'Ahmet Yılmaz';
      document.getElementById('phone').value = '5551234567';
      document.getElementById('message').value = 'Merhaba, oto kurtarma hizmeti hakkında bilgi almak istiyorum.';

      const isValid = contactForm.validateForm();

      expect(isValid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    test('should prevent submission with invalid data', () => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = '';
      document.getElementById('phone').value = '123';
      document.getElementById('message').value = 'Hi';

      formElement.dispatchEvent(event);

      const successMessage = document.getElementById('form-success');
      expect(successMessage.style.display).toBe('none');
    });

    test('should show success message with valid data', () => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'Ahmet Yılmaz';
      document.getElementById('phone').value = '5551234567';
      document.getElementById('message').value = 'Merhaba, oto kurtarma hizmeti hakkında bilgi almak istiyorum.';

      formElement.dispatchEvent(event);

      const successMessage = document.getElementById('form-success');
      expect(successMessage.style.display).toBe('block');
    });

    test('should reset form after successful submission', async () => {
      vi.useFakeTimers();
      
      const event = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'Ahmet Yılmaz';
      document.getElementById('phone').value = '5551234567';
      document.getElementById('message').value = 'Merhaba, oto kurtarma hizmeti hakkında bilgi almak istiyorum.';

      formElement.dispatchEvent(event);

      // Fast-forward time by 3 seconds
      vi.advanceTimersByTime(3000);

      expect(document.getElementById('name').value).toBe('');
      expect(document.getElementById('phone').value).toBe('');
      expect(document.getElementById('message').value).toBe('');

      vi.useRealTimers();
    });
  });

  describe('Real-time Validation', () => {
    test('should validate field on blur event', () => {
      const nameField = document.getElementById('name');
      const nameError = document.getElementById('name-error');

      nameField.value = 'A';
      nameField.dispatchEvent(new Event('blur'));

      expect(nameError.textContent).toBe('Ad en az 2 karakter olmalıdır');
    });

    test('should clear error on input event', () => {
      const nameField = document.getElementById('name');
      const nameError = document.getElementById('name-error');

      // First trigger error
      nameField.value = '';
      contactForm.validateField('name');
      expect(nameError.textContent).toBe('Lütfen adınızı girin');

      // Then type something
      nameField.value = 'A';
      nameField.dispatchEvent(new Event('input'));

      expect(nameError.textContent).toBe('');
      expect(nameField.classList.contains('form__input--error')).toBe(false);
    });
  });

  describe('Error Display', () => {
    test('should show error message and add error class', () => {
      const nameField = document.getElementById('name');
      const nameError = document.getElementById('name-error');

      contactForm.showError('name', 'Test error message');

      expect(nameError.textContent).toBe('Test error message');
      expect(nameError.style.display).toBe('block');
      expect(nameField.classList.contains('form__input--error')).toBe(true);
      expect(nameField.getAttribute('aria-invalid')).toBe('true');
    });

    test('should clear error message and remove error class', () => {
      const nameField = document.getElementById('name');
      const nameError = document.getElementById('name-error');

      // First show error
      contactForm.showError('name', 'Test error');
      
      // Then clear it
      contactForm.clearError('name');

      expect(nameError.textContent).toBe('');
      expect(nameError.style.display).toBe('none');
      expect(nameField.classList.contains('form__input--error')).toBe(false);
      expect(nameField.getAttribute('aria-invalid')).toBe('false');
    });
  });

  describe('Success Message', () => {
    test('should show success message', () => {
      const successMessage = document.getElementById('form-success');

      contactForm.showSuccessMessage();

      expect(successMessage.style.display).toBe('block');
      expect(successMessage.getAttribute('role')).toBe('alert');
      expect(successMessage.getAttribute('aria-live')).toBe('polite');
    });

    test('should hide success message', () => {
      const successMessage = document.getElementById('form-success');

      contactForm.showSuccessMessage();
      contactForm.hideSuccessMessage();

      expect(successMessage.style.display).toBe('none');
    });
  });

  describe('Form Reset', () => {
    test('should reset all fields and clear errors', () => {
      // Fill form
      document.getElementById('name').value = 'Ahmet Yılmaz';
      document.getElementById('phone').value = '5551234567';
      document.getElementById('message').value = 'Test message';

      // Show some errors
      contactForm.showError('name', 'Test error');

      // Reset form
      contactForm.resetForm();

      expect(document.getElementById('name').value).toBe('');
      expect(document.getElementById('phone').value).toBe('');
      expect(document.getElementById('message').value).toBe('');
      expect(document.getElementById('name-error').textContent).toBe('');
      expect(document.getElementById('form-success').style.display).toBe('none');
    });
  });
});
