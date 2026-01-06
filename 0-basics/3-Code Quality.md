# Code Quality

Code can be measured in quality, and there are several tools we are using to check it.
We can think about Readability, Reliability, Security, Maintainability, Testability, Cognitive Complexity, Best Practices, Code Smells.

## Why do we care?

> "Indeed, the ratio of time spent reading versus writing is well over `10 to 1`. We are constantly reading old code as part of the effort to write new code. ... making it easy to read makes it easier to write." (c) Robert C. Martin

We need to remember, that **we read code more often then we actually write code**.

> "According to the Software Engineering Institute (SEI), `60%` to `80%` of the total cost of a software system is incurred during the maintenance phase, not the initial development."

**We are maintaining/extending the existing code more often then we actually write new code**.

So, right in the moment whe you produce low-quality code, you created a tech debt, reading debt that hits you or your colleagues somewhere in the future.

## Code Quality tools

We have 2 types here: Static analysis tools and Dynamic analysis tools.

Static analysis tools are:

- Linters like `ESLint`, `Biome`, `Prettier`.
- Static Analyzers like `SonarQube`, `Snyk`.
- Type Checkers like `TypeScript Compiler`.

Dynamic analysis tools, unlike Static tools analyze the code while it is running. It can be Chrome DevTools profiler, security scanners.

## Action items for Code Quality

1. Know what Code Smell term means: [https://refactoring.guru/refactoring/smells](https://refactoring.guru/refactoring/smells) according to your language.
2. Know Best Practices in your Framework, Library, language.
3. Read TS documentation regularly [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html).
4. Install `ESlint` or `Biome`, enable it in your IDE.
5. Setup `Husky` pre-commits and pre-pushes [https://typicode.github.io/husky/](https://typicode.github.io/husky/)
6. Install SonarQube extension to your IDE.
7. Know what SonarQube Cyclomatic Complexity means: [https://en.wikipedia.org/wiki/Cyclomatic_complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity)
8. Know what SonarQube Cognitive Complexity means: [https://www.sonarsource.com/docs/CognitiveComplexity.pdf](https://www.sonarsource.com/docs/CognitiveComplexity.pdf)
9. CI/CD Integration. Setup Gitlab/Github actions to run linters, tests, SonarQube checks.
10. Write code with an intention to test it. By this you will create a decoupled, testable code instead of a messy pile of functions or classes.
