# Linked List

[<img src="./images/CPT-LinkedLists-deletingnode.svg.png" width="550"/>](./images/CPT-LinkedLists-deletingnode.svg.png)

A linear data structure where elements are not stored in contiguous memory locations. Instead, each element (node) is a separate object that contains a value and a pointer (reference) to the next node in the sequence.

Be aware that you need to know the difference between a `Singly Linked List` (one-way pointers, only `next`) and a `Doubly Linked List` (pointers to both `next` and `prev` nodes).

And you need to know the difference between passing an element as a primitive or as a link.

## Big O and operations

| Create       | Read | Update | Delete | Find |
| ------------ | ---- | ------ | ------ | ---- |
| O(1) at head | O(n) | O(1)   | O(1)   | O(n) |

## Possible operations and cost

```javascript
class Node {
  constructor(data) {
    this.val = data;
    this.next = null;
  }
}

let head = new Node(1);
let second = new Node(1);

// O(1)
head.next = second;

// O(n) - Accessing the 5th element
// Unlike an Array, we cannot do list[5]. We must loop.
let current = head;
for (let i = 0; i < 5; i++) {
  current = current.next;
}
```

## When to use

When you need frequent Insert/Delete at start or in the in-between elements, when you don't know how many elements you will have.

## When to avoid

If you have a small dataset the overhead can be significant, the cognitive complexity is high here.

## Why do I need to know about this damn Linked List

In Haskell, the syntax `[1, 2, 3]` is essentially "syntactic sugar" for a singly linked list. Huh?!
React DOM uses LinkedList Abstract data structure to store Hooks in the React Fiber component. Huh?!

## Linked List in React

The function `mountWorkInProgressHook` is responsible for creating and appending a new hook to a centralized, per-component Linked List (stored on the Fiber node). Ii builds the horizontal list of all hooks used within a functional component (`useState`, `useEffect`, `useMemo`) during its initial "mount" phase.

````ts
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null, // "result" of the hook after all updates are processed.
    baseState: null, // state value used as the starting point when calculating the next state.
    baseQueue: null, // LinkedList of "Update" objects that were skipped during a previous render.
    queue: null, // handles the "dispatch" side of things. For example, when you call "setState(x)", React doesn't immediately change the state. It creates an "Update" object and appends it to this queue.
    next: null // LinkedList .next pointer to the next Hook in the sequence.
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }

  return workInProgressHook;
}

// Or here, with "useEffect" hook in particular
function pushEffect(tag, create, destroy, deps) {
  // This is the actual effect, that will be pushed to "memoizedState" of the "useEffect" hook
  var effect = {
    tag: tag, // bitwise mask, for example for "HasEffect | hookFlags" that is `1000 | 0001 = 1001`
    create: create, // this is the callback we paste into "useEffect"
    destroy: destroy, // // this is the cleanup callback we paste into "useEffect"
    deps: deps, // deps array
    // Circular
    next: null
  };
  var componentUpdateQueue = currentlyRenderingFiber$1.updateQueue;

  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber$1.updateQueue = componentUpdateQueue;
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    var lastEffect = componentUpdateQueue.lastEffect;

    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      var firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }

  return effect;
}

```

Source code: https://github.com/facebook/react/blob/1721e73e149d482a4421d4ea9f76d36a2c79ad02/packages/react-reconciler/src/ReactFiberHooks.js#L980
````
