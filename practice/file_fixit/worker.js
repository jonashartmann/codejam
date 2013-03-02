var worker = (function() {
	var worker = {
		work: doWork
	};

	var n = 0, m = 0;
	var existingDirs = [];
	var newDirs = [];
	var allDirs = [];

	function findDir(path) {
		for (var i = allDirs.length - 1; i >= 0; i--) {
			var dir = allDirs[i];
			if (dir.path === path) {
				// console.log("Path: %s Found: %s ",path, dir);
				return dir;
			}
		}

		if (path === "") return null;

		return createDir(path, false);
	}

	function findCreatedDir(path) {
		for (var i = existingDirs.length - 1; i >= 0; i--) {
			var dir = existingDirs[i];
			if (dir.path === path) {
				return dir;
			}
		}
		return null;
	}

	function createDir(path, isCreated) {
		var dir = null;
		for (var i = allDirs.length - 1; i >= 0; i--) {
			dir = allDirs[i];
			if (dir.path === path) {
				if (typeof(isCreated) != 'undefined') {
					dir.isCreated = isCreated;
				}
				return dir;
			}
		}

		// console.log("----- Creating %s [%s]",path,isCreated);
		dir = new Dir(path, isCreated);
		allDirs.push(dir);
		if (dir.isCreated)
			existingDirs.push(dir);
		else
			newDirs.push(dir);
		return dir;
	}

	var Dir = function(path, isCreated) {
		this.path = path;
		var pathArray = path.split('/');
		var name = pathArray[pathArray.length-1];
		var idx = path.lastIndexOf(name);
		this.father = findDir(path.substr(0, idx-1));
		if (typeof(isCreated) !== 'undefined') {
			this.isCreated = isCreated;
		} else {
			this.isCreated = (findCreatedDir(path) !== null);
		}
	};

	Dir.prototype.toString = function() {
		return (this.isCreated ? "!"+this.path+"!" : this.path) + "\n";
	};

	function doWork(line, lineNumber) {
		switch(lineNumber) {
			case 0:
				var nm = line.split(' ');
				n = parseInt(nm[0], 10);
				m = parseInt(nm[1], 10);
				return null;
			default:
				// console.log("line: %d",lineNumber, n,m);
				if ((n - lineNumber) < 0) {
					// console.log("add new");
					createDir(line);
					if (((n+m) - lineNumber) <= 0) {
						// Logic
						// console.log();
						// console.log("Dirs: ", allDirs);
						// console.log();
						var createdDirs = createNewDirs();
						// console.log('Created %d dirs', createdDirs);
						reset();
						return createdDirs;
					}
					return null;
				} else {
					// console.log("add exist");
					createDir(line, true);
					return null;
				}

				return 'ERROR';
		}
	}

	function createNewDirs() {
		var created = 0;
		for (var i = newDirs.length - 1; i >= 0; i--) {
			created += createNewDir(newDirs[i]);
		}
		return created;
	}

	function createNewDir(dir) {
		if (dir.isCreated) return 0;
		if (dir.father) {
			// console.log();
			// console.log("Creating: %s", dir);
			dir.isCreated = true;
			return createNewDir(findDir(dir.father.path)) + 1;
		} else {
			// console.log();
			// console.log("Creating: %s", dir);
			dir.isCreated = true;
			return 1;
		}
	}

	function reset() {
		n = 0;
		m = 0;
		existingDirs = [];
		newDirs = [];
		allDirs = [];
	}

	return worker;
})();

module.exports = worker;