import { SynchronizationProcessor } from "./sync-processor/SynchronizationProcessor.ts";
import { eventBus } from "./event-bus/index.ts";
import { LoginEvent } from "./event-bus/events/LoginEvent.ts";
import { LogoutEvent } from "./event-bus/events/LogoutEvent.ts";

const synchronizationProcessor = new SynchronizationProcessor();

synchronizationProcessor.init();

// Hey, Login event!
eventBus.emit(new LoginEvent());
// Hey, Logout event!
eventBus.emit(new LogoutEvent());

synchronizationProcessor.unmount();
