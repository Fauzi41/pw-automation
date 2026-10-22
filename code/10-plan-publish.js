// Node: Plan publish  (Code, Run Once for All Items)
// Chooses the Graph API endpoint and body.
// Image + publish now -> /photos. Otherwise (or scheduled) -> /feed (link preview).
const cfg = $('Config').first().json;
const p = $('Final post').first().json;
const mins = Number(cfg.schedule_minutes || 0);
const useImage = !!p.image_url && mins === 0;

const body = useImage
  ? { url: p.image_url, caption: p.post_text }
  : { message: p.post_text };

if (mins > 0) {
  body.published = false;
  body.scheduled_publish_time = Math.floor(Date.now() / 1000) + Math.max(mins, 11) * 60;
}

return [{ json: { run_id: p.run_id, endpoint: useImage ? 'photos' : 'feed', body } }];
