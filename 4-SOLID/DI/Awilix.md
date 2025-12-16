# Awilix Dependency Injection (DI) container for JavaScript/Node

Awilix enables you to write composable, testable software using dependency injection without special annotations, which in turn decouples your core application code from the intricacies of the DI mechanism.

Demo:

```typescript
import { createContainer, InjectionMode, asClass } from "awilix";

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

// DI to inject
class UserService {}

// Consumer class
class SessionService {
  // Constructor DI injection
  constructor(opts) {
    this.userService = opts.userService;
  }
}

// Registration
container.register({
  userService: asClass(UserService).singleton(),
  sessionService: asClass(SessionService)
    .inject(() => ({
      // Map the 'userService' registration key to the 'userService' key in the opts object
      userService: "userService",
    }))
    .singleton(),
});
```

Use case: [Diia app](https://github.com/diia-open-source/be-diia-app/blob/495232c9ba5ff95df6dcb57c717fb628e6502a1a/src/application.ts)

Link: https://github.com/jeffijoe/awilix

