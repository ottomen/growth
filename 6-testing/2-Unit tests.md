# Unit tests

> A software tester walks into a bar. Backs into a bar. Runs into a bar. Crawls into a bar. Dances into a bar. Flies into a bar. And orders: a beer. 2 beers. 0 beers. 987654321 beers. a lizard in a beer glass. -1 beer. "qwerty" beers. Testing complete. A regular customer walks into the bar and asks where the bathroom is. The bar bursts into flames.

Goal on Unit-level tests is to focus on atomic piece of code: method, function, Component.

Tests should be effective, deep and they should test edge cases. The intention here should be not to follow a happy path, but to break things.

## AAA pattern

The Arrange-Act-Assert pattern, also known as the AAA pattern, is a widely recognized approach to structuring tests. It was originally proposed by Bill Wake in 2001 and then mentioned in Kent Beck’s influential book "Test Driven Development: By Example" in 2002.

- **Arrange:** Set up the test environment.
- **Act:** Execute the code to test.
- **Assert:** Verify the results.

The AAA pattern enhances readability and maintainability, and is a common practice.

Example with Vitest:

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

It is important when you need to know that some piece of code triggered another piece of code, n-th times, with or without givem arguments, or opposite, was not triggered at all.

Example with Vitest:

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

Example:

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

**Links:**

- [https://en.wikipedia.org/wiki/Test_fixture](https://en.wikipedia.org/wiki/Test_fixture)

## Flaky tests

Flaky tests are tests that most of the time works but fail in some cases.

Example of such tests is to use JS Dates and to build the tests scenario on top of that. It will work locally, but once you push it to the remote repo in another time zone it will fail, because the Date there will be converted to the server's time zone.

Or for example some test can work isolated, but once we run tests in parallel, or in random order, some of them fail.

Or test can mutate some global object, and sometimes all is good, but sometimes you have other tests failing.

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
