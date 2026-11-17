'use client';

import { useEffect, type RefObject } from 'react';

/** Direction-sensitive center-out reveal; writes only to the shared header. */
export function useBrandScroll(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let lastY = Math.max(0, window.scrollY);
    let frame = 0;
    let direction: 'down' | 'up' = 'down';
    let white = lastY > 4 ? 1 : 0.6;
    let core = 0;
    let hasMoved = lastY > 4;
    const apply = () => {
      header.style.setProperty('--brand-white-scale', white.toFixed(4));
      header.style.setProperty('--brand-core-scale', core.toFixed(4));
      header.dataset.brandMode = !hasMoved ? 'rest' : direction === 'down' ? 'expanded' : 'returning';
    };
    apply();
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      // Ignore subpixel noise and Safari's negative rubber-band offset.
      if (Math.abs(delta) < 2 && y !== 0) return;
      if (delta === 0) return;
      const next = delta > 0 ? 'down' : 'up';
      if (next !== direction) direction = next;
      hasMoved = true;
      if (direction === 'down') {
        white = Math.min(1, white + Math.abs(delta) / 180);
        core = Math.max(0, core - Math.abs(delta) / 120);
      } else {
        white = 1;
        core = Math.min(0.6, core + Math.abs(delta) / 160);
        if (y === 0) core = 0.6;
      }
      lastY = y;
      apply();
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pageshow', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pageshow', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
