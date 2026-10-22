// Node: Publish failed  (Code) - connected to the ERROR output of "Post to Facebook"
const j = $input.first().json;
const p = $('Plan publish').first().json;
const msg = JSON.stringify(j.error || j).slice(0, 500);
const tokenBad = /"code":\s*190|OAuthException|access token/i.test(msg);
return [{ json: {
  run_id: p.run_id,
  status: 'failed',
  fb_post_id: '',
  error: (tokenBad ? 'FACEBOOK TOKEN EXPIRED OR INVALID - refresh the Page token. ' : '') + msg
} }];
