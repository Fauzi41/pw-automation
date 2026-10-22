// Node: Rule check  (Code, Run Once for All Items)
// Layer 1 of the guardrails: deterministic rules.
const cfg = $('Config').first().json;
const item = $input.first().json;
const source = [item.title, item.summary, item.body].join(' ');

let post_text = item.post_text;
// Demo switch: injects a bad sentence on the first attempt only
if (cfg.test_force_violation && item.attempt === 1) {
  post_text = post_text.replace(
    item.url,
    'This treatment is guaranteed to cure knee pain and costs only $350. ' + item.url
  );
}

// Scan everything except the URL (its slug can contain words like "Works-Better")
const scan = post_text.split(item.url).join(' ');
const violations = [];

// Format rules
if (item.chars_before_link > cfg.max_chars) violations.push(`Text before the link is ${item.chars_before_link} characters; the limit is ${cfg.max_chars}.`);
if (!item.hook) violations.push('Missing hook.');
if (item.lines.length < 2 || item.lines.length > 4) violations.push(`Needs 2-4 value lines, got ${item.lines.length}.`);
if (!item.cta) violations.push('Missing call to action.');
if (item.hashtags.length < 3 || item.hashtags.length > 5) violations.push(`Needs 3-5 hashtags, got ${item.hashtags.length}.`);
if (post_text.split(item.url).length !== 2) violations.push('The source URL must appear exactly once.');

// Content rules
const banned = [
  [/\b(cure[sd]?|curing)\b/i, 'medical claim'],
  [/\b(heal(s|ed|ing)?|revers(e|es|ed|ing)|restor(e|es|ed|ing)|eliminat(e|es|ed|ing))\b/i, 'medical outcome claim'],
  [/\b(guarantee[sd]?|risk-free|painless|pain-free|miracle|breakthrough|proven|life-changing)\b/i, 'promise or hype'],
  [/\b(best|top|leading|superior|safest|number one)\b|#1\b/i, 'superlative'],
  [/\b(safe|safely)\b/i, 'safety claim'],
  [/\b(works? better|more effective|effective(ness)?|success rate)\b/i, 'efficacy claim'],
  [/\b(will|can) (improve|help|relieve|reduce|restore|fix)\b/i, 'outcome promise'],
  [/[$€£¥]|\b(USD|EUR|JPY|IDR|dollars?|yen|euros?|rupiah)\b|%|\b(cheap(er)?|affordable|discount(ed)?|savings?|save|low-cost)\b/i, 'price, discount or savings language']
];
for (const [re, why] of banned) {
  const m = scan.match(re);
  if (m) violations.push(`Contains "${m[0]}" (${why}).`);
}

// Every number in the post must exist in the source
const norm = s => s.replace(/,/g, '');
const srcNorm = norm(source);
for (const n of new Set(norm(scan).match(/\d+(\.\d+)?/g) || [])) {
  if (!srcNorm.includes(n)) violations.push(`Number "${n}" does not appear in the source.`);
}

return [{ json: { ...item, post_text, rules_passed: violations.length === 0, rule_violations: violations } }];
