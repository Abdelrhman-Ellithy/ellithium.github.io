---
sidebar_position: 12
---

# Screen Recorder Actions

`ScreenRecorderActions` captures video and screenshots during tests.

## Access

Instantiate directly (not via `DriverActions`):
```java
ScreenRecorderActions screenRecorder = new ScreenRecorderActions<>(driver);
```

## Methods (from the framework)

```java
java.io.File captureScreenshot(String screenshotName);
void startRecording(String name);
void stopRecording();
```

## Usage

```java
ScreenRecorderActions screenRecorder = new ScreenRecorderActions<>(driver);

// Start recording	screenRecorder.startRecording("LoginTest");

// ... perform test actions ...

// Stop recording	screenRecorder.stopRecording();

// Take an on-demand screenshot
File shot = screenRecorder.captureScreenshot("LoginPage");
```

## TestNG Example

```java
public class RecordedLoginTest {
    private DriverActions actions;
    private ScreenRecorderActions screenRecorder;

    @BeforeClass
    public void setUp() {
        actions = new DriverActions(driver);
        screenRecorder = new ScreenRecorderActions<>(driver);
    }

    @BeforeMethod
    public void start(Method method) {
        screenRecorder.startRecording(method.getName());
    }

    @AfterMethod
    public void stop() {
        screenRecorder.stopRecording();
    }
}
```

## Notes

- Works for both web and mobile drivers; the implementation adapts to the driver.
- Video files are saved according to the implementation defaults; ensure your CI retains artifacts if needed.
- Use screenshots (`captureScreenshot`) for quick state capture without a full recording. 