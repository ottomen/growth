# HashMap (dictionary)

[<img src="./images/part8.2-hashmap.png" width="450"/>](./images/part8.2-hashmap.png)

```javascript
const map = new Map();
map.set("key1", "value1");
console.log(map.get("key1"));
map.set("key1", "newValue");
map.delete("key1");
console.log(map.has("key1"));
```

| Create       | Read         | Update       | Delete       | Find         |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| O(1) average | O(1) average | O(1) average | O(1) average | O(1) average |
