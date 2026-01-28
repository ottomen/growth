# Big O notation

Big O notation is a mathematical [Asymptotic Notation](https://learnxinyminutes.com/asymptotic-notation/) that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It is the mathematical upper bound.

Historically, the letter "O" stand for "Ordnung" and means the [order of approximation](https://en.wikipedia.org/wiki/Order_of_approximation), that is formal or informal expressions for how accurate an approximation is.

**Why do we care?**

Big O relates to a concept of algorithm, efficiency and performance.

Does your algorithm suddenly become incredibly slow when the input size grows? Does it maintain its quick run time as the input size increases?

We are here NOT to solve specific problems or to develop a specific solutions - we are here to develop generalized solutions that should be scalable and efficient with any meaningful given input.

### Growth functions chart

[<img src="./images/Comparison_computational_complexity.svg.png" width="550"/>](./images/Comparison_computational_complexity.svg.png)

This chart shows the good visual example of a difference between very efficient `O(log N)` and linear `O(N)`.
With the small input of `10` the difference is not significant, but the more input growth the more of a problem it will be.

### Benchmark functions types

| Big O Notation | Type        | Example of possible operations                   |
| -------------- | ----------- | ------------------------------------------------ |
| O(1)           | Constant    | Array element access, hash table element lookup  |
| O(log N)       | Logarithmic | Binary search                                    |
| O(N)           | Linear      | Linear search, single loop                       |
| O(N²)          | Quadratic   | Bubble sort, nested loops                        |
| O(N³)          | Cubic       | Triple nested loops, naive matrix multiplication |
| O(N^K)         | Polynomial  | k nested loops                                   |
| O(2^N)         | Exponential | Recursive Fibonacci, subset generation           |
| O(N!)          | Factorial   | Permutations                                     |

### Data structures and Big O notation

Every data structure you use defines the baseline or limit of Big O in a different way, and according to the specific type of operation you are doing: read, write, delete, find, etc.

You need to know about these nuances, as well as about all possible variations of data structures you can use. This is the foundation of the code you create, and this code can be very efficient or very ineffective.

Besides well-known Data Structures such as primitive values: `string`, `number`, `array`, `object` and other there are specific ata structures called Abstract Data types (Queue or Stack, for example).
While `Array` is the part of JS language, the `Stack` is not, and you need to implement it on your own.

### Calculating the Big O complexity

We all know from LeetCode that there are 2 complexities: **Space** and **Time**.

**Space complexity** means that we can approximately calculate the size of the memory our algorithm will occupy. With the modern computing power sometimes if is secondary, but on a big scale the bloated Heap will give your V8 Garbage Collector hard times and will decrease the performance.

**Time complexity** means that we can approximately calculate how much time our algorithm will take.

1. We alsways are looking for a worst-case scenario. Imagine we have an array `[1,2,3,4,5]` and we need to find is there any `1` in it. We should expect that this element is the last one, and this will be the Time complexity. We don't care about happy path here, we need to know the "unhappy path".

2. We don't care about scalars like `O(2*N)` because in the Asymptotic Notation we look into the Infinity limit where the difference between `O(2*N)` and `O(N)` is not important, but difference between `O(N)` and `O(N²)` is important.

It is considered a good practice to know what is Big O of your function, in Space and Time both. It is a skill you can learn by a little bit of practice of calculating Big O, every day.

**Data structures we can use:**

- [Array](./Array.md)
- [Stack](./Stack.md)
- [Queue](./Queue.md)
- [HashMap](./HashMap.md)
- [LinkedList](./LinkedList.md)
- [Binary Search Tree](./BinarySearchTree.md)
- [Matrix](./Matrix.md)
- [Graph](./Graph.md)

## To read:

- A Common-Sense Guide to Data Structures and Algorithms by Jay Wengrow - easy to read, covers all basics.
