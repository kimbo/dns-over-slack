# q

This is for a slash command on slack to perform DNS lookups. 

It's essentially a little express app API for `dig`.

# Starting the app

```
npm start
```
That will start up a little express server on http://myserver:3000. 

Set up your slack app to point to http://myserver:3000/q.

# Example usage on slack

```
/q example.com +short
```
