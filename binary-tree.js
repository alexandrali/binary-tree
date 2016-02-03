'use strict';

class BinaryTree {

	constructor() {	this.root = null;}

	insert(data) {
		if (this.root == null) 
			this.root = new Node (data);
		else {
			var current = this.root;
			while(true){
				if (data == current.data) return;
				else if (data < current.data) {
					if (current.left == null){
                        current.left = new Node(data);
                        break;
                    } 
                    else {
                        current = current.left;
                    }
                }
		 		else if (data > current.data) {
		 			if (current.right == null){
                        current.right = new Node(data);
                        break;
                    } 
                    else {
                        current = current.right;
                    }
                }

			}
            
		}
	}

	find (data){

		if (this.root == null) return false;
		else {
		var prev = null;	
		var current = this.root;
		var side = "";
        while(true){
			if (data == current.data) return {prev: prev, current: current, side: side};
            else if (data < current.data){
            	if (current.left == null) return false;
                    else {
                    	prev = current;
                    	current = current.left;
                    	side = "left"
                    }
                }
            else if (data > current.data){
            	if (current.right == null) return false;
                   else {
                    	prev = current;
                    	current = current.right;
                    	side = "right";
                    }
                }
        	}
		}
	}

	contains(data) {
		var result = this.find(data); 
		return result ? true : false;
    }
	

	remove(data) {
		var toRemove = this.find(data);
		if (!toRemove) { return;} 

		else{
			var prev = toRemove.prev;
			var current = toRemove.current;
			var side = toRemove.side;    
			if (prev == null) { 
				this.root = null;
				return;
			}       
			if (current.left == null && current.right == null){
					prev[side]=null;
					current = null;
					return;
			}
				
			if (current.left != null && current.right == null){
					prev[side] = current.left;
					return;
			}

			if (current.left == null && current.right != null){
					prev[side] = current.right;
					return;
			}

        	if (current.left && current.right) {
				var sideVar = (side === "right" ? ['right', 'left']:['left', 'right']);
				prev[sideVar[0]] = current[sideVar[1]];
				var temp = current[sideVar[1]];
				while (temp[sideVar[0]] != null) {
					temp = temp[sideVar[0]];
				}
				temp[sideVar[0]] = current[sideVar[0]];
			}
       	}
    }
	

	size() {
		var current = (typeof arguments[0] === "undefined" ? this.root : arguments[0]);
		if (current == null) return 0;
		return 1 + this.size(current.left) + this.size(current.right);	
	}


	isEmpty() {
		return this.root == null ? true : false;
	}
	
}
