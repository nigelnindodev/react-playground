import type { ValidateFunction } from '../../src/types';

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

const validate: ValidateFunction = async (container: HTMLElement) => {
  const input = container.querySelector('input[type="text"]') as HTMLInputElement | null;
  if (!input) {
    return { passed: false, message: 'Add a text input for the search query' };
  }

  // Type a query
  input.value = 'test';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));

  // Should show searching indicator soon after
  await wait(100);
  // (Debounced, so maybe not yet — both before and after debounce delay are acceptable)

  // Wait for debounce + network (up to 3 seconds total)
  let elapsed = 0;
  while (elapsed < 3000) {
    await wait(200);
    elapsed += 200;
    if (container.querySelectorAll('li').length > 0) break;
    if (container.textContent?.toLowerCase().includes('searching')) break;
  }

  const hasResults = container.querySelectorAll('li').length > 0;
  const hasSearching = container.textContent?.toLowerCase().includes('searching');

  if (!hasResults && !hasSearching) {
    return {
      passed: false,
      message: 'After typing a query, fetch results and display them in <li> elements (or show "Searching...")',
    };
  }

  // Wait for results if still loading
  if (!hasResults) {
    await wait(2000);
  }

  if (container.querySelectorAll('li').length === 0) {
    return { passed: false, message: 'Display fetched result titles in a list' };
  }

  // Clear input — results should disappear
  input.value = '';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  await wait(600);

  if (container.querySelectorAll('li').length > 0) {
    return { passed: false, message: 'When the query is empty, show no results' };
  }

  return { passed: true, message: 'Great work! Your debounced search hook works correctly!' };
};

export default validate;
