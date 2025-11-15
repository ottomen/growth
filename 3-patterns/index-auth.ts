import { AuthService } from "./auth-service/AuthService.ts";

// Creating a new AuthService
const authService = new AuthService();

const onCustomerLogin = ({ username }: { username: string }) => {
  console.log(`${username} logged in`);
};
const onCustomerUnsubscribed = ({ username }: { username: string }) => {
  console.log(`${username} logged out`);
};

// Adding listeners
authService.on("login", onCustomerLogin);
authService.on("logout", onCustomerUnsubscribed);

// Triggering events
authService.login({ username: "John Doe" });
authService.logout({ username: "John Doe" });
