// this example creates a *webaudio* node http://github.com/NHQ/webaudio

// this is an entry file for use with *browserify* v.2 http://github.com/substack/browserify
// browserify is the breeder's choice for front-end web development the Node.js way

// this repo can also be used with *opa*, a web dev heloper tool http://github.com/NHQ/opa

var  audio = new webkitAudioContext();
var  Delay = require('./delay.js')
,    delay = Delay(audio.sampleRate * 2	, 1, 1)
,    webaudio = require('webaudio')
,		 amod = require('amod')
;


var troloop = require('troloop');

function delayPedal(time, index, sample){
	sample *= amod(.5, .25, time, 2);
	var del = time % .5 > .25 ? audio.sampleRate * 2 : audio.sampleRate / 4
	var x = delay(sample, del)
	return x * .4
};

var audioSourceBuffer = troloop(audio);

audioSourceBuffer.loop = false

var delayNode = webaudio(audio, delayPedal);

audioSourceBuffer.connect(delayNode);

delayNode.connect(audio.destination);

audioSourceBuffer.start(0)