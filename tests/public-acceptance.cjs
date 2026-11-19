// Read-only deployment acceptance. Never submits enquiries, sends email or changes data.
// BASE_URL is mandatory. PLAYWRIGHT_MODULE may point to the desktop bundled Playwright.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');

test('all public routes, languages, links and mobile entry points', {timeout:600000}, async()=>{
 assert.ok(process.env.BASE_URL,'Set BASE_URL to the exact local or deployed application origin');
 const base=new URL(process.env.BASE_URL).origin;
 const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const languages=['zh','it','en','fr','de','es','pt','ja'];
 const routes=['','about','account','business-os','business-os/request','contact','news','news/milan-roundtable-2026','news/milan-woac-2025','news/woac-unesco-2025','privacy','services','team','terms','vision'];
 const queue=languages.flatMap(lang=>routes.map(route=>`/${lang}/${route?route+'/':''}`));
 let cursor=0;const results=[],links=new Set(),failures=[];
 try{
  const worker=async()=>{const page=await context.newPage();while(cursor<queue.length){const route=queue[cursor++];try{
   const response=await page.goto(base+route,{waitUntil:'networkidle',timeout:35000});
   assert.equal(new URL(page.url()).origin,base,'Redirect outside app origin, possibly deployment authentication');
   assert.equal(response.status(),200,'Page must render successfully');
   await page.locator('img').evaluateAll(async images=>{for(const image of images)image.loading='eager';await Promise.all(images.map(image=>image.decode().catch(()=>{})))});
   const data=await page.evaluate(()=>({lang:document.documentElement.lang,title:document.title,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth+2,broken:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))}));
   assert.ok(data.h1,'A visible page heading is required');assert.match(data.title,/CIAOMIND/i,'Must be the app, not an authentication or error page');assert.equal(data.overflow,false,'Horizontal overflow');assert.deepEqual(data.broken,[],'Images must load');
   assert.ok(data.lang.startsWith(route.split('/')[1]),'Document language must match selected route');
   for(const href of data.links){if(!href||/^(mailto:|tel:|#)/.test(href))continue;const u=new URL(href,page.url());if([new URL(base).hostname,'www.ciaomind.com','ciaomind.com'].includes(u.hostname)){u.search='';u.hash='';links.add(u.pathname)}}
   results.push({route,status:response.status(),title:data.title,language:data.lang});
  }catch(error){failures.push({route,error:error.message})}}await page.close()};
  await Promise.all([worker(),worker(),worker()]);
  for(const route of links){const response=await context.request.get(base+route,{timeout:25000,maxRedirects:8});if(!response.ok()||new URL(response.url()).origin!==base)failures.push({route,error:`Internal link ${response.status()} or wrong origin`})}
  const mobile=await context.newPage({viewport:{width:375,height:812}});
  for(const route of ['/zh/','/it/','/en/','/zh/business-os/request/','/it/business-os/request/','/en/account/']){await mobile.goto(base+route,{waitUntil:'networkidle'});assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,`Mobile overflow: ${route}`)}
  // These checks deliberately do not assert real enquiry submission, email delivery,
  // tenant provisioning or bank movement. Hosted E2E needs identified test accounts.
  const report={checkedAt:new Date().toISOString(),base,pages:results,internalLinks:[...links],failures,limitations:['No real email or form submission','No hosted authenticated workflow until test identities and database are provisioned','Rule scoring is not model inference']};
  const dir=process.env.E2E_REPORT_DIR||path.join(os.tmpdir(),'ciaomind-public-acceptance');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'public-acceptance.json'),JSON.stringify(report,null,2));
  assert.deepEqual(failures,[],'Every route and internal link must pass');
 }finally{await browser.close()}
});
