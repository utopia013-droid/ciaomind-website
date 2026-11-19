import { serviceVideos } from '@/data/service-videos';

const ids = new Set<string>(Object.values(serviceVideos).map(film => film.id));

// Only the two editorial covers are public. Visitor headers never reach the image host.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ids.has(id)) return new Response(null, { status: 404 });
  try {
    const image = await fetch(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, {
      next: { revalidate: 86400 }, signal: AbortSignal.timeout(6000), redirect: 'error',
    });
    if (image.ok && image.headers.get('content-type')?.startsWith('image/jpeg')) {
      return new Response(image.body, { headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      } });
    }
  } catch {
    // The play control remains available when the publisher's poster is unreachable.
  }
  return new Response(null, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}
