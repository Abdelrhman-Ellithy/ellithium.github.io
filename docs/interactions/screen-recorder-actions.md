---
sidebar_position: 12
---

# Screen Recorder Actions

The `ScreenRecorderActions` class provides methods for capturing video recordings of test sessions for both web and mobile testing. It's particularly useful for debugging test failures and documenting complex test scenarios.

## Important Note

Unlike other interaction classes, `ScreenRecorderActions` is **not** accessed through the `DriverActions` class. Instead, you need to instantiate it directly:

```java
// Create ScreenRecorderActions instance directly
ScreenRecorderActions screenRecorderActions = new ScreenRecorderActions<>(driver);
```

## Basic Recording Operations

```java
// Create a screen recorder instance
ScreenRecorderActions screenRecorderActions = new ScreenRecorderActions<>(driver);

// Start recording the screen with a name for the video file
screenRecorderActions.startRecording("LoginTest");

// Perform test actions...
actions.elements().sendData(By.id("username"), "testuser");
actions.elements().sendData(By.id("password"), "password123");
actions.elements().clickOnElement(By.id("loginButton"));

// Stop recording and save the video
screenRecorderActions.stopRecording();
```

## Screenshot Operations

The class also provides screenshot functionality:

```java
// Capture a screenshot and save it with a name
File screenshotFile = screenRecorderActions.captureScreenshot("LoginPage");
```

## Customizing Recording Settings

```java
// Start recording with custom settings
actions.screenRecorder().startRecording(
    "CheckoutTest",           // Recording name
    "C:/test-recordings/",    // Output directory
    30,                       // Frame rate
    true                      // Record audio (if available)
);
```

## Managing Recordings

```java
// Get the current recording status
boolean isRecording = actions.screenRecorder().isRecording();

// Pause recording temporarily
actions.screenRecorder().pauseRecording();

// Resume recording after pause
actions.screenRecorder().resumeRecording();

// Get the current recording path
String currentPath = actions.screenRecorder().getCurrentRecordingPath();
```

## Using With Test Frameworks

### In TestNG

```java
import org.testng.annotations.*;

public class RecordedLoginTest {
    private WebDriver driver;
    private DriverActions actions;
    private ScreenRecorderActions screenRecorderActions;
    
    @BeforeClass
    public void setUp() {
        driver = DriverFactory.getNewLocalDriver(LocalDriverType.Chrome);
        actions = new DriverActions(driver);
        screenRecorderActions = new ScreenRecorderActions<>(driver);
    }
    
    @BeforeMethod
    public void startRecording(Method method) {
        // Start recording with test method name
        screenRecorderActions.startRecording(method.getName());
    }
    
    @Test
    public void loginTest() {
        driver.get("https://example.com/login");
        actions.elements().sendData(By.id("username"), "testuser");
        actions.elements().sendData(By.id("password"), "password123");
        actions.elements().clickOnElement(By.id("loginButton"));
        actions.elements().waitForElementToBeVisible(By.id("welcomeMessage"));
    }
    
    @AfterMethod
    public void stopRecording(ITestResult result) {
        // Stop recording
        screenRecorderActions.stopRecording();
        
        // For failures, you might want to capture a screenshot as well
        if (result.getStatus() == ITestResult.FAILURE) {
            screenRecorderActions.captureScreenshot("Failed-" + result.getName());
            System.out.println("Test failed! Video recorded for evidence.");
        }
    }
    
    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

## Mobile Recording Support

The `ScreenRecorderActions` class automatically detects if you're using a mobile driver (AndroidDriver or IOSDriver) and uses the appropriate recording mechanism:

```java
// For Android or iOS testing
AndroidDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.Android,
    new URL("http://localhost:4723"),
    capabilities
);

// Create recorder for mobile
ScreenRecorderActions screenRecorderActions = new ScreenRecorderActions<>(driver);

// Recording works the same way for mobile or web
screenRecorderActions.startRecording("MobileTest");

// Perform test steps...

// Stop recording
screenRecorderActions.stopRecording();
```

## Best Practices

1. **Use for Important Tests**: Recording consumes resources, so use it for critical test cases or those that are intermittently failing.

2. **Set Appropriate Frame Rates**: Higher frame rates capture more detail but create larger files. Choose based on your needs.

3. **Clean Up Old Recordings**: Implement a strategy to remove old recordings to prevent disk space issues.

4. **Record Failed Tests Only**: For large test suites, consider only saving recordings of failed tests.

5. **Integrate with CI/CD**: Configure your CI/CD pipeline to store video recordings as artifacts.

```java
// Example of conditional recording for failed tests only
@AfterMethod
public void manageRecording(ITestResult result) {
    String videoPath = actions.screenRecorder().stopRecording();
    
    // Only keep recordings of failed tests
    if (result.getStatus() == ITestResult.SUCCESS) {
        File videoFile = new File(videoPath);
        if (videoFile.exists()) {
            videoFile.delete();
            System.out.println("Test passed - deleted recording");
        }
    } else {
        System.out.println("Test failed - kept recording at: " + videoPath);
    }
}
``` 