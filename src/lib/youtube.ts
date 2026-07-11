/** Parse YouTube URLs → id, thumbnail, embed URL. Videos are embed-only. */

export function youtubeId(url: string): string | null {
  if (!url) return null;
  // youtu.be/<id>
  let m = url.match(/youtu\.be\/([\w-]{11})/);
  if (m) return m[1];
  // watch?v=<id>
  m = url.match(/[?&]v=([\w-]{11})/);
  if (m) return m[1];
  // /embed/<id>  or  /shorts/<id>  or  /live/<id>
  m = url.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
  if (m) return m[1];
  // bare id
  if (/^[\w-]{11}$/.test(url)) return url;
  return null;
}

export function youtubeThumb(url: string): string {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

export function youtubeEmbed(url: string): string {
  const id = youtubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : '';
}
