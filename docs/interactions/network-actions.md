---
sidebar_position: 14
id: network-actions
title: Network Actions
sidebar_label: Network Actions
description: Modern network interception, HTTP/JSON response mocking, and WebDriver BiDi authentication
---

# Network Actions

The `NetworkActions` class provides modern network interception and request mocking capabilities powered by Selenium 4 `NetworkInterceptor` and the WebDriver BiDi (Bidirectional) protocol.

It enables your UI and end-to-end tests to stub REST API endpoints, simulate backend error responses (such as 400, 401, 404, 500), and handle HTTP Basic/Digest authentication automatically — all without external proxy dependencies (like BrowserMob Proxy).

You can access `NetworkActions` via:

```java
// Via DriverActions facade
driverActions.network()

// Or via direct instantiation (implements AutoCloseable)
NetworkActions<WebDriver> network = new NetworkActions<>(driver);
```

---

## Capabilities Overview

- **Mock JSON API Responses**: Return predefined JSON payloads for REST endpoints.
- **Simulate Network & Backend Failures**: Test UI error handling for 4xx and 5xx status codes.
- **Custom Request/Response Filtering**: Use Selenium's native `Filter` API for dynamic header modification or request inspection.
- **BiDi-Powered HTTP Authentication**: Automatically supply credentials for HTTP Basic or Digest authentication challenges using WebDriver BiDi `onAuthRequired` with automatic fallback to `HasAuthentication`.
- **Zero External Proxy Overhead**: Interception occurs directly in the browser's DevTools protocol or BiDi session.

---

## Available Methods

### Mock JSON Response (HTTP 200)

Stubs requests matching a URL substring or pattern, returning an HTTP `200 OK` response with `Content-Type: application/json; charset=utf-8`.

```java
// Mock user profile API endpoint
driverActions.network().mockJsonResponse("/api/user/profile", """
    {
        "id": 101,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "role": "ADMIN"
    }
""");

// Navigate to the UI page that calls this endpoint
driverActions.navigation().navigateToUrl("https://example.com/dashboard");
```

### Mock JSON Response with Custom Status Code

Simulates backend error conditions, enabling you to verify that your front-end handles server crashes, validation failures, or unauthorized errors gracefully.

```java
// Mock 500 Internal Server Error
driverActions.network().mockJsonResponse(
    "/api/orders",
    500,
    "{\"error\": \"Database connection failed\"}"
);

// Mock 401 Unauthorized
driverActions.network().mockJsonResponse(
    "/api/secure-data",
    401,
    "{\"message\": \"Session expired\"}"
);
```

### Mock Arbitrary HTTP Response

Allows full control over the HTTP status code, MIME content type, and raw response body.

```java
// Mock an XML response
driverActions.network().mockResponse(
    "/services/inventory.xml",
    200,
    "application/xml",
    "<inventory><item id='1'><stock>42</stock></item></inventory>"
);

// Mock a plain-text healthcheck
driverActions.network().mockResponse(
    "/healthz",
    200,
    "text/plain",
    "OK"
);
```

### Custom Request / Response Filtering

Applies a custom Selenium 4 `org.openqa.selenium.remote.http.Filter` to intercept, inspect, or modify outbound HTTP requests and responses.

```java
import org.openqa.selenium.remote.http.Filter;
import org.openqa.selenium.remote.http.HttpResponse;

// Custom filter to log or alter requests
Filter customFilter = next -> req -> {
    // Add custom tracing headers before request goes out
    req.setHeader("X-Test-Execution-ID", "suite-run-42");
    HttpResponse res = next.execute(req);
    return res;
};

driverActions.network().intercept(customFilter);
```

---

## HTTP Authentication (WebDriver BiDi)

Ellithium includes built-in support for automating HTTP Basic and Digest authentication challenges. This is powered natively by WebDriver BiDi (`Network.onAuthRequired`), which intercepts authentication prompts at the protocol level without opening modal native dialogs.

If the browser or driver does not yet support the full BiDi specification, Ellithium automatically and transparently falls back to Selenium's `HasAuthentication` interface.

### Authenticate All Requests

Supplies credentials to any endpoint that requests authentication:

```java
driverActions.network().authenticate("admin", "SuperSecretPassword123!");

// Navigate to the protected page
driverActions.navigation().navigateToUrl("https://the-internet.herokuapp.com/basic_auth");
```

### Authenticate Targeted Requests by URI Filter

Restricts authentication credentials to specific endpoints matching a URI predicate:

```java
// Only authenticate requests sent to secure.internal.domain
driverActions.network().authenticate(
    uri -> uri.getHost().contains("secure.internal.domain") && uri.getPath().startsWith("/admin"),
    "adminUser",
    "SecretPass"
);
```

---

## Lifecycle Management & Cleanup

`NetworkActions` implements `java.lang.AutoCloseable`. All registered network interceptors and BiDi listener subscriptions can be cleared between tests to prevent route contamination.

### Option 1: Scoped via Try-With-Resources

```java
try (NetworkActions<WebDriver> network = new NetworkActions<>(driver)) {
    network.mockJsonResponse("/api/data", "{\"result\": \"mocked\"}");
    driverActions.navigation().navigateToUrl("https://example.com/app");
    // Interceptor is automatically closed when exiting the block
}
```

### Option 2: Explicit Cleanup in `@AfterMethod`

```java
@AfterMethod
public void tearDownNetwork() {
    driverActions.network().close(); // or driverActions.network().reset()
}
```

### Option 3: Declarative Injection with `@WithDriver`

When utilizing Ellithium's declarative fixture runner, `NetworkActions` can be injected directly as a test method parameter. The framework manages its lifecycle and tear down automatically:

```java
import Ellithium.core.driver.LocalDriverType;
import Ellithium.core.execution.fixtures.DriverFixtureProvider;
import Ellithium.core.execution.fixtures.WithDriver;
import Ellithium.Utilities.interactions.NetworkActions;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;

public class NetworkMockingTest {

    @Test(dataProvider = DriverFixtureProvider.FIXTURE_DATA_PROVIDER, 
          dataProviderClass = DriverFixtureProvider.class)
    @WithDriver(browser = LocalDriverType.CHROME)
    public void testMockedDashboard(WebDriver driver, NetworkActions network) {
        network.mockJsonResponse("/api/stats", "{\"activeUsers\": 1000}");
        driver.get("https://example.com/stats");
        // No manual cleanup required; fixture handles teardown
    }
}
```
