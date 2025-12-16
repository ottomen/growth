# DI in Angular

A dependency is any object, value, function or service that a class needs to work but does not create itself. In other words, it creates a relationship between different parts of your application since it wouldn't work without the dependency.

There are two ways that code interacts with any dependency injection system:

- Code can provide, or make available, values.
- Code can inject, or ask for, those values as dependencies.

```typescript
import { Injectable } from "@angular/core";

// @Injectable decorator
@Injectable({ providedIn: "root" })
export class AnalyticsLogger {
  trackEvent(category: string, value: string) {
    console.log("Analytics event logged:", {
      category,
      value,
      timestamp: new Date().toISOString(),
    });
  }
}
```

and use case:

```typescript
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AnalyticsLogger } from "./analytics-logger";

// @Component decorator
@Component({
  selector: "app-navbar",
  template: ` <a href="#" (click)="navigateToDetail($event)">Detail Page</a> `,
})
export class NavbarComponent {
  private router = inject(Router);
  private analytics = inject(AnalyticsLogger);

  navigateToDetail(event: Event) {
    event.preventDefault();
    this.analytics.trackEvent("navigation", "/details");
    this.router.navigate(["/details"]);
  }
}
```

Link: https://angular.dev/guide/di

