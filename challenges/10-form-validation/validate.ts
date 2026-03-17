import type { ValidateFunction } from '../../src/types';

const wait = () => new Promise(r => setTimeout(r, 20));

const setNativeValue = (input: HTMLInputElement, value: string) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
  nativeInputValueSetter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
};

const validate: ValidateFunction = async (container: HTMLElement) => {
  const inputs = container.querySelectorAll('input');
  if (inputs.length < 4) {
    return { passed: false, message: 'Add four inputs: name, email, password, and confirm password' };
  }

  const [nameInput, emailInput, passwordInput, confirmInput] = Array.from(inputs) as HTMLInputElement[];

  const submitBtn = container.querySelector('button') as HTMLButtonElement | null;
  if (!submitBtn) return { passed: false, message: 'Add a Submit button' };

  // Button should start disabled
  if (!submitBtn.disabled) {
    return { passed: false, message: 'The Submit button should be disabled when the form is empty' };
  }

  // Trigger blur on empty name — should show error
  nameInput.focus();
  nameInput.blur();
  nameInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  await wait();

  const hasNameError = container.textContent?.toLowerCase().includes('required') ||
    container.textContent?.toLowerCase().includes('name') && container.querySelectorAll('p').length > 0;

  // Fill in valid data
  setNativeValue(nameInput, 'Alice');
  nameInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  await wait();

  setNativeValue(emailInput, 'alice@example.com');
  emailInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  await wait();

  setNativeValue(passwordInput, 'password123');
  passwordInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  await wait();

  setNativeValue(confirmInput, 'password123');
  confirmInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  await wait();

  if (submitBtn.disabled) {
    return { passed: false, message: 'Submit button should be enabled when all fields are valid' };
  }

  // Test password mismatch
  setNativeValue(confirmInput, 'wrongpassword');
  confirmInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  await wait();

  if (!container.textContent?.toLowerCase().includes('match')) {
    return { passed: false, message: 'Show an error when passwords do not match' };
  }

  // Fix mismatch and submit
  setNativeValue(confirmInput, 'password123');
  confirmInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  await wait();

  submitBtn.click();
  await wait();

  if (!container.textContent?.includes('Registration successful!')) {
    return { passed: false, message: 'Show "Registration successful!" after a valid form submission' };
  }

  return { passed: true, message: 'Excellent form validation work! All checks passed!' };
};

export default validate;
