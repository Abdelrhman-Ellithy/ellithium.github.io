---
sidebar_position: 1
id: index
title: Interaction Classes Overview
slug: /interactions
---

# Ellithium Interaction Classes

Ellithium provides a comprehensive set of interaction classes that offer a unified API for both web and mobile testing. These classes handle synchronization, waiting, and error reporting automatically, making test development more efficient and reliable.

## Core Concept: DriverActions

The `DriverActions` class is the main entry point to all interactions:

```java
DriverActions actions = new DriverActions(driver);
```

From this single point, you can access all the specialized interaction classes:

## Available Interaction Classes

| Interaction Class | Access Method | Description |
|------------------|---------------|-------------|
| [Element Actions](/interactions/element-actions) | `actions.elements()` | Basic element interactions (click, type, get text, etc.) |
| [JavaScript Actions](/interactions/javascript-actions) | `actions.JSActions()` | JavaScript operations |
| [Alert Actions](/interactions/alert-actions) | `actions.alerts()` | Alert dialog handling |
| [Frame Actions](/interactions/frame-actions) | `actions.frames()` | iFrame operations |
| [Mouse Actions](/interactions/mouse-actions) | `actions.mouse()` | Advanced mouse operations |
| [Navigation Actions](/interactions/navigation-actions) | `actions.navigation()` | Browser navigation |
| [Wait Actions](/interactions/wait-actions) | `actions.waits()` | Specialized wait conditions |
| [Window Actions](/interactions/window-actions) | `actions.windows()` | Window management |
| [Key Press Actions](/interactions/key-press-actions) | `actions.mobileActions()` | Android native key events (BACK, HOME, volume, etc.) |
| [Select Actions](/interactions/select-actions) | `actions.select()` | Dropdown operations |
| [Screen Recorder Actions](/interactions/screen-recorder-actions) | `new ScreenRecorderActions(driver)` | Video recording of test sessions |
| [Mobile Actions](/interactions/mobile-actions) | `actions.mobileActions()` | Cross-platform and native mobile gestures |
| [Cookie Actions](/interactions/cookie-actions) | `actions.cookies()` | Browser cookie management |

## Getting Started with Interactions

Here's a simple example that demonstrates the fluent interface for interactions:

```java
// Initialize driver actions
DriverActions actions = new DriverActions(driver);

// Navigate to URL
actions.navigation().navigateToUrl("https://example.com/login");

// Fill login form
actions.elements().sendData(By.id("username"), "testuser", 10, 500);
actions.elements().sendData(By.id("password"), "password123", 10, 500);

// Click login button
actions.elements().clickOnElement(By.id("loginButton"), 10, 500);

// Wait for successful login
actions.waits().waitForUrlContains("/dashboard", 10, 500);
actions.waits().waitForElementToBeVisible(By.id("welcomeMessage"), 10, 500);
```

## Web vs. Mobile Interactions

Most interaction classes work identically for both web and mobile testing, allowing you to use the same API across different platforms. For mobile-specific functionality or complex cross-platform touch gestures, use the `mobileActions()` method. 