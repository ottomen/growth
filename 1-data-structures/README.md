# Big O notation

Big O notation is a mathematical [Asymptotic Notation](https://learnxinyminutes.com/asymptotic-notation/) (grows to infinity) that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It is the mathematical upper bound.

Historically, the letter "O" stand for "Ordnung" and means the [order of approximation](https://en.wikipedia.org/wiki/Order_of_approximation). The letter O is used because the growth rate of a function is also referred to as the order of the function.

Why do we care?

Does your algorithm suddenly become incredibly slow when the input size grows? Does it maintain its quick run time as the input size increases?

We are here not to solve specific problems or to develop a specific solutions - we are here to develop systematic generalized solutions that should be scalable and efficient with any given input.

### Big O formula

$$|f(x)| \leq M \cdot |g(x)| \text{ for all } x \geq x_0$$

where:

- `f(x)` is our code we created, returns the exact number of operations
- `g(x)` is an arbitrary time complexity, simplified "benchmark" function
- `M` is a scalar value that acts as a compensation for hardware, compilers, and fixed overhead
- `x` is the input size
- $x \geq x_0$ is the idea of $x \to \infty$ and is about "think big"

### Benchmark functions `g(x)` types

| Big O Notation | Type        | Example of possible operations                   |
| -------------- | ----------- | ------------------------------------------------ |
| O(1)           | Constant    | Array element access, hash table element lookup  |
| O(log n)       | Logarithmic | Binary search                                    |
| O(n log n)     | Logarithmic | Quick Sort                                       |
| O(n)           | Linear      | Linear search, single loop                       |
| O(n²)          | Quadratic   | Bubble sort, nested loops                        |
| O(n³)          | Cubic       | Triple nested loops, naive matrix multiplication |
| O(n^k)         | Polynomial  | k nested loops                                   |
| O(2^n)         | Exponential | Recursive Fibonacci, subset generation           |
| O(n!)          | Factorial   | Permutations                                     |

### Growth functions chart

<p style="text-align: center"><img src="./images/Comparison_computational_complexity.svg.png" width="550" alt=""/></p>

This chart shows the good visual example of a difference between very efficient `O(log n)` and linear `O(n)`. With the small input of `10` the difference is kind of fine, but the more input growth the more of a problem it becomes.

### Data structures and Big O notation

Every data structure you use defines the baseline or limit of Big O in a different way, and according to the specific type of operation you are doing: read, write, delete, find, etc.

You need to know about these nuances, as well as about all possible variations of data structures you can use. This is the foundation of the code you create, and this code can be very efficient or very ineffective.

Besides well-known data structures such as primitive values: `string`, `number`, `array`, `object` and other there are specific data structures that can or can not be a part of a given programming language and you need to import them from some library or construct it on your own.
While `Array` is the part of JS language, the `Stack` is not, and you need to implement it on your own.

**Data structures:**

- [Array](./Array.md)
- [Stack](./Stack.md)
- [Queue](./Queue.md)
- [HashMap](./HashMap.md)
- [LinkedList](./LinkedList.md)
- [Binary Search Tree](./BinarySearchTree.md)
- [Matrix](./Matrix.md)
- [Graph](./Graph.md)

