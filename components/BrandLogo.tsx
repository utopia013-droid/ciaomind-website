import { starPath, ciaoPath, mindPath } from '@/lib/brand-paths';
import signature from '@/lib/brand-signature.json';

type BrandLogoProps = { className?: string; inverse?: boolean };

/** The same outlined signature is used on the website and exported media. */
export default function BrandLogo({ className = '', inverse = false }: BrandLogoProps) {
  return (
    <svg className={`brand-logo${inverse ? ' brand-logo-inverse' : ''} ${className}`} viewBox={signature.viewBox} aria-hidden="true" focusable="false">
      <g className="brand-symbol">
        <path className="brand-outer" d={starPath} />
        <path className="brand-white" d={starPath} />
        <path className="brand-core" d={starPath} />
      </g>
      <g className="brand-letters">
        <g transform={signature.ciaoTransform}><path className="brand-ciao" d={ciaoPath} /></g>
        <g transform={signature.mindTransform}><path className="brand-mind" d={mindPath} /></g>
        <path className="brand-description" d={signature.descriptorPath} />
      </g>
    </svg>
  );
}
