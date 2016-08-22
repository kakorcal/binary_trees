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
  if(!node.left && !node.right){
    return 0;
  }else if((node.left && !node.right) || (!node.left && node.right)){
    return 1;
  }else if(node.left && node.right){
    return 2;
  }else{
    return null;
  }
};

BinTree.prototype._leftmax = function(node){
  if(!node) return null;
  var currNode = node.left;
  
  if(!currNode.right) return node;

  while(true){
    if(!currNode.right.right){
      return currNode;
    }else{
      currNode = currNode.right;
    }
  }
};

BinTree.prototype.remove = function(value){
  if(!this.root){
    console.log('// case 0 - no tree');
    return null;
  }

  var currNode = this.root;
  var childCount, leftmax, leftmaxValue, leftmaxChildren;
  while(true){
    if(currNode){
      if(currNode.left){
        if(currNode.left.value === value){
          childCount = this._countChildren(currNode.left);
          if(childCount === 0){
            console.log('// case 3 left - remove leafs');
            currNode.left = null; 
          }else if(childCount === 1){
            console.log('// case 4 left - one child');
            if(currNode.left.left){
              currNode.left = currNode.left.left;
            }else{
              currNode.left = currNode.left.right;
            }
          }else if(childCount === 2){
            console.log('// case 5 left - two children');
            leftmax = this._leftmax(currNode.left);

            if(leftmax.value === currNode.left.value){
              console.log('// direct child');
              leftmax.left.right = currNode.left.right;
              currNode.left = leftmax.left;
            }else{
              console.log('// indirect child');
              leftmaxValue = leftmax.right.value;
              leftmaxChildren = leftmax.right.left;

              leftmax.right.right = currNode.left.right;
              leftmax.right.left = currNode.left.left;
              currNode.left = leftmax.right;
              
              currNode = currNode.left.left;
              while(true){
                if(currNode.right.value === leftmaxValue){
                  currNode.right = leftmaxChildren;
                  return this;
                }else{
                  currNode = currNode.right;
                }
              }
            }
          }
          return this;
        }
      }

      if(currNode.right){
        if(currNode.right.value === value){
          childCount = this._countChildren(currNode.right);
          if(childCount === 0){
            console.log('// case 3 right - remove leafs');
            currNode.right = null;
          }else if(childCount === 1){  
            console.log('// case 4 right - one child');
            if(currNode.right.left){
              currNode.right = currNode.right.left;
            }else{
              currNode.right = currNode.right.right;
            }
          }else if(childCount === 2){
            console.log('// case 5 right - two children');
            leftmax = this._leftmax(currNode.right);

            if(leftmax.value === currNode.right.value){
              console.log('// direct child');
              leftmax.left.right = currNode.right.right;
              currNode.right = leftmax.left;
            }else{
              console.log('// indirect child');
              leftmaxValue = leftmax.right.value;
              leftmaxChildren = leftmax.right.left;

              leftmax.right.right = currNode.right.right;
              leftmax.right.left = currNode.right.left;
              currNode.right = leftmax.right;
              
              currNode = currNode.right.left;
              while(true){
                if(currNode.right.value === leftmaxValue){
                  currNode.right = leftmaxChildren;
                  return this;
                }else{
                  currNode = currNode.right;
                }
              }
            }
          }
          return this;
        }
      }

      if(currNode.value === value){
         console.log('// case 1 - remove root');
         this.root = null;
         return this;
      }else if(currNode.value > value){
        currNode = currNode.left;
      }else{
        currNode = currNode.right;
      }
    }else{
      console.log('// case 2 - value not found');
      return 'Value not in the tree!';
    }
  }
  return this;
};

module.exports = {BinTree,Node};