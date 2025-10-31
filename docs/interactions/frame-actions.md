---
sidebar_position: 5
---

# Frame Actions

The `FrameActions` class provides methods for interacting with iframes and frames on web pages. It's accessed via the `frames()` method of the `DriverActions` class.

## Switching to Frames

```java
DriverActions actions = new DriverActions(driver);

// By index (0-based)
actions.frames().switchToFrameByIndex(0);

// By name or id
actions.frames().switchToFrameByNameOrID("frameNameOrId");

// By locator
actions.frames().switchToFrameByElement(By.id("myIframe"));

// Back to main document
actions.frames().switchToDefaultContent();
```

## Waiting for Frames and Switching

```java
// Wait for frame by locator and switch
actions.frames().waitForFrameToBeAvailableAndSwitchToIt(By.id("dynamicFrame"), 10, 200);

// Wait for frame by name/id and switch
actions.frames().waitForFrameByNameOrIdToBeAvailableAndSwitchToIt("frameName", 10, 200);

// Wait for frame by index and switch
actions.frames().waitForFrameByIndexToBeAvailableAndSwitchToIt(1, 10, 200);
```

Overloads with default timeouts are also available for each of the above.

## Frame Element Interactions

```java
// Switch to frame by element
actions.frames().switchToFrameByElement(By.id("loginFrame"));

// Now interact with elements inside the frame
actions.elements().sendData(By.id("username"), "testuser");
actions.elements().sendData(By.id("password"), "password123");
actions.elements().clickOnElement(By.id("loginButton"));

// Back to main content
actions.frames().switchToDefaultContent();
```

## Handling Nested Frames

```java
// Outer frame
actions.frames().switchToFrameByElement(By.id("outerFrame"));

// Inner frame
actions.frames().switchToFrameByElement(By.id("innerFrame"));

// Do work inside inner frame
actions.elements().clickOnElement(By.id("button"), 10, 200);

// Return to main document
actions.frames().switchToDefaultContent();
```

## Practical Example

```java
public void fillFormInFrame() {
    DriverActions actions = new DriverActions(driver);
    
    actions.frames().waitForFrameToBeAvailableAndSwitchToIt(By.id("registrationFrame"), 10, 200);
    
    actions.elements().sendData(By.id("firstName"), "John", 10, 200);
    actions.elements().sendData(By.id("lastName"), "Doe", 10, 200);
    actions.elements().sendData(By.id("email"), "john.doe@example.com", 10, 200);
    actions.elements().clickOnElement(By.id("submitButton"), 10, 200);
    
    actions.frames().switchToDefaultContent();
    
    actions.waits().waitForElementToBeVisible(By.id("confirmationMessage"), 10, 200);
}
``` 