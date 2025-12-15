# Dependency inversion (soliD)

The principle states:

- High-level modules should not import anything from low-level modules. Both should depend on abstractions (interfaces).
- Abstractions should not depend on details. Details (Concrete implementations) should depend on abstractions.

It is a part of OOP paradigm. It is a principle, not the concrete implementation.

It means that all classes should rely on interfaces of other classes. We created 2 classes and interfaces,
we expose these instances through constructors, methods, and we operate on top of them.

## Dependency injection

It is an implementation of Dependency inversion.

Dependency Injection is a software design technique in which the creation and binding of dependencies are done outside of the dependent class.
Dependency injection aims to separate the concerns of constructing objects and using them, leading to **loosely coupled** programs.

### Types of dependency injections

There are a couple of ways in which a client can receive injected services:

- Constructor injection, where dependencies are provided through a client's class constructor.
- Method Injection, where dependencies are provided to a method only when required for specific functionality.

#### Constructor injection

Instead of:

```typescript
class User implements IUser {
  private firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}

class Cart implements ICart {
  private user: IUser;

  constructor() {
    // We create a tight coupling here, BAD!
    this.user = new User("John");
  }
}
```

DI is about:

```typescript
class User implements IUser {
  private firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}

class Cart implements ICart {
  private user: IUser;

  // Constructor Injection DI, we pass an Interface here
  constructor(user: IUser) {
    this.user = user;
  }
}

const user = new User("John");
const cart = new Cart(user);
```

#### Method Injection:

```typescript
class Cart {
  private products: Product[];

  public sendSMSNotification(service: SMSService) {
    if (!service) {
      throw new Error("Service must not be null");
    }

    // Command pattern
    service.execute(this.products);
  }
}

const smsService = new SMSService();
const cart = new Cart();

cart.sendSMSNotification(smsService);
```

## DI in Angular

A dependency is any object, value, function or service that a class needs to work but does not create itself. In other words, it creates a relationship between different parts of your application since it wouldn't work without the dependency.

There are two ways that code interacts with any dependency injection system:

- Code can provide, or make available, values.
- Code can inject, or ask for, those values as dependencies.

```typescript
import { Injectable } from "@angular/core";

// @Injectable decorator
@Injectable({ providedIn: "root" })
export class AnalyticsLogger {
  trackEvent(category: string, value: string) {
    console.log("Analytics event logged:", {
      category,
      value,
      timestamp: new Date().toISOString(),
    });
  }
}
```

and use case:

```typescript
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AnalyticsLogger } from "./analytics-logger";

// @Component decorator
@Component({
  selector: "app-navbar",
  template: ` <a href="#" (click)="navigateToDetail($event)">Detail Page</a> `,
})
export class NavbarComponent {
  private router = inject(Router);
  private analytics = inject(AnalyticsLogger);

  navigateToDetail(event: Event) {
    event.preventDefault();
    this.analytics.trackEvent("navigation", "/details");
    this.router.navigate(["/details"]);
  }
}
```

Link: https://angular.dev/guide/di

## Inversion of Control (IoC)

In contrast with traditional programming, in which our custom code makes calls to a library, IoC enables a framework to take control of the flow of a program and make calls to our custom code.

Framework is doing the binding and instantiation of dependencies. Instead of the application having to create and use services, it is the framework that determines the moment when the instantiation is needed, using a pre-set configuration that instructs it on how to execute these tasks.

Java Spring Boot with Configuration annotation:

```java
@Configuration
public class AppConfig {
    @Bean
    public Store store() {
        return new Store(item1());
    }
}
```

and Bean annotation:

```java
@Bean
public Store store() {
    Store store = new Store();
    store.setItem(item1());
    return store;
}
```

Link: https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring

