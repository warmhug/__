define(function(){

	function Widget(){
		// this.handlers = {},
		this.boundingBox = null;
	}

	Widget.prototype = {
		// 非常经典的观察则模式实现
		on: function(type, handler){
			if(typeof this.handlers[type] === 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire: function(type, data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0, len = handlers.length; i < len; i++){
					handlers[i](data);
				}
				// this.handlers[type] = []; // 此处有bug，会多次出发alert事件
			}
		},

		// 新增2个方法
		render: function(container){
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},

		destroy: function(){
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		},

		// 新增4个空接口,需要由具体的子类来实现
		renderUI: function(){},

		bindUI: function(){},

		syncUI: function(){},

		destructor: function(){}
	}

	return{
		Widget: Widget
	}
});