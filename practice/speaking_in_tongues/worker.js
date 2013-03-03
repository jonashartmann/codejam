var worker = (function() {
	var worker = {
		work: doWork,
		parser: parseLine
	};

	// Declare variables that live only inside this closure
	var dict = {
		'a': 'y',
		'b': 'h',
		'c': 'e',
		'd': 's',
		'e': 'o',
		'f': 'c',
		'g': 'v',
		'h': 'x',
		'i': 'd',
		'j': 'u',
		'k': 'i',
		'l': 'g',
		'm': 'l',
		'n': 'b',
		'o': 'k',
		'p': 'r',
		'q': 'z',
		'r': 't',
		's': 'n',
		't': 'w',
		'u': 'j',
		'v': 'p',
		'x': 'm',
		'y': 'a',
		'w': 'f',
		'z': 'q'
	};

	function parseLine(line){
		// pass true in the command line to use this to parse each line
	}

	function mapper(match) {
		return dict[match];
	}

	function doWork(line, lineNumber) {
		switch(lineNumber) {
			case 0:
				return line.replace(/[a-z]/g, mapper);
			default:
				console.error('Nothing done for line: ' + lineNumber);
				return 'ERROR';
		}
	}

	return worker;
})();

module.exports = worker;