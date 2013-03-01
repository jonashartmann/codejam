var Item = function Item(val, index) {
	this.val = val;
	this.index = index;
};

var comparator = function(a,b) {
	if (a.val < b.val)
		return -1;
	if (a.val > b.val)
		return 1;
	return 0;
};

var worker = {
	credit: 0,
	nItems: 0,

	work: function work(line, lineNumber) {
		switch(lineNumber) {
			case 0:
				this.credit = line;
				return null;
			case 1:
				this.nItems = line;
				return null;
			case 2:
				var items = line.split(' ');
				if (items.length != this.nItems) {
					console.error('Should not have come to line: ' + lineNumber);
					return 'ERROR';
				}

				var objs = [];
				for (var i = items.length - 1; i >= 0; i--) {
					var item = parseInt(items[i], 10);
					objs.push(new Item(item, i + 1));
				}
				objs.sort(comparator);

				var result = [];
				var found = false;
				for (var i = objs.length - 1; i >= 0; i--) {
					if (found) break;

					var big = objs[i];
					if (big.val >= this.credit) {
						continue;
					}

					for (var j = 0; j < objs.length; j++) {
						var small = objs[j];
						var sum = (big.val + small.val);
						if (sum == this.credit) {
							if (small.index < big.index) {
								result.push(small.index);
								result.push(big.index);
							} else {
								result.push(big.index);
								result.push(small.index);
							}
							found = true;
							break;
						} else if (sum > this.credit) break;
					}
				}

				return result.join(' ');
			default:
				console.error('Should not have come to line: ' + lineNumber);
				return 'ERROR';
		}
	}
};

module.exports = worker;