import type { IObserver } from "./es-observer.ts";
import { Subject } from "./es-subject.ts";

interface ISessionState {
  isLoggedIn: boolean;
  userId: number | null;
  username: string | null;
  lastLoginTime: string | null;
}

class UserSessionService extends Subject<ISessionState> {
  constructor() {
    const initialState: ISessionState = {
      isLoggedIn: false,
      userId: null,
      username: null,
      lastLoginTime: null,
    };
    super(initialState);
  }

  login(id: number, username: string) {
    this.setState({
      isLoggedIn: true,
      userId: id,
      username: username,
      lastLoginTime: new Date().toISOString(),
    });
  }

  logout() {
    const prevState = this.State;
    this.setState({
      isLoggedIn: false,
      userId: null,
      username: null,
      lastLoginTime: prevState?.lastLoginTime ?? null,
    });
  }
}

const NOTIFICATION_CENTER_ID = Symbol("NotificationCenter");

class NotificationCenter implements IObserver<ISessionState> {
  name = NOTIFICATION_CENTER_ID;

  update(data: ISessionState) {
    if (data.isLoggedIn) {
      console.log(`[${this.name.description}] Displaying: Welcome back, ${data.username}!`);
    } else {
      console.log(`[${this.name.description}] Displaying: Please log in.`);
    }
  }
}

const ANALYTICS_TRACKER_ID = Symbol("AnalyticsTracker");

class AnalyticsTracker implements IObserver<ISessionState> {
  name = ANALYTICS_TRACKER_ID;

  update(data: ISessionState) {
    if (data.isLoggedIn) {
      console.log(`[${this.name.description}] LOG: User ${data.userId} has logged in.`);
    } else {
      console.log(`[${this.name.description}] LOG: User session ended.`);
    }
  }
}

// Create instances
const sessionService = new UserSessionService();
const notificationCenter = new NotificationCenter();
const analyticsTracker = new AnalyticsTracker();

// Subscribe Observers to the Subject
sessionService.subscribe(notificationCenter);
sessionService.subscribe(analyticsTracker);

// Do some stuff
sessionService.login(101, "John Doe");
sessionService.logout();

