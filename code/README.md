# Code nodes

The JavaScript used in the workflow's Code nodes, one file per node. Every node is set to **Language: JavaScript** and **Mode: Run Once for All Items**. Node names in the workflow must match the names used in the code (for example `Config`, `Select item`, `Final post`).

| File | Node |
|---|---|
| `01-parse-sitemap.js` | Parse sitemap |
| `02-select-item.js` | Select item |
| `03-extract-fields.js` | Extract fields |
| `04-build-post.js` | Build post |
| `05-rule-check.js` | Rule check |
| `06-decide.js` | Decide |
| `07-final-post.js` | Final post |
| `08-approval-result.js` | Approval result |
| `09-simulate-publish.js` | Simulate publish |
| `10-plan-publish.js` | Plan publish |
| `11-publish-ok.js` | Publish OK |
| `12-publish-failed.js` | Publish failed |
