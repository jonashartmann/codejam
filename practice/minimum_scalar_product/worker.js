var asc = function asc(a, b)
{
  return a - b;
};

var desc = function desc(a, b)
{
  return b - a;
};

var worker = {
	n: 0,
	v1: null,
	v2: null,

	work: function work(line, lineNumber) {
		switch(lineNumber) {
			case 0:
				n = parseInt(line, 10);
				return null;
			case 1:
				this.v1 = line.split(' ');
				if (this.v1.length !== n){
					console.error('ERROR n:%d  l:%d',n, this.v1.length);
					return 'ERROR';
				}

				for (var i = 0; i < this.v1.length; i++) {
					this.v1[i] = parseInt(this.v1[i], 10);
				}

				return null;
			case 2:
				this.v2 = line.split(' ');
				if (this.v2.length !== n){
					console.error('ERROR');
					return 'ERROR';
				}

				for (var j = 0; j < this.v2.length; j++) {
					this.v2[j] = parseInt(this.v2[j], 10);
				}

				this.v1.sort(asc);
				this.v2.sort(desc);

				return this.scalarProduct(this.v1, this.v2);
			default:
				console.error('Should not have come to line: ' + lineNumber);
				return 'ERROR';
		}
	},

	scalarProduct: function(a, b) {
		var sum = 0;
		for (var i = a.length - 1; i >= 0; i--) {
			sum += a[i] * b[i];
		}
		return sum;
	}
};

module.exports = worker;