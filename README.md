# dns-over-slack

This is for a slash command to perform DNS lookups on Slack.

It's essentially a little express app API for `dig`.

# Example usage on slack
Usage is identical to that of `dig`.

If you're unfamiliar with dig, run:
```
/dig -h
```

To lookup example.com and just print the answer section:
```
/dig +short example.com
```

