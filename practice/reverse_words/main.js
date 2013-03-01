var FILE = 'B-large-practice';

var fs = require('fs');

var work = function work (line) {
	var rev = [];
	var words = line.split(' ');
	for (var i = words.length-1; i >= 0; i--) {
		rev.push(words[i]);
	}
	return rev.join(' ');
};

var buf = fs.readFileSync(FILE + '.in');
var s = buf.toString();
var lines = s.split("\n");
var cases = lines[0];
var outStream = fs.createWriteStream(FILE + '.out');
for (var i = 1; i <= cases; i++) {
	outStream.write("Case #"+i+": " + work(lines[i]) + '\n');
}

outStream.destroySoon();
console.log('Done.');