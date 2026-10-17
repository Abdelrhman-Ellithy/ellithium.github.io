---
sidebar_position: 4
---

# Plugin Architecture (SPI)

Ellithium features a modern, zero-reflection native plugin architecture based on Java's standard [`ServiceLoader`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ServiceLoader.html) Service Provider Interface (SPI).

This allows developers and QA engineers to hook into test execution lifecycles, driver allocation events, and reporting backends without modifying framework internals or incurring reflection performance penalties.

## Why Zero-Reflection SPI?

- **Ahead-Of-Time (AOT) Native Image Ready**: Completely compatible with GraalVM Native Image compilation and instant cold starts without complex reflection-config JSON manifests.
- **Type-Safe & Decoupled**: Clean interface contracts with compile-time verification.
- **Priority-Ordered**: Plugins define their relative execution order via `getOrder()`.
- **Automatic Discovery**: Discovered automatically on the classpath via standard `META-INF/services/`.

---

## Core Plugin Interfaces

All plugins implement [`EllithiumPlugin`](file:///C:/Users/lenovo/IdeaProjects/Ellithium-projects/Ellithium/src/main/java/Ellithium/core/spi/EllithiumPlugin.java) or one of its specialized sub-interfaces:

```
EllithiumPlugin (Base contract)
 ├── DriverLifecyclePlugin  (Driver creation & quit events)
 ├── TestLifecyclePlugin    (Suite & test execution lifecycle)
 └── ReportingPlugin        (Log steps, attachments, & custom sinks)
```

### 1. `DriverLifecyclePlugin`

Monitors WebDriver allocations, configuration inspectability, and teardowns:

```java
package Ellithium.core.spi;

import Ellithium.core.driver.DriverConfiguration;
import org.openqa.selenium.WebDriver;

public interface DriverLifecyclePlugin extends EllithiumPlugin {
    default void onDriverCreated(WebDriver driver, DriverConfiguration config) {}
    default void onDriverQuit(WebDriver driver) {}
}
```

### 2. `TestLifecyclePlugin`

Listens to test suites, individual test methods, outcomes, and execution durations:

```java
package Ellithium.core.spi;

public interface TestLifecyclePlugin extends EllithiumPlugin {
    default void onSuiteStart(String suiteName) {}
    default void onSuiteFinish(String suiteName) {}
    default void onTestStart(String testId, String testName) {}
    default void onTestSuccess(String testId, String testName, long durationMs) {}
    default void onTestFailure(String testId, String testName, Throwable cause, long durationMs) {}
    default void onTestSkipped(String testId, String testName, Throwable cause) {}
}
```

### 3. `ReportingPlugin`

Receives real-time log steps, screenshots, videos, and diagnostic telemetry payloads:

```java
package Ellithium.core.spi;

import Ellithium.core.logging.LogLevel;

public interface ReportingPlugin extends EllithiumPlugin {
    default void logStep(String stepName, LogLevel level, String details) {}
    default void attachArtifact(String name, String mimeType, byte[] data) {}
    default void flush() {}
}
```

---

## Creating a Custom Plugin

### Example: Execution Audit & Metrics Plugin

Create a class implementing the desired plugin interface:

```java
package com.company.automation.plugins;

import Ellithium.core.driver.DriverConfiguration;
import Ellithium.core.spi.DriverLifecyclePlugin;
import Ellithium.core.spi.TestLifecyclePlugin;
import org.openqa.selenium.WebDriver;

public class PerformanceMetricsPlugin implements TestLifecyclePlugin, DriverLifecyclePlugin {

    @Override
    public String getName() {
        return "PerformanceMetricsPlugin";
    }

    @Override
    public int getOrder() {
        return 10; // Execution order (lower runs first)
    }

    @Override
    public void onInitialize() {
        System.out.println("[Plugin] PerformanceMetricsPlugin initialized.");
    }

    @Override
    public void onDriverCreated(WebDriver driver, DriverConfiguration config) {
        System.out.println("[Plugin] Driver spawned: " + config.getDriverType());
    }

    @Override
    public void onTestStart(String testId, String testName) {
        System.out.println("[Plugin] Test started: " + testName);
    }

    @Override
    public void onTestSuccess(String testId, String testName, long durationMs) {
        if (durationMs > 5000) {
            System.err.println("[WARN] Test " + testName + " was slow (" + durationMs + " ms)!");
        }
    }

    @Override
    public void onDriverQuit(WebDriver driver) {
        System.out.println("[Plugin] Driver quitting.");
    }
}
```

---

## Registering Plugins

### Option A: Standard Java SPI (Recommended)

Register the plugin using standard Java ServiceLoader files in `src/main/resources/META-INF/services/`:

Create the file:
`src/main/resources/META-INF/services/Ellithium.core.spi.DriverLifecyclePlugin`

Add the fully-qualified class name:
```
com.company.automation.plugins.PerformanceMetricsPlugin
```

Create the file:
`src/main/resources/META-INF/services/Ellithium.core.spi.TestLifecyclePlugin`

Add the fully-qualified class name:
```
com.company.automation.plugins.PerformanceMetricsPlugin
```

Upon framework startup, `PluginRegistry` automatically discovers and loads your plugin.

### Option B: Programmatic Registration

You can also register plugins programmatically at runtime before running your suites:

```java
import Ellithium.core.spi.PluginRegistry;
import com.company.automation.plugins.PerformanceMetricsPlugin;

PerformanceMetricsPlugin plugin = new PerformanceMetricsPlugin();
PluginRegistry.getInstance().registerPlugin(plugin);
```
