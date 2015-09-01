window.onload = function(){
	window.Employee = Backbone.Model.extend({
		// 模型值校验
		validate:function(attrs){
			for(var key in attrs){
				if(attrs[key] == ''){
					return key + "不能为空";
				}
				if(key == 'age' && isNaN(attrs.age)){
					return "年龄必须是数字";
				}
			}
		}
	});
	window.EmployeeList = Backbone.Collection.extend({
		//model : Employee,
		// 持久化到本地数据库
		localStorage: new Store("employees")
	});
	window.Employees = new EmployeeList();
	window.EmployeeView = Backbone.View.extend({
		tagName : 'tr',
		template : _.template($('#item-template').html()),
		events : {
			"dblclick td" : "edit",
			"blur input,select" : "close",
			"click .del" : "clear"
		},
		initialize : function(){
			// 每次更新模型后重新渲染
			this.model.bind('change', this.render, this);
			// 每次删除模型之后自动移除UI
			this.model.bind('destroy', this.remove, this);
		},
		setText : function(){
			var model = this.model;
			this.input = $(this.el).find('input,select'); 
			this.input.each(function(){
				var input = $(this);
				input.val(model.get(input.attr("name")));
			});
		},
		close: function(e) {
			var input = $(e.currentTarget);
			var obj = {};
			obj[input.attr('name')] = input.val();
			this.model.save(obj);
			$(e.currentTarget).parent().parent().removeClass("editing");
		},
		edit : function(e){
			// 给td加上editing样式
			$(e.currentTarget).addClass('editing').find('input,select').focus();
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			// 把每个单元格的值赋予隐藏的输入框
			this.setText();
			return this;
		},
		remove: function() {
				$(this.el).remove();
		},
		clear: function() {
			this.model.destroy();
		}
	});
	window.AppView = Backbone.View.extend({
		el : $("#app"),
		events : {
			"click .#add-btn" : "createOnEnter"
		},
		// 绑定collection的相关事件
		initialize: function() {
			Employees.bind('add', this.addOne, this);
			// 调用fetch的时候触发reset
			Employees.bind('reset', this.addAll, this);
			Employees.fetch();
		},
		createOnEnter : function(e) {
			var employee = new Employee();
			var attr = {};
			$('#emp-form input,#emp-form select').each(function(){
				var input = $(this);
				attr[input.attr('name')] = input.val();
			});
			employee.bind('error',function(model,error){
				alert(error);
			});
			// set方法中会自动调用model的validate方法进行校验，如果不通过则返回false
			if(employee.set(attr)){
				Employees.create(employee);
			}
		},
		addOne : function(employee){
			employee.set({"eid":employee.get("eid")||Employees.length});
			employee.bind('error',function(model,error){
				alert(error);
			});
			var view = new EmployeeView({model:employee});
			$(".emp-table tbody").append(view.render().el);
		},
		addAll : function(){
			Employees.each(this.addOne);
		}
	});
	window.App = new AppView();
}