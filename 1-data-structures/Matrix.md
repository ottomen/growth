# Matrix

A matrix is a collection of elements organized in rows and columns.

Basically it is an "Array of Arrays." In memory, it represents a grid or a coordinate system, making it the fundamental structure for linear algebra, image processing, and spatial data.

Interesting fact: In NumPy, there is no fundamental difference between a Matrix and a Tensor; everything is an `ndarray` (N-dimensional array). And while in JavaScript matrices usage is somewhat simplified, NumPy has an intense C++ vectorization mechanisms to provide efficient calculations.

## Big O and operations

| Create | Read          | Update        | Delete | Find   |
| ------ | ------------- | ------------- | ------ | ------ |
| O(1)   | O(1) by index | O(1) by index | O(1)   | O(n×m) |

## Possible operations and cost

```javascript
// Representing a 3x3 Grid
const matrix = [
  [1, 2, 3], // Row 0
  [4, 5, 6], // Row 1
  [7, 8, 9], // Row 2
];

// O(1) - Accessing row 1, column 2 (value: 6)
console.log(matrix[1][2]);

// O(1) - Update
matrix[1][2] = 10;

// O(N * M) - Searching for the value
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === 7) return [i, j];
  }
}
```

## When to use

Coordinate Systems with mapping 2D space (Games, Maps, Seating charts), mathematical modeling with representing systems of linear equations or performing transformations (Rotation, Scaling), Image Processing where an image is systematically a matrix of pixels where each cell contains color data (RGBA).

## When to avoid

If you don't need multi-dimensional arrays.

