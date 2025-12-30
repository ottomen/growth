# Array / List

Most common data structure you can imagine. Most popular.

You need to know the difference between concept of an Array as an Abstract Data Type, Array as an object in memory, and JavaScript Array that is a high-level abstraction provided by C++ underlying low-level implementation.

- **Array as an object in memory**. This is the "Lower-Level" implementation (like in C or C++). It explains how the memory is actually used.
- **Array as an Abstract Data Type**. This is the mathematical definition. It defines what an array does, not how its built.
- **JavaScript Array**. This is the object that is provided by engines like V8 engine. It hides the physical constraints of memory from us.

Here we are talking about **JavaScript Array**.

In a standard dynamic array, elements are stored in a contiguous block of memory. When you insert at the beginning (index 0), every existing element must be shifted one position to the right to make room.

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

// O(n) Boom!
arr.shift();
arr.unshift();
arr.splice(0, 1);
console.log(arr.find((item) => item === 10));
console.log(arr.filter((item) => item !== 10));
console.log(arr.some((item) => item === 10));
```

## When to use

When you need an Iteration protocol, when you have homogenized data, when you have a need LIFO operations, search by index or you need to retain a specific order.

## When to avoid

When you want filtering, search by value, shift/unshift operation, FIFO, massive datasets. Hashmaps or other data structures might be better.

