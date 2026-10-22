// Node: Simulate publish  (Code, Run Once for All Items)
// Used when dry_run is true. No Facebook call is made.
const p = $('Final post').first().json;
return [{ json: {
  run_id: p.run_id,
  status: 'simulated',
  fb_post_id: 'SIMULATED-' + Date.now(),
  error: ''
} }];
