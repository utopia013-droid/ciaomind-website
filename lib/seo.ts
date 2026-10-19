import type { Metadata } from 'next';
import { company } from '@/data/company';
export const pageNames: Record<string, { zh: string; it: string }> = {
 '': {zh: '文化与科技连接中意', it: 'Cultura e tecnologia tra Italia e Cina'},
 about: {zh: '关于我们', it: 'Chi siamo'}, services: {zh: '项目方向', it: 'Ambiti di progetto'},
 team: {zh: '团队', it: 'Il team'}, contact: {zh: '联系我们', it: 'Contatti'},
 news: {zh: '公司动态', it: 'Notizie'}, privacy: {zh: '联系与隐私说明', it: 'Privacy e contatti'}, terms: {zh: '网站使用说明', it: 'Informazioni sul sito'},
};
export function pageMetadata(lang: string, path: string): Metadata {
 const title = pageNames[path]?.[lang === 'it' ? 'it' : 'zh'];
 const localized = (locale: string) => `${company.website}/${locale}/${path ? `${path}/` : ''}`;
 return { title, alternates: { canonical: localized(lang), languages: { 'zh-CN': localized('zh'), it: localized('it'), 'x-default': localized('zh') } }, openGraph: { title: `${title} | CIAOMIND`, url: localized(lang), locale: lang === 'it' ? 'it_IT' : 'zh_CN' } };
}
