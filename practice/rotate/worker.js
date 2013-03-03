var worker = (function() {
	var worker = {
		work: doWork,
		parser: parseLine
	};

	// Declare variables that live only inside this closure
	var n = 0;
	var k = 0;
	var board = [];

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
		console.log('k=%d board: ',k, board);
		var blueRow = maxRow(board,'B', board.length-1, board.length-1);
		var redRow = maxRow(board,'R', board.length-1, board.length-1);
		console.log('Blue: %d  Red: %d', blueRow, redRow);
		var blueWon = blueRow >= k;
		var redWon = redRow >= k;
		return (blueWon && redWon) ? 'Both' : (blueWon ? 'Blue' : (redWon ? 'Red' : 'Neither'));
	}

	function maxRow(board, team, row, col, dir) {
		if (row < 0 || col < 0 || row >= board.length || col >= board.length) {
			return 0;
		}

		if (board[row][col] != team) {
			return Math.max(0 + maxRow(board, team, row-1, col, 'UP'),
							0 + maxRow(board, team, row, col-1, 'LEFT'),
							0 + maxRow(board, team, row-1, col-1, 'UPLEFT'),
							0 + maxRow(board, team, row+1, col, 'DOWN'),
							0 + maxRow(board, team, row, col+1, 'RIGHT'),
							0 + maxRow(board, team, row+1, col+1, 'DOWNRIGHT'),
							0 + maxRow(board, team, row-1, col+1, 'UPRIGHT'),
							0 + maxRow(board, team, row+1, col-1, 'DOWNLEFT'));
		}

		return Math.max(keepDirection(dir, 'UP') ? 1 : 0) + maxRow(board, team, row-1, col, 'UP'),
						keepDirection(dir, 'LEFT') ? 1 : 0) + maxRow(board, team, row, col-1, 'LEFT'),
						(dir == 'UPLEFT') ? 1 : 0) + maxRow(board, team, row-1, col-1, 'UPLEFT'),
						(dir == 'DOWN') ? 1 : 0) + maxRow(board, team, row+1, col, 'DOWN'),
						(dir == 'RIGHT') ? 1 : 0) + maxRow(board, team, row, col+1, 'RIGHT'),
						(dir == 'DOWNRIGHT') ? 1 : 0) + maxRow(board, team, row+1, col+1, 'DOWNRIGHT'),
						(dir == 'UPRIGHT') ? 1 : 0) + maxRow(board, team, row-1, col+1, 'UPRIGHT'),
						(dir == 'DOWNLEFT') ? 1 : 0) + maxRow(board, team, row+1, col-1, 'DOWNLEFT'));
	}

	function keepDirection(dir, newDir) {
		return dir == newDir;
	}

	function reset() {
		n = 0;
		k = 0;
		board = [];
	}

	return worker;
})();

module.exports = worker;