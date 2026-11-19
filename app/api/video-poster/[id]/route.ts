import { serviceVideos } from '@/data/service-videos';
import { ecosystemVideos } from '@/data/industry-videos';

const ids = new Set<string>([...Object.values(serviceVideos), ...ecosystemVideos].map(film => film.id));

// Only curated video covers are public. Visitor headers never reach the image host.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ids.has(id)) return new Response(null, { status: 404 });
  for (const quality of ['maxresdefault', 'hqdefault']) {
   try {
    const image = await fetch(`https://i.ytimg.com/vi/${id}/${quality}.jpg`, {
      next: { revalidate: 86400 }, signal: AbortSignal.timeout(6000), redirect: 'error',
    });
    if (image.ok && image.headers.get('content-type')?.startsWith('image/jpeg')) {
      return new Response(image.body, { headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      } });
    }
  } catch {
    // Try the standard cover if the high-resolution version is unavailable.
   }
  }
  return new Response(null, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}
