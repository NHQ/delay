// this example creates a *webaudio* node http://github.com/NHQ/webaudio
// you will need to install some modules to run it (amod, webaudio, oscillators)

// this ex. is also an entry file to be used with *browserify* v.2 http://github.com/substack/browserify
// browserify is the breeder's choice for front-end web development the Node.js way

// this ex can easily run with *opa*, a web dev heloper tool http://github.com/NHQ/opa
// npm install -g browserify opa
// cd path/to/this/example
// opa -n -e example.js
// open browser to http://localhost:11001 (make sure volum is up)

var  audio = new webkitAudioContext();
var  Delay = require('../basic.js')
,    delay = Delay(audio.sampleRate * 3, 0, 1)
,    webaudio = require('jsynth')
,		 amod = require('amod')
, 	 osc = require('oscillators')()
;
var troloop = require('troloop');


var echo, reverb = 0;
var dd = 0
,   swich = true;

function delayPedal(time, index, sample){
		
  echo = delay(sample)	/ 2

  return echo

};

var audioSourceBuffer = troloop(audio);

audioSourceBuffer.loop = false

var delayNode = webaudio(audio, delayPedal);

audioSourceBuffer.connect(delayNode);
audioSourceBuffer.connect(audio.destination);
delayNode.connect(audio.destination);

audioSourceBuffer.start(0)