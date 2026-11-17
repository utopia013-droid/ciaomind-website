'use client';

import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';

/** Brief, non-blocking opening. Internal navigation retains the shared layout. */
export default function BrandIntro() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }
    const dismiss = () => setVisible(false);
    const timer = window.setTimeout(dismiss, 2100);
    window.addEventListener('pointerdown', dismiss, { once: true });
    window.addEventListener('keydown', dismiss, { once: true });
    window.addEventListener('wheel', dismiss, { once: true, passive: true });
    window.addEventListener('touchstart', dismiss, { once: true, passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchstart', dismiss);
    };
  }, []);
  if (!visible) return null;
  return <div className="brand-intro" aria-hidden="true" onAnimationEnd={event => {
    if (event.target === event.currentTarget && event.animationName === 'brand-intro-exit') setVisible(false);
  }}><BrandLogo /></div>;
}
