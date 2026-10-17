---
sidebar_position: 3
---

# DriverFactory

The `DriverFactory` class is a thread-safe factory for creating and managing WebDriver instances for web and mobile testing.

## Features

- Thread-safe driver management
- Support for local and remote WebDriver instances
- Mobile driver support (Android/iOS)
- Fluent configuration API
- Built-in event listeners and logging

## Web Driver Creation

### Local Web Driver

```java
// Basic local Chrome driver
WebDriver driver = DriverFactory.getNewLocalDriver(LocalDriverType.Chrome);

// Configured Chrome driver
WebDriver driver = DriverFactory.getNewLocalDriver(
    LocalDriverType.Chrome,
    HeadlessMode.False,
    PrivateMode.True,
    PageLoadStrategyMode.Normal,
    WebSecurityMode.SecureMode,
    SandboxMode.Sandbox
);
```

### Remote Web Driver

```java
// Remote driver with Selenium Grid
WebDriver driver = DriverFactory.getNewRemoteDriver(
    RemoteDriverType.Remote_Chrome,
    new URL("http://localhost:4444"),
    capabilities
);
```

## Mobile Driver Creation

```java
// Android local driver
AndroidDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.Android,
    new URL("http://localhost:4723"),
    capabilities
);

// iOS local driver
IOSDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.IOS,
    new URL("http://localhost:4723"),
    capabilities
);
```

### Cloud Mobile Driver

Ellithium natively supports executing mobile tests on cloud provider device farms. It automatically nests W3C-compliant provider options under the correct key (`bstack:options`, `sauce:options`, `lt:options`) and accepts credentials directly or via environment variables.

#### Supported Cloud Providers

| `CloudProviderType` | Service | Default Hub |
|---|---|---|
| `BROWSERSTACK` | BrowserStack | `hub-cloud.browserstack.com/wd/hub` |
| `SAUCE_LABS` | Sauce Labs | `ondemand.us-west-1.saucelabs.com/wd/hub` |
| `LAMBDATEST` | LambdaTest | `mobile-hub.lambdatest.com/wd/hub` |
| `LOCAL` | Local Appium | `http://127.0.0.1:4723` |

#### Fluent Builder Example

```java
// BrowserStack Android — full builder pattern
CloudMobileDriverConfig cloudConfig = new CloudMobileDriverConfig()
    .setCloudProvider(CloudProviderType.BROWSERSTACK)
    .setUsername(System.getenv("BROWSERSTACK_USERNAME"))
    .setAccessKey(System.getenv("BROWSERSTACK_ACCESS_KEY"))
    .setDriverType(MobileDriverType.Android)
    .setApp("bs://your-app-id")
    .setDeviceName("Samsung Galaxy S23")
    .setPlatformVersion("13.0")
    .setProjectName("My Project")
    .setBuildName("Build 1.0")
    .setTestName("Login Test")
    .setVideoRecording(true);

AndroidDriver driver = DriverFactory.getNewDriver(cloudConfig);

// LambdaTest iOS
CloudMobileDriverConfig ltConfig = new CloudMobileDriverConfig()
    .setCloudProvider(CloudProviderType.LAMBDATEST)
    .setUsername(System.getenv("LT_USERNAME"))
    .setAccessKey(System.getenv("LT_ACCESS_KEY"))
    .setDriverType(MobileDriverType.IOS)
    .setApp("lt://your-app-id")
    .setDeviceName("iPhone 14")
    .setPlatformVersion("16");

IOSDriver iosDriver = DriverFactory.getNewDriver(ltConfig);
```

Credentials are never hard-coded — use environment variables (`BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY`, `LT_USERNAME`, `LT_ACCESS_KEY`, etc.) and read them with `System.getenv()`.

For a custom Sauce Labs data center, call `.setCustomHost("ondemand.eu-central-1.saucelabs.com")` to override the default hub host.

#### Full Builder Method Reference

All builder methods return `this` for fluent chaining.

| Method | Description |
|---|---|
| `setCloudProvider(CloudProviderType)` | Select the cloud provider; updates the hub URL automatically. |
| `setUsername(String)` | Provider account username or user key. |
| `setAccessKey(String)` | Provider access / auth key. |
| `setDriverType(MobileDriverType)` | `Android` or `IOS`. |
| `setApp(String)` | App URL / cloud storage ID (e.g., `bs://app-id`). |
| `setDeviceName(String)` | Device name as shown in the provider's device list. |
| `setPlatformVersion(String)` | OS version string (e.g., `"13.0"`, `"16"`). |
| `setAutomationName(String)` | Appium automation backend; defaults are `UiAutomator2` / `XCUITest`. |
| `setProjectName(String)` | Logical project label for grouping runs in the provider dashboard. |
| `setBuildName(String)` | CI build label (e.g., `"v2.1.0-rc1"`). |
| `setTestName(String)` | Individual test or scenario name. |
| `setVideoRecording(boolean)` | Enable cloud-side video capture. |
| `setScreenshots(boolean)` | Enable cloud-side screenshot capture during execution. |
| `setRealDevice(boolean)` | `true` = real device; `false` = emulator/simulator. |
| `setDeviceOrientation(String)` | `"portrait"` or `"landscape"`. |
| `setLocalTesting(boolean)` | Enable the provider's local tunnel (BrowserStack Local, Sauce Tunnel, or LambdaTest Tunnel) for apps that access internal/localhost resources. |
| `setNetworkProfile(String)` | Simulate a network condition; e.g., `"4g-lte"`, `"3g"`, `"edge"`. |
| `setGeoLocation(String)` | ISO country code for geo-fencing tests; e.g., `"US"`, `"UK"`, `"FR"`. |
| `setAppiumVersion(String)` | Pin the Appium version on the cloud grid; e.g., `"2.0.0"`. |
| `setCustomHost(String)` | Override the default hub host for custom data centers or enterprise instances. |
| `addProviderOption(String, Object)` | Inject any arbitrary provider-specific capability key/value pair. |

## Configuration Builder Pattern

Starting from version 2.0.3, Ellithium supports a fluent builder pattern for driver configuration:

```java
// Local driver config
LocalDriverConfig config = new LocalDriverConfig(
    LocalDriverType.Chrome,
    HeadlessMode.False,
    PrivateMode.False,
    PageLoadStrategyMode.Normal,
    WebSecurityMode.SecureMode,
    SandboxMode.Sandbox
);
WebDriver driver = DriverFactory.getNewDriver(config);

// Mobile local driver config
MobileDriverConfig mobileConfig = new MobileDriverConfig(
    MobileDriverType.Android,
    new URL("http://localhost:4723"),
    capabilities
);
AndroidDriver mobileDriver = DriverFactory.getNewDriver(mobileConfig);

// Cloud Mobile driver config — quickest form: provider + credentials + driver type
CloudMobileDriverConfig cloudConfig = new CloudMobileDriverConfig(
    CloudProviderType.SAUCE_LABS,
    System.getenv("SAUCE_USERNAME"),
    System.getenv("SAUCE_ACCESS_KEY"),
    MobileDriverType.IOS
);
IOSDriver iosCloudDriver = DriverFactory.getNewDriver(cloudConfig);
```

## Driver Management

```java
// Get current thread's driver
WebDriver currentDriver = DriverFactory.getCurrentDriver();

// Check if driver is actively bound and alive on current thread/scope
boolean alive = DriverFactory.isDriverAlive();

// Quit and cleanup
DriverFactory.quitDriver();
```

## Declarative Test Fixtures (`@WithDriver`)

Ellithium provides declarative test fixtures via the [`@WithDriver`](file:///C:/Users/lenovo/IdeaProjects/Ellithium-projects/Ellithium/src/main/java/Ellithium/core/execution/fixtures/WithDriver.java) annotation and [`DriverFixtureProvider`](file:///C:/Users/lenovo/IdeaProjects/Ellithium-projects/Ellithium/src/main/java/Ellithium/core/execution/fixtures/DriverFixtureProvider.java). This completely eliminates boilerplate `@BeforeMethod` and `@AfterMethod` lifecycle code, automatically instantiating thread-safe drivers, injecting interaction utilities directly into test parameters, and closing sessions after test execution.

### Key Capabilities

- **Class or Method Scoping**: Annotate the test class to provide a default configuration for all test methods, or annotate individual methods to override browser type, headless mode, or flags.
- **Direct Parameter Injection**: Test methods can declare any combination of strongly-typed interaction classes as parameters. Ellithium's fixture provider resolves and injects them automatically.
- **Automatic Lifecycle Cleanup**: With `autoQuit = true` (default), the driver is cleanly terminated and evicted upon test completion.
- **Seamless TestNG Integration**: Automatically wired by Ellithium's `CustomTestNGListener`, or explicitly bound using `DriverFixtureProvider.FIXTURE_DATA_PROVIDER`.

### Supported Injectable Parameters

You can declare any of the following types as parameters in your `@WithDriver` test methods in any order:

| Injectable Type | Description |
|---|---|
| `WebDriver` | The active, thread-safe browser driver instance. |
| `DriverActions<WebDriver>` | Root action container wrapping the active session. |
| `ElementActions` | High-level DOM interaction engine (clicks, inputs, hover, transparent Shadow DOM). |
| `WaitActions` | Explicit and dynamic synchronization utilities. |
| `NavigationActions` | URL navigation, back/forward history, and page refresh operations. |
| `MouseActions` | Advanced mouse movements, drag-and-drop, context clicks, and offsets. |
| `JavaScriptActions` | Asynchronous and synchronous JavaScript script executions. |
| `AlertActions` | Browser modal dialog interactions (accept, dismiss, send prompt text). |
| `SelectActions` | HTML `<select>` dropdown handling (by visible text, value, or index). |
| `WindowActions` | Multi-window, browser tab switching, and sizing controls. |
| `FrameActions` | Iframe switching (by name, ID, index, or locator). |
| `CookieActions` | Browser cookie inspection, injection, and deletion. |
| `NetworkActions` | WebDriver BiDi network interception, auth handling, and request mocking. |
| `Sleep` | Fluent pause and sleep helpers. |
| `LocalDriverConfig` | The underlying resolved configuration object. |
| `ITestContext` | TestNG execution context. |

### Example: Declarative Fixture Injection

```java
import Ellithium.Utilities.interactions.ElementActions;
import Ellithium.Utilities.interactions.WaitActions;
import Ellithium.Utilities.interactions.NetworkActions;
import Ellithium.core.driver.LocalDriverType;
import Ellithium.core.execution.fixtures.WithDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;

// Class-level defaults: Chrome headless
@WithDriver(type = LocalDriverType.Chrome, headless = true)
public class CheckoutFixtureTest {

    private final By searchBox = By.id("search");
    private final By submitBtn = By.cssSelector("button[type='submit']");

    // Injects ElementActions and WaitActions automatically — zero @BeforeMethod needed!
    @Test
    public void testProductSearch(ElementActions elements, WaitActions waits) {
        elements.type(searchBox, "Mechanical Keyboard");
        elements.click(submitBtn);
        waits.waitVisibilityOfElementLocated(By.className("product-card"));
    }

    // Method-level override: executes on Firefox with full browser UI
    @Test
    @WithDriver(type = LocalDriverType.FireFox, headless = false)
    public void testPaymentGateway(WebDriver driver, ElementActions elements, NetworkActions network) {
        // Intercept and mock payment confirmation
        network.mockJsonResponse(
            url -> url.contains("/api/v1/payment"),
            200,
            "{\"status\": \"PAID\", \"transactionId\": \"tx-98765\"}"
        );

        elements.click(By.id("pay-now-button"));
        elements.assertElementIsDisplayed(By.id("payment-success-badge"));
    }
}
```

## Java 25 Scoped Values: `runWithDriver`

Ellithium leverages Java 25's modern concurrency primitives (`ScopedValue`) through [`DriverFactory.runWithDriver(...)`](file:///C:/Users/lenovo/IdeaProjects/Ellithium-projects/Ellithium/src/main/java/Ellithium/core/driver/DriverFactory.java#L781-L798).

In modern multithreaded test suites and virtual thread architectures (`Thread.ofVirtual()`), traditional `ThreadLocal` storage can lead to memory leaks or broken context propagation across structured tasks. `DriverFactory.runWithDriver` binds the driver and configuration immutably to a Java 25 `ScopedValue` context:

```java
import Ellithium.core.driver.DriverFactory;
import Ellithium.core.driver.LocalDriverConfig;
import Ellithium.core.driver.LocalDriverType;
import org.openqa.selenium.WebDriver;

LocalDriverConfig config = new LocalDriverConfig(LocalDriverType.Chrome);
WebDriver driver = DriverFactory.getNewDriver(config);

// Run a code block within an immutable ScopedValue context
DriverFactory.runWithDriver(driver, config, () -> {
    // Child virtual threads and StructuredTaskScope workers safely inherit the driver
    Thread.ofVirtual().start(() -> {
        WebDriver scopedDriver = DriverFactory.getCurrentDriver();
        scopedDriver.get("https://example.com");
    });
});
// Driver context is automatically unbound and cleaned up deterministically upon scope exit
```

### Health Check: `DriverFactory.isDriverAlive()`

You can non-destructively check whether an active browser session exists and is responsive without throwing unexpected `NoSuchSessionException` or `NullPointerException` errors:

```java
if (DriverFactory.isDriverAlive()) {
    WebDriver driver = DriverFactory.getCurrentDriver();
    // Safe to perform driver-level actions
}
```


## Default Configuration Values

When not explicitly specified, the following default values are used:

| Option | Default Value | Description |
|--------|--------------|-------------|
| HeadlessMode | false | Browser headless mode (not supported with Safari) |
| PageLoadStrategy | Normal | Page load strategy (Normal or Eager) |
| PrivateMode | False | Private/Incognito mode |
| SandboxMode | Sandbox | Browser sandbox mode (not supported with Safari) |
| WebSecurityMode | True | Web security settings (not supported with Safari) |
