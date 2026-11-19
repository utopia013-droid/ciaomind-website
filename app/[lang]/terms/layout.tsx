import { pageMetadata } from '@/lib/seo';
export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ lang: string }> }) {
  const { lang } = await paramsPromise;
 return pageMetadata(lang, 'terms'); }
export default function PageLayout({ children }: { children: React.ReactNode }) { return children; }
