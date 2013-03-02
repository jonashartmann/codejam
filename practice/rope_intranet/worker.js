var Wire = function Wire(a, b) {
	this.a = a;
	this.b = b;
};

Wire.prototype.toString = function() {
	return "W("+this.a+", "+this.b+")";
};

Wire.prototype.cross = function(other) {
	var testA = (this.a - other.a) < 0;
	var testB = (this.b - other.b) < 0;
	return testA !== testB;
};

var worker = {
	wiresNum: 0,
	wires: [],

	work: function work(line, lineNumber) {
		// console.log("[work] line: %s number: %d wires: %d", line, lineNumber, this.wiresNum);
		switch (lineNumber) {
			case 0:
				this.wiresNum = parseInt(line, 10);
				return null;
			default:
				var points = line.split(' ');
				this.wires.push(new Wire(points[0], points[1]));

				if ((this.wiresNum - lineNumber) === 0) {
					// Logic
					var crosses = 0;
					for (var i = this.wires.length - 1; i >= 0; i--) {
						var wire = this.wires[i];
						for (var j = i - 1; j >= 0; j--) {
							var wireB = this.wires[j];
							crosses += wire.cross(wireB);
						}
					}

					this.reset();
					return crosses;
				}
				return null;
		}
	},
	reset: function() {
		this.wires = [];
		this.wiresNum = 0;
	}
};

module.exports = worker;