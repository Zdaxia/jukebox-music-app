(function(w,d,$){
	var socket=io.connect(window.location.hostname.toString()+':9001'); //port for websocket.

	var Websocket={

		websocketSelf:{},
		userName:"",

		/**
		 * give me a random string as user name.
		 * @parem {int} length - the length of the random string.
		 */
		randomChar:function(length){
			var length = length || 32;
			var source = "abcdefghzklmnopqrstuvwxyz"; 
			var random = "";  
    		for(var i = 0;i < length; i++)  {  
        		random += source.charAt(Math.ceil(Math.random()*100000000)%source.length);  
    		}  
    		return random; 
		},

		setParameter: function(paramName, paramValue)
		{
		    var url = window.location.href;
		    if (url.indexOf(paramName + "=") >= 0)
		    {
		        var prefix = url.substring(0, url.indexOf(paramName));
		        var suffix = url.substring(url.indexOf(paramName));
		        suffix = suffix.substring(suffix.indexOf("=") + 1);
		        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
		        url = prefix + paramName + "=" + paramValue + suffix;
		    }
		    else
		    {
		    if (url.indexOf("?") < 0)
		        url += "?" + paramName + "=" + paramValue;
		    else
		        url += "&" + paramName + "=" + paramValue;
		    }
		    window.location.href = url;
		},

		bindEvents: function(){
      		$(d).bind('MUSIC_FREQUENCY_DATA_EVENT',websocketSelf.musicFrequencyDataEventHandler);
    	},

    	musicFrequencyDataEventHandler: function(event, frequency){
          socket.emit('bit', frequency); //emit the frequency data of playing music to websockets.
    	},

    	

		init:function(){
			websocketSelf=this;
			if(!($.url().param('id'))){
				websocketSelf.userName=websocketSelf.randomChar(5);
				websocketSelf.setParameter('id', websocketSelf.userName);
			}else{
				websocketSelf.userName=$.url().param('id');
			};
			websocketSelf.bindEvents();
			socket.emit('add mainscreen user',websocketSelf.userName); //emit the frequency data of playing music to websockets.
			/*--------------test here--------------------*/
			socket.on('userList', function(data) {
                console.log(data);
            });
		}
	};

	Websocket.init();

})(window, document, jQuery);





