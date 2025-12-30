# Dependency inversion principle (soliD)

> "Depend upon Abstractions. Do not depend upon concretions."

It is a principle as well, not the some implementation. It is related to IoC but is more focused on dependencies area.

It follows the idea of **loosely coupled modules** and it tells:

- High-level modules should not import anything from low-level modules. Both should depend on abstractions (interfaces). It means to avoid direct import but use arguments.
- Abstractions should not depend on details. Details (Concrete implementations) should depend on abstractions. It means using Interfaces, not concrete implementations.

## Origins (Inversion of Control)

It is coming from 1990s and was further popularized in 2004 by Robert C. Martin.

Inversion of Control is a top-level design principle that states that the flow of control or the creation of dependent objects should be delegated to a framework or external entity, rather than being managed directly by the module itself.

## Implementation: Dependency injection

This is an implementation of Dependency inversion. It says what the code should look like.

### Types of "vanilla" dependency injections

There are a several of ways in which a client can receive injected services:

- Constructor injection, where dependencies are provided through a client's class constructor.
- Method Injection, where dependencies are provided to a method only when required for specific functionality.

### Framework-based dependency injections

In addition to "vanilla" Constructor injection and Method Injection there is a framework-level annotation-based decorators or framework configuration-based dependency injection as well.

Variations:

- [Vanilla JS](./VanillaJS.md)
- [Angular](./Angular.md)
- [Awilix JS](./Awilix.md)
- [Spring Boot](./SpringBoot-IoC.md)
- [.Net](./Net-IoC.md)
