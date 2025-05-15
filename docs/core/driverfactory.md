---
sidebar_position: 1
id: driverfactory
title: Driver Factory
slug: /core/driverfactory
---

# Driver Factory

:::note
This documentation has been moved to the [main Driver Factory page](/driverfactory).
Please update your bookmarks.
:::

[Go to Driver Factory Documentation →](/driverfactory)

The `DriverFactory` class is a thread-safe factory for managing WebDriver instances. It supports web and mobile automation through a unified API.

## Web Driver Creation

### Local Web Driver

```java
// Basic Chrome driver
WebDriver driver = DriverFactory.getNewLocalDriver(LocalDriverType.Chrome);

// Full configuration
WebDriver driver = DriverFactory.getNewLocalDriver(
    LocalDriverType.Chrome,
    HeadlessMode.True,
    PrivateMode.True,
    PageLoadStrategyMode.Normal,
    WebSecurityMode.SecureMode,
    SandboxMode.Sandbox
);
```

### Remote Web Driver

```java
// Basic remote driver
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
