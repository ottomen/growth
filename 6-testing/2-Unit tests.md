# Unit tests

> A software tester walks into a bar. Backs into a bar. Runs into a bar. Crawls into a bar. Dances into a bar. Flies into a bar. And orders: a beer. 2 beers. 0 beers. 987654321 beers. a lizard in a beer glass. -1 beer. "qwerty" beers. Testing complete. A regular customer walks into the bar and asks where the bathroom is. The bar bursts into flames.

Goal on Unit-level tests is to focus on atomic piece of code: method, function, Component.

Tests should be effective, deep and they should test edge cases. The intention here should be not to follow a happy path, but to break things.

## Mocks, Spies, Fixtures

They are the fundamental blocks of any tests. Besides these building block there are a lot of implementation details. It depends on the testing framework you use. You need to read the documentation.

### Mocks

Mock is a fake version of some dependency, class, method, function. We need mocks to abstract from unnecessary parts of functionality, to suppress these parts. For example, I don't care about some dependency I use in the function, or this dependency is chained to other dependencies that involve some requests to server. I can simply stub it and return nothing or return some dummy data.

We can mock: Classes, Methods, dependencies, Dates, Timers, System Variables, Env variables, File system.

Example with Vitest:

```js
vi.mock(import("./RegistrationService.js"), async (importOriginal) => {
  const mod = await importOriginal();

  return {
    ...mod,
    mocked: vi.fn(), // suppressing the method we need
  };
});

// Or
vi.mock("./RegistrationService.js");
```

### Spy

Spy is an idea to track function/method calls, to track arguments, times the method was executed.

It is important when you need to know that some piece of code triggered another piece of code, n-th times, with or without given arguments, or opposite, was not triggered at all.

**Spy example with Vitest:**

```js
import * as analytics from "@/utils/analytics";

test("logs an event on button click", () => {
  const trackSpy = vi.spyOn(analytics, "trackEvent"); // Prepare Spy
  render(<SignupButton />);

  userEvent.click(screen.getByText("Sign Up"));

  expect(trackSpy).toHaveBeenCalled();
});
```

### Fixtures

In the context of software, a test fixture is used to set up the system state and input data needed for test execution. It can be an object that we need to pass into the Component, or an array of data we need to pass into some class instance. Also it can be a set of preconditions and state required for a test to run consistently.

Prepared, propagated into the test from outside. It might be loading the dummy data into the database, creating some dummy file, other.

**Fixture example:**

```js
// Fixture
const createUserFixture = (overrides = {}) => ({
  id: 123,
  email: "john-doe@site.com",
  status: "deactivated",
  ...overrides,
});

it("should send email to active users", () => {
  const emailService = new EmailService();
  const user = createUserFixture({ status: "active" });

  const status = emailService.send(user, "Hello");

  expect(status).toBe("Yep");
});
```

I love creating fixtures, because they allow me to separate dummy data from the actual test file, I'm not polluting the code.

**Links:**

- [https://en.wikipedia.org/wiki/Test_fixture](https://en.wikipedia.org/wiki/Test_fixture)

## AAA pattern

The Arrange-Act-Assert pattern, also known as the AAA pattern, is a useful approach to structuring tests. It was originally proposed by Bill Wake in 2001.

- **Arrange:** Set up the test environment.
- **Act:** Execute the code to test.
- **Assert:** Verify the results.

The AAA pattern enhances readability and maintainability, it is a common practice.

**Example of AAA with Vitest:**

```js
it("should send email", () => {
  // Arrange
  const emailService = new EmailService();
  const userEmail = "john-doe@site.com";
  const content = "Lorem Ipsum...";

  // Act
  const status = emailService.send(userEmail, content);

  // Assert
  expect(status).toBe("Yep");
});
```

## Variations of unit test tools

Every library brings it's own tools, and you need to know about them.

For example, with Vitest you can:

**Mock Dates**

```js
describe("User", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should", () => {
    const date = new Date("Mon Jan 19 2026 21:19:00");

    vi.setSystemTime(date); // We mocked the global date
  });
});
```

**Mock Global objects**

```js
const IntersectionObserverMock = vi.fn(
  class {
    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn();
    unobserve = vi.fn();
  },
);

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
```

**Mock Envs**

```js
// `process.env.NODE_ENV` and `import.meta.env.NODE_ENV` both
vi.stubEnv("NODE_ENV", "production");
```

**Mock Timers**

```js
describe("User", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should", () => {
    const date = new Date("Mon Jan 19 2026 21:19:00");

    vi.advanceTimersByTime(20_000); // Move timers 20 seconds ahead
  });
});
```

**Mock API**

You can use MSW: [https://mswjs.io/](https://mswjs.io/) for that.

This lib uses WebWorkers to intercept all your request to server per endpoint, and to return expected result.

```js
// handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/user", () => {
    return HttpResponse.json({
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];

// server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";

export const server = setupServer(...handlers);

// unit test
it("responds with the user data", async () => {
  const response = await fetch("https://api.example.com/user");

  await expect(response.json()).resolves.toEqual({
    id: "abc-123",
    firstName: "John",
    lastName: "Maverick",
  });
});
```

## Snapshot testing

If you need to memorize and compare DOM markup, other complex data structures - you can use Snapshot testing.
For example, you need to make sure that the current DOM markup that your component returns will not be changed.

You can do:

```js
it("toUpperCase", () => {
  const { container } = render(<TableBody {...props} />);

  expect(container).toMatchSnapshot(); // Check
});
```

On the first run, or if there is no snapshot file it will create one, and next time it will compare existing snapshot to the test result.

## React component testing

React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components.

This is a useful library that provides ways to render React components, Hooks, debug, check DOM results, fire events and track a lot of other things.

**Link:** [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)

## Flaky tests

Flaky tests are tests that most of the time works but fail in some cases.

Example of such tests is to use JS Date object and to build the tests scenarios on top of that. It will work locally on your device, but once you push it to the remote repo in another time zone it will fail, because the Date there will be converted to the server's time zone.

Or for example some test can work isolated, but once we run tests in parallel, or in random order, some of them fail.

Or test can mutate some global object, and sometimes all looks good, but sometimes you see other tests failing.

In this case you need do debug the problem and fix it.

## Pseudo-code approach

One of the techniques we can apply to create fast and effective unit tests is to use dummy code or plain English.

Example with Vitest:

```js
describe("FormValidator", () => {
  // Test happy path with correct form data
  // Test edge case without email data
  // Test form data with incorrect email address
  // Test empty form data
});
```

Im not thinking about the implementation here, I'm thinking about the business logic. Once I have this in the form of plain English I can start actual implementation.

With this approach you will see that your unit tests will be short, readable and focused.

## Locators

A locator is a reference used by automation tools to identify and interact with elements on a web page.

Examples of locators are: ID, ClassName, Tag, `data-testid` attributes.

It is important to remember about them, if you have a separate Automation QA team, and add Locators to your new implementations according to the project standards.

## AI, Self-Healing Tests in Automation

The idea here is to have a strategy that recovers from automation test fails, such as change of Locator, absence of Locator. Theoretically, with modern AI-driven Automation tests the system will recover from it, by picking a relevant element.

> Consider that a web application undergoes a redesign. Previously, a `Login` button had the ID `btnLogin`, but now, it is `btnUserLogin`. A traditional automated test looking for `btnLogin` would fail, but a self-healing test can identify that the button is functionally the same, even though the ID has changed. It adjusts its parameters to look for `btnUserLogin` and continues testing without human intervention.

**Link:** [https://testrigor.com/blog/self-healing-tests/](https://testrigor.com/blog/self-healing-tests/)
