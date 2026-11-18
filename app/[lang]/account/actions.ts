'use server';
import {redirect} from 'next/navigation';
import {accountClient} from '@/lib/account';
import {company} from '@/data/company';
const locale=(raw:string)=>['zh','it','en'].includes(raw)?raw:'en';
export async function sendAccessLink(raw:string,form:FormData){
 const lang=locale(raw);const email=String(form.get('email')??'').trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||form.get('privacy')!=='on')redirect(`/${lang}/account/?status=invalid`);
 const client=await accountClient();if(!client)redirect(`/${lang}/account/?status=unavailable`);
 const callback=new URL('/api/account/callback/',company.website);callback.searchParams.set('lang',lang);
 const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:true,emailRedirectTo:callback.toString()}});
 redirect(`/${lang}/account/?status=${error?'failed':'sent'}`);
}
export async function signOut(raw:string){const client=await accountClient();if(client)await client.auth.signOut({scope:'local'});redirect(`/${locale(raw)}/account/`)}
