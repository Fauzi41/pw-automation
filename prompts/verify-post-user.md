# Verify post: user prompt

Node: `Verify post`. Paste into **Prompt (User Message)** in **Expression** mode.

```
SOURCE PAGE
Title: {{ $json.title }}
Summary: {{ $json.summary }}
Page text: {{ $json.body }}

POST TO CHECK
{{ $json.post_text }}
```
