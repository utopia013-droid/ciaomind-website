import { redirect } from 'next/navigation';
export default async function ArchivedArticle({ params: paramsPromise }: { params: Promise<{ lang: string }> }) {
  const { lang } = await paramsPromise;
 redirect(`/${lang}/news/`); }
