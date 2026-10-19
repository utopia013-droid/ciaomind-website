import { redirect } from 'next/navigation';
export default function ArchivedArticle({ params: { lang } }: { params: { lang: string } }) { redirect(`/${lang}/news/`); }
