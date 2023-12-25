const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  _RIGHT_DIRECTION = 'right';
  _LEFT_DIRECTION = 'left';


  constructor() {
    this.rootNode = null;
  }
  
  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    this.rootNode
      ? this._insertNode(this.rootNode, newNode)
      : this.rootNode = newNode;  
  }

  has(data) {
    return !!this._findNode(this.rootNode, data);
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  min() {
    return this._findNode(this.rootNode, undefined, this._LEFT_DIRECTION).data;
  }

  max() {
    return this._findNode(this.rootNode, undefined, this._RIGHT_DIRECTION).data;
  }

  _insertNode(node, newNode) {
    const direction = this._getDirection(newNode.data, node.data);
    node[direction] === null
      ? node[direction] = newNode
      : this._insertNode(node[direction], newNode);   
  }

  _findNode(node, data, direction = undefined) {
    if (!direction) {
      if (node === null || data === node.data) 
        return node;
      const direction = this._getDirection(data, node.data)
      return this._findNode(node[direction], data);
    }  
    return node[direction] === null
      ? node
      : this._findNode(node[direction], undefined, direction);
  }

  _removeNode(node, data) {
    if (node === null) return null;
    if (data !== node.data) {
      const direction = this._getDirection(data, node.data);
      node[direction] = this._removeNode(node[direction], data);
      return node;
    }    
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;
    
    const minRightNode = this._findNode(node.right, undefined, this._LEFT_DIRECTION);
    node.data = minRightNode.data;
    node.right = this._removeNode(node.right, minRightNode.data);
    return node    
  }

  _getDirection(newNodeData, existNodeData) {
    return newNodeData > existNodeData
      ? this._RIGHT_DIRECTION
      : this._LEFT_DIRECTION;
  }

}

module.exports = {
  BinarySearchTree
};