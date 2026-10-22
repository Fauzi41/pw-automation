// Node: Approval result  (Code, Run Once for All Items)
// Normalizes the Send-and-Wait response: approved / rejected / expired.
const j = $input.first().json;
const p = $('Final post').first().json;
const flag = (j.data && j.data.approved !== undefined) ? j.data.approved : j.approved;
const approved = flag === true || flag === 'true';
const rejected = flag === false || flag === 'false';
return [{ json: {
  run_id: p.run_id,
  approved,
  status: approved ? 'approved' : (rejected ? 'rejected' : 'expired'),
  fb_post_id: '',
  error: approved ? '' : (rejected ? 'Rejected by reviewer' : 'No response within the approval window')
} }];
