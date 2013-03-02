var worker = (function() {
	var worker = {
		work: doWork,
		parser: parseLine
	};

	// Declare variables that live only inside this closure

	function parseLine(line){
		// pass true in the command line to use this to parse each line
	}

	function doWork(line, lineNumber) {
		switch(lineNumber) {
			case 0:
				return null;
			default:
				console.error('Nothing done for line: ' + lineNumber);
				return 'ERROR';
		}
	}

	return worker;
})();

module.exports = worker;