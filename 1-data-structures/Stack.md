# Stack (LIFO) Abstract Data Type

[<img src="./images/Lifo_stack.svg" width="450"/>](./images/Lifo_stack.svg)

LIFO is an abbreviation for last in, first out. It can be visualized as a pile of plates, where you put a new plate on top of another, and you remove plates only from the top as well. You can't pull the bottom plate first.

It is an Abstract Data Type, and it means it exists on the level on concept and a concrete implementation, not on the level of JavaScript data structure.

## Big O and operations

| Create | Read          | Update        | Delete   | Find |
| ------ | ------------- | ------------- | -------- | ---- |
| O(1)   | O(1) peek top | O(1) top only | O(1) pop | O(N) |

## Possible operations and cost

```javascript
const stack = [];

// O(1)
stack.push(1);
stack.pop();

// O(1)
stack[stack.length - 1]; // get the top one element

// O(N)
stack.find(({ id }) => id === someId);
```

## When to use

If you need to retain LIFO order of adding and removing items. For example it might be a History pattern, the Memo pattern, [Monotonic Stack](https://www.geeksforgeeks.org/dsa/introduction-to-monotonic-stack-2/]).

## When to avoid

If you need FIFO operations (use a Queue instead), search by value.
