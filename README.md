# Delay

A Javascript Delay function with params:
* delay time **in samples**
* feedback level
* mix level
* bufferSize - defaults to to whatever your delay time requires, but can be set to to higher

You can change the delay time, feedback, and mix levels on the fly. If you set the delay to a higher value than the buffer can hold, it will create a larger buffer.

```
npm install jdelay
```

## usage

Initiate the delay with the values you want, It will return a function

```js
var  audio = new webkitAudioContext();
var  Delay = require('delay')
,    delay = Delay(audio.sampleRate * 2	, 1, 1)


function delayPedal(time, index, sample){
	var newDelayParam = time % .5 > .25 ? audio.sampleRate * 2 : audio.sampleRate * 4
	// optionally, change delay, feedback and mix params on the fly when you call the delay function
	var feedback = mix = null
	var x = delay(sample, newDelayParam, feedback, mix)
	return x
};

```

## example

Initiate the delay with the values you want, It will return a function

This examples creates a Web Audio API compatible [webaudio](https://github.com/NHQ/webaudio) node:

```js
var  audio = new webkitAudioContext();
var  Delay = require('./delay.js')
,    delay = Delay(audio.sampleRate / 64, .75, 1)
,    delay2 = Delay(audio.sampleRate / 4, .75, 1)
,    Reverb = Delay(222, .67, 1)
,    webaudio = require('webaudio')
,		 amod = require('amod')
, 	 osc = require('oscillators')()
;
var troloop = require('troloop');


var echo, reverb = 0;
var dd = 0
,   swich = true;

function delayPedal(time, index, sample){
		
  echo = delay(sample)	/ 2

  reverb = delay2(sample) / 2

  return echo + reverb

};

var audioSourceBuffer = troloop(audio);

audioSourceBuffer.loop = false

var delayNode = webaudio(audio, delayPedal);

audioSourceBuffer.connect(delayNode);

delayNode.connect(audio.destination);

audioSourceBuffer.start(0)
```