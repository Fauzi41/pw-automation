// Node: Final post  (Code, Run Once for All Items)
// Carries the approved post forward. Later nodes read from this node.
const d = $input.first().json;
return [{ json: {
  run_id: d.run_id,
  url: d.url,
  content_type: d.content_type,
  title: d.title,
  post_text: d.post_text,
  image_url: d.image_url || ''
} }];
