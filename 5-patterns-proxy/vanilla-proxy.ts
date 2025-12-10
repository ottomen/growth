class User {
  private id: string;
  firstname: string;

  constructor({ firstname }: { firstname: string }) {
    this.id = crypto.randomUUID();
    this.firstname = firstname;
  }
}

const user = new User({
  firstname: "John",
});

// Traps are mechanisms used by an operating system to perform privileged operations and interact with user-level programs.
const traps: ProxyHandler<User> = {
  get(target, prop) {
    const strProp = String(prop) as keyof User;
    console.log(`Called getter for property: ${strProp}`);

    return target[strProp];
  },
  set(target: User, prop, value: User[keyof User]) {
    console.log(
      `Called setter for property: ${String(prop)} with value: ${value}`
    );

    return true;
  },
  // has -> trap for "in" operator
  // apply -> trap form any method invocations
  // construct -> trap for "new" oeprator
};

const userProxied = new Proxy<User>(user, traps);

userProxied.firstname;

userProxied.firstname = "Jim";

