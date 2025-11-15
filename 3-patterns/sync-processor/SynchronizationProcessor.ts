import { eventBus } from "../event-bus/index.ts";
import { LoginEvent } from "../event-bus/events/LoginEvent.ts";
import { LogoutEvent } from "../event-bus/events/LogoutEvent.ts";

import type { EventBus } from "../event-bus/EventBus.ts";

export class SynchronizationProcessor {
  eventBus: EventBus;

  constructor() {
    this.eventBus = eventBus;
  }

  init = () => {
    this.eventBus.subscribe(LoginEvent, this.onLoginEvent); // no .bind, because of the arrow function
    this.eventBus.subscribe(LogoutEvent, this.onLogoutEvent);
  };

  onLoginEvent = () => {
    console.log("Global Login event!");
  };

  onLogoutEvent = () => {
    console.log("Global Logout event!");
  };

  unmount() {
    this.eventBus.unsubscribe(LoginEvent, this.onLoginEvent);
    this.eventBus.unsubscribe(LogoutEvent, this.onLogoutEvent);
  }
}
