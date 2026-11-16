import OrganizationData from '@/components/OrganizationData';
import HeritageHome, { heritageHomeMetadata } from '@/components/HeritageHome';
import { Storefront, type StorefrontProps } from '@/components/Storefront';
import { resolveBusinessLocale } from '@/data/business-catalog';

export function generateMetadata({ params }: StorefrontProps) {
  return heritageHomeMetadata(resolveBusinessLocale(params.lang));
}

export default function HomePage(props: StorefrontProps) {
  const rawSource = props.searchParams.utm_source;
  const source = typeof rawSource === 'string' && /^[A-Za-z0-9_.-]{1,80}$/.test(rawSource) ? rawSource : '';
  return <>
    <OrganizationData lang={props.params.lang} />
    <HeritageHome locale={resolveBusinessLocale(props.params.lang)} source={source} />
    <Storefront {...props} showHero={false} />
  </>;
}
