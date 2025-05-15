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
// Android driver
AndroidDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.Android,
    new URL("http://localhost:4723"),
    capabilities
);

// iOS driver
IOSDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.IOS,
    new URL("http://localhost:4723"),
    capabilities
);
```

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

// Mobile driver config
MobileDriverConfig mobileConfig = new MobileDriverConfig(
    MobileDriverType.Android,
    new URL("http://localhost:4723"),
    capabilities
);
AndroidDriver driver = DriverFactory.getNewDriver(mobileConfig);
```

## Driver Management

```java
// Get current thread's driver
WebDriver currentDriver = DriverFactory.getCurrentDriver();

// Quit and cleanup
DriverFactory.quitDriver();
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
