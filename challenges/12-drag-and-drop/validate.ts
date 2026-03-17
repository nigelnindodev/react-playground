import type { ValidateFunction } from '../../src/types';

const wait = () => new Promise(r => setTimeout(r, 20));

const validate: ValidateFunction = async (container: HTMLElement) => {
  const getItems = () => Array.from(container.querySelectorAll('li'));

  const items = getItems();
  if (items.length < 5) {
    return { passed: false, message: 'Render at least 5 list items' };
  }

  // Check draggable attribute
  const draggable = items.filter(li => li.getAttribute('draggable') === 'true');
  if (draggable.length < 5) {
    return { passed: false, message: 'All list items should have the draggable attribute set to true' };
  }

  // Record initial order
  const initialOrder = items.map(li => li.textContent?.trim() ?? '');

  // Simulate drag: move item 0 to position 2
  const src = items[0];
  const target = items[2];

  src.dispatchEvent(new DragEvent('dragstart', { bubbles: true }));
  await wait();
  target.dispatchEvent(new DragEvent('dragover', { bubbles: true }));
  await wait();
  target.dispatchEvent(new DragEvent('drop', { bubbles: true }));
  await wait();
  src.dispatchEvent(new DragEvent('dragend', { bubbles: true }));
  await wait();

  const newItems = getItems();
  const newOrder = newItems.map(li => li.textContent?.trim() ?? '');

  // The order should have changed
  const unchanged = newOrder.every((v, i) => v === initialOrder[i]);
  if (unchanged) {
    return {
      passed: false,
      message: 'Dropping an item should reorder the list — make sure onDrop updates the items state',
    };
  }

  // Numbers should be updated (1. 2. 3. etc reflect new positions)
  const firstText = newItems[0].textContent ?? '';
  if (!firstText.startsWith('1.') && !firstText.match(/^1[\.\s]/)) {
    return { passed: false, message: 'Display the 1-based position number beside each item after reorder' };
  }

  return { passed: true, message: 'Excellent! Your drag-and-drop reordering works correctly!' };
};

export default validate;
