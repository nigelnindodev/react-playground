import type { ValidateFunction } from '../../src/types';

const wait = () => new Promise(r => setTimeout(r, 30));

const validate: ValidateFunction = async (container: HTMLElement) => {
  const openBtn = Array.from(document.querySelectorAll('button')).find(b =>
    b.textContent?.toLowerCase().includes('open')
  );
  if (!openBtn) {
    return { passed: false, message: 'Add an "Open Modal" button' };
  }

  // Modal should not be visible initially
  const getModal = () => document.querySelector('[role="dialog"], .modal, [data-modal]') ||
    Array.from(document.querySelectorAll('div')).find(d =>
      d.style.position === 'fixed' && d.textContent?.includes('Modal Title')
    );

  if (getModal()) {
    return { passed: false, message: 'Modal should be hidden on initial render' };
  }

  // Open the modal
  openBtn.click();
  await wait();

  const modal = getModal();
  if (!modal) {
    return { passed: false, message: 'Clicking "Open Modal" should display the modal' };
  }

  if (!document.body.contains(modal)) {
    return { passed: false, message: 'Render the modal using ReactDOM.createPortal into document.body' };
  }

  // Check for a close button
  const closeBtn = Array.from(modal.querySelectorAll('button')).find(b =>
    b.textContent?.toLowerCase().includes('close')
  );
  if (!closeBtn) {
    return { passed: false, message: 'The modal needs a "Close" button' };
  }

  // Test Escape key closes it
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await wait();

  if (getModal()) {
    return { passed: false, message: 'Pressing Escape should close the modal' };
  }

  // Re-open and test close button
  openBtn.click();
  await wait();
  const modal2 = getModal();
  if (!modal2) {
    return { passed: false, message: 'Modal should be re-openable after closing' };
  }
  const closeBtn2 = Array.from(modal2.querySelectorAll('button')).find(b =>
    b.textContent?.toLowerCase().includes('close')
  );
  closeBtn2?.click();
  await wait();

  if (getModal()) {
    return { passed: false, message: 'Clicking the Close button should close the modal' };
  }

  return { passed: true, message: 'Fantastic! Your portal-based modal works perfectly!' };
};

export default validate;
