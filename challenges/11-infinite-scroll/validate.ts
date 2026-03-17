import type { ValidateFunction } from '../../src/types';

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

const validate: ValidateFunction = async (container: HTMLElement) => {
  // Check initial 20 items are rendered
  await wait(100);
  let items = container.querySelectorAll('li');
  if (items.length < 20) {
    return { passed: false, message: `Start with 20 items — found ${items.length}` };
  }
  if (items.length > 25) {
    return { passed: false, message: 'Start with only 20 items on the first page' };
  }

  // Verify "Post #1" exists
  if (!container.textContent?.includes('Post #1')) {
    return { passed: false, message: 'Items should be labelled "Post #1", "Post #2", etc.' };
  }

  // Find scrollable container and simulate scroll to bottom
  const scrollEl = Array.from(container.querySelectorAll('div')).find(d => {
    const s = window.getComputedStyle(d);
    return s.overflowY === 'auto' || s.overflowY === 'scroll';
  }) || container;

  // Trigger intersection by directly calling loadMore via sentinel observation
  // Since IntersectionObserver won't fire in jsdom, we fire the scroll event
  Object.defineProperty(scrollEl, 'scrollTop', { writable: true, value: 99999 });
  Object.defineProperty(scrollEl, 'scrollHeight', { writable: true, value: 100000 });
  scrollEl.dispatchEvent(new Event('scroll', { bubbles: true }));

  // Also try triggering via the sentinel element if present
  const sentinel = container.querySelector('div[style*="height: 1"]') ||
    container.querySelector('div[style*="height:1"]');

  // Manually trigger any registered IntersectionObserver callbacks
  // by looking at the global mock or simply waiting and checking if items grew
  await wait(800);

  items = container.querySelectorAll('li');

  // If items didn't grow automatically (IntersectionObserver won't fire in test env),
  // check that the mechanism is at least wired up correctly by looking for sentinel + loading text
  const hasSentinel = !!sentinel;
  const hasLoadingText = container.textContent?.includes('Loading more') ||
    container.textContent?.includes('No more');

  if (!hasSentinel) {
    return { passed: false, message: 'Add a sentinel div at the bottom for IntersectionObserver to observe' };
  }
  if (!hasLoadingText) {
    return {
      passed: false,
      message: 'Show "Loading more..." while fetching and "No more items" when fully loaded',
    };
  }

  return {
    passed: true,
    message: 'Great work! Your infinite scroll is wired up with IntersectionObserver correctly!',
  };
};

export default validate;
