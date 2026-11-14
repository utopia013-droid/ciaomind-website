import type { Metadata } from 'next';
import ClientPortal from '@/components/ClientPortal';

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  return {
    title: lang === 'it' ? 'Area clienti' : '客户中心',
    robots: { index: false, follow: false },
  };
}

export default function PortalPage({ params: { lang } }: { params: { lang: string } }) {
  return <ClientPortal locale={lang === 'it' ? 'it' : 'zh'} />;
}
