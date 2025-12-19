# Matrix

```javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

matrix[0][0] = 1;
console.log(matrix[1][2]);
matrix[1][2] = 10;
matrix[0][0] = null;
```

| Create | Read          | Update        | Delete | Find   |
| ------ | ------------- | ------------- | ------ | ------ |
| O(1)   | O(1) by index | O(1) by index | O(1)   | O(n×m) |

