import { pageMetadata } from '@/lib/seo';
export function generateMetadata({ params: { lang } }: { params: { lang: string } }) { return pageMetadata(lang, 'team'); }
export default function PageLayout({ children }: { children: React.ReactNode }) { return children; }
