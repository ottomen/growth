# Linked List

[<img src="./images/CPT-LinkedLists-deletingnode.svg.png" width="550"/>](./images/CPT-LinkedLists-deletingnode.svg.png)

```javascript
class Node {
  constructor(data) {
    this.val = data;
    this.next = null;
  }
}

let head = new Node(1);
```

| Create       | Read | Update | Delete | Find |
| ------------ | ---- | ------ | ------ | ---- |
| O(1) at head | O(n) | O(1)   | O(1)   | O(n) |


## Linked List in React

````ts
const newHook: Hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,

      next: null,
    };
```

Source code: https://github.com/facebook/react/blob/1721e73e149d482a4421d4ea9f76d36a2c79ad02/packages/react-reconciler/src/ReactFiberHooks.js#L980