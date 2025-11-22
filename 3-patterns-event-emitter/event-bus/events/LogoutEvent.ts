import { BusEvent } from "./BusEvent.ts";

export class LogoutEvent extends BusEvent {
  name = "logout";
}