import type { ValidateFunction } from '../../src/types';

const wait = () => new Promise(r => setTimeout(r, 20));

const validate: ValidateFunction = async (container: HTMLElement) => {
  const input = container.querySelector('input[type="number"]') as HTMLInputElement | null;
  if (!input) {
    return { passed: false, message: 'Add a number input to control n' };
  }

  // Check fibonacci result is displayed at initial n=10
  const getText = () => container.textContent ?? '';

  if (!getText().includes('55')) {
    return {
      passed: false,
      message: 'Display the fibonacci result — fibonacci(10) should equal 55',
    };
  }

  // Change n to 8 and verify result updates
  input.value = '8';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  await wait();

  if (!getText().includes('21')) {
    return {
      passed: false,
      message: 'fibonacci(8) should equal 21 — make sure the result updates when n changes',
    };
  }

  // Verify counter exists and works
  const incBtn = Array.from(container.querySelectorAll('button')).find(b =>
    b.textContent?.toLowerCase().includes('increment') ||
    b.textContent?.toLowerCase().includes('counter')
  );
  if (!incBtn) {
    return { passed: false, message: 'Add an unrelated increment counter button' };
  }

  incBtn.click();
  await wait();
  incBtn.click();
  await wait();

  // The fibonacci result should still be correct after counter updates
  if (!getText().includes('21')) {
    return {
      passed: false,
      message: 'Updating the counter should not change the fibonacci result',
    };
  }

  return { passed: true, message: 'Excellent! useMemo and useCallback are working correctly!' };
};

export default validate;
