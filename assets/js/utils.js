export function animateValue(el, start, end, duration) {
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * (end - start) + start);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = end;
  };
  requestAnimationFrame(step);
}

export function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.textContent.replace(/[0-9]/g, '');
  let startTime = null;
  const step = (ts) => {
    if (!startTime) startTime = ts;
    const p = Math.min((ts - startTime) / 1800, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}
