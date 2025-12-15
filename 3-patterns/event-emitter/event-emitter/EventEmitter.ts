import type { TListener, TEventMap } from "./types.ts";

// Stores keys from EventMap type and Set<TListener>> in the hashmap with O(1)
// Doesn't make sense as a Generic class, but can be used as a Prototype for OOD classes
export class EventEmitter<EventMap extends TEventMap> {
  private readonly listeners: Map<keyof EventMap, Set<TListener<any>>> =
    new Map();

  on<E extends keyof EventMap>(event: E, listener: TListener<EventMap[E]>) {
    let listeners = this.listeners.get(event);

    if (!listeners) {
      listeners = new Set();
      this.listeners.set(event, listeners);
    }

    listeners.add(listener);
  }

  once<E extends keyof EventMap>(event: E, listener: TListener<EventMap[E]>) {
    const onceListener = (data: EventMap[E]) => {
      listener(data);
      this.off(event, onceListener);
    };

    this.on(event, onceListener);
  }

  off<E extends keyof EventMap>(event: E, listener: TListener<EventMap[E]>) {
    const listeners = this.listeners.get(event);

    if (listeners) {
      listeners.delete(listener);
    } else {
      throw new Error(`No ${String(event)} listeners found`);
    }
  }

  emit<E extends keyof EventMap>(event: E, data: EventMap[E]) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      throw new Error(`No ${String(event)} listeners found`);
    }

    for (const listener of listeners) listener(data);
  }

  drop<E extends keyof EventMap>(event: E) {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}
