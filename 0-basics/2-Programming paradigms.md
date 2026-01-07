# Programming paradigms

To simplify the topic we can say that we have 3 basic programming paradigms:

- Procedural
- Functional
- Object-oriented

Every of them has a very specific set of rules we need to follow. The problem is that in JS/TS language we typically have a mix of them, where things look like "functional" but they actually are "procedural".

This creates a false-positive feeling of "I use OOD" or "I use React functional component, I'm a master of Functional programming". Hell no.

Just in case, Assembly is kind of "zero-paradigm" language. It does not follow Procedural, Functional, or OOP rules—it only follows the rules of the CPU and RAM.

## Classification

All falls into 2 basic concepts: `Imperative` and `Declarative`.

Imperative code directly controls execution flow and state change, explicit statements that change a program state. Declarative code declares properties of the desired result, but not how to compute it, describes what computation should perform, without specifying detailed state changes.

Note: Procedural and OOP both are about Imperative programming.

## Procedural paradigm

The first major procedural programming languages appeared in 1960s, including Fortran, ALGOL, COBOL, PL/I and BASIC.

**Languages:** C, Turbo Pascal, Fortran.

**Characteristic:**

- Top down approach. The code starts at the `begin` block and moves linearly through the logic until it hits `end.`
- The program is a sequence of instructions. Explicit State and Memory management.
- "GOTO" keyword historical legacy.
- Low abstraction.

```pascal
function BinarySearch(const arr: array of Integer; target: Integer): Integer;
var
  L, R, Mid: Integer;
begin
  L := 0;
  R := High(arr);

  while L <= R do
  begin
    Mid := L + (R - L) div 2;
    if arr[Mid] = target then Exit(Mid);

    if arr[Mid] < target then
      L := Mid + 1
    else
      R := Mid - 1;
  end;

  Result := -1;
end;

// Main part of the program
var
  testArray: array[0..4] of Integer = (10, 20, 30, 40, 50);
  foundIndex: Integer;
begin
  foundIndex := BinarySearch(testArray, 30);
  WriteLn('Found: ', foundIndex);
end.
```

## Functional paradigm

This paradigm is technically older than procedural programming in theory (1930s Lambda Calculus), but became practical later.

**Languages:** Haskell, F#, Lisp.

**Characteristic:**

- Math-heavy. Lambda Calculus based.
- Uses Monads, Functors, idempotence, strict immutability.
- Declarative Style. You describe what the result should be, rather than doing that operations imperatively.
- A lot of recursion, currying.
- Can be very memory heavy.

```haskell
-- Helper function that is a nested 4 curried functions
helper :: [Int] -> Int -> Int -> Int -> Int

-- Helper function, where every argument is a function that takes 1 argument and returns a function
helper arr target l r
-- Math comprehensions
    | l > r = -1
    | arr !! mid == target = mid
    | arr !! mid < target  = helper arr target (mid + 1) r
    | otherwise            = helper arr target l (mid - 1)
    where mid = l + (r - l) `div` 2

binarySearch :: [Int] -> Int -> Int

binarySearch arr target = helper arr target 0 (length arr - 1)

-- Main part of the program
main :: IO ()
main = putStrLn ("Found: " ++ show (binarySearch [10, 20, 30, 40, 50] 30))
```

There is no `Exit` or `return`. A Math function is an expression that evaluates to a single value. You cannot "stop half-way" because there is no sequence of steps to stop—there is only a mathematical mapping from input (domain) to output (range).

## OOP paradigm

OOP became the most popular in the 1990s with Java popularity. Involves dividing a program implementation into objects that expose methods and properties via an interface.

**Languages:** Java, C++, C#, JS, Python, Go, RnR.

**Characteristic:**

- Encapsulation, Inheritance, Polymorphism.
- Uses Abstraction to model complex things, similar to real world objects
- Patterns, SOLID, other

```typescript
interface BinarySearch {
  find(data: number[], targed: number): number;
}

class BinarySearch implements BinarySearch {
  find(data: number[], targed: number): number {
    let [l, r] = [0, arr.length - 1];

    while (l <= r) {
      const mid = Math.floor(l + (r - l) / 2);

      if (arr[mid] === target) return mid;

      if (arr[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    return -1;
  }
}

const binarySearch = new BinarySearch();

console.log("Found:", binarySearch.find([10, 20, 30, 40, 50], 30));
```

## Why do we care?

It is easy to write a messy code that has procedural pure imperative business logic, being in an illusion of doing "real" React functional programming. Or to think that React v.15 class-based components are the real OOP. Or to write a class that will have a mess of SOLID principles, thinking that now you are the "real" programmer.

Since every of these paradigms has pros and cons, we need to be mindful and consciously write the code that is OOP, functional or procedural.

**What to read**:

- [https://en.wikipedia.org/wiki/Programming_paradigm](https://en.wikipedia.org/wiki/Programming_paradigm)
- [https://en.wikipedia.org/wiki/Determinism](https://en.wikipedia.org/wiki/Determinisma)
- [https://en.wikipedia.org/wiki/Idempotence](https://en.wikipedia.org/wiki/Idempotence)
- [https://en.wikipedia.org/wiki/Immutable_object](https://en.wikipedia.org/wiki/Immutable_object)
- Felienne H. - The Programmer's Brain. What every programmer needs to know about cognition - 2021