import type { Metadata } from 'next';
import { company } from '@/data/company';
export const pageNames: Record<string, { zh: string; it: string }> = {
 '': {zh: '文化遗产数字化、AI教育与中意交流', it: 'Patrimonio digitale, educazione AI e dialogo Italia–Cina'},
 about: {zh: '关于我们', it: 'Chi siamo'}, services: {zh: '文化数字化、AI教育与中意合作项目', it: 'Progetti culturali digitali, educazione e AI'},
 team: {zh: '公司团队', it: 'Il team'}, contact: {zh: '联系我们｜意大利 Ferrara', it: 'Contatti a Ferrara'},
 news: {zh: '公司动态', it: 'Notizie'}, privacy: {zh: '联系与隐私说明', it: 'Privacy e contatti'}, terms: {zh: '网站使用说明', it: 'Informazioni sul sito'},
};
const descriptions: Record<string, {zh:string;it:string}> = {
 '': {zh:'CIAOMIND 探索文化遗产数字化、数字教育与 AI 应用，促进意大利与中国的文化交流。了解项目方向、团队及合作方式，联系意大利 Ferrara 团队。',it:'CIAOMIND esplora patrimonio culturale digitale, educazione e applicazioni AI, promuovendo il dialogo tra Italia e Cina. Scopri i progetti e contatta il team a Ferrara.'},
 about:{zh:'了解 CIAOMIND S.B. S.R.L. 的文化与科技理念、企业背景、愿景与使命，以及面向中意文化交流的项目方向。',it:'Scopri CIAOMIND S.B. S.R.L., la sua visione tra cultura e tecnologia, la missione e gli ambiti di collaborazione tra Italia e Cina.'},
 services:{zh:'探索 CIAOMIND 的三个项目方向：文化遗产数字化、数字教育与 AI 应用、中意文化交流。与团队讨论具体需求与合作方式。',it:'Esplora i tre ambiti CIAOMIND: patrimonio culturale digitale, educazione e AI, dialogo Italia–Cina. Confrontiamoci sulle esigenze del tuo progetto.'},
 team:{zh:'认识 CIAOMIND 的公司代表与业务参与成员，了解团队在文化交流、跨境业务与数字化项目中的关注方向。',it:'Conosci le persone di CIAOMIND, la rappresentante della società e i membri coinvolti nello sviluppo di progetti culturali e digitali.'},
 contact:{zh:'联系 CIAOMIND：Via Oroboni 78/A, Ferrara，意大利。邮箱 luxyoo.italy@gmail.com，电话 +39 392 463 9169。欢迎讨论文化、教育与中意交流项目。',it:'Contatta CIAOMIND in Via Oroboni 78/A, Ferrara. Email luxyoo.italy@gmail.com, telefono +39 392 463 9169. Parliamo di cultura, educazione e dialogo Italia–Cina.'},
 news:{zh:'查看 CIAOMIND 公司动态与已核实的企业里程碑，了解文化、教育和数字技术方向的最新公开信息。',it:'Leggi le notizie di CIAOMIND e le tappe societarie verificate, con aggiornamenti pubblici su cultura, educazione e tecnologie digitali.'},
 privacy:{zh:'了解 CIAOMIND 网站联系工具如何运作，以及邮件草稿和个人信息的基本处理说明。',it:'Informazioni sul funzionamento dei contatti CIAOMIND, sulle bozze email e sul trattamento dei dati attraverso il sito.'},
 terms:{zh:'CIAOMIND 网站内容与联系工具的使用说明，以及公司联系信息。',it:'Informazioni sull’uso dei contenuti e degli strumenti di contatto del sito CIAOMIND.'},
};
export function pageMetadata(lang: string, path: string): Metadata {
 const locale=lang==='it'?'it':'zh'; const name=pageNames[path]?.[locale] ?? 'CIAOMIND';
 const title=`CIAOMIND | ${name}`; const description=descriptions[path]?.[locale];
 const localized=(language:string)=>`${company.website}/${language}/${path?`${path}/`:''}`;
 return {title:{absolute:title},description,alternates:{canonical:localized(locale),languages:{'zh-CN':localized('zh'),it:localized('it'),'x-default':localized('zh')}},openGraph:{title,description,url:localized(locale),siteName:'CIAOMIND',type:'website',locale:locale==='it'?'it_IT':'zh_CN',alternateLocale:locale==='it'?['zh_CN']:['it_IT'],images:[{url:`${company.website}/brand/ciaomind-social.png`,width:1200,height:630,alt:'CIAOMIND — Culture, Intelligence, Connection'}]},twitter:{card:'summary_large_image',title,description,images:[`${company.website}/brand/ciaomind-social.png`]}};
}
