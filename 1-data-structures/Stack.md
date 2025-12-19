# Stack (LIFO)

[<img src="./images/Lifo_stack.svg" width="450"/>](./images/Lifo_stack.svg)

LIFO is an abbreviation for last in, first out.

```javascript
const stack = [];
stack.push(1);
console.log(stack[stack.length - 1]);
stack[stack.length - 1] = 5;
stack.pop();
```

| Create | Read          | Update        | Delete   | Find |
| ------ | ------------- | ------------- | -------- | ---- |
| O(1)   | O(1) peek top | O(1) top only | O(1) pop | O(n) |
