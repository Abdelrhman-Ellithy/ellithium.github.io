---
sidebar_position: 9
---

# Window Actions

The `WindowActions` class provides methods for managing browser windows and tabs. It's accessed via the `windows()` method of the `DriverActions` class.

## Basic Window Operations

```java
DriverActions actions = new DriverActions(driver);

// Get current window handle
String currentHandle = actions.windows().getCurrentWindowHandle();

// Get all window handles
List<String> allHandles = actions.windows().getAllWindowHandles();

// Get number of open windows
int windowCount = actions.windows().getNumberOfWindows();

// Switch to a window by its title
actions.windows().switchToNewWindow("Window Title");

// Switch to a window by its index
actions.windows().switchToWindowByIndex(1); // Switch to second window

// Switch to the most recently opened window
actions.windows().switchToLastWindow();

// Switch back to original window
actions.windows().switchToOriginalWindow(currentHandle);
```

## Window Size and Position

```java
// Maximize the browser window
actions.windows().maximizeWindow();

// Minimize the browser window
actions.windows().minimizeWindow();

// Set browser to fullscreen mode
actions.windows().fullscreenWindow();

// Set window size
actions.windows().setWindowSize(1024, 768);

// Set window position (x, y coordinates)
actions.windows().setWindowPosition(100, 100);

// Get window size
Dimension size = actions.windows().getWindowSize();

// Get window position
Point position = actions.windows().getWindowPosition();
```

## Managing Multiple Windows

```java
// Close current window
actions.windows().closeCurrentWindow();

// Close all windows except the main one
actions.windows().closeAllExceptMain();

// Check if a window with specific title exists
boolean exists = actions.windows().doesWindowExist("Window Title");
```

## Popup Windows

```java
// Switch to popup window by title with default timeout
actions.windows().switchToPopupWindow("Popup Title");

// Or provide custom timeout and polling
actions.windows().switchToPopupWindow("Popup Title", 10, 200);

// Close popup window and switch back to main window
actions.windows().closePopupWindow();
```

## Waiting for Windows

```java
// Wait for specific number of windows
actions.windows().waitForNumberOfWindowsToBe(2); // Wait for 2 windows

// With custom timeout
actions.windows().waitForNumberOfWindowsToBe(2, 10); // 10 seconds

// With custom timeout and polling
actions.windows().waitForNumberOfWindowsToBe(2, 10, 200); // 10 seconds, 200ms polling
```

## Practical Examples

### Working with Multiple Windows

```java
public void handleMultipleWindows() {
    DriverActions actions = new DriverActions(driver);
    
    // Store original window handle
    String mainWindow = actions.windows().getCurrentWindowHandle();
    
    // Click element that opens new window/tab
    actions.elements().clickOnElement(By.id("openNewWindow"), 10, 200);
    
    // Wait for new window to open
    actions.windows().waitForNumberOfWindowsToBe(2);
    
    // Switch to new window
    actions.windows().switchToLastWindow();
    
    // Perform actions in new window
    actions.elements().sendData(By.id("searchField"), "test query", 10, 200);
    actions.elements().clickOnElement(By.id("searchButton"), 10, 200);
    
    // Close new window
    actions.windows().closeCurrentWindow();
    
    // Switch back to main window
    actions.windows().switchToOriginalWindow(mainWindow);
    
    // Verify we're back in main window
    actions.waits().waitForElementToBeVisible(By.id("mainPageElement"), 10, 200);
}
```

### Handling Popup Windows

```java
public void handlePopupWindow() {
    DriverActions actions = new DriverActions(driver);
    
    // Click element that opens popup
    actions.elements().clickOnElement(By.id("openPopup"));
    
    // Switch to popup window
    actions.windows().switchToPopupWindow("Terms and Conditions", 10, 200);
    
    // Scroll to bottom of popup content
    actions.JSActions().scrollToElement(By.id("agreeButton"));
    
    // Click agree button
    actions.elements().clickOnElement(By.id("agreeButton"), 10, 200);
    
    // Popup closes automatically, so we're back to main window
    // Verify we're back in main window
    actions.waits().waitForElementToBeVisible(By.id("thankYouMessage"), 10, 200);
} 