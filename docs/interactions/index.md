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
| [Element Actions](/interactions/element-actions) | `actions.elements()` | Basic element interactions (click, type, etc.) |
| [JavaScript Actions](/interactions/javascript-actions) | `actions.JSActions()` | JavaScript operations |
| [Alert Actions](/interactions/alert-actions) | `actions.alerts()` | Alert dialog handling |
| [Frame Actions](/interactions/frame-actions) | `actions.frames()` | iFrame operations |
| [Mouse Actions](/interactions/mouse-actions) | `actions.mouse()` | Advanced mouse operations |
| [Navigation Actions](/interactions/navigation-actions) | `actions.navigation()` | Browser navigation |
| [Wait Actions](/interactions/wait-actions) | `actions.waits()` | Specialized wait conditions |
| [Window Actions](/interactions/window-actions) | `actions.windows()` | Window management |
| [Key Press Actions](/interactions/key-press-actions) | `actions.keyPress()` | Keyboard interactions |
| [Select Actions](/interactions/select-actions) | `actions.select()` | Dropdown operations |
| [Screen Recorder Actions](/interactions/screen-recorder-actions) | `screenRecorderActions` | Video recording of test sessions |
| [Android Actions](/interactions/android-actions) | `actions.androidActions()` | Android-specific mobile gestures |
| [iOS Actions](/interactions/ios-actions) | `actions.iosActions()` | iOS-specific mobile gestures |

For a more detailed overview with code examples, see the [Interactions Overview](/interactions/interactions) page.

## Getting Started with Interactions

Here's a simple example that demonstrates the fluent interface for interactions:

```java
// Initialize driver actions
DriverActions actions = new DriverActions(driver);

// Navigate to URL
actions.navigation().navigateToUrl("https://example.com/login");

// Fill login form
actions.elements().sendData(By.id("username"), "testuser");
actions.elements().sendData(By.id("password"), "password123");

// Click login button
actions.elements().clickOnElement(By.id("loginButton"));

// Wait for successful login
actions.waits().waitForUrlContains("/dashboard");
actions.elements().waitForElementToBeVisible(By.id("welcomeMessage"));
```

## Web vs. Mobile Interactions

Most interaction classes work identically for both web and mobile testing, allowing you to use the same API across different platforms. 

### Mobile-Specific Actions

For mobile testing, you can access platform-specific gesture actions:

```java
// Android-specific gestures
if (driver instanceof AppiumDriver) {
    actions.androidActions().swipe(element, "left", 0.75f, 0.5f);
    actions.androidActions().pinch(element, 2.0f);
    actions.androidActions().longClickGesture(element, 2000);
}

// iOS-specific gestures
if (driver instanceof AppiumDriver) {
    actions.iosActions().swipe("left", element);
    actions.iosActions().pinch(element, 2.0f);
    actions.iosActions().longPress(element, 2000);
}
```

For more detailed mobile testing information, check the [Mobile Testing](/mobile-testing) documentation. 