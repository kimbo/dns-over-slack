var qs = require('qs');
var crypto = require('crypto');

var slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
if (!slackSigningSecret) {
	throw new Error('Must set SLACK_SIGNING_SECRET environmental variable');
}

// verify request is from slack
// thank you https://medium.com/@rajat_sriv/verifying-requests-from-slack-using-node-js-69a8b771b704
function slackVerifyMiddleware(req, res, next) {
	if (!req.body) {
		console.log('no body in request');
		res.end();
		return;
	}
	var requestBody = qs.stringify(req.body, {format: 'RFC1738'});
	var timestamp = req.headers['x-slack-request-timestamp'];
	var currentTime = Math.floor(new Date() / 1000);
	if (Math.abs(currentTime - timestamp) > 60 * 5) {
		console.log('ending response, may be a replay attack');
		res.end();
		return;
	}
	var sigBaseString = 'v0:' + timestamp + ':' + requestBody;
	var mySignature = 'v0=' +
                   crypto.createHmac('sha256', slackSigningSecret)
                         .update(sigBaseString, 'utf8')
                         .digest('hex');
	var slackSignature = req.headers['x-slack-signature'];
	if (!slackSignature) {
		console.warn('received request without x-slack-signature');
		res.end();
		return;
	}
	console.log(req.headers);
	if (crypto.timingSafeEqual(
	    Buffer.from(mySignature, 'utf8'),
	    Buffer.from(slackSignature, 'utf8'))) {
		console.log('signature matches :)');
		next();
	} else {
		console.log('signature does not match :(');
		res.end();
	}
}

module.exports = slackVerifyMiddleware;
