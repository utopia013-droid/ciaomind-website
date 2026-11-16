import { Storefront, storefrontMetadata, type StorefrontProps } from '@/components/Storefront';

export function generateMetadata({ params }: StorefrontProps) {
  return storefrontMetadata(params.lang, 'business');
}

export default function BusinessPage(props: StorefrontProps) {
  return <Storefront {...props} />;
}
