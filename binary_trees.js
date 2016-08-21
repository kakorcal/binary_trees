function BinTree(){
  this.root = null;
}

function Node(value, left=null, right=null){
  this.value = value;
  this.left = left;
  this.right = right;
}

BinTree.prototype.insertIteratively = function(value){
  // return tree with inserted node
  // make sure the value is a number!
  if(!Number.isInteger(value) || value < 0) return 'Please insert a number';
  // set new node to be root if empty tree
  let node = new Node(value);
  if(!this.root){
    this.root = node;
    return this;
  }else{
    let currNode = this.root;
    while(currNode){
      if(value < currNode.value){
        if(!currNode.left){
          currNode.left = node;
          return this;           
        }
        currNode = currNode.left;
      }else if(value > currNode.value){
        if(!currNode.right){
          currNode.right = node;
          return this;
        }
        currNode = currNode.right;
      }else{
        return 'duplicate!';
      }
    }
  }
};

BinTree.prototype.insertRecursively = function(value,current){
  // check if valid value 
  if(!Number.isInteger(value) || value < 0) return 'Please insert a number';
  // insert if empty tree
  if(!this.root){
    this.root = new Node(value);
    return this;
  }
  // define current
  let currNode = current || this.root;
  if(currNode.value > value){
    // go left
    if(!currNode.left){
      currNode.left = new Node(value);
      return this;
    }else{
      // call again
      return this.insertRecursively(value, currNode.left);
    }
  }else if(currNode.value < value){
    // go right 
    if(!currNode.right){
      currNode.right = new Node(value);
      return this;
    }else{
      return this.insertRecursively(value, currNode.right);
    }
  }else{
    return 'duplicate!';
  }
};

BinTree.prototype.containsIteratively = function(value){
  // return true if value is found in the tree
  // check if value is valid
  if(!Number.isInteger(value) || value < 0) return false;
  // if tree is empty
  if(!this.root) return false;
  // traverse the tree
  // define current node
  let currNode = this.root;

  while(currNode){
    // compare values
    if(currNode.value > value){
      // go left
      currNode = currNode.left;
    }else if(currNode.value < value){
      // go right
      currNode = currNode.right;
    }else{
      // currNode.value === value
      return true;
    }
  }
  // return false if nothing is found
  return false;
};

BinTree.prototype.containsRecursively = function(value,current){
  // return true if value is found in the tree
  // check if value is valid
  if(!Number.isInteger(value) || value < 0) return false;
  // if tree is empty
  if(!this.root) return false;

  // define current node
  let currNode = current || current === null ? current : this.root;

  if(currNode){
    if(value > currNode.value){
      return this.containsRecursively(value, currNode.right);
    }else if(value < currNode.value){
      return this.containsRecursively(value, currNode.left);
    }else{
      return true;
    }
  }else{
    // not found
    return false;
  }
};

BinTree.prototype.breadthFirstSearch = function() {
  // return an array of all value left to right. 
  // meaning in the order that the nodes were inserted
  // if tree is empty, return an empty array
  if(!this.root) return [];
  // create a queue which will store the nodes in bfs order
  // node will be inserted into result
  let queue = [this.root], result = [];

  while(queue.length){
    // take out the first item in the queue
    let currNode = queue.shift();
    // add the current value into the result array
    result.push(currNode.value);
    // add nodes on left first
    if(currNode.left){
      queue.push(currNode.left);
    }
    // keep adding until all nodes are visited
    if(currNode.right){
      queue.push(currNode.right);
    }
  }
  return result;
};

BinTree.prototype.DFSPreOrder = function() {
  // return an array in order of root - left - right
  // if tree is empty, return an empty array
  if(!this.root) return [];
  // create result array
  let result = [];
  let currNode = this.root;

  function search(node){
    // keep going left until null
    // push the value if dead end
    result.push(node.value);
    if(node.left){
      search(node.left);
    }
    if(node.right){
      search(node.right);
    }
  }
  search(currNode);
  return result;

};

BinTree.prototype.DFSInOrder = function() {
  // return an array in order of left - root - right. ie min to max
  // if tree is empty, return an empty array
  if(!this.root) return [];
  // create result array
  let result = [];
  let currNode = this.root;

  function search(node){
    // keep going left until null
    // push the value if dead end
    if(node.left){
      search(node.left);
    }
    // the search function doesn't return anything, 
    // it will just mutate the result array
    result.push(node.value);
    if(node.right){
      search(node.right);
    }
  }
  search(currNode);
  return result;
};

BinTree.prototype.DFSPostOrder = function() {
  // searches from left - right - root
  // if tree is empty, return an empty array
  if(!this.root) return [];
  // create result array
  let result = [];
  let currNode = this.root;

  function search(node){
    // keep going left until null
    // push the value if dead end
    if(node.left){
      search(node.left);
    }
    if(node.right){
      search(node.right);
    }
    result.push(node.value);
  }
  search(currNode);
  return result;
};

BinTree.prototype.reverse = function(){
  function swap(node){
    [node.left, node.right] = [node.right, node.left];

    if(node.left){
      swap(node.left);
    }

    if(node.right){
      swap(node.right);
    }
  }
  
  swap(this.root);
};

// private helper method for remove
BinTree.prototype._countChildren = function(node){

};

BinTree.prototype.remove = function(value){
  
};

module.exports = {BinTree,Node};