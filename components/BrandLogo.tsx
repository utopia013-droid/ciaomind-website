import { starPath, ciaoPath, mindPath } from '@/lib/brand-paths';
import signature from '@/lib/brand-signature.json';

type BrandLogoProps = { className?: string; inverse?: boolean; variant?: 'stacked' | 'intro' };

/** Compact stacked navigation mark; the opening uses the full-width signature. */
export default function BrandLogo({ className = '', inverse = false, variant = 'stacked' }: BrandLogoProps) {
  const isIntro = variant === 'intro';
  return (
    <svg className={`brand-logo${inverse ? ' brand-logo-inverse' : ''} ${className}`} viewBox={isIntro ? '0 0 500 146' : '0 0 300 108'} data-brand-variant={variant} aria-hidden="true" focusable="false">
      <g className="brand-symbol">
        <path className="brand-outer" d={starPath} />
        <path className="brand-white" d={starPath} />
        <path className="brand-core" d={starPath} />
      </g>
      <g className="brand-letters">
        <g transform={isIntro ? signature.ciaoTransform : undefined}><path className="brand-ciao" d={ciaoPath} /></g>
        <g transform={isIntro ? signature.mindTransform : undefined}><path className="brand-mind" d={mindPath} /></g>
        {isIntro && <g transform="translate(2 122) scale(1.663955) translate(-132.67236328125 -79.1650390625)"><path className="brand-description" d={signature.descriptorPath} /></g>}
      </g>
    </svg>
  );
}
