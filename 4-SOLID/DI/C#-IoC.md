# DI IoC in .Net framework

.NET supports the dependency injection (DI) software design pattern, which is a technique for achieving Inversion of Control (IoC) between classes and their dependencies. Dependency injection in .NET is a built-in part of the framework, along with configuration, logging, and the options pattern.

The framework takes on the responsibility of creating an instance of the dependency and disposing of it when it's no longer needed.

Defining an Interface:

```c#
public interface IMessageWriter {
    void Write(string message);
}
```

Defining the concrete implementation `IMessageWriter`:

```c#
public class MessageWriter : IMessageWriter {
    public void Write(string message) {
        Console.WriteLine($"MessageWriter.Write(message: \"{message}\")");
    }
}
```

Consumer of `IMessageWriter` interface:

```c#
public class Worker : BackgroundService {
    private readonly IMessageWriter _messageWriter;

    public Worker(IMessageWriter messageWriter, ILogger<Worker> logger) {
        _messageWriter = messageWriter;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken) {
        _messageWriter.Write("Hello from the injected service!");
    }
}
```

Init:

```c#
// Entry point for configuring in a .NET application
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

// Configuring the DI container
builder.Services.AddHostedService<Worker>();
// .NET Dependency Injection registers a service to have a single instance shared across the entire application's lifetime
builder.Services.AddSingleton<IMessageWriter, MessageWriter>();

// Runtime phase of your application
using IHost host = builder.Build();

host.Run();
```

Link: https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection-basics

