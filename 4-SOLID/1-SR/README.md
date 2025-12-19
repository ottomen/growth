# Single Responsibility principle

It states "A module should be responsible to one, and only one, actor.".

Robert C. Martin expresses the principle as, "A class should have only one reason to change" and adds another explanation as "Gather together the things that change for the same reasons. Separate those things that change for different reasons.".

## Naming conventions and reasoning

In this principle there is a clearly defined role of an "Actor" and "Module". It means we can use modules as separation containers, and we can group the business logic of this module on top of a clearly distinguished class/function that should have a role, function, purpose.

This directs us into Object-Oriented Programming ideas of Modeling and Abstractions. It means we should basically model the class as a part of real world, asking questions:

- What this class is about? "This is a service that will own all notifications for Customers"
- What this class should do? "This is a service that will send email, SMS notifications for Customers"
- What are the properties of this class? "Oh, so I see email, SMS, status logs, they look like separate instances!"
- What this class exposes? "I will create a set of classes, but I will start with interfaces first"
- How this class is connected to the system? "..."

These answers will help you with the implementation of Single Responsibility principle.

## Implementation

This principle has no defined implementation, so for implementation we can consider the following set of examples.
Let's pick E-commerce notification service as an example.

## Bad Single Responsibility

```javascript
// Violation: One class, multiple actors/reasons to change.
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
// Dedicated service for Email logic
class EmailService {
  send(emailAddress, content) {}
}

// Dedicated service for SMS logic
class SmsService {
  send(phoneNumber, content) {}
}

// Orchestrator (Optional)
class NotificationProvider {
  constructor(emailService, smsService) {
    this.email = emailService;
    this.sms = smsService;
  }
}
```

In the first example `NotificationService` is a pile of entities, while the second example is a separate files/classes that are orchestrated by another entity.

