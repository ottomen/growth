type TListener<T = void> = (data: T) => void;

// Very popular in JS/TS, not so popular in other languages
class EventEmitter {
  private listeners: Map<string, Set<TListener>> = new Map();

  on(event: string, listener: TListener) {
    const list = this.listeners.get(event) || new Set<TListener>();

    list.add(listener);

    this.listeners.set(event, list);
  }

  off(event: string, listener: TListener) {
    this.listeners.get(event)?.delete(listener);
  }

  emit(event: string, data?: any) {
    const list = this.listeners.get(event);

    if (!list) return;

    for (const listener of list) listener(data);
  }

  removeAll(event?: string) {
    if (event) this.listeners.delete(event);
    else this.listeners.clear();
  }
}

const eventEmitter = new EventEmitter();

const customerUnsubscribed = () => {
  console.log("Customer successfully unsubscribed");
};

eventEmitter.on("unsubscribe", customerUnsubscribed);

eventEmitter.emit("unsubscribe");

// Event bus variation of EventEmitter
