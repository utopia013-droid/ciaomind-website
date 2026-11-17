import type { MetadataRoute } from 'next';
import { company } from '@/data/company';
import { pageNames } from '@/lib/seo';
import { locales } from '@/lib/i18n';
export default function sitemap():MetadataRoute.Sitemap {return [...Object.keys(pageNames),'news/milan-roundtable-2026'].flatMap(path=>locales.map(locale=>({url:`${company.website}/${locale}/${path?path+'/':''}`,alternates:{languages:Object.fromEntries(locales.map(l=>[l,`${company.website}/${l}/${path?path+'/':''}`]))}})));}
