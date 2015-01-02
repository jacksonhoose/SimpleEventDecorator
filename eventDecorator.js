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
	target.on = function(events, cb){
		events.split(' ').forEach(function(e){
			this.events[e] = Array.isArray(this.events[e]) 
			? this.events[e].push(cb) 
			: [cb];
		}, this);
	};

	// removes a listener
	target.off = function(events, cb){
		var cleanedEvents = this.events;
		var eventString = cb.toString();
		var eventString = '';
		
		events.split(' ').forEach(function(e){
			if(cleanedEvents.hasOwnProperty(e)){
				for(var i = 0; i < cleanedEvents[e].length; i++){
					eventString = cleanedEvents[e][i].toString();
					if(cb === eventString){
						cleanedEvents[e].splice(i, 1);
						break;
					}
				}
			}	
		}, this);

		this.events = cleanedEvents;
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