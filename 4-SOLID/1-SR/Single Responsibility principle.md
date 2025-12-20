# Single Responsibility principle

It states "A module should be responsible to one, and only one, actor.".

Robert C. Martin expresses the principle as, "A class should have only one reason to change" and adds another explanation as "Gather together the things that change for the same reasons. Separate those things that change for different reasons".

The problem is JavaScript as a language has no defined implementation of the Single Responsibility Principle at the language or framework level and it it easy to mess with it.

## Naming conventions and reasoning

In this principle there is a explicitly defined role of an "Actor" and "Module". It means we can use modules (files) as separation containers, and we can group the business logic of this module according to a clearly isolated class/function Role and purpose.

This is connected to the Object-Oriented Programming paradigm of Modeling and Abstractions. We should be able to model the class/function as if it was a part of real world.

## Be the Actor

A helpful technique is to put yourself in the place of that class/function that you want to create. Imagine as if you were this class/function.

Think about the following. If I were this class/function:

- What is my purpose? What is my Role? Do i look like some OOD Pattern?
- What responsibilities do I have? What Actions I do?
- What dependencies I need?
- What top-level layer I belong to?

These answers will help you with the implementation of Single Responsibility principle.

## Implementation

This principle has no defined implementation, so for implementation we can consider the following set of examples.
Let's pick E-commerce notification service as an example.

## Bad Single Responsibility

```javascript
// Violation: One file and class, multiple actors/reasons to change.
class NotificationService {
  // Looks like an Actor
  sendEmail(emailAddress, content) {}

  // What if I change SMS SDK??? It means this change will affect Email SDK
  sendSms(phoneNumber, content) {}

  // Some extra logic not connected to email or SMS entities???
  saveToAuditLog(message) {}
}
```

## Good Single Responsibility

```javascript
// Dedicated file and service for Email logic
class EmailService {
  send(emailAddress, content) {}
}

// Dedicated file and service for SMS logic
class SmsService {
  send(phoneNumber, content) {}
}

// Orchestrator, separated file
class NotificationProvider {
  constructor(emailService, smsService) {
    this.email = emailService;
    this.sms = smsService;
  }

  // Send notifications
  notifyUser(user, message) {
    if (user.pref === "EMAIL") this.email.send(user.email, message);
    if (user.pref === "SMS") this.sms.send(user.phone, message);
  }
}
```

In the first example `NotificationService` is a pile of entities, while the second example is a separate files/classes that are orchestrated by another entity.

If we follow the idea of being this class, if I were the Notification class:

- **What is my purpose? What is my Role?** - I'm the service that rules all notifications can be sent to the Customer of e-commerce store. I receive Customer data from top level, I have some information about the preferred channels that this Customer expects (SMS, EMAIL, PUSH, other?), I know what content to send. (hmm, should I be aware of the Order lifecycle, or it should be the part of other service?). I likely function as a Facade pattern, where I hide all busines logic from the outer classes.

- **What responsibilities I have? What Actions I do?** - I own all preferred channels, but I use them as dependencies, and I don't need to know about their implementations, since they can change. I can send one or many kinds of notifications, and I need to store information about sent notifications as well. So I'm like a Dispatcher, that receives a command to send notification to this Customer, via defined channels (probably it is a part of Customer object, as a "preferredChannels" property).

- **What dependencies I need?** - I need to have SMS, EMAIL, PUSH services as a DIs, with same API via Interfaces, where every of them will have same "shape", like `.send()`, other methods. I need to store the incoming, sent, failed notifications into the DB table.

- **What top-level layer I belong to?** - Hmm, this needs some investigation.

