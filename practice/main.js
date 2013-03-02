var workerDir = '';
var hasCustomParser = false;
process.argv.forEach(function (val, index, array) {
	if (array.length < 3) {
		process.stdout.write('Usage:\n	node main.js <worker_dir>\n	node main.js <worker_dir> <has_custom_parser>\n');
		process.exit(1);
	}
	if (index == 2) {
		workerDir = val;
	}
	if (index == 3) {
		hasCustomParser = val.toLowerCase() === 'true';
	}
});

var fs = require('fs');
var worker = require('./' + workerDir + '/worker');

var outStream = fs.createWriteStream(workerDir+'.out');
outStream.on('close', function() {
	console.log('%d lines read...', lineNumber);
	console.log('May the force be with you!');
	process.exit(0);
});

var readline = require('readline'),
	rl = readline.createInterface(process.stdin, outStream);
var lineNumber = 0;
var caseNumber = 1;
var caseLine = 0;
var cases = 0;
var parser = hasCustomParser ? function parse(line) {
	var product = worker.parser(line);
	if (product !== null) {
		outStream.write("Case #" + caseNumber + ": " + product + '\n');
		caseNumber++;
	}
}
: function parser(line) {
	if (lineNumber === 0) {
		cases = line.trim();
		console.log('%d cases to work on...', cases);
	} else {
		var product = worker.work(line.trim(), caseLine++);
		if (product !== null) {
			outStream.write("Case #"+caseNumber+": " + product + '\n');
			caseNumber++;
			caseLine = 0;
		}
	}

	lineNumber++;
};

rl.on('line', parser).on('close', function() {
	outStream.destroySoon();
});