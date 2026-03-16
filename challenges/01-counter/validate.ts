import type { ValidateFunction } from '../../src/types';

const wait = () => new Promise(r => setTimeout(r, 10));

const validate: ValidateFunction = async (container: HTMLElement) => {
  const incrementBtn = container.querySelector('button:first-of-type');
  const decrementBtn = container.querySelector('button:last-child');

  if (!incrementBtn || !decrementBtn) {
    return {
      passed: false,
      message: 'Make sure you have increment and decrement buttons'
    };
  }

  const countText = container.querySelector('p');
  if (!countText || !countText.textContent?.includes('Count:')) {
    return {
      passed: false,
      message: 'Make sure you display the count in a paragraph element'
    };
  }

  (incrementBtn as HTMLElement).click();
  await wait();

  if (!countText.textContent?.includes('Count: 1')) {
    return {
      passed: false,
      message: 'Clicking increment should increase the count by 1'
    };
  }

  (decrementBtn as HTMLElement).click();
  await wait();

  if (!countText.textContent?.includes('Count: 0')) {
    return {
      passed: false,
      message: 'Clicking decrement should decrease the count by 1'
    };
  }

  (decrementBtn as HTMLElement).click();
  await wait();

  if (!countText.textContent?.includes('Count: 0')) {
    return {
      passed: false,
      message: 'Counter should not go below 0'
    };
  }

  return {
    passed: true,
    message: 'Great job! Your counter works correctly!'
  };
};

export default validate;
