# Observer pattern

[<img src="./images/observer-design-Pattern.webp" width="650"/>](./images/observer-design-Pattern.webp)

In software design and software engineering, the observer pattern is a software design pattern in which an object, called the **Subject** (also known as event source or event stream), maintains a list of its dependents, called **Observers** (also known as event sinks), and automatically notifies them of any state changes, typically by calling one of their methods. (c) Wikipedia

## Problem definition

In one place or many places in the application we need to be aware about a system event or an application state change. We'd like to have a standard way of subscribing to listening for system events and a standard way of notifying the interested parties. The notification should be automated after an interested party subscribed to the system event or application state change. There should be a way to unsubscribe, too. (c) Wikipedia

## Nuances:

1. A one-to-many dependency, one Subject can have may Observers.
2. Subject entity has internal State that describes changes and transitions.
3. When the Subject changes state, all registered Observers are notified and updated automatically.
4. Tightly coupled, Subject owns and knows about Observers.

