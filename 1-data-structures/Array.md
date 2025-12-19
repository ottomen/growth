# Array

```javascript
const arr = [1, 2, 3, 4];
arr.push(5);
console.log(arr[2]);
arr[1] = 10;
arr.shift();
arr.pop();
arr.splice(0, 1);
console.log(arr.find((item) => item === 10));
```

| Create | Read          | Update        | Delete | Find |
| ------ | ------------- | ------------- | ------ | ---- |
| O(1)   | O(1) by index | O(1) by index | O(n)   | O(n) |