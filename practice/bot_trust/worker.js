var Bot = function(color) {
    this.color = color;
    this.pos = 1;
    this.sequence = [];
    
    this.moveTo = function moveTo(pos) {
        if (pos != this.pos) {
            this.pos += (pos - this.pos) > 0 ? 1 : -1;
            return true;
        }
        return false;
    };
    
    this.toString = function() {
        return "["+ (this.color == 'O' ? 'orange' : 'blue') +"] at " + this.pos; 
    }
}


var worker = (function() {
	var worker = {
		work: doWork,
		parser: parseLine
	};

	// Declare variables that live only inside this closure
    var nButtons = 0;
    var orangeBot = new Bot('O');
    var blueBot = new Bot('B');

	function parseLine(line){
		// pass true in the command line to use this to parse each line
	}

	function doWork(line, lineNumber) {
		var secs = 0;
        var splitted = line.split(' ');
        nButtons = parseInt(splitted[0]);
        if (nButtons === 0) return '0';
        
        for (var i = 1; i <= nButtons*2; i += 2) {
            var color = splitted[i];
            var b = {bot: color, pos: splitted[i+1], order: i};
            if (color == 'O') {
                orangeBot.sequence.push(b);
            } else {
                blueBot.sequence.push(b);
            }
        }
        
        var b1 = orangeBot.sequence.shift();
        var b2 = blueBot.sequence.shift();
        
        while (!(!b1 && !b2)) {
            var botToMove = null;
            var buttonToPress = null;
            var otherBot = null;
            var otherButtonToPress = null;
        
            if (!b1 && b2) {
                botToMove = b2.bot == 'O' ? orangeBot : blueBot;
                buttonToPress = b2;
            } else if (!b2 && b1) {
                botToMove = b1.bot == 'O' ? orangeBot : blueBot;
                buttonToPress = b1;
            } else if (b1.order < b2.order) {
                botToMove = b1.bot == 'O' ? orangeBot : blueBot;
                buttonToPress = b1;
                otherBot = b2.bot == 'O' ? orangeBot : blueBot;
                otherButtonToPress = b2;
            } else {
                botToMove = b2.bot == 'O' ? orangeBot : blueBot;
                buttonToPress = b2;
                otherBot = b1.bot == 'O' ? orangeBot : blueBot;
                otherButtonToPress = b1;
            }
        
            while (botToMove.moveTo(buttonToPress.pos)) {
                if (otherBot && otherButtonToPress) {
                    otherBot.moveTo(otherButtonToPress.pos);
                }
                secs++;
            }
            
            // "press" button            
            b1 = buttonToPress.bot == 'O' ? orangeBot.sequence.shift() : blueBot.sequence.shift();
            b2 = otherButtonToPress;
            
            if (otherBot && otherButtonToPress) {
                    otherBot.moveTo(otherButtonToPress.pos);
                }
            
            secs++;
        }
        
        reset();
		return secs;
	}
    
    function reset() {
        nButtons = 0;
        orangeBot = new Bot('O');
        blueBot = new Bot('B');
    }

	return worker;
})();

module.exports = worker;