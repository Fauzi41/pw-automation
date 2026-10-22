// Node: Decide  (Code, Run Once for All Items)
// Combines the rule check and the LLM verifier. Fails closed.
const cfg = $('Config').first().json;
const r = $('Rule check').first().json;
const input = $input.first().json;
const raw = input.text ?? (input.response && input.response.text) ?? '';

let verdict;
try {
  const cleaned = String(raw).replace(/```json|```/gi, '').trim();
  verdict = JSON.parse(cleaned.slice(cleaned.indexOf('{'), cleaned.lastIndexOf('}') + 1));
} catch (e) {
  verdict = { pass: false, violations: ['Verifier returned unreadable output'] };
}

const llmPass = verdict.pass === true;
const llmViolations = llmPass ? [] :
  (Array.isArray(verdict.violations) && verdict.violations.length ? verdict.violations : ['Verifier rejected the post'])
    .map(v => 'LLM check: ' + v);

const violations = [...r.rule_violations, ...llmViolations];
const passed = r.rules_passed && llmPass;
const route = passed ? 'pass' : (r.attempt < cfg.max_attempts ? 'retry' : 'blocked');

return [{ json: { ...r, llm_pass: llmPass, guardrail_passed: passed, violations, feedback: violations.join(' | '), route } }];
