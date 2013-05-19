var  funstance = require('funstance')
;

module.exports = function(delay, feedback, mix, bufferSize){
		
  delay = Math.floor(delay) || 0

  feedback = feedback || 0

  mix = mix || 1

  bufferSize = bufferSize || delay * 2;

  if(bufferSize < delay * 2) bufferSize = delay * 2

  var d = new Delay(delay, feedback, mix, bufferSize)

	var fn = funstance(d, Sample)

  return fn

  function Delay(delay, feedback, mix, bufferSize){
			
	  this.feedback = feedback;
	
	  this.mix = mix;
	
	  this.delay = delay;
	
	  this._sample = 0;

	  this.buffer = new Float32Array(bufferSize);
	
	  this.writeOffset = 0;

	  this.endPoint = (this.delay * 2)
		
	  this.readOffset = this.delay - 1
	
 	};


  function Sample(sample, _delay, feedback, mix){

      var s = sample;

      if(_delay && _delay !== this.delay){

	  _delay = Math.max(0, _delay);
	  
	  if(_delay * 2 > this.buffer.length) {

	      var nb = new Float32Array(Math.floor(_delay)*3.5);

	      nb.set(this.buffer, 0);

	      this.buffer = nb		

  	  }
	  
	  this.delay = Math.floor(_delay);
	  
	  this.endPoint = (this.delay * 2);

      }

    if (this.readOffset >= this.endPoint) this.readOffset = 0;

    this._sample = (this.buffer[this.readOffset] * this.mix);

    this.buffer[this.writeOffset] = sample + ( this._sample * this.feedback );

    this.writeOffset++;

    this.readOffset++;

    if (this.writeOffset >= this.endPoint) this.writeOffset = 0;

    return this._sample

  };

};
