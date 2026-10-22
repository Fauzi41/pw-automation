// Node: Build post  (Code, Run Once for All Items)
// Parses the LLM JSON and assembles the final post text in code.
// Order: hook, value lines, CTA, link, hashtags.
const item = $('Extract fields').first().json;
const input = $input.first().json;
const raw = input.text ?? (input.response && input.response.text) ?? '';

let data;
try {
  const cleaned = String(raw).replace(/```json|```/gi, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  data = JSON.parse(cleaned.slice(start, end + 1));
} catch (e) {
  throw new Error('LLM did not return valid JSON: ' + String(raw).slice(0, 200));
}

const hook = String(data.hook || '').trim();
const lines = (Array.isArray(data.lines) ? data.lines : []).map(s => String(s).trim()).filter(Boolean);
const cta = String(data.cta || '').trim();
const hashtags = (Array.isArray(data.hashtags) ? data.hashtags : [])
  .map(h => String(h).trim().replace(/\s+/g, ''))
  .filter(Boolean)
  .map(h => (h.startsWith('#') ? h : '#' + h));

const before_link = [hook, lines.join('\n'), cta].filter(Boolean).join('\n\n');
const hashtag_line = hashtags.join(' ');
const post_text = before_link + '\n\n' + item.url + '\n\n' + hashtag_line;

return [{
  json: {
    ...item,
    hook, lines, cta, hashtags,
    post_text,
    chars_before_link: before_link.length,
    chars_total_no_url: before_link.length + hashtag_line.length,
    attempt: $runIndex + 1
  }
}];
