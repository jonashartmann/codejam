# Google Code Jam practice repository
This repository is responsible for storing all the code I create while training for the code jam.

### Running the solutions
The code is made to run on [nodejs](http://nodejs.org/).

You can run each small program by passing a directory as the first parameter.

	$ node main.js store_credit

A **worker.js** file inside each directory actually contains the logic and its function `work` is called by **main.js**.

Some problems require a custom parsing of the input, so if you see a `parser` function inside **worker.js** you need to pass `true` as second argument to node when running.

	$ node main.js alien_language true

The program reads from the standard input (stdin), so you can either write in the prompt after running or pass a file to it on-the-fly.

	$ node main.js store_credit < store_credit\A-small-practice.in

This command works on Windows, it may be different on other systems. I haven't tested it yet. If you do, please leave a note. :)

### The MIT License (MIT)
Copyright (c) 2013 Jonas Hartmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
