var worker = {
	credit: 0,

	work: function work(line, lineNumber) {
		switch(lineNumber) {
			case 0:
				var rev = [];
				var words = line.trim().split(' ');
				for (var i = words.length-1; i >= 0; i--) {
					rev.push(words[i]);
				}
				return rev.join(' ');
			default:
				console.error('Should not have come to line: ' + lineNumber);
				return 'ERROR';
		}
	}
};

module.exports = worker;