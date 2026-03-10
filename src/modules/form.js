/**
 * ContactForm Module
 * Handles contact form validation, submission, and user feedback
 * 
 * Requirements: 4.3, 4.4
 */

export class ContactForm {
  constructor(formElement) {
    this.form = formElement;
    this.fields = {
      name: this.form.querySelector('#name'),
      phone: this.form.querySelector('#phone'),
      message: this.form.querySelector('#message')
    };
    this.errors = {
      name: this.form.querySelector('#name-error'),
      phone: this.form.querySelector('#phone-error'),
      message: this.form.querySelector('#message-error')
    };
    this.successMessage = this.form.querySelector('#form-success');
    this.submitButton = this.form.querySelector('.form__submit');
    
    this.validationRules = {
      name: {
        required: true,
        minLength: 2,
        messages: {
          empty: 'Lütfen adınızı girin',
          tooShort: 'Ad en az 2 karakter olmalıdır'
        }
      },
      phone: {
        required: true,
        pattern: /^[0-9]{10,11}$/,
        messages: {
          empty: 'Lütfen telefon numaranızı girin',
          invalid: 'Geçerli bir telefon numarası girin (10-11 rakam)'
        }
      },
      message: {
        required: true,
        minLength: 10,
        messages: {
          empty: 'Lütfen mesajınızı girin',
          tooShort: 'Mesaj en az 10 karakter olmalıdır'
        }
      }
    };
    
    this.init();
  }
  
  init() {
    // Add blur event listeners for real-time validation
    Object.keys(this.fields).forEach(fieldName => {
      this.fields[fieldName].addEventListener('blur', () => {
        this.validateField(fieldName);
      });
      
      // Clear error on input
      this.fields[fieldName].addEventListener('input', () => {
        this.clearError(fieldName);
      });
    });
    
    // Add submit event listener
    this.form.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }
  
  /**
   * Validate a single field
   * @param {string} fieldName - Name of the field to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  validateField(fieldName) {
    const field = this.fields[fieldName];
    const rules = this.validationRules[fieldName];
    const value = field.value.trim();
    
    // Check if required and empty
    if (rules.required && !value) {
      this.showError(fieldName, rules.messages.empty);
      return false;
    }
    
    // Check minimum length
    if (rules.minLength && value.length < rules.minLength) {
      this.showError(fieldName, rules.messages.tooShort);
      return false;
    }
    
    // Check pattern (for phone)
    if (rules.pattern && !rules.pattern.test(value)) {
      this.showError(fieldName, rules.messages.invalid);
      return false;
    }
    
    // Field is valid
    this.clearError(fieldName);
    return true;
  }
  
  /**
   * Validate all form fields
   * @returns {boolean} - True if all fields are valid, false otherwise
   */
  validateForm() {
    let isValid = true;
    
    Object.keys(this.fields).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  /**
   * Handle form submission
   * @param {Event} event - Submit event
   */
  handleSubmit(event) {
    event.preventDefault();
    
    // Hide any previous success message
    this.hideSuccessMessage();
    
    // Validate all fields
    if (!this.validateForm()) {
      // Focus on first invalid field
      const firstInvalidField = Object.keys(this.fields).find(
        fieldName => !this.validateField(fieldName)
      );
      if (firstInvalidField) {
        this.fields[firstInvalidField].focus();
      }
      return;
    }
    
    // Form is valid, show success message
    this.showSuccessMessage();
    
    // Reset form after short delay
    setTimeout(() => {
      this.resetForm();
    }, 3000);
  }
  
  /**
   * Show error message for a field
   * @param {string} fieldName - Name of the field
   * @param {string} message - Error message to display
   */
  showError(fieldName, message) {
    const field = this.fields[fieldName];
    const errorElement = this.errors[fieldName];
    
    field.classList.add('form__input--error');
    field.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  /**
   * Clear error message for a field
   * @param {string} fieldName - Name of the field
   */
  clearError(fieldName) {
    const field = this.fields[fieldName];
    const errorElement = this.errors[fieldName];
    
    field.classList.remove('form__input--error');
    field.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  
  /**
   * Show success message
   */
  showSuccessMessage() {
    this.successMessage.style.display = 'block';
    this.successMessage.setAttribute('role', 'alert');
    this.successMessage.setAttribute('aria-live', 'polite');
  }
  
  /**
   * Hide success message
   */
  hideSuccessMessage() {
    this.successMessage.style.display = 'none';
  }
  
  /**
   * Reset form to initial state
   */
  resetForm() {
    // Reset form fields
    this.form.reset();
    
    // Clear all errors
    Object.keys(this.fields).forEach(fieldName => {
      this.clearError(fieldName);
    });
    
    // Hide success message
    this.hideSuccessMessage();
  }
}
