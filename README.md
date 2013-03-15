# Delay

A Javascript Delay function with params:
* delay time
* feedback level
* mix level

By default, delay creates a buffer large enough to change the delay time by double it's initial value. So if you want to change up your delay time, choose a interval of half your max and you will be g2g.

npm install jdelay

## usage

Initiate the delay with the values you want, It will return a function

```js
var  audio = new webkitAudioContext();
var  Delay = require('delay')
,    delay = Delay(audio.sampleRate * 2	, 1, 1)


function delayPedal(time, index, sample){
	var del = time % .5 > .25 ? audio.sampleRate * 2 : audio.sampleRate * 4
	// optionally, change delay, feedback and mix params on the fly when you call the delay function
	var feedback = mix = null
	var x = delay(sample, del, feedback, mix)
	return x
};

```

## example

Create an Web Audio compatible [webaudio](https://github.com/NHQ/webaudio) node:

```js
var  audio = new webkitAudioContext();
var  Delay = require('./delay.js')
,    delay = Delay(audio.sampleRate * 2	, 1, 1)
,    webaudio = require('webaudio')
,		 amod = require('amod')
;

var troloop = require('troloop');

function delayPedal(time, index, sample){
	var del = time % .5 > .25 ? audio.sampleRate * 2 : audio.sampleRate * 4
	// optionally, change delay, feedback and mix params on the fly when you call the delay function
	var feedback = mix = null
	var x = delay(sample, del, feedback, mix)
	return x
};

var audioSourceBuffer = troloop(audio);

audioSourceBuffer.loop = false

var delayNode = webaudio(audio, delayPedal);

audioSourceBuffer.connect(delayNode);

delayNode.connect(audio.destination);
```
audioSourceBuffer.start(0)
