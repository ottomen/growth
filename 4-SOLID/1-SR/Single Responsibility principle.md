# Single Responsibility principle

> "A module should be responsible to one, and only one, Actor"

## Origins

Robert C. Martin expresses the principle as, "A class should have only one reason to change" and adds another explanation as "Gather together the things that change for the same reasons. Separate those things that change for different reasons".

The problem is JavaScript as a language has no defined implementation of the Single Responsibility Principle at the language or framework level and it it easy to mess with this principle.

## Naming conventions and reasoning

We see explicitly defined role of an "Actor" and a "Module". It means we can use Modules as separation containers, and we can group the business logic of a Module according to a clearly isolated class/function Role and Purpose.

This is connected to the idea of Modeling and Abstract thinking. We should be able to model the class/function as if it was a part of real world.

## Principle implementation example

This principle has no defined implementation, but we can check the following examples.

Bad example:

```typescript
// Violation: One file and class with multiple actors/reasons to change inside.
class NotificationService {
  // Looks like a separate Actor/Role
  sendEmail(emailAddress, content) {}

  // Looks like a separate Actor/Role
  sendSms(phone, content) {}

  // Some mess here
  notifyUser(user: User, message: string) {
    if (user.pref === "email") {
      this.sendEmail(user.email, message);
    } else if (user.pref === "sms") {
      this.sendSms(user.phone, message);
    }
  }
}
```

Good example:

```typescript
// Enum for preferred Notification channels
enum ENotificationChannel = {
  Email = "Email",
  SMS = "SMS"
}
type TUser = { id: number; pref: ENotificationChannel; email?: string; phone?: string };

// Common interface
interface INotificationService {
  send(user: User, content: string): void;
}

// Dedicated file and service for Email logic that implements the common interface
class EmailService implements INotificationService {
  send(emailAddress, content) {}
}
// Dedicated file and service for SMS logic that implements the common interface
class SmsService implements INotificationService {
  send(phoneNumber, content) {}
}

// Orchestrator, separated file, owns a list of INotificationService classes, but uses them agnostically
class NotificationProvider {
  private providers: Map<ENotificationChannel, INotificationService>;

  constructor(providers: Map<ENotificationChannel, INotificationService>) {
    this.providers = providers;
  }

  // Send notifications
  notifyUser(user: User, message: string) {
    // We are connecting service we need to use by the "pref" property from the User class itself
    const service = this.providers.get(user.pref);

    if (service) {
      // sending a Notification via preferred channel
      service.send(user, message);
    } else {
      // some default service?
    }
  }
}

// Usage example:
const emailService = new EmailService();
const smsService = new SmsService();

const providers = new Map<ENotificationChannel, INotificationService>();
providers.set(ENotificationChannel.Email, emailService);
providers.set(ENotificationChannel.Sms, smsService);

const notificationProvider = new NotificationProvider(providers);

const myUser: TUser = { id: 1, pref: ENotificationChannel.Email, email: "test@example.com" };

notificationProvider.notifyUser(myUser, "Your order has shipped!");
```

## Be the Actor

A helpful technique is to put yourself in the place of that class/function that you want to create. Imagine as if you were this class/function.

Think about the following. If I were this class/function:

- What is my purpose? What is my Role? Do i look like some OOD Pattern?
- What responsibilities do I have? What Actions I do?
- What dependencies I need?
- What top-level layer I belong to?

These answers will help you with the implementation of Single Responsibility principle.

## Be the Actor example

If we follow the idea of being this class, if I were the Notification class:

- **What is my purpose? What is my Role?** - I'm the service that rules all Customer Notifications that can be sent to the Customer of e-commerce store. I receive Customer data, I have some information about the preferred channels that this Customer expects (SMS, EMAIL, PUSH, other?), I receive what content I need to send. (hmm, should I be aware of the Order lifecycle, or it should be the part of other service?). I likely work as a Facade pattern, where I hide all business logic from the outer classes. I should have some separate DB table as well, to save history of Notifications, I should have some logging as well.

- **What responsibilities I have? What Actions I do?** - I own all preferred channels, but I use them as dependencies, and I don't need to know about their implementations, since they can change, all I know is the common interface. I can send one or many kinds of notifications, and I need to store information about sent notifications as well. So I'm like a Dispatcher, that receives a command to send notification to this Customer, via defined channels (probably it is a part of Customer object, as a "preferredChannels" property).

- **What dependencies I need?** - I need to have SMS, EMAIL, PUSH services as a DIs, with same API via Interfaces, where every of them will have same "shape", like `.send()`, other methods. I need to store the incoming, sent, failed notifications into the DB table.

- **What top-level layer I belong to?** - Hmm, this needs some investigation.
