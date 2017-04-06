
	/*--层次遍历---*/
	function layerOrder(node){
		var queue=[];
		if(node!=null){
			queue.push(node);
			while(queue.length!=0){
				node=queue.shift();
				arr.push(node);
				if(node.children.length!=0){
					for(var i=0;i<node.children.length;i++){
						if(node.children[i].tagName=="DIV"){
							queue.push(node.children[i]);
						}
					}
				}
			}
		}
	}
	/*--深度遍历---*/
	function deepOrder(node){
		var stack=[];
		if(node!=null){
			stack.push(node);
			while(stack.length!=0){
				node=stack.pop();
				arr.push(node);
				for(var i=node.children.length-1;i>=0;i--){
					if(node.children[i].tagName=="DIV"){
						stack.push(node.children[i]);
					}
				}
			}
		}
	}
	/*---初始化按钮的点击事件---*/
	function init(){
		for(var i=0;i<btns.length;i++){
			(function(i){
				btns[i].onclick=function(){
					if(lock=="true")
						alert("正在遍历中");
					else{
						　traverse(this.id);
					}
				}
			})(i);
		}
	}
	/*---遍历--*/
	function traverse(traverseIndex){
		switch(options.value){
			case 'layer':
				arr=[];
				layerOrder(node);
				break;
			case 'deep':
				arr=[];
				deepOrder(node);
				break;
		}
		arrinit(arr);
		switch(traverseIndex){
			case 'query':
				traverserender(arr,keywd.value);
				break;
			case 'order':
				traverserender(arr,null);
				break;
		}
	}
	/*---更新数组中的className，每次渲染前，需要将数组中上次添加的found className删除，-*/
	function arrinit(arr){
		for(var i=0;i<arr.length;i++){
			arr[i].className=arr[i].className.replace(/found/,' ');
			if(arr[i].firstElementChild.tagName=="SPAN"){
				arr[i].firstElementChild.className="";
			}
		}
	}
	/*---渲染画面---*/
	function traverserender(arr,val){
		var k=0;
		var flag=false;
		lock="true";
		var t=setInterval(function(){
			if(k>0){
				if((val==null)||(val!=null&&arr[k-1].firstElementChild.innerHTML!=val)){
					arr[k-1].className=arr[k-1].className.replace(/current/,' ');
					if(arr[k-1].firstElementChild.tagName=="SPAN"){
							arr[k-1].firstElementChild.className="";
					}
				}
			}
			if(k==arr.length){
				if(!flag&&val!=null){
					alert("没有找到该内容");
				}
				lock="false";
				clearInterval(t);
			}else if(val==null||(val!=null&&arr[k].firstElementChild.innerHTML!=val)){
					arr[k].className+=" current";
					if(arr[k].firstElementChild.tagName=="SPAN"){
						arr[k].firstElementChild.className="current";
					}
			}else if(val!=null&&arr[k].firstElementChild.innerHTML==val){
					flag=true;
					arr[k].className+=' found';
					if(arr[k].firstElementChild.tagName=="SPAN"){
						arr[k].firstElementChild.className="found";
					}
			}
			k++;
		},1000);
	}
