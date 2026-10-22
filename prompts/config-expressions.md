# Config: weekday rotation expressions

Both fields in the `Config` node must be set to **Expression** mode and must use the same weekday list. `$now.weekday` is 1 for Monday through 7 for Sunday.

| Day | Content type |
|---|---|
| Mon, Wed, Fri, Sun | article |
| Tue, Sat | answer |
| Thu | news |

## content_type

```
{{ ['article','answer','article','news','article','answer','article'][$now.weekday - 1] }}
```

## sitemap_url

```
{{ ({article:'https://www.placidway.com/1/sitemap_articles.xml', answer:'https://www.placidway.com/sitemap/1/sitemap_answers.xml', news:'https://www.placidway.com/1/sitemap_news.xml'})[['article','answer','article','news','article','answer','article'][$now.weekday - 1]] }}
```

To force one type while testing, replace the expressions with fixed values (for example `article` and the articles sitemap address).

## Other Config fields

| Field | Type | Default |
|---|---|---|
| user_agent | String | PWAssessmentBot/1.0 |
| candidates | Number | 100 |
| max_chars | Number | 500 |
| approval_mode | Boolean | false |
| dry_run | Boolean | true |
| max_attempts | Number | 3 |
| test_force_violation | Boolean | false |
| facebook_page_id | String | your test Page ID |
| fb_api_version | String | v26.0 |
| schedule_minutes | Number | 0 |
| reviewer_email | String | reviewer@example.com |
| alert_email | String | reviewer@example.com |
| pick_index | Number | 0 |
