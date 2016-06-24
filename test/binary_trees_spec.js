const expect = require("chai").expect
const data = require("../binary_trees.js");

describe("Node", function(){
  var node;
  beforeEach(function() {
    node = new data.Node(5);
  });
  describe("Initialization", function(){
    it("has a value property set to whatever is passed in", function(){
      expect(node.value).to.equal(5);
    });
    it("has a left property that starts with null", function(){
      expect(node.left).to.equal(null);
    });
    it("has a right property that starts with null", function(){
      expect(node.right).to.equal(null);
    });
  });
});

describe("BinTree", function(){
  var binTree, node;

  describe("hasOwnProperty", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
    });
    it("starts with a root", function(){
      expect(binTree.hasOwnProperty("root")).to.equal(true);
    });
    it("starts with a root of null", function(){
      expect(binTree.root).to.equal(null);
    });
  });

  describe("#insert iteratively", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
       binTree.insertIteratively(5);
       binTree.insertIteratively(10);
       binTree.insertIteratively(3);
    });
    it("only accepts numbers", function(){
      ["awesome", null, undefined, [], true, {}, NaN, function(){}].forEach(function(option){
        expect(binTree.insertIteratively(option)).to.equal("Please insert a number");
      });
    });
    it("adds successfully", function(){
      expect(binTree.root.value).to.equal(5);
      expect(binTree.root.right.value).to.equal(10);
      expect(binTree.root.left.value).to.equal(3);
    });
    it("does not add duplicates", function(){
      binTree.insertIteratively(3);
      binTree.insertIteratively(3);
      binTree.insertIteratively(3);
      expect(binTree.root.left.value).to.equal(3);
      expect(binTree.root.left.left).to.equal(null);
      expect(binTree.root.left.right).to.equal(null);
    });
    it("adds multiple numbers in the correct position", function(){
      binTree.insertIteratively(4);
      binTree.insertIteratively(7);
      binTree.insertIteratively(6);
      expect(binTree.root.left.right.value).to.equal(4);
      expect(binTree.root.right.left.value).to.equal(7);
      expect(binTree.root.right.left.left.value).to.equal(6);
    });
  });

  describe("#insert recursively", function(){
    beforeEach(function () {
       binTree = new data.BinTree();
       binTree.insertRecursively(5);
       binTree.insertRecursively(10);
       binTree.insertRecursively(3);
    });

    it("only accepts numbers", function(){
      ["awesome", null, undefined, [], true, {}, NaN, function(){}].forEach(function(option){
        expect(binTree.insertRecursively(option)).to.equal("Please insert a number");
      });
    });
    it("adds successfully", function(){
      expect(binTree.root.value).to.equal(5);
      expect(binTree.root.right.value).to.equal(10);
      expect(binTree.root.left.value).to.equal(3);
    });
    it("does not add duplicates", function(){
      binTree.insertRecursively(3);
      binTree.insertRecursively(3);
      binTree.insertRecursively(3);
      expect(binTree.root.left.value).to.equal(3);
      expect(binTree.root.left.left).to.equal(null);
      expect(binTree.root.left.right).to.equal(null);
      expect(binTree.insertRecursively(3)).to.equal("duplicate!");
    });
    it("adds multiple numbers in the correct position", function(){
      binTree.insertRecursively(4);
      binTree.insertRecursively(7);
      binTree.insertRecursively(6);
      expect(binTree.root.left.right.value).to.equal(4);
      expect(binTree.root.right.left.value).to.equal(7);
      expect(binTree.root.right.left.left.value).to.equal(6);
    });
  });

  describe("#contains", function(){
    var binTree;
    beforeEach(function() {
      binTree = new data.BinTree();
      [7,3,9,1,99,44,66].forEach(function(v) {
        binTree.insertRecursively(v);
      });
    });
    describe("#iteratively", function(){
      it("should find a value in binTree with many values", function(){
        [7,3,9,1,99,44,66].forEach(function(v) {
          expect(binTree.containsIteratively(v)).to.equal(true);
        });
      });
      it("should return true, when it's found", function() {
        expect(binTree.containsIteratively(66)).to.equal(true);
      });
      it("should return false, when it's not found", function() {
        expect(binTree.containsIteratively(-20)).to.equal(false);
        expect(binTree.containsIteratively(20)).to.equal(false);
      });
    });
    describe("#recursively", function(){
      it("should find a value in binTree with many values", function(){
        [7,3,9,1,99,44,66].forEach(function(v) {
          expect(binTree.containsRecursively(v)).to.equal(true);
        });
      });
      it("should return true, when it's found", function() {
        expect(binTree.containsRecursively(66)).to.equal(true);
      });
      it("should return false, when it's not found", function() {
        expect(binTree.containsRecursively(-20)).to.equal(false);
        expect(binTree.containsRecursively(20)).to.equal(false);
      });
    });
  });
  describe("breadth first search", function(){
    var binTree;
    beforeEach(function() {
      binTree = new data.BinTree();
      [7,3,9,1,99,44,66].forEach(function(v) {
        binTree.insertRecursively(v);
      });
    });
    it("should search left to right", function(){
      expect(binTree.breadthFirstSearch()).to.deep.eq([7,3,9,1,99,44,66]);
    });
  });
  xdescribe("depth first search", function(){
    beforeEach(function() {
      binTree = new data.BinTree();
      [7,3,9,1,99,44,66].forEach(function(v) {
        binTree.insertRecursively(v);
      });
    });
    xdescribe("preorder", function(){
      it("searches from root - left - right", function(){
        expect(binTree.DFSPreOrder()).to.deep.eq([7, 3, 1, 9, 99, 44, 66]);
      });
    });
    xdescribe("inorder", function(){
      it("searches from left - root - right", function(){
        expect(binTree.DFSInOrder()).to.deep.eq([1, 3, 7, 9, 44, 66, 99]);
      });
    });
    xdescribe("postorder", function(){
      it("searches from left - right - root", function(){
        expect(binTree.DFSPostOrder()).to.deep.eq([1, 3, 66, 44, 99, 9, 7]);
      });
    });
  });
  xdescribe("#size", function(){
    it("It should return the size of the binary tree", function(){
      binTree = new data.BinTree();
      [7,3,9,1,99,44,66].forEach(function(v) {
        binTree.insertRecursively(v);
      });
      expect(binTree.size()).to.equal(7);
    });
  });
});
