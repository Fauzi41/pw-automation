// Node: Select item  (Code, Run Once for All Items)
// Skips URLs already posted / pending / scheduled, then picks one.
// pick_index (Config) lets you choose the Nth unposted page for testing.
const cfg = $('Config').first().json;

const taken = new Set(
  $('Get log rows').all()
    .map(i => i.json)
    .filter(r => r.url && ['posted', 'pending', 'scheduled'].includes(r.status))
    .map(r => r.url)
);

const fresh = $('Parse sitemap').all().filter(i => !taken.has(i.json.url));

if (!fresh.length) {
  throw new Error('No unposted items left among the newest ' + cfg.candidates + ' sitemap entries');
}

const idx = Math.min(Number(cfg.pick_index || 0), fresh.length - 1);
return [{ json: { ...fresh[idx].json, run_id: 'run-' + Date.now() } }];
