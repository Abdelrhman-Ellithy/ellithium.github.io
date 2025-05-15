---
sidebar_position: 6
id: web-testing
title: Web Testing
---

# Web Testing with Ellithium

Ellithium provides a comprehensive API for web browser automation, built on top of Selenium WebDriver. This page covers the core concepts and techniques for web testing.

## Setting Up WebDriver

The `DriverFactory` class is the entry point for creating WebDriver instances:

```java
// Basic Chrome setup
WebDriver driver = DriverFactory.getNewLocalDriver(LocalDriverType.Chrome);

// Configured Chrome setup
WebDriver driver = DriverFactory.getNewLocalDriver(
    LocalDriverType.Chrome,
    HeadlessMode.True,  // Run in headless mode
    PrivateMode.True,   // Use incognito/private mode
    PageLoadStrategyMode.Normal,
    WebSecurityMode.SecureMode,
    SandboxMode.Sandbox
);
```

Learn more in the [Driver Factory documentation](/driverfactory).

## Working with Web Elements

Ellithium's `DriverActions` class provides a unified API for all web interactions:

```java
// Initialize DriverActions
DriverActions actions = new DriverActions(driver);

// Navigate to a website
actions.navigation().navigateToUrl("https://example.com");

// Basic interactions
actions.elements().clickOnElement(By.id("submitButton"));
actions.elements().sendData(By.id("username"), "testuser");
actions.elements().waitForElementToBeVisible(By.id("loadingIndicator"));

// Verify element states
boolean isDisplayed = actions.elements().isElementDisplayed(By.id("statusMessage"));
String text = actions.elements().getElementText(By.id("result"));
```

For detailed information on all available interactions, see the [Interactions documentation](/interactions/interactions).

## Cross-Browser Testing

Ellithium supports multiple browsers out of the box:

```java
// Chrome
WebDriver chromeDriver = DriverFactory.getNewLocalDriver(LocalDriverType.Chrome);

// Firefox
WebDriver firefoxDriver = DriverFactory.getNewLocalDriver(LocalDriverType.Firefox);

// Edge
WebDriver edgeDriver = DriverFactory.getNewLocalDriver(LocalDriverType.Edge);

// Safari
WebDriver safariDriver = DriverFactory.getNewLocalDriver(LocalDriverType.Safari);
```

## Remote Web Testing

For executing tests on a Selenium Grid or cloud providers:

```java
// Remote Chrome through Selenium Grid
WebDriver remoteDriver = DriverFactory.getNewRemoteDriver(
    RemoteDriverType.Remote_Chrome,
    new URL("http://localhost:4444/wd/hub"),
    capabilities
);
```

## Page Object Pattern

Ellithium works seamlessly with the Page Object Model pattern:

```java
public class LoginPage {
    private final DriverActions actions;
    private final By usernameField = By.id("username");
    private final By passwordField = By.id("password");
    private final By loginButton = By.id("loginButton");
    
    public LoginPage(WebDriver driver) {
        this.actions = new DriverActions(driver);
    }
    
    public void login(String username, String password) {
        actions.elements().sendData(usernameField, username);
        actions.elements().sendData(passwordField, password);
        actions.elements().clickOnElement(loginButton);
    }
    
    public boolean isErrorMessageDisplayed() {
        return actions.elements().isElementDisplayed(By.id("errorMessage"));
    }
}
```

## Handling Advanced Scenarios

### Working with Alerts

```java
// Accept alert dialog
actions.alerts().accept();

// Get alert text
String alertText = actions.alerts().getText();

// Send input to prompt
actions.alerts().sendData("User input");
```

### Working with Frames

```java
// Switch to frame by locator
actions.frames().switchToFrame(By.id("myIframe"));

// Switch back to main document
actions.frames().switchToDefaultContent();
```

### Working with Multiple Windows

```java
// Switch to a new window by title
actions.windows().switchToNewWindow("Payment Page");

// Close current window and return to main window
actions.windows().closeCurrentWindow();
```

### JavaScript Operations

```java
// Click using JavaScript
actions.JSActions().javascriptClick(By.id("hiddenButton"));

// Scroll to element
actions.JSActions().scrollToElement(By.id("elementAtBottom"));
```

## Handling Synchronization

Ellithium provides built-in waits for robust synchronization:

```java
// Wait for element conditions
actions.elements().waitForElementToBeVisible(By.id("loadingIndicator"));
actions.elements().waitForElementToDisappear(By.id("loadingIndicator"));

// Wait for page state
actions.waits().waitForTitleContains("Dashboard");
actions.waits().waitForUrlContains("/dashboard");

// Wait with custom timeout (seconds)
actions.elements().waitForElementToBeVisible(By.id("element"), 30);

// Wait with custom timeout and polling interval (ms)
actions.elements().waitForElementToBeClickable(By.id("button"), 10, 500);
```

## Recording Test Sessions

Capture video recordings of test sessions for debugging:

```java
// Create recorder
ScreenRecorderActions recorder = new ScreenRecorderActions<>(driver);

// Start recording
recorder.startRecording("LoginTest");

// Perform test steps...

// Stop recording
recorder.stopRecording();
```

## Next Steps

- Explore the complete [Interactions API](/interactions/interactions)
- Learn about the [Driver Factory](/driverfactory) capabilities
- See [Examples](/examples/web-testing) of web test automation 