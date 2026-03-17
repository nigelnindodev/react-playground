import type { ValidateFunction } from '../../src/types';

const wait = () => new Promise(r => setTimeout(r, 20));

const validate: ValidateFunction = async (container: HTMLElement) => {
  const input = container.querySelector('input[type="text"]') as HTMLInputElement | null;
  const addBtn = Array.from(container.querySelectorAll('button')).find(b =>
    b.textContent?.toLowerCase().includes('add')
  );

  if (!input) {
    return { passed: false, message: 'Add a text input for new todos' };
  }
  if (!addBtn) {
    return { passed: false, message: 'Add an "Add" button' };
  }

  // Add first todo via button click
  input.value = 'Buy milk';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  await wait();
  addBtn.click();
  await wait();

  const list = container.querySelector('ul');
  if (!list || !list.textContent?.includes('Buy milk')) {
    return { passed: false, message: 'Clicking Add should add the todo to the list' };
  }

  // Input should be cleared after adding
  if (input.value !== '') {
    return { passed: false, message: 'Clear the input after adding a todo' };
  }

  // Add second todo via Enter key
  input.value = 'Walk the dog';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  await wait();
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  await wait();

  if (!list.textContent?.includes('Walk the dog')) {
    return { passed: false, message: 'Pressing Enter should also add the todo' };
  }

  // Empty todo should not be added
  const countBefore = list.querySelectorAll('li').length;
  input.value = '   ';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  addBtn.click();
  await wait();
  const countAfter = list.querySelectorAll('li').length;
  if (countAfter !== countBefore) {
    return { passed: false, message: 'Do not add empty or whitespace-only todos' };
  }

  // Delete a todo
  const firstDeleteBtn = list.querySelector('button');
  if (!firstDeleteBtn) {
    return { passed: false, message: 'Each todo item needs a Delete button' };
  }
  firstDeleteBtn.click();
  await wait();
  if (list.querySelectorAll('li').length !== countBefore - 1) {
    return { passed: false, message: 'The Delete button should remove that todo from the list' };
  }

  return { passed: true, message: 'Excellent! Your todo list works perfectly!' };
};

export default validate;
