# Big O

Big O notation is a mathematical asymptotical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.

The letter O stand for Ordnung, meaning the order of approximation. The letter O is used because the growth rate of a function is also referred to as the order of the function.

### Formula

$${f(x)} \in O(g(x)) \ where \ {x \to \infty}$$

### Growth functions g(x) classification

| Big O Notation |    Name     | Example Operations                               |
| -------------- | ----------- | ------------------------------------------------ |
| O(1)           |  Constant   | Array access, hash table lookup                  |
| O(log n)       | Logarithmic | Binary search, balanced tree operations          |
| O(n)           |   Linear    | Linear search, single loop                       |
| O(n²)          |  Quadratic  | Bubble sort, nested loops                        |
| O(n³)          |    Cubic    | Triple nested loops, naive matrix multiplication |
| O(n^k)         | Polynomial  | k nested loops                                   |
| O(2^n)         | Exponential | Recursive Fibonacci, subset generation           |
| O(n!)          |  Factorial  | Permutations                                     |

### Chart

[<img src="./images/Comparison_computational_complexity.svg.png" width="550"/>](./images/Comparison_computational_complexity.svg.png)

### Data structures

- [Array](./Array.md)
- [Stack](./Stack.md)
- [Queue](./Queue.md)
- [HashMap](./HashMap.md)
- [LinkedList](./LinkedList.md)
- [Binary Search Tree](./BinarySearchTree.md)
- [Matrix](./Matrix.md)
- [Graph](./Graph.md)

