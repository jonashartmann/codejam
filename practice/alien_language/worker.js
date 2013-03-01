var worker = {
	lineNumber: 0,
	caseNumber: 1,
	wordLength: 0,
	numberOfWords: 0,
	cases: 0,
	words: [],

	work: function work(line, caseNumber) {
		var open = line.indexOf('(');
		if (open === -1) {
			return worker.words.indexOf(line) != -1 ? 1 : 0;
		}
		return this.findMatches(line);
	},
	findMatches: function findMatches(line) {
		var re1 = new RegExp('\\(','gi');
		var re2 = new RegExp('\\)','gi');
		var replaced = line.replace(re1, '[');
		replaced = replaced.replace(re2, ']');
		var regex = new RegExp(replaced);
		var matches = 0;
		for (var i = worker.words.length - 1; i >= 0; i--) {
			if (regex.test(worker.words[i]))
				matches++;
		}
		return matches;
	},
	parser: function parser(line) {
		if (worker.lineNumber === 0) {
			var vals = line.trim().split(' ');
			worker.wordLength = parseInt(vals[0], 10);
			worker.numberOfWords = parseInt(vals[1], 10);
			worker.cases = parseInt(vals[2], 10);
		} else {
			if (worker.caseNumber > worker.cases) {
				console.error('TOO MANY CASES FOUND! expected %d found %d', worker.cases, worker.caseNumber);
			}

			if (worker.numberOfWords > 0) {
				worker.numberOfWords--;
				var word = line.trim();
				if (word.length > worker.wordLength) {
					console.error('ERROR, word has not the correct size!');
				}
				worker.words.push(word);
			} else {
				return worker.work(line.trim(), worker.caseNumber++);
			}
		}

		worker.lineNumber++;
		return null;
	}
};

module.exports = worker;