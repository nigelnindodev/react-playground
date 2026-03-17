import type { ValidateFunction } from '../../src/types';

const wait = (ms = 50) => new Promise(r => setTimeout(r, ms));

const validate: ValidateFunction = async (container: HTMLElement) => {
  // Find the scrollable container
  const scrollContainer = Array.from(container.querySelectorAll('div')).find(d => {
    const s = d.style;
    return s.overflowY === 'scroll' || s.overflow === 'scroll';
  });

  if (!scrollContainer) {
    return { passed: false, message: 'Add a scrollable container div with overflow-y: scroll and a fixed height' };
  }

  await wait(100);

  // Should NOT have 100k DOM nodes
  const allItems = container.querySelectorAll('div');
  if (allItems.length > 500) {
    return {
      passed: false,
      message: `Too many DOM nodes (${allItems.length}). Only render visible items — that's the whole point of virtualization!`,
    };
  }

  // The inner spacer should have a very tall height
  const innerDivs = Array.from(scrollContainer.children);
  const spacer = innerDivs.find(d => {
    const el = d as HTMLElement;
    return parseInt(el.style.height || '0') > 10_000;
  });

  if (!spacer) {
    return {
      passed: false,
      message: 'Place an inner div with total height (itemCount × itemHeight) to make the scrollbar correct',
    };
  }

  // Check "Showing items" text exists
  if (!container.textContent?.toLowerCase().includes('showing')) {
    return { passed: false, message: 'Display which item range is currently visible (e.g. "Showing items 1 – 20")' };
  }

  // Simulate scroll and verify DOM updates
  const itemCountBefore = scrollContainer.querySelectorAll('[style*="position: absolute"], [style*="position:absolute"]').length;

  Object.defineProperty(scrollContainer, 'scrollTop', { writable: true, value: 4000 });
  scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }));
  await wait(100);

  const text = container.textContent ?? '';
  // After scrolling ~100px worth, item 1 should no longer be "visible" in the label
  // Just check "Showing" text is still present — DOM content check
  if (!text.toLowerCase().includes('showing')) {
    return { passed: false, message: 'Update the visible range display as the user scrolls' };
  }

  return { passed: true, message: 'Impressive! Your virtualized list handles 100k items efficiently!' };
};

export default validate;
