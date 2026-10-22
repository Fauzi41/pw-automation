# Generate post: user prompt

Node: `Generate post`. Source for Prompt: Define below. Paste into **Prompt (User Message)** in **Expression** mode.

```
SOURCE PAGE
Title: {{ $json.title }}
Summary: {{ $json.summary }}
Page text: {{ $json.body }}

{{ $json.feedback ? 'FIX THESE PROBLEMS FROM THE PREVIOUS ATTEMPT: ' + $json.feedback : '' }}
```

The last line is empty on the first attempt. On a retry, the `Route` node sends the item back here with `feedback` set to the joined violations.

Chat model settings: temperature about 0.3 to 0.5 if the model allows it.
