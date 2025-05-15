---
sidebar_position: 5
---

# Frame Actions

The `FrameActions` class provides methods for interacting with iframes and frames on web pages. It's accessed via the `frames()` method of the `DriverActions` class.

## Basic Frame Operations

```java
DriverActions actions = new DriverActions(driver);

// Switch to a frame by locator
actions.frames().switchToFrame(By.id("myIframe"));

// Switch to frame by index
actions.frames().switchToFrameByIndex(0); // First frame on the page

// Switch to frame by name or ID
actions.frames().switchToFrameByNameOrId("frameNameOrId");

// Switch back to the main document content
actions.frames().switchToDefaultContent();

// Switch to parent frame
actions.frames().switchToParentFrame();
```

## Waiting for Frames

These methods automatically wait for frames to be available:

```java
// With custom timeout (10 seconds)
actions.frames().switchToFrame(By.id("dynamicFrame"), 10);

// With custom timeout (10 seconds) and polling interval (200ms)
actions.frames().switchToFrame(By.id("dynamicFrame"), 10, 200);
```

## Frame Element Interactions

To interact with elements inside a frame:

```java
// Switch to frame
actions.frames().switchToFrame(By.id("loginFrame"));

// Now interact with elements inside the frame
actions.elements().sendData(By.id("username"), "testuser");
actions.elements().sendData(By.id("password"), "password123");
actions.elements().clickOnElement(By.id("loginButton"));

// Switch back to main document
actions.frames().switchToDefaultContent();
```

## Handling Nested Frames

For nested frames, you need to switch into each level:

```java
// Switch to outer frame
actions.frames().switchToFrame(By.id("outerFrame"));

// Switch to nested frame
actions.frames().switchToFrame(By.id("innerFrame"));

// Interact with elements in the inner frame
actions.elements().clickOnElement(By.id("button"));

// Go back to parent frame
actions.frames().switchToParentFrame();

// Go back to main document
actions.frames().switchToDefaultContent();
```

## Practical Example

```java
public void fillFormInFrame() {
    DriverActions actions = new DriverActions(driver);
    
    // Wait for frame to be available and switch to it
    actions.frames().switchToFrame(By.id("registrationFrame"));
    
    // Fill out the form inside the frame
    actions.elements().sendData(By.id("firstName"), "John");
    actions.elements().sendData(By.id("lastName"), "Doe");
    actions.elements().sendData(By.id("email"), "john.doe@example.com");
    actions.elements().clickOnElement(By.id("submitButton"));
    
    // Switch back to main content to see confirmation
    actions.frames().switchToDefaultContent();
    
    // Verify confirmation message in main page
    actions.elements().waitForElementToBeVisible(By.id("confirmationMessage"));
}
``` 