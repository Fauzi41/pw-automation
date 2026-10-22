// Node: Parse sitemap  (Code, Run Once for All Items)
// Reads the sitemap XML, sorts newest first by lastmod, keeps the top N candidates.
const xml = $input.first().json.data;
const cfg = $('Config').first().json;

const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
const items = blocks.map(b => ({
  url: ((b.match(/<loc>\s*([^<]+?)\s*<\/loc>/) || [])[1] || '').replace(/&amp;/g, '&'),
  lastmod: (b.match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/) || [])[1] || '',
  content_type: cfg.content_type
})).filter(i => i.url);

if (!items.length) {
  throw new Error('Sitemap returned no URLs - site down or format changed');
}

items.sort((a, b) => b.lastmod.localeCompare(a.lastmod));

return items.slice(0, cfg.candidates).map(i => ({ json: i }));
