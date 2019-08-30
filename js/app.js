(function (Vue) {

	const data = []
	
	window.vm = new Vue({
		el : '.todoapp',
		data:{
			todos : data,
			editedTodo : null,
			visibility : 'all'
		},
		computed : {
			
			todosFilter : function () {
				
				switch(this.visibility){
					case 'active' : 
					return this.todos.filter(function (item) {
						return item.checked === false
					})
					break;
					case 'completed' :
					return this.todos.filter(function (item) {
						return item.checked === true
					})
					break;
					default :
					return this.todos
					break;
				}
			},
			itemleft : function () {
				return this.todosFilter.length;
			},
			toggleAllStat : function () {
				return this.todos.filter(item => item.checked === false);
			}
		},
		methods:{
			toggleall:function (event) {
				const check = event.target.checked;
				this.todos.forEach(function(item){
						item.checked = check;
				})
			},
 
			addTodo : function (event){
				const valueStr = event.target.value;
				var lastFruits = this.todos[this.todos.length-1];
				var idStr = lastFruits ? lastFruits.id+1 : 1;
				this.todos.push({
						id : idStr,
						name : valueStr,
						checked : false
					})
				
				event.target.value = '';
			},
 
			removeItem : function (index) {
				this.todos.splice(index,1);
			},
 
			removeALLDone : function () {
	
				this.todos =  this.todos.filter(function(item){
					return !item.checked
				})
			},
 
			editInput:function () {
				console.log('editInput');
			},
 
			editSave : function (item,event) {
					this.editedTodo = null;
			}
		},
		directives : {
			focuz : {
				inserted : function (el) {
					el.focus();
				}
			},
			dblfocus : {
				update : function (el,binding) {
					console.log(binding.value);
					if(binding.value){
						console.log('fff');
						el.focus();
					}
					
				}
			}
		}
	})
 
	window.onhashchange = function () {
		const str = location.hash.replace("#/","");
		vm.visibility = str;
	}
 
})(Vue)