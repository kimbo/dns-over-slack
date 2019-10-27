# dns-over-slack

This is for a slash command to perform DNS lookups on Slack.

It's essentially a little express app "wrapper" for `dig`.

# Installation

This isn't publicly availabe as a slack app, but with a little setup you can add it to your workspace.

NOTE: This requires that you have some sort of computer/server running on the public internet that you have access to.

**The Slack part**

- Create a new slack app
  - Go to https://api.slack.com/apps
  - Click "Create new app"
  - Name it and pick a development workplace
- Then add a slash command
  - Name it whatever you want (`dig` would make sense), just make sure your request URL points to your-server/dig 
  (e.g. http://example.com:port/dig)
- Copy your signing secret from app credentials (should be on the "basic information" tab) because you'll need it later

**The server part**

This is the part where you use the computer running on the public internet that you have access to.

On your server, run the following commands
```
# clone this repo
git clone https://github.com/kimbo/dns-over-slack.git

# install dependencies
cd dns-over-slack && npm install

# set SLACK_SIGNING_SECRET environmental variable
# this is for verifying requests come from slack
export SLACK_SIGNING_SECRET=""

# optionally, run the app on a different port
# default is 3000
export port=3000

# start the app
npm start
```

Now go to your workspace a try it out!

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

