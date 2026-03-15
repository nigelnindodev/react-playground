import type { ValidateFunction } from '../../src/types';

const validate: ValidateFunction = (container: HTMLElement) => {
  const incrementBtn = container.querySelector('button:not(:has(~ button))');
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
  
  if (!countText.textContent?.includes('Count: 1')) {
    return { 
      passed: false, 
      message: 'Clicking increment should increase the count by 1' 
    };
  }

  (decrementBtn as HTMLElement).click();
  
  if (!countText.textContent?.includes('Count: 0')) {
    return { 
      passed: false, 
      message: 'Clicking decrement should decrease the count by 1' 
    };
  }

  (decrementBtn as HTMLElement).click();
  
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
