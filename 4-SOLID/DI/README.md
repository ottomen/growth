# Dependency inversion principle (soliD)

The principle follows the idea of **loosely coupled modules** and tells:

- High-level modules should not import anything from low-level modules. Both should depend on abstractions (interfaces).
- Abstractions should not depend on details. Details (Concrete implementations) should depend on abstractions.

It is a part of OOP paradigm. It is a principle, not the concrete implementation.

It means that all classes should rely on interfaces of other classes. We created 2 classes and interfaces,
we expose these instances through constructors, methods, and we operate on top of them.

## Dependency injection

It is an implementation of Dependency inversion. We connect 2 classes via interfaces, not concrete implementations, passing the instance, not the class itself.

### Types of dependency injections

There are a couple of ways in which a client can receive injected services:

- Constructor injection, where dependencies are provided through a client's class constructor.
- Method Injection, where dependencies are provided to a method only when required for specific functionality.

There are several approaches here: Vanilla implementation with Constructor injection/Method Injection, framework annotation-based or framework configuration-based DI.

Variations:

- [Vanilla JS](./VanillaJS.md)
- [Spring Boot](./SpringBoot-IoC.md)
- [.Net](./C#-IoC.md)
- [Angular](./Angular.md)
- [Awilix JS](./Awilix.md)

