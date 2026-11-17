import { starPath, ciaoPath, mindPath } from '@/lib/brand-paths';

type BrandLogoProps = { className?: string; inverse?: boolean };

/** One outlined lockup, shared by every locale and surface. */
export default function BrandLogo({ className = '', inverse = false }: BrandLogoProps) {
  return (
    <svg className={`brand-logo${inverse ? ' brand-logo-inverse' : ''} ${className}`} viewBox="0 0 300 108" aria-hidden="true" focusable="false">
      <g className="brand-symbol">
        <path className="brand-outer" d={starPath} />
        <path className="brand-white" d={starPath} />
        <path className="brand-core" d={starPath} />
      </g>
      <g className="brand-letters">
        <path className="brand-ciao" d={ciaoPath} />
        <path className="brand-mind" d={mindPath} />
      </g>
    </svg>
  );
}
