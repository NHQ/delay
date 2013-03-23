var  funstance = require('funstance')
;
window.arg;
module.exports = function(delay, feedback, mix, bufferSize){
		
  delay = Math.floor(delay) || 0

  feedback = feedback || 0

  mix = mix || 1

  bufferSize = bufferSize || delay * 2;

  if(bufferSize < delay * 2) bufferSize = delay * 2

  var d = new Delay(delay, feedback, mix, bufferSize)

  return funstance(d, Sample)

  function Delay(delay, feedback, mix, bufferSize){
			
	  this.feedback = feedback;
	
	  this.mix = mix;
	
	  this.delay = delay;

	  this.buffer = new Float32Array(bufferSize);

	  this.writeOffset = 0;

	  this.endPoint = (this.delay * 2)
		
	  this.readOffset = this.delay - 1
	
 	};


  function Sample(sample, delay, feedback, mix){

	  if(delay && delay !== this.delay){
		
		  if(delay * 2 > this.buffer.length) {
	      var nb = new Float32Array(delay*2);
	      nb.set(this.buffer, 0);
	      this.buffer = nb		
  		}
		
		  this.readOffset -= (this.delay - Math.floor(delay) - 1);
					
	    this.delay = Math.floor(delay);
		
	    this.endPoint = (this.delay * 2);

  	}

    if (this.readOffset >= this.endPoint) this.readOffset = 0;

    sample += (this.buffer[this.readOffset] * this.mix);

    this.buffer[this.writeOffset] = sample * this.feedback;

    this.writeOffset++;

    this.readOffset++;

    if (this.writeOffset >= this.endPoint) this.writeOffset = 0;

    return sample

  };

};