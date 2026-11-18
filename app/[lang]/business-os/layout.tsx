import Link from 'next/link';
export default async function Layout({children,params: paramsPromise}:{children:React.ReactNode;params:Promise<{lang:string}>}){
  const params = await paramsPromise;
return <><nav aria-label="Business OS languages" className="mx-auto flex max-w-7xl flex-wrap gap-5 px-6 pt-8 text-sm"><Link href={`/${params.lang}/business-os/request/`}>{params.lang==='zh'?'企业与合作方需求':params.lang==='it'?'Richieste e partner':'Business requests'}</Link><Link href={`/${params.lang}/business-os/`}>{params.lang==='zh'?'项目工作台':params.lang==='it'?'Spazio progetti':'Project workspace'}</Link><Link href="/zh/business-os/" lang="zh">中文</Link><Link href="/it/business-os/" lang="it">Italiano</Link><Link href="/en/business-os/" lang="en">English</Link></nav>{children}</>}
