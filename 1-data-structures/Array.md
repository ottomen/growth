# Array

Most common data structure you can imagine. Most popular.

You need to know the difference between concept of an Array as an Abstract Data Type (a fixed block of memory) and JavaScript Array that is a high-level abstraction provided by C++ underlying low-level implementation.

## Big O and operations

| Push | Read          | Update        | Delete | Find |
| ---- | ------------- | ------------- | ------ | ---- |
| O(1) | O(1) by index | O(1) by index | O(n)   | O(n) |

## Possible operations and cost

```javascript
const arr = [1, 2, 3, 4];

// O(1)
arr.push(5);
console.log(arr[2]);
arr[1] = 10;
arr.pop();

// O(n)
arr.shift();
arr.unshift();
arr.splice(0, 1);
console.log(arr.find((item) => item === 10));
console.log(arr.filter((item) => item !== 10));
console.log(arr.some((item) => item === 10));
```

## When to use

When you need an Iteration protocol, when you have homogenized data, when you have a need LIFO, FIFO operations, and you don't care about finding, filtering the items too much.

## When to avoid

When you want filtering, search, shift/unshift operation, massive datasets.

