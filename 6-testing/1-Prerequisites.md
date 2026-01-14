# Testing Prerequisites

> "The earlier you catch a defect in the software development lifecycle, the cheaper it is to fix it."

(c) Barry Boehm

## Pyramid of testing

[<img src="./images/Testing_Pyramid.png" width="450"/>](./images/Testing_Pyramid.png)

**We have here:**

- **Unit tests** - foundational layer, where the cost and granularity is very affordable. Here you need to focus on the function, method, class, Component. Easiest to write, most stable, dependent on implementation, and if the implementation is stable - tests are stable as well.
- **Integration tests** - advanced variation of tests that is focused on a combination of classes, Components that form some meaningful structure altogether. More complex than unit tests.
- **e2e tests** (User interface tests) - focused on User experience, often simulate user interactions and involve a lot of scenarios. Fragile, brittle, a subject to frequent changes.

**Link:** [https://martinfowler.com/bliki/TestPyramid.html](https://martinfowler.com/bliki/TestPyramid.html)

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

Functional and non-functional tests to ensure that previously developed and tested software still performs as expected after a change. If not, that would be called a regression (meaning we are going back in the evolution of a project).

**Link:** [https://en.wikipedia.org/wiki/Regression_testing](https://en.wikipedia.org/wiki/Regression_testing)

### Smoke testing

Covers the most important functionality of a component or system, used to aid assessment of whether main functions of the software appear to work correctly.

**Link:** [https://en.wikipedia.org/wiki/Smoke*testing*(software)](<https://en.wikipedia.org/wiki/Smoke_testing_(software))

### Load testing

Testing process of putting demand on a structure or system and measuring its response. Can be applied to API testing.

**Link:** [https://en.wikipedia.org/wiki/Load_testing](https://en.wikipedia.org/wiki/Load_testing)

### Performance testing

Performed to determine how a system performs in terms of responsiveness and stability under a particular workload.

**Link:** [https://en.wikipedia.org/wiki/Software_performance_testing](https://en.wikipedia.org/wiki/Software_performance_testing)

### Penetration testing

Authorized simulated cyberattack on a computer system, performed to evaluate the security of the system.

**Link:** [https://en.wikipedia.org/wiki/Penetration_test](https://en.wikipedia.org/wiki/Penetration_test)

### Fuzz testing

Automated software testing technique that involves providing invalid, unexpected, or random data as inputs to a computer program.

**Link:** [https://en.wikipedia.org/wiki/Fuzzing](https://en.wikipedia.org/wiki/Fuzzing)
