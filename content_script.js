function changeStyle(node, startOffset, endOffset){
	debugger;
	if(startOffset==undefined || endOffset==undefined){
		//处理普通node
		node.style.textDecoration="underline";
	}else{
		//处理textnode;
		var parentNode = node.parentNode;
		var newNode = document.createElement("span");
		parentNode.replaceChild(newNode,node);

		var node1 = document.createTextNode(node.data.substring(0,startOffset));
		var node2 = document.createElement("span");
		var node2text = document.createTextNode(node.data.substring(startOffset,endOffset));
		node2.appendChild(node2text);
		var node3 = document.createTextNode(node.data.substring(endOffset,node.data.length));
		newNode.appendChild(node1);
		newNode.appendChild(node2);
		newNode.appendChild(node3);

		changeStyle(node2);
	}
};

function findAndUpdate(node, selection, changeStyle){
	if(!selection.containsNode(node,true)) {
		//白色，节点完全与selection无关，跳过
	}
	else if(selection.containsNode(node, false)) {
		//黑色，节点完全属于selection,修改该node的style
		if(node.nodeName=="#text"){
			//debugger;
			var startOffset=0;
			var endOffset=node.data.length;
			if(node==selection.anchorNode){
				startOffset = selection.anchorOffset;
			}
			if(node==selection.focusNode){
				endOffset = selection.focusOffset;
			}
			changeStyle(node, startOffset, endOffset);
		}else{
			changeStyle(node);
		}
	}
	else{
		//灰色，需要细分
		var childNode = node.firstChild;
		var nextNode;
		while(childNode){
			//由于会修改树结构，因此必须这么做
			nextNode = childNode.nextSibling;
			findAndUpdate(childNode,selection,changeStyle);
			childNode = nextNode;
		}
	}
};

function onTextSelected(evt){
	var selection = window.getSelection();
	if(selection != undefined && !selection.isCollapsed && selection.toString()!=""){
		//处理selection
		//(1)显示一个调整框，selection全局，调整
		//(2)测试只做alert，或加下滑性
		var root = document.body;
		findAndUpdate(root,selection,changeStyle);
		selection.
	}
};

function initContentScript(){
	//debugger;
	document.addEventListener("mouseup",onTextSelected);
};
//debugger;
initContentScript();