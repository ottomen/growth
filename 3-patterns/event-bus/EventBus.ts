import type { TEventConstructor, TEventListener } from "./types.ts";
import type { BusEvent } from "./events/BusEvent.ts";

// Can be used as a Generic class, that can work as a global pipe for service/app
export class EventBus {
  private readonly listeners: Map<Function, Set<TEventListener<any>>> =
    new Map();

  subscribe<E extends BusEvent>(
    event: TEventConstructor<E>,
    listener: TEventListener<E>
  ) {
    let listeners = this.listeners.get(event);

    if (!listeners) {
      listeners = new Set();
      this.listeners.set(event, listeners);
    }

    listeners.add(listener);
  }

  unsubscribe<E extends BusEvent>(
    event: TEventConstructor<E>,
    listener: TEventListener<E>
  ) {
    const listeners = this.listeners.get(event);

    if (listeners) {
      listeners.delete(listener);
    } else {
      throw new Error(`No ${String(event)} listeners found`);
    }
  }

  emit<E extends BusEvent>(event: E) {
    const listeners = this.listeners.get(event.constructor);

    if (!listeners) {
      throw new Error(`No ${String(event)} listeners found`);
    }

    for (const listener of listeners) listener(event);
  }
}
