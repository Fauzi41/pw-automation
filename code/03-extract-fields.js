// Node: Extract fields  (Code, Run Once for All Items)
// Reads Open Graph tags (title, summary, image) and the main page text.
const html = $input.first().json.data;
const item = $('Select item').first().json;

const decode = s => (s || '')
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
  .replace(/&yen;/g, '¥').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
  .replace(/&[lr]squo;/g, "'").replace(/&[lr]dquo;/g, '"')
  .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n));

const meta = (prop) => {
  const a = new RegExp('<meta[^>]*?(?:property|name)=(["\'])' + prop + '\\1[^>]*?content=(["\'])([\\s\\S]*?)\\2', 'i');
  const b = new RegExp('<meta[^>]*?content=(["\'])([\\s\\S]*?)\\1[^>]*?(?:property|name)=(["\'])' + prop + '\\3', 'i');
  let m = html.match(a);
  if (m) return decode(m[3]).trim();
  m = html.match(b);
  return m ? decode(m[2]).trim() : '';
};

const stripped = html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<(nav|header|footer|aside)[\s\S]*?<\/\1>/gi, ' ');

const paras = (stripped.match(/<(p|li|h2|h3)[^>]*>[\s\S]*?<\/\1>/gi) || [])
  .map(p => decode(p.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim())
  .filter(t => t.length > 40);

const body = paras.join('\n').slice(0, 4000);

const out = {
  ...item,
  title: meta('og:title') || decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').trim(),
  summary: meta('og:description') || meta('description'),
  image_url: meta('og:image'),
  body,
  body_chars: body.length
};

if (!out.title || (!out.summary && out.body_chars < 200)) {
  throw new Error('Could not extract usable content from ' + item.url);
}

return [{ json: out }];
