# SOLID principles

SOLID is an acronym for 5 principles of Object Oriented Class Design intended to make source code more understandable, flexible, and maintainable. Software engineer and instructor Robert C. Martin introduced the basic principles of SOLID design in his 2000 paper "Design Principles and Design Patterns".

Be aware: SOLID is not a checklist of 5 independent rules - it is a single, interconnected philosophy.

Original article "Design Principles and Design Patterns" was focused on the idea of system design rot because of the following root causes: rigidity, fragility, immobility, and viscosity.

**Rigidity**. Rigidity is the tendency for software to be difficult to change, even in simple ways.

**Fragility**. Fragility is the tendency of the software to break in many places every time it is changed.

**Immobility**. Immobility is the inability to reuse software from other projects or from parts of the same project.

**Viscosity**. When the design preserving methods are harder to employ than the hacks, then the viscosity of the design is high. It is easy to do the wrong thing, but hard to do the right thing. Viscosity of environment comes about when the development environment is slow and inefficient.

## Why do we care?

Why do we care about this thing? "Is it relevant to JavaScript? I've heard that only guys from Java/.Net should follow this".

Well, if you want to build complex systems on any language you need to have a set of abstractions, principles that will allow you to have a separation of concerns, order, structure, scalability and maintainability.

## Principles are not the concrete implementations

Be aware that these are the principles that will tell you how to think, but will sometimes not tell you what to do.
I mean that the implementation can very from the language to language, from framework to framework.

It's like an idea "Be a good man". But it is not a set of instructions, it is an abstraction that forces you to think and make decisions in every specific case.

**Principles:**

- [Single responsibility principle](./1-SR/Single%20Responsibility%20principle.md)
- [Open–closed principle](./2-OC/Open–closed%20principle.md)
- [Liskov substitution principle]()
- [Interface segregation principle]()
- [Dependency inversion principle](./5-DI/1-Dependency%20inversion%20principle.md)

## To read:

- Design Principles and Design Patterns by Robert C. Martin - about SOLID principles, the original source
