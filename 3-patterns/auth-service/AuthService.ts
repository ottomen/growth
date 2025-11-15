import { EventEmitter } from "../event-emitter/EventEmitter.ts";

// AuthService use case
type AuthEvents = {
  logout: { username: string };
  login: { username: string };
};

// Let's assume that this is the AuthService class that handles session of the User
export class AuthService extends EventEmitter<AuthEvents> {
  constructor() {
    super();
    console.log("AuthService initialized");
  }

  logout(data: AuthEvents["logout"]) {
    this.emit("logout", data);
  }

  login(data: AuthEvents["login"]) {
    this.emit("login", data);
  }
}
