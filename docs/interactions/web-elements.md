---
sidebar_position: 2
id: interactions
title: Interaction Classes
slug: /interactions/interactions
---

# Element Interactions Overview

The `DriverActions` class provides a unified API for Web and Mobile interactions through various specialized interfaces.

## Available Interaction Types

Ellithium provides specialized interaction modules for different types of actions:

```java
DriverActions actions = new DriverActions(driver);

// Access different interaction modules
actions.elements()    // Element interactions (click, type, etc.)
actions.JSActions()   // JavaScript operations
actions.alerts()      // Alert handling
actions.frames()      // Frame switching and interactions
actions.windows()     // Window management
actions.waits()       // Wait utilities
actions.select()      // Dropdown select operations
actions.navigation()  // Browser navigation
actions.mouse()       // Mouse operations
actions.keyPress()    // Keyboard operations
actions.sleep()       // Thread sleep utilities
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
- [Key Press Actions](/interactions/key-press-actions) - Keyboard operations
- [Select Actions](select-actions) - Dropdown handling
- [Screen Recorder Actions](screen-recorder-actions) - Video recording

## Element Interactions

The most commonly used module for working with web elements:

```java
// Basic element interactions
actions.elements().clickOnElement(By.id("submitButton"));
actions.elements().sendData(By.id("username"), "testuser");
actions.elements().waitForElementToBeVisible(By.id("loading"));

// Element state verification
actions.elements().isElementDisplayed(By.id("status"));
actions.elements().isElementPresent(By.id("element"));
actions.elements().isElementEnabled(By.id("button"));

// Element text operations
String text = actions.elements().getElementText(By.id("message"));
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
// Window operations
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
// Wait operations
actions.waits().waitForTitleContains("Home Page");
actions.waits().waitForUrlContains("dashboard");
actions.waits().waitForNumberOfWindowsToBe(2);
actions.waits().waitForElementAttributeToBe(By.id("status"), "class", "active");
```

## Timeout Handling

Most methods support optional timeout parameters for flexibility:

```java
// Default timeout
actions.elements().sendData(By.id("username"), "testuser");

// Custom timeout in seconds
actions.elements().sendData(By.id("username"), "testuser", 10);

// Custom timeout and polling interval in milliseconds
actions.elements().sendData(By.id("username"), "testuser", 10, 200);
```

## Navigation Operations

```java
// Navigation operations
actions.navigation().navigateToUrl("https://example.com");
actions.navigation().refreshPage();
actions.navigation().navigateBack();
actions.navigation().navigateForward();
```

## Keyboard and Mouse Operations

```java
// Mouse operations
actions.mouse().doubleClick(By.id("doubleClickElement"));
actions.mouse().rightClick(By.id("rightClickMenu"));
actions.mouse().moveToElement(By.id("hoverMenu"));
actions.mouse().dragAndDrop(By.id("source"), By.id("target"));

// Keyboard operations
actions.keyPress().pressKey(Keys.ESCAPE);
actions.keyPress().pressAndHoldKey(Keys.CONTROL); 
actions.keyPress().typeWithModifier(Keys.CONTROL, "a"); // Ctrl+A
```

## Example Page Implementation

```java
public class LoginPage {
    private final DriverActions actions;
    private final By usernameField = By.id("username");
    private final By passwordField = By.id("password");
    private final By loginButton = By.id("login");

    public LoginPage(WebDriver driver) {
        this.actions = new DriverActions(driver);
    }

    public void login(String username, String password) {
        actions.elements().sendData(usernameField, username);
        actions.elements().sendData(passwordField, password);
        actions.elements().clickOnElement(loginButton);
    }
}
```
