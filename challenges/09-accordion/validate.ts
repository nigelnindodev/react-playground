import type { ValidateFunction } from '../../src/types';

const wait = () => new Promise(r => setTimeout(r, 20));

const validate: ValidateFunction = async (container: HTMLElement) => {
  const buttons = container.querySelectorAll('button');
  if (buttons.length < 3) {
    return { passed: false, message: 'Render at least 3 accordion item title buttons' };
  }

  const getText = () => container.textContent ?? '';

  // Nothing should be expanded initially (body text not visible)
  const initialText = getText();
  const bodyTexts = [
    'React is a JavaScript library',
    'Hooks let you use state',
    'JSX is a syntax extension',
  ];
  const anyOpen = bodyTexts.some(t => initialText.includes(t));
  // Not a hard fail if one happens to be open, but expected closed

  // Click first button — should open it
  buttons[0].click();
  await wait();
  if (!getText().includes('React is a JavaScript library')) {
    return { passed: false, message: 'Clicking the first title should reveal its body content' };
  }

  // Click second button — first should close, second should open
  buttons[1].click();
  await wait();
  if (getText().includes('React is a JavaScript library')) {
    return { passed: false, message: 'Opening a second item should close the first (only one open at a time)' };
  }
  if (!getText().includes('Hooks let you use state')) {
    return { passed: false, message: 'Clicking the second title should reveal its body content' };
  }

  // Click second button again — should close it (toggle)
  buttons[1].click();
  await wait();
  if (getText().includes('Hooks let you use state')) {
    return { passed: false, message: 'Clicking an open item again should close it (toggle behaviour)' };
  }

  return { passed: true, message: 'Nice work! Your accordion handles exclusive open state correctly!' };
};

export default validate;
