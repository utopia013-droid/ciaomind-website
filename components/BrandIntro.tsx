'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import BrandLogo from './BrandLogo';
import { usePathname } from 'next/navigation';

const motionPreference = () => window.matchMedia('(prefers-reduced-motion: reduce)');
const subscribeToMotion = (onChange: () => void) => {
  const query = motionPreference();
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getReducedMotion = () => motionPreference().matches;
const serverReducedMotion = () => false;

/** Brief, non-blocking opening. Internal navigation retains the shared layout. */
export default function BrandIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, serverReducedMotion);
  useEffect(() => {
    if (reducedMotion) return;
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
  }, [reducedMotion]);
  if (!visible || reducedMotion || /\/(business-os|account)(\/|$)/.test(pathname)) return null;
  return <div className="brand-intro" aria-hidden="true" onAnimationEnd={event => {
    if (event.target === event.currentTarget && event.animationName === 'brand-intro-exit') setVisible(false);
  }}><BrandLogo variant="intro" /></div>;
}
