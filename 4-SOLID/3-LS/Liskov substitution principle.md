# Liskov substitution principle

"Subclasses should be substitutable for their base classes.".

It is based on the concept of "substitutability" - a principle in object-oriented programming stating that an object (such as a class) may be replaced by a sub-object (such as a class that extends the first class) without breaking the program.
If `S` is a subtype of `T`, then objects of type `T` in a program may be replaced with objects of type `S` without altering any of the desirable properties of that program.

## Origins

The Liskov substitution principle (LSP) is a particular definition of a subtyping relation, called strong behavioral subtyping, that was initially introduced by Barbara Liskov in a 1987 conference keynote address titled Data abstraction and hierarchy.

## Implementation of Liskov substitution principle

Classic violation of Liskov substitution:

```typescript
// It is hard to pick a name for a rectangular/squared figure, so we can use separate interfaces
interface IArea {
  getArea(): number;
}

interface IResizable {
  width: number;
  height: number;
  setWidth(w: number): void;
  setHeight(h: number): void;
}

class Rectangle implements IArea, IResizable {
  width: number = 0;
  height: number = 0;

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

// We are extending Rectangle with Square that basically not the Rectangle, but the Square
class Square extends Rectangle implements IArea, IResizable {
  // Violation: To maintain "squareness," we must modify both properties and this breaks subtype relations
  override setWidth(width: number) {
    this.width = width;
    this.height = width;
  }

  override setHeight(height: number) {
    this.width = height;
    this.height = height;
  }
}
```

Optimized Liskov substitution solution:

```typescript
interface IArea {
  getArea(): number;
}

interface IRectangle extends IArea {
  getWidth(): number;
  getHeight(): number;
  setWidth(width: number): void;
  setHeight(height: number): void;
}

interface ISquare extends IArea {
  getSide(): number;
  setSide(side: number): void;
}

class Rectangle implements IRectangle {
  constructor(private width: number, private height: number) {}

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

// Square implementation, not extended from Rectangle
class Square implements ISquare {
  constructor(private side: number) {}

  getSide() {
    return this.side;
  }

  setSide(side: number): void {
    this.side = side;
  }

  getArea() {
    return this.side * this.side;
  }
}
```

The solution is to eliminate the incorrect inheritance and to create a better one.
