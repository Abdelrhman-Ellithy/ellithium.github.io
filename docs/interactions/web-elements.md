---
sidebar_position: 2
id: interactions
title: Interaction Classes
slug: /interactions/interactions
---

# Element Interactions Overview

`DriverActions` provides a unified API entry point to specialized interaction modules.

## Available Interaction Types

Ellithium provides specialized interaction modules for different types of actions:

```java
DriverActions actions = new DriverActions(driver);

// Access modules
actions.elements();     // Element interactions (click, type, text, attributes)
actions.JSActions();    // JavaScript operations
actions.alerts();       // Alert handling
actions.frames();       // Frame switching and waits
actions.windows();      // Window management
actions.waits();        // Wait utilities
actions.select();       // Native <select> dropdowns
actions.navigation();   // Browser navigation
actions.mouse();        // Mouse operations

// Mobile-specific
actions.androidActions();  // Android gestures & key events
actions.iosActions();      // iOS gestures
```

## Detailed Documentation

Each interaction type has its own detailed documentation:

- [Element Actions](element-actions) - Core element interactions
- [JavaScript Actions](javascript-actions) - Browser JavaScript execution
- [Alert Actions](alert-actions) - Dialog handling
- [Frame Actions](frame-actions) - Working with iframes
- [Mouse Actions](mouse-actions) - Advanced mouse operations
- [Navigation Actions](navigation-actions) - Page navigation
- [Wait Actions](wait-actions) - Synchronization utilities
- [Window Actions](window-actions) - Window management
- [Key Press Actions](key-press-actions) - Android key events
- [Select Actions](select-actions) - Dropdown handling
- [Screen Recorder Actions](screen-recorder-actions) - Video recording
- [Android Actions](android-actions) - Android gestures
- [iOS Actions](ios-actions) - iOS gestures

## Element Interactions

The most commonly used module for working with web elements:

```java
// Basic element interactions
actions.elements().clickOnElement(By.id("submitButton"));
actions.elements().sendData(By.id("username"), "testuser");

// Text
String text = actions.elements().getText(By.id("message"));

// Attributes
String href = actions.elements().getAttributeValue(By.cssSelector("a"), "href");

// Collections
List<String> titles = actions.elements().getTextFromMultipleElements(By.cssSelector(".title"));
```

## JavaScript Operations

For situations where standard WebDriver methods aren't sufficient:

```java
// JavaScript operations
actions.JSActions().javascriptClick(By.id("submitButton"));
actions.JSActions().scrollToElement(By.id("elementAtBottom"));
actions.JSActions().scrollByOffset(0, 500);
actions.JSActions().setElementValueUsingJS(By.id("username"), "testuser");
actions.JSActions().uploadFileUsingJS(By.id("fileInput"), "C:/path/to/file.txt");
```

## Alert Handling

```java
// Alert operations
actions.alerts().accept(10, 200);  // Wait up to 10 seconds, polling every 200ms
actions.alerts().dismiss();
String alertText = actions.alerts().getText();
actions.alerts().sendData("Alert input text");
```

## Window Management

```java
actions.windows().switchToNewWindow("Window Title");
actions.windows().maximizeWindow();
actions.windows().closeCurrentWindow();
actions.windows().switchToPopupWindow("Popup Title");
actions.windows().setWindowSize(1024, 768);
actions.windows().switchToWindowByIndex(1);
```

## Wait Operations

In addition to element-specific waits, Ellithium provides general wait operations:

```java
actions.waits().waitForTitleContains("Home Page");
actions.waits().waitForUrlContains("dashboard");
actions.waits().waitForNumberOfWindowsToBe(2);
actions.waits().waitForElementAttributeToBe(By.id("status"), "class", "active");
```

## Timeout Handling

Most methods offer overloads with default timeout/polling and explicit control:

```java
// Default timeout
actions.elements().sendData(By.id("username"), "testuser");

// Custom timeout in seconds
actions.elements().sendData(By.id("username"), "testuser", 10);

// Custom timeout and polling
actions.elements().sendData(By.id("username"), "testuser", 10, 200);
```

## Navigation Operations

```java
actions.navigation().navigateToUrl("https://example.com");
actions.navigation().refreshPage();
actions.navigation().navigateBack();
actions.navigation().navigateForward();
```

## Mobile Modules

```java
// Android gestures
actions.androidActions().swipeGesture(100, 1200, 900, 1200, 300);

// iOS gestures
actions.iosActions().tap(120f, 220f);
```
