import type { MetadataRoute } from 'next';
import { company } from '@/data/company';
import { pageNames } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap { return Object.keys(pageNames).flatMap(path => ['zh', 'it'].map(locale => ({ url: `${company.website}/${locale}/${path ? `${path}/` : ''}`, alternates: { languages: { 'zh-CN': `${company.website}/zh/${path ? `${path}/` : ''}`, it: `${company.website}/it/${path ? `${path}/` : ''}` } } }))); }
