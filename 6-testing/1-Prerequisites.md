# Testing Prerequisites

> "The earlier you catch a defect in the software development lifecycle, the cheaper it is to fix it."

(c) Barry Boehm

## Pyramid of testing

[<img src="./images/Testing_Pyramid.png" width="450"/>](./images/Testing_Pyramid.png)

Pyramid of testing is a classical sliced model of testing, where we start from Unit tests, into Integration tests and into e2e tests. Unit tests are the main driving force here, because they are easy to maintain, create and to run. Integration tests can be a useful addition to Unit tests, to cover connections, external connections, while e2e tests are following real unser scenarios.

### Unit tests

Foundational layer, where the cost and granularity is very affordable. Here you need to focus on the function, method, class, Component. Easiest to write, most stable, dependent on implementation, and if the implementation is stable - tests are stable as well.

Most of the time used in CI/CD to test every commit to the repo.

**Pros:** Cheap, fast, connected to the implementation. Atomic, traceable.

**Cons:** Can't csay a lot of cons here, since unti tests are the main instrument for us to test our code.

### Integration tests

Aadvanced variation of tests that is focused on testing combinations of classes, Components that form some meaningful structure altogether. Can be used to test connection to external services, DBs, APIs.

**Pros:** Cover the connection points between classes, functions.

**Cons:** Can be challenging, because you need to mock abd spy on multiple layers of classes, methods and functions.

### e2e tests (User interface tests)

Focused on User experience, often simulate user interactions and involve a lot of scenarios. Fragile, brittle, a subject to frequent changes. Most of the time they are the subject of a work for a separate team (Automation QA).

**Pros:** Can cover the whole flow, without access to the implementation details.

**Cons:** Expensive, fragile. Can be very slow (they test real User interfaces). In the chaotic project sometimes the cost of maintenance of some of e2e tests can be higher than the benefit of having them. Usually they are in a form of automation tests, and are valuable as a quality control, with regression checks.

**Link to read:** [https://martinfowler.com/bliki/TestPyramid.html](https://martinfowler.com/bliki/TestPyramid.html)

## Methods of testing

The method is about the approach to testing, that explains what techniques we can use and what is the process we can follow.

- **Black-box testing** - we have no idea how the module, application, service works, we have no access to code. The benefit of it that the tests are not tied to the implementation, and if the implementation changes tests are not changed, since they are not dependent on it.
- **White-box testing** - we have an understanding how the system works, what's inside. Built on top of specifications, requirements.

We also have an idea of **Functional** and **Non-functional** tests that are refering to the Functional and Non-functional requirements.

**Examples of Functional tests are:** Smoke testing, Regression testing.

**Examples of Non-functional tests are:** Load testing, Performance testing, Penetration testing.

We have an idea of **Automated tests** and **Manual testing**. Each of them has its own pros and cons.

## Types of testing

- Regression testing
- Smoke testing
- Load testing
- Performance testing
- Penetration testing
- Fuzz testing

### Regression testing

Functional and non-functional tests to ensure that previously developed and tested software still performs as expected after a change. If not, that would be called a regression (a type of software bug where a feature that has worked before stops working correctly).

**Link:** [https://en.wikipedia.org/wiki/Regression_testing](https://en.wikipedia.org/wiki/Regression_testing)

### Smoke testing

Covers the most important functionality of a component or system, used to aid assessment of whether main functions of the software appear to work correctly.

**Link:** [https://en.wikipedia.org/wiki/Smoke*testing*(software)](<https://en.wikipedia.org/wiki/Smoke_testing_(software))

### Load testing

Testing process of putting demand on a structure or system and measuring its response. Can be applied to API testing, for example.

**Link:** [https://en.wikipedia.org/wiki/Load_testing](https://en.wikipedia.org/wiki/Load_testing)

### Performance testing

Performed to determine how a system works in terms of responsiveness and stability under a particular workload.

**Link:** [https://en.wikipedia.org/wiki/Software_performance_testing](https://en.wikipedia.org/wiki/Software_performance_testing)

### Penetration testing

Authorized simulated cyberattack on a computer system, performed to evaluate the security of the system.

**Link:** [https://en.wikipedia.org/wiki/Penetration_test](https://en.wikipedia.org/wiki/Penetration_test)

### Fuzz testing

Fuzzing is a technique to identify security vulnerabilities by generating inputs that are likely to trigger
issues and feeding this to the application automatically and repeatedly.

**Link:** [https://en.wikipedia.org/wiki/Fuzzing](https://en.wikipedia.org/wiki/Fuzzing)
