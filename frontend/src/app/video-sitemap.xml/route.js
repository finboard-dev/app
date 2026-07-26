import { VIDEOS } from "@/data/videos";
import { SITE_URL } from "@/lib/seo";

const escapeXml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&apos;");

const durationInSeconds = (duration) => {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(duration);
  if (!match) return 0;
  return (Number(match[1] || 0) * 3600) + (Number(match[2] || 0) * 60) + Number(match[3] || 0);
};

export function GET() {
  const entries = VIDEOS.map((video) => `
  <url>
    <loc>${SITE_URL}/videos/${video.slug}</loc>
    <video:video>
      <video:thumbnail_loc>${SITE_URL}${video.thumbnailPath}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${SITE_URL}${video.videoPath}</video:content_loc>
      <video:duration>${durationInSeconds(video.duration)}</video:duration>
      <video:publication_date>${video.uploadDate}</video:publication_date>
    </video:video>
  </url>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${entries}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
