# Binary Search Tree (BST)

[<img src="./images/Binary_search_tree.svg.png" width="350"/>](./images/Binary_search_tree.svg.png)

A hierarchical data structure composed of nodes, where each node has at most two children (left and right). It is the systematic evolution of the Linked List designed specifically to solve the `O(N)` search problem.

The BST Rule: for every node, all values in the left subtree are smaller, and all values in the right subtree are larger.

## Big O and operations

| Create   | Read     | Update   | Delete   | Find     |
| -------- | -------- | -------- | -------- | -------- |
| O(log N) | O(log N) | O(log N) | O(log N) | O(log N) |

## Possible operations and cost

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

/**
 * O(log n) - Search
 * We eliminate half the tree at every step.
 * This is the "Divide and Conquer" system.
 */
function find(node, target) {
  if (!node) return null;
  if (node.value === target) return node;

  return target < node.value
    ? find(node.left, target)
    : find(node.right, target);
}
```

## When to use

When you need to keep data sorted in this specific way while maintaining faster search/insert than an Array `O(N)` or Linked List (`O(N)`), when the size of your data changes frequently, but you still need `O(N)` efficiency.

## When to avoid

You have small datasets and he overhead of storing two pointers per node and the complexity of recursive logic is often slower than a simple Array scan, if you only need Key-Value lookup (use Hashmap).
