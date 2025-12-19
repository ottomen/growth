# Vanilla Constructor injection

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

Dependency injection is about this:

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

# Method Injection

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

