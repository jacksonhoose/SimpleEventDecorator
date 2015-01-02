/*!
 *  Event Listener Mixin
 */
function eventDecorator(target){

	// hash for storing events and cb's
	target.events = {};

	// manual trigger a listener
	target.trigger = function(event){
		this.execute(this.events.hasOwnProperty(event) ? this.events[event] : []);
	};

	// adds a listener
	target.on = function(event, cb){
		this.events[event] = Array.isArray(this.events[event]) 
			? this.events[event].push(cb) 
			: [cb];
	};

	// removes a listener
	target.off = function(event, cb){
		var events = this.events[event];
		var eventString = '';

		cb = cb.toString();
		
		for(var i = 0; i < events.length; i++){
			eventString = events[i].toString();
			if(cb === eventString){
				events.splice(i, 1);
				break;
			}
		}		

		this.events = events;
	};

	// execute the callback
	target.execute = function(cb){
		for(var i = 0; i < cb.length; i++){
			// trigger events asyncronously
			setTimeout(cb[i], 0);
		}
	};

	return target;
}