var  funstance = require('funstance')
;

module.exports = function(delay, feedback, mix){
	
  delay = delay || 1000;

  feedback = feedback || 0

  mix = mix || 1

  var delay = new Delay(delay, feedback, mix)

  return funstance(delay, Sample)

  function Delay(delay, feedback, mix){
			
	  this.feedback = feedback;
	
	  this.mix = mix
	
	  this.delay = delay || 1000;

	  this.buffer = new Float32Array(delay * 4);

		var x;

	  for(x in this.buffer) this.buffer[x] = 0;

	  this.writeOffset = 0;

	  this.readOffset = this.writeOffset + this.delay - 1
	
 	};


  function Sample(sample, delay, feedback, mix){
	
	  delay = delay || this.delay
	  feedback = feedback || this.feedback
	  mix = mix || this.mix

		var readOff = this.writeOffset + delay - 1;
				
    if (readOff >= this.buffer.length) readOff -= this.buffer.length;

    var val = this.buffer[readOff];

    sample += (val * this.mix);

    this.buffer[this.writeOffset] = sample * this.feedback

    this.writeOffset ++;

    this.readOffset ++;

    if (this.writeOffset >= this.buffer.length) this.writeOffset = 0;

 //   if (this.readOffset >= this.buffer.length) this.readOffset = 0;

    return sample

  };

};