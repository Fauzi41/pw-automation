// Node: Publish OK  (Code) - connected to the SUCCESS output of "Post to Facebook"
const j = $input.first().json;
const p = $('Plan publish').first().json;
return [{ json: {
  run_id: p.run_id,
  status: p.body.published === false ? 'scheduled' : 'posted',
  fb_post_id: j.post_id || j.id || '',
  error: ''
} }];
