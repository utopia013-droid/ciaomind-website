import OrganizationData from '@/components/OrganizationData';
import { Storefront, storefrontMetadata, type StorefrontProps } from '@/components/Storefront';

export function generateMetadata({ params }: StorefrontProps) {
  return storefrontMetadata(params.lang, 'home');
}

export default function HomePage(props: StorefrontProps) {
  return <>
    <OrganizationData lang={props.params.lang} />
    <Storefront {...props} />
  </>;
}
