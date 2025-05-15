---
sidebar_position: 4
---

# Alert Actions

The `AlertActions` class provides methods for interacting with browser alerts, confirms, and prompts. It's accessed via the `alerts()` method of the `DriverActions` class.

## Basic Alert Operations

```java
DriverActions actions = new DriverActions(driver);

// Accept an alert (click OK)
actions.alerts().accept();

// Dismiss an alert (click Cancel)
actions.alerts().dismiss();

// Get alert text
String alertText = actions.alerts().getText();

// Send text to an alert (for prompts)
actions.alerts().sendData("User input text");
```

## With Custom Timeouts

All alert methods support optional timeout parameters:

```java
// With custom timeout (10 seconds)
actions.alerts().accept(10);

// With custom timeout (10 seconds) and polling interval (200ms)
actions.alerts().accept(10, 200);

// Get text with timeout
String alertText = actions.alerts().getText(5);

// Send text with timeout
actions.alerts().sendData("User input", 5, 200);
```

## Waiting for Alerts

The methods automatically wait for alerts to be present:

```java
// This will wait for the alert using default timeout
// If no alert appears, it will throw a TimeoutException
actions.alerts().accept();
```

## Practical Example

```java
public void handleConfirmation(boolean accept) {
    DriverActions actions = new DriverActions(driver);
    
    // Click a button that triggers a confirmation dialog
    actions.elements().clickOnElement(By.id("confirmButton"));
    
    // Get the text to verify it's the expected alert
    String confirmText = actions.alerts().getText();
    System.out.println("Confirmation message: " + confirmText);
    
    // Accept or dismiss based on parameter
    if (accept) {
        actions.alerts().accept();
    } else {
        actions.alerts().dismiss();
    }
    
    // Wait for the result message after handling the alert
    actions.elements().waitForElementToBeVisible(By.id("result"));
}
``` 