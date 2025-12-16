# Dependency inversion principle (soliD)

The principle follows the idea of **loosely coupled modules** and tells:

- High-level modules should not import anything from low-level modules. Both should depend on abstractions (interfaces).
- Abstractions should not depend on details. Details (Concrete implementations) should depend on abstractions.

It is a part of OOP paradigm. It is a principle, not the concrete implementation.

It means that all classes should rely on interfaces of other classes. We created 2 classes and interfaces,
we expose these instances through constructors, methods, and we operate on top of them.

## Dependency injection

It is an implementation of Dependency inversion. We conenct 2 classes via interfaces, not concrete implemenations, passing the instance, not the class itself.

### Types of dependency injections

There are a couple of ways in which a client can receive injected services:

- Constructor injection, where dependencies are provided through a client's class constructor.
- Method Injection, where dependencies are provided to a method only when required for specific functionality.

#### Constructor injection

Instead of:

```typescript
class Logger implements ILogger {
  private data: Map<any>;

  constructor() {
    this.data = new Map();
  }
}

class Cart implements ICart {
  private logger: ILogger;

  constructor() {
    // We create a tight coupling here by adding a concrete class, BAD!
    this.logger = new Logger();
  }
}

const cart = new Cart();
```

Dependency injection is about:

```typescript
class Logger implements ILogger {
  private data: Map<any>;

  constructor() {
    this.data = new Map();
  }
}

class Cart implements ICart {
  private logger: ILogger;

  // Constructor Injection DI, we pass an Interface here
  constructor(logger: ILogger) {
    this.logger = logger;
  }
}

const logger = new Logger();
const cart = new Cart(logger);
```

Class `Logger` implements `ILogger` interface (abstraction) that is used in the `Cart` class and `Cart` doesn't own the `Logger` directly, it knows about it by interface, instead of direct include.

It is called "inversion" since it is contrary to direct include of one class by another.

#### Method Injection

Or we can pass the depenency into the method:

```typescript
class Cart {
  private products: Product[];

  public sendSMSNotification(service: SMSService) {
    if (!service) {
      throw new Error("Service must not be null");
    }

    service.send(this.products);
  }
}

const smsService = new SMSService();
const cart = new Cart();

cart.sendSMSNotification(smsService);
```

