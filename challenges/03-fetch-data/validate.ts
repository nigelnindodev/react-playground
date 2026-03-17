import type { ValidateFunction } from '../../src/types';

const wait = (ms = 100) => new Promise(r => setTimeout(r, ms));

const validate: ValidateFunction = async (container: HTMLElement) => {
  // Should show loading text initially or after a moment
  await wait(50);
  const hasLoading =
    container.textContent?.toLowerCase().includes('loading') ?? false;

  // Wait for data to load (up to 5 seconds)
  let elapsed = 0;
  while (elapsed < 5000) {
    await wait(200);
    elapsed += 200;
    const ul = container.querySelector('ul');
    if (ul && ul.querySelectorAll('li').length > 0) break;
  }

  const ul = container.querySelector('ul');
  if (!ul || ul.querySelectorAll('li').length === 0) {
    return {
      passed: false,
      message: 'Fetch user data and render each user name in a <li> inside a <ul>',
    };
  }

  if (!hasLoading) {
    return {
      passed: false,
      message: 'Show a "Loading..." indicator while data is being fetched',
    };
  }

  const retryBtn = Array.from(container.querySelectorAll('button')).find(b =>
    b.textContent?.toLowerCase().includes('retry')
  );
  if (!retryBtn) {
    return { passed: false, message: 'Add a "Retry" button to allow re-fetching' };
  }

  return {
    passed: true,
    message: 'Well done! Data fetching with loading state works correctly!',
  };
};

export default validate;
