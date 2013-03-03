var worker = (function() {
	var worker = {
		work: doWork,
		parser: parseLine
	};

	// Declare variables that live only inside this closure
	var googlers = 0;
	var surprises = 0;
	var p = 0;
	var totals = [];

	function parseLine(line){
		// pass true in the command line to use this to parse each line
	}

	function doWork(line, lineNumber) {
		switch(lineNumber) {
			case 0:
				var input = line.split(' ');
				googlers = parseInt(input[0], 10);
				surprises = parseInt(input[1], 10);
				p = parseInt(input[2], 10);
				for (var i = 3; i < 3+googlers; i++) {
					totals.push(parseInt(input[i], 10));
				}

				var result = 0;
				var triples = [];
				for (var i = totals.length - 1; i >= 0; i--) {
					var total = totals[i];
					if (total >= p * 3 - 2) {
						result++;
					} else if (p > 1 && total >= p * 3 - 4 && surprises > 0) {
						result++;
						surprises--;
					}
				}

				// console.log(result);
				reset();
				return result;
			default:
				console.error('Nothing done for line: ' + lineNumber);
				return 'ERROR';
		}
	}

	function reset () {
		googlers = 0;
		surprises = 0;
		p = 0;
		totals = [];
	}

	return worker;
})();

module.exports = worker;