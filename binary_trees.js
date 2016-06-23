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

};

BinTree.prototype.containsRecursively = function(value,current){

};

BinTree.prototype.breadthFirstSearch = function() {

};

BinTree.prototype.DFSPreOrder = function() {

};

BinTree.prototype.DFSInOrder = function() {

};

BinTree.prototype.DFSPostOrder = function() {

};

BinTree.prototype.size = function() {

};

module.exports = {BinTree,Node};