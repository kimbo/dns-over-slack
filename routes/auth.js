var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/auth/redirect', function(req, res) {
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id=' + process.env.CLIENT_ID +
            '&client_secret=' + process.env.CLIENT_SECRET +
            '&redirect_uri=' + process.env.REDIRECT_URI,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (!JSONresponse.ok){
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        } else{
            console.log(JSONresponse)
            res.send("Success!")
        }
    })
});

module.exports = router;
