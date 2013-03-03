var worker = (function() {
	var worker = {
		work: doWork,
		parser: parseLine
	};

	// Declare variables that live only inside this closure
	var n = 0;
	var k = 0;
	var board = [];
	var blueWon = false;
	var redWon = false;
	var curTeam = '';

	function parseLine(line){
		// pass true in the command line to use this to parse each line
	}

	function doWork(line, lineNumber) {
		switch(lineNumber) {
			case 0:
				var nk = line.split(' ');
				n = parseInt(nk[0], 10);
				k = parseInt(nk[1], 10);
				return null;
			default:
				board.push(line);
				if (n - lineNumber === 0) {
					shiftBoard();
					var winner = whoWon();
					reset();
					return winner;
				}
				return null;
		}
	}

	function shiftBoard() {
		// console.log("BEFORE: ",board);
		for (var i = board.length - 1; i >= 0; i--) {
			board[i] = shiftRow(board[i], board[i].length-1);
		}
		// console.log("AFTER: ",board);
	}

	function shiftRow(row, index) {
		// console.log('Shifting row %s index %d', row, index);
		if (index < 0) {
			// console.log('Index out, row: ', row);
			return row;
		}
		var piece = row[index];
		if (piece == '.') {
			// console.log('Empty, moving...');
			return shiftRow(row, index-1);
		}

		var lastSpaceIdx = row.lastIndexOf('.');
		if (lastSpaceIdx > index) {
			return shiftRow(swap(row, index, lastSpaceIdx), index-1);
		}

		return shiftRow(row, index-1);
	}

	function swap(row, from, to) {
		var newRow = [];
		for (var i = 0;i < row.length; i++) {
			if (i === to) {
				newRow.push(row[from]);
				continue;
			}
			if (i === from) {
				newRow.push(row[to]);
				continue;
			}
			newRow.push(row[i]);
		}
		return newRow.join('');
	}



	function whoWon() {
		// console.log('k=%d',k);
		// printBoard();

		var range = [ [0,1], [1,0], [-1,0], [0,-1], [-1,-1], [-1,1], [1,1], [1,-1] ];
		var stop = false;
		for (var row = 0; row < board.length && !stop; row++) {
			for (var col = 0; col <board.length && !stop; col++) {
				for (var i = 0; i < 8; i++) {
					if (board[row][col] != '.') {
						countRow(row, col, range[i][0], range[i][1], 0);
						if (redWon && blueWon) stop = true;
					} else {
						break;
					}
				}
			}
		}

		return (blueWon && redWon) ? 'Both' : (blueWon ? 'Blue' : (redWon ? 'Red' : 'Neither'));
	}

	function countRow(row, col, r, c, val) {
		if (val === 0) {
			curTeam = board[row][col];
			countRow(row+r, col+c, r, c, 1);
		} else {
			if (row >= 0 && row < board.length && col >= 0 && col < board.length) {
				if (board[row][col] == curTeam) {
					if (val + 1 === k) {
						if (curTeam == 'B') {
							blueWon = true;
						} else {
							redWon = true;
						}
					} else {
						countRow(row+r, col+c, r, c, val + 1);
					}
				}
			}
		}
	}

	function printBoard() {
		console.log('-- BOARD --');
		for (var i = 0; i < board.length; i++) {
			console.log(board[i]);
		}
		console.log('-----------');
	}

	function reset() {
		n = 0;
		k = 0;
		board = [];
		blueWon = false;
		redWon = false;
		curTeam = '';
	}

	return worker;
})();

module.exports = worker;