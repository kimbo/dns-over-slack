var express = require('express');
var router = express.Router();
var { spawn } = require('child_process');

router.post('/', function(req, res, next) {
	if (!req.body) {
		res.status(400).end('Invalid Request');
		return;
	}
	var text = req.body.text;
	var params;
	if (!text) {
		params = [];
	} else {
		params = text.split(' ').filter(v => v.length);;
	}
	console.log(params);
	const dig = spawn('dig', params);
	var output = '';
	var errors = '';
	dig.stdout.on('data', function(data) {
		output += data;
	});
	dig.stderr.on('data', function(data) {
		errors += data;
	});
	dig.on('close', function(code) {
		if (!output) {
			if (errors) {
				output = 'ERROR: ' + errors;
			} else {
				output = 'No answer';
			}
		}
		output = output
			.replace(/; <<>> DiG .* <<>>/, '')
			.replace(/;; global options: .*/, '');
		res.send(output);
	});
});

module.exports = router;
