# Programming paradigms

To simplify the topic we can say that we have 3 basic programming paradigms:

- Procedural
- Functional
- Object-oriented

Every of them has a very specific set of rules we need to follow. The problem is that in JS/TS language we typically have a mix of them, where things look like "functional" but they actually are "procedural".

This creates a false-positive feeling of "I use OOD" or "I use React functional component, I'm a master of Functional programming". Hell no.

Just in case, Assembly is the zero-paradigm language. It does not follow Procedural, Functional, or OOP rules—it only follows the rules of the CPU and RAM. it has no scope, it is unstructured.

## Classification

All goes into concepts of Imperative, Declarative approaches. Imperative code directly controls execution flow and state change, explicit statements that change a program state. Declarative code declares properties of the desired result, but not how to compute it, describes what computation should perform, without specifying detailed state changes.

An interesting part that Procedural and OOP are falling into Imperative type.

## Procedural paradigm

The first major procedural programming languages appeared in 1960s, including Fortran, ALGOL, COBOL, PL/I and BASIC.

**Languages:** C, Turbo Pascal, Fortran

**Characteristic:**

- Imperative programming.
- Top down approach. The code starts at the begin block and moves linearly through the logic until it hits end.
- The program is a sequence of instructions. Explicit State and Memory management.
- "GOTO" keyword historical legacy
- Low abstraction. Looks like a mess.

```pascal
function BinarySearch(const arr: array of Integer; target: Integer): Integer;
var
  L, R, Mid: Integer;
begin
  L := 0;
  R := High(arr);
  while L <= R do begin
    Mid := L + (R - L) div 2;
    if arr[Mid] = target then Exit(Mid);
    if arr[Mid] < target then L := Mid + 1 else R := Mid - 1;
  end;
  Result := -1;
end;
```

## Functional paradigm

This paradigm is technically older than procedural programming in theory (1930s Lambda Calculus), but became practical later.

**Languages:** Haskell, F#, Lisp

**Characteristic:**

- Math-heavy. Lambda Calculus based.
- Uses Monads, Functors, idempotence, strict immutability.
- Declarative Style. You describe what the result should be, rather than doing that operations imperatively.
- A lot of recursion, currying.
- Can be very memory heavy.

```haskell
binarySearch :: [Int] -> Int -> Int -> Int -> Int
binarySearch arr target low high
    | low > high = -1
    | arr !! mid == target = mid
    | arr !! mid < target  = binarySearch arr target (mid + 1) high
    | otherwise            = binarySearch arr target low (mid - 1)
    where mid = low + (high - low) `div` 2
```

## OOP paradigm

OOP became the most popular in the 1990s with Java popularity. Involves dividing a program implementation into objects that expose behavior (methods) and data (members) via a well-defined interface.

**Languages:** Java, C++, C#, JS, Python, Go, RnR

**Characteristic:**

- Encapsulation, Inheritance, Polymorphism.
- Uses Abstraction to model complex things, similar to real world objects
- Patterns, SOLID, other

```js
const binarySearch = (arr, target) => {
  let [low, high] = [0, arr.length - 1];

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const guess = arr[mid];

    if (guess === target) return mid;
    guess < target ? (low = mid + 1) : (high = mid - 1);
  }

  return -1;
};
```

## Why do we care?

It is easy to write a messy code that has procedural pure imperative business logic, being in an illusion of doing "real" React functional programming. Or to think that React v.15 class-based components are the real OOP. Or to write a class that will have a mess of SOLID principles, thinking that now you are the "real" programmer.

Since every of these paradigms has pros and cons, we need to be mindful and consciously write the code that is OOP, functional or procedural.

**What to read**:

- [https://en.wikipedia.org/wiki/Programming_paradigm](https://en.wikipedia.org/wiki/Programming_paradigm)
