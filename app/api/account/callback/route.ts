import {NextRequest,NextResponse} from 'next/server';
import {accountClient} from '@/lib/account';
import {company} from '@/data/company';
export async function GET(request:NextRequest){const raw=request.nextUrl.searchParams.get('lang')??'en';const lang=['zh','it','en'].includes(raw)?raw:'en';const code=request.nextUrl.searchParams.get('code');const client=await accountClient();if(code&&client){const {error}=await client.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(`/${lang}/business-os/`,company.website))}return NextResponse.redirect(new URL(`/${lang}/account/?status=failed`,company.website))}
