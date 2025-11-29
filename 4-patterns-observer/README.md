# Observer pattern

[<img src="./images/observer-design-Pattern.webp" width="650"/>](./images/observer-design-Pattern.webp)

In software design and software engineering, the observer pattern is a software design pattern in which an object, called the **Subject** (also known as event source or event stream), maintains a list of its dependents, called **Observers** (also known as event sinks), and automatically notifies them of any state changes, typically by calling one of their methods. (c) Wikipedia

## Problem definition

In one place or many places in the application we need to be aware about a system event or an application state change. We'd like to have a standard way of subscribing to listening for system events and a standard way of notifying the interested parties. The notification should be automated after an interested party subscribed to the system event or application state change. There should be a way to unsubscribe, too. (c) Wikipedia

## Nuances:

1. A one-to-many dependency, one Subject can have may Observers.
2. Subject entity has internal State that describes changes and transitions. It is Stateful.
3. When the Subject changes state, all registered Observers are notified and updated automatically.
4. Tightly coupled, Subject owns and knows about Observers.

## Reactive Programming & RxJS

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

**But in RxJS there is no idea of Shared State. They are Stateless.**

```js
// Usual way of creating EventListener
document.addEventListener("click", () => console.log("Clicked!"));

// RxJS way create an observable
import { fromEvent } from "rxjs";

fromEvent(document, "click").subscribe(() => console.log("Clicked!"));
```

Observable:

```js
import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  subscriber.next(1); // update all active subscribers
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log("just before subscribe");
observable.subscribe({
  next(x) {
    console.log("got value " + x);
  },
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  complete() {
    console.log("done");
  },
});
console.log("just after subscribe");

// just before subscribe
// got value 1
// got value 2
// got value 3
// just after subscribe
// got value 4
// done
```

## RxJS & Angular

### Angular and Making HTTP requests part of Angular

HttpClient has methods corresponding to the different HTTP verbs used to make requests, both to load data and to apply mutations on the server. Each method returns an RxJS Observable which, when subscribed, sends the request and then emits the results when the server responds.

```ts
http.get<Config>("/api/config").subscribe((config) => {
  // process
});

http
  .get("/images/dog.jpg", { responseType: "arraybuffer" })
  .subscribe((buffer) => {
    console.log("The image is " + buffer.byteLength + " bytes large");
  });
```

Link: https://angular.dev/guide/http/making-requests

## Redux observable

RxJS-based middleware for Redux. Compose and cancel async actions to create side effects and more.

It is Stateful.

```ts
import { Observable, Subject } from "rxjs";

// The Core Primitive, class that makes the Redux state stream
export class StateObservable<S> extends Observable<S> {
  value: S; // State is here
  private __notifier = new Subject<S>(); // internal observer/notifier

  constructor(input$: Observable<S>, initialState: S) {
    super((subscriber) => {
      const subscription = this.__notifier.subscribe(subscriber);
      if (subscription && !subscription.closed) {
        subscriber.next(this.value);
      }
      return subscription;
    });

    this.value = initialState;
    input$.subscribe((value) => {
      // We only want to update state$ if it has actually changed since
      // redux requires reducers use immutability patterns.
      // This is basically what distinctUntilChanged() does but it's so simple
      // we don't need to pull that code in
      if (value !== this.value) {
        this.value = value;
        this.__notifier.next(value);
      }
    });
  }
}

// and use case

// https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/operators/observeOn.ts
export function observeOn<T>(
  scheduler: SchedulerLike,
  delay = 0
): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable((destination) => {
      source.subscribe(
        operate({
          destination,
          next: (value) =>
            executeSchedule(
              destination,
              scheduler,
              () => destination.next(value),
              delay
            ),
          error: (err) =>
            executeSchedule(
              destination,
              scheduler,
              () => destination.error(err),
              delay
            ),
          complete: () =>
            executeSchedule(
              destination,
              scheduler,
              () => destination.complete(),
              delay
            ),
        })
      );
    });
}

// createEpicMiddleware() is used to create an instance of the actual redux-observable middleware.
// https://redux-observable.js.org/docs/api/createEpicMiddleware.html

import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic, rootReducer } from "./modules/root";

// The Setup
const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
}

// Under the hood of the createEpicMiddleware, the epicMiddleware
// https://github.com/redux-observable/redux-observable/blob/8ef1bbfb529ac5a8c1461fdfa136c3d0ac8e8bf0/src/createEpicMiddleware.ts#L65
const stateSubject$ = new Subject<State>();

const state$ = new StateObservable(
  stateSubject$.pipe(observeOn(uniqueQueueScheduler)),
  store.getState()
);
```

Link: https://redux-observable.js.org/docs/basics/Epics.html

Source code: https://github.com/redux-observable/redux-observable/blob/master/src/StateObservable.ts
