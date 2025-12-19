# Binary Search Tree (BST)

[<img src="./images/Binary_search_tree.svg.png" width="350"/>](./images/Binary_search_tree.svg.png)

```javascript
class BST {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

let root = new BST(10);
root.value = 15;
````

| Create           | Read             | Update           | Delete           | Find             |
| ---------------- | ---------------- | ---------------- | ---------------- | ---------------- |
| O(log n) average | O(log n) average | O(log n) average | O(log n) average | O(log n) average |