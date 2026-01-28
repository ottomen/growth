# HashMap (dictionary)

[<img src="./images/part8.2-hashmap.png" width="450"/>](./images/part8.2-hashmap.png)

This is second most common data structure after an Array. It can be in the form of plain object `{}` or as a `new Map()` or `new Set()` instance.

Be aware that all in JavaScript is a high-level abstraction over C++ low-level implementation, and while the write operation to the `Map` looks simple, the underlying layer of C++ is handling collisions and doing a lot of things there. The key (a string or object) goes through a Hash Function which turns it into an integer (index). The engine then looks up that index in a contiguous memory block.

## Big O and operations

| Create | Read        | Update      | Delete      | Find        |
| ------ | ----------- | ----------- | ----------- | ----------- |
| O(1)   | O(1) by key | O(1) by key | O(1) by key | O(1) by key |

## Possible operations and cost

```javascript
const map = new Map();

// O(1)
map.set("key1", "value1");
console.log(map.get("key1"));
map.set("key1", "newValue");
map.has("key1");
map.delete("key1");
console.log(map.has("key1"));
```

## When to use

If you need to have search by key or value, or you need to have some unique elements (`Set`). Plain Object `{}` is best for small, static records and keys can only be `Strings` or `Symbols`. The `new Map()` is best for frequent additions/removals and large datasets and keys can be any type (`objects`, `functions`, etc.). It is optimized specifically for the "Dictionary" use case. With `Set` the primary difference is that while a `Map` stores key-value pairs, a `Set` only stores keys.

## When to avoid

When you need to retain the order of elements (yes, Map object actually does retain insertion order, but still), or when you have a very small, fixed set of data where the "overhead" of the Hash Function is more expensive than a simple Array scan, ow when you have to search by value (`O(N)`).
