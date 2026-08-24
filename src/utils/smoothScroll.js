/**
 * Helper function for controlled, slow, smooth scrolling with easing.
 * @param {string|Element} targetInput - CSS selector string or DOM element to scroll to
 * @param {number} offset - Offset from the top of the element (e.g. for fixed header height)
 * @param {number} duration - Animation duration in milliseconds (default 900ms)
 */
export const smoothScrollTo = (targetInput, offset = 70, duration = 900) => {
  const target = typeof targetInput === 'string' ? document.querySelector(targetInput) : targetInput;
  if (!target) return;

  const htmlElement = document.documentElement;
  const originalScrollBehavior = htmlElement.style.scrollBehavior;
  htmlElement.style.scrollBehavior = 'auto';

  const startPosition = window.scrollY || window.pageYOffset;
  const targetPosition = target.getBoundingClientRect().top + startPosition - offset;
  const distance = targetPosition - startPosition;

  // If distance is zero, return early
  if (Math.abs(distance) < 2) return;

  let startTime = null;

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(step);
    } else {
      htmlElement.style.scrollBehavior = originalScrollBehavior;
    }
  };

  requestAnimationFrame(step);
};
