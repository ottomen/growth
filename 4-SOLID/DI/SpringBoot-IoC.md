# Spring Boot Inversion of Control (IoC)

In contrast with ordinary DI, IoC enables a **framework to take control of the flow** and make calls to our custom code. Inversion of Control is a principle in software engineering which transfers the control of objects or portions of a program to a container or framework.

"Bean" is a Java Object which is created and managed by Spring Framework (Spring IoC Container).

## The Spring IoC Container

The IoC container is the heart of Spring Boot, responsible for:

- Bean Creation: Instantiating objects (beans) defined in your application. Bean is the object that is a dependency that is handled by Spring Boot framework.
- Dependency Injection: Wiring beans together by injecting dependencies.
- Lifecycle Management: Handling initialization and destruction of beans.

## Key Annotations

Spring Boot uses annotations to configure beans and dependencies:

- `@Component`: Marks a class as a Spring-managed bean.
- `@Autowired`: Injects a dependency automatically.
- `@Configuration:` Defines a class for bean configuration.
- `@Bean`: Declares a method that produces a bean.

Java Spring Boot with `Configuration` annotation:

```java
// Interface
public interface ISessionService {
    void logout();
}

// Service implementation
@Component
public class SessionService implements ISessionService {
    public void logout() {
       // some logic
    }
}

// Consumer
@Component
public class SessionController {
    private final ISessionService sessionService;

    @Autowired
    public SessionController(ISessionService sessionService) {
        this.sessionService = sessionService;
    }
}

// Main application
@SpringBootApplication
public class Application {
    public static void main() {
        ApplicationContext context = SpringApplication.run(Application.class);
        SessionController controller = context.getBean(SessionService.class);
    }
}
```

