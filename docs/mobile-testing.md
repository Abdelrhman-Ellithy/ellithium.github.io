---
sidebar_position: 8
---

# Mobile Testing

Ellithium provides robust support for mobile testing on Android and iOS platforms through its Appium integration.

## Shared Interaction Classes

Ellithium provides a unified interaction API that works for both web and mobile testing. Most interaction classes are accessed through the `DriverActions` class:

- [Element Actions](interactions/element-actions) - Basic element interactions like click, type, etc.
- [Keyboard Actions](interactions/key-press-actions) - Keyboard and device key press operations

For a complete overview of all interactions, see the [Interactions Overview](interactions/interactions) page.

These classes can be accessed through the `DriverActions` class:

```java
// Initialize DriverActions with mobile driver
DriverActions actions = new DriverActions(driver);

// Use the same element interaction API for mobile
actions.elements().clickOnElement(By.id("login_button"));
actions.elements().sendData(By.id("username_field"), "testuser");
actions.elements().waitForElementToBeVisible(By.id("progress_indicator"));

// Mobile-specific key operations
actions.keyPress().pressKey(new KeyEvent(AndroidKey.BACK));
```

Additionally, Ellithium provides:

- [Screen Recorder Actions](interactions/screen-recorder-actions) - Video recording of test sessions (requires direct instantiation)

```java
// Screen Recorder needs to be instantiated directly
ScreenRecorderActions screenRecorderActions = new ScreenRecorderActions<>(driver);
```

## Setting Up Mobile Testing

### Prerequisites

- Appium Server (2.0 or higher)
- Android SDK for Android testing
- Xcode for iOS testing
- Real devices or emulators/simulators

## Android Testing

### Creating Android Driver

```java
// Basic Android driver setup
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Pixel 6");
capabilities.setCapability(MobileCapabilityType.APP, "/path/to/app.apk");
capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2");

AndroidDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.Android,
    new URL("http://localhost:4723"),
    capabilities
);
```

### Advanced Android Configuration

```java
// Extended capabilities
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "12");
capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Pixel 6");
capabilities.setCapability(MobileCapabilityType.APP, "/path/to/app.apk");
capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2");
capabilities.setCapability(MobileCapabilityType.NEW_COMMAND_TIMEOUT, 60);
capabilities.setCapability("appPackage", "com.example.app");
capabilities.setCapability("appActivity", "com.example.app.MainActivity");
capabilities.setCapability("noReset", false);
capabilities.setCapability("fullReset", true);

AndroidDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.Android,
    new URL("http://localhost:4723"),
    capabilities
);
```

## iOS Testing

### Creating iOS Driver

```java
// Basic iOS driver setup
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS");
capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 13");
capabilities.setCapability(MobileCapabilityType.APP, "/path/to/app.ipa");
capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "XCUITest");

IOSDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.IOS,
    new URL("http://localhost:4723"),
    capabilities
);
```

### Advanced iOS Configuration

```java
// Extended capabilities
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS");
capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "15.0");
capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 13");
capabilities.setCapability(MobileCapabilityType.UDID, "auto");
capabilities.setCapability(MobileCapabilityType.APP, "/path/to/app.ipa");
capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "XCUITest");
capabilities.setCapability(MobileCapabilityType.NEW_COMMAND_TIMEOUT, 60);
capabilities.setCapability("bundleId", "com.example.app");
capabilities.setCapability("noReset", false);
capabilities.setCapability("fullReset", true);
capabilities.setCapability("wdaLocalPort", 8100);

IOSDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.IOS,
    new URL("http://localhost:4723"),
    capabilities
);
```

## Mobile Element Interactions

Ellithium's `DriverActions` provides a unified API for mobile element interactions, making it easy to work with both Android and iOS:

```java
// Initialize DriverActions with mobile driver
DriverActions actions = new DriverActions(driver);

// Basic interactions (work for both Android and iOS)
actions.elements().clickOnElement(By.id("login_button"));
actions.elements().sendData(By.id("username_field"), "testuser");
actions.elements().waitForElementToBeVisible(By.id("progress_indicator"));

// Mobile-specific key press operations for Android
actions.keyPress().pressKey(new KeyEvent(AndroidKey.BACK));
actions.keyPress().longPressKey(new KeyEvent(AndroidKey.HOME), 1000);
actions.keyPress().longPressAndroidKey(AndroidKey.VOLUME_UP, 500);
```

## Mobile-Specific Locator Strategies

```java
// Android locators
By androidElement = By.xpath("//android.widget.Button[@text='Login']");
By androidResourceId = By.id("com.example.app:id/login_button");
By androidContentDesc = By.AndroidUIAutomator("new UiSelector().description(\"Login\")");

// iOS locators
By iosElement = By.xpath("//XCUIElementTypeButton[@name='Login']");
By iosAccessibilityId = By.AccessibilityId("login_button");
By iosPredicate = By.iOSNsPredicateString("name == 'Login'");
By iosClassChain = By.iOSClassChain("**/XCUIElementTypeButton[`name == 'Login'`]");
```

## Context Switching (Native/Web/Hybrid)

```java
// Get available contexts
Set<String> contexts = driver.getContextHandles();

// Switch to WEBVIEW context
driver.context("WEBVIEW_com.example.app");

// Perform web operations
actions.elements().clickOnElement(By.cssSelector("button.login"));

// Switch back to NATIVE_APP context
driver.context("NATIVE_APP");
```

## Mobile Device Commands

```java
// App management
driver.terminateApp("com.example.app");
driver.activateApp("com.example.app");
driver.removeApp("com.example.app");
driver.isAppInstalled("com.example.app");

// Device operations
driver.rotate(ScreenOrientation.LANDSCAPE);
driver.lockDevice(Duration.ofSeconds(5));
driver.unlockDevice();
driver.hideKeyboard();

// Android-specific
((AndroidDriver) driver).pressKey(new KeyEvent(AndroidKey.BACK));
((AndroidDriver) driver).openNotifications();

// iOS-specific
((IOSDriver) driver).shake();
```

## Page Object Pattern for Mobile

```java
public class LoginPage {
    private final DriverActions actions;
    
    // Locators
    private final By usernameField = By.id("username_field");
    private final By passwordField = By.id("password_field");
    private final By loginButton = By.id("login_button");
    private final By errorMessage = By.id("error_message");
    
    public LoginPage(AppiumDriver driver) {
        this.actions = new DriverActions(driver);
    }
    
    public void enterUsername(String username) {
        actions.elements().sendData(usernameField, username);
    }
    
    public void enterPassword(String password) {
        actions.elements().sendData(passwordField, password);
    }
    
    public void clickLogin() {
        actions.elements().clickOnElement(loginButton);
    }
    
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLogin();
    }
    
    public boolean isErrorDisplayed() {
        return actions.elements().isElementDisplayed(errorMessage);
    }
}
```

## Screen Recording

Ellithium's [Screen Recorder Actions](interactions/screen-recorder-actions) are particularly useful for mobile testing to document test failures. Unlike other interaction classes, `ScreenRecorderActions` needs to be instantiated directly:

```java
// Create a screen recorder instance
ScreenRecorderActions screenRecorderActions = new ScreenRecorderActions<>(driver);

// Start recording before a complex operation
screenRecorderActions.startRecording("CheckoutProcess");

// Perform test steps
// ...

// Stop recording
screenRecorderActions.stopRecording();
``` 