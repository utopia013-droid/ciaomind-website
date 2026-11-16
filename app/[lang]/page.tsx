import OrganizationData from '@/components/OrganizationData';
import HeritageHome, { heritageHomeMetadata } from '@/components/HeritageHome';
import { Storefront, type StorefrontProps } from '@/components/Storefront';
import { resolveBusinessLocale } from '@/data/business-catalog';
import { readCampaign } from '@/lib/campaign';
import { marketingMetadata } from '@/lib/marketing-metadata';

export function generateMetadata({ params }: StorefrontProps) {
  const locale = resolveBusinessLocale(params.lang);
  const metadata = heritageHomeMetadata(locale);
  return { ...metadata, ...marketingMetadata(locale, `/${locale}/`, metadata.title, metadata.description) };
}

export default function HomePage(props: StorefrontProps) {
  const campaign = readCampaign(props.searchParams);
  return <>
    <OrganizationData lang={props.params.lang} />
    <HeritageHome locale={resolveBusinessLocale(props.params.lang)} campaign={campaign} />
    <Storefront {...props} showHero={false} />
  </>;
}
