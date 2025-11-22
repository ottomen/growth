import { IObserver } from "./es-observer.ts";

export interface ISubject<T> {
  State: T | null;
  setState(state: T): void;
  subscribe(observer: IObserver<T>): ISubject<T>;
  unsubscribe(observer: IObserver<T>): ISubject<T>;
}

export class Subject<T> implements ISubject<T> {
  private readonly observers = new Set<IObserver<T>>();
  private state: T | null = null;

  constructor(initialState: T | null = null) {
    this.state = initialState;
  }

  private notify(data: T) {
    if (!this.observers.size) return;

    for (const observer of this.observers) {
      observer.update(data);
    }
  }

  public setState(state: T) {
    this.state = state;
    this.notify(this.state);
  }

  get State() {
    return this.state;
  }

  public subscribe(observer: IObserver<T>) {
    if (!this.observers.has(observer)) this.observers.add(observer);
    return this;
  }

  public unsubscribe(observer: IObserver<T>) {
    const exists = this.observers.has(observer);

    if (exists) this.observers.delete(observer);
    return this;
  }

  public drop() {
    this.observers.clear();
  }
}

