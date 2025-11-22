export interface IObserver<T> {
  name: symbol;
  update: (data: T) => void;
}

export class Observer<T> implements IObserver<T> {
  name: symbol;

  constructor(name: symbol) {
    this.name = name;
  }

  update(data: T) {
    // This is intentional
  }
}
