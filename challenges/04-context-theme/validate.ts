import type { ValidateFunction } from '../../src/types';

const wait = () => new Promise(r => setTimeout(r, 20));

const validate: ValidateFunction = async (container: HTMLElement) => {
  const text = container.textContent ?? '';

  if (!text.toLowerCase().includes('light') && !text.toLowerCase().includes('dark')) {
    return { passed: false, message: 'Display the current theme value ("light" or "dark")' };
  }

  const toggleBtn = Array.from(container.querySelectorAll('button')).find(b =>
    b.textContent?.toLowerCase().includes('toggle')
  );
  if (!toggleBtn) {
    return { passed: false, message: 'Add a "Toggle Theme" button' };
  }

  const initialTheme = text.toLowerCase().includes('light') ? 'light' : 'dark';

  toggleBtn.click();
  await wait();

  const newText = container.textContent ?? '';
  const newTheme = newText.toLowerCase().includes('dark') ? 'dark' : 'light';

  if (newTheme === initialTheme) {
    return { passed: false, message: 'Clicking Toggle Theme should switch between light and dark' };
  }

  toggleBtn.click();
  await wait();

  const finalText = container.textContent ?? '';
  const finalTheme = finalText.toLowerCase().includes('light') ? 'light' : 'dark';
  if (finalTheme !== initialTheme) {
    return { passed: false, message: 'Toggling twice should return to the original theme' };
  }

  return { passed: true, message: 'Great work! Your theme context and custom hook work correctly!' };
};

export default validate;
