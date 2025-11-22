import type { BusEvent } from "./events/BusEvent.ts";

export type TEventConstructor<T extends BusEvent> = new (...args: any[]) => T;
export type TEventListener<T extends BusEvent> = (event: T) => void;
