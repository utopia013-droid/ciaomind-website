import { company } from '@/data/company';
export default function OrganizationData({lang}:{lang:string}) {
const data={ '@context':'https://schema.org','@graph':[
{'@type':'Organization','@id':`${company.website}/#organization`,name:'CIAOMIND',legalName:company.name,url:company.website,logo:{'@type':'ImageObject',url:`${company.website}/brand/ciaomind-logo.png`,width:600,height:120},description:lang==='it'?'Patrimonio culturale digitale, educazione e AI, dialogo Italia–Cina.':'文化遗产数字化、数字教育与 AI 应用、中意文化交流。',email:company.email,telephone:'+393924639169',vatID:`IT${company.vat}`,contactPoint:{'@type':'ContactPoint',contactType:'General enquiries',telephone:'+393924639169',email:company.email,availableLanguage:['Italian','Chinese']},address:{'@type':'PostalAddress',streetAddress:'Via Oroboni 78/A',addressLocality:'Ferrara',addressRegion:'FE',postalCode:'44122',addressCountry:'IT'}},
{'@type':'WebSite','@id':`${company.website}/#website`,name:'CIAOMIND',url:company.website,inLanguage:['it','zh-CN'],publisher:{'@id':`${company.website}/#organization`}}
]};
return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;
}
