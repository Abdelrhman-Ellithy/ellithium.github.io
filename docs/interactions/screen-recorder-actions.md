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
String stopRecording();              // Returns absolute path to the compiled MP4
static int pendingCompilations();   // Returns count of async compilations still in progress
```

## Usage

```java
ScreenRecorderActions screenRecorder = new ScreenRecorderActions<>(driver);

// Start recording
screenRecorder.startRecording("LoginTest");

// ... perform test actions ...

// Stop recording and get the video path
String videoPath = screenRecorder.stopRecording();

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

## Auto-Recording via Listeners

When the driver is created before the `@Test` method begins (e.g., in `@BeforeClass`), the framework's built-in listeners automatically start and stop recording around each test. This behaviour is controlled by three properties in `config.properties`:

| Property | Default | Description |
|---|---|---|
| `recordGUITestExecution` | `true` | Enables the recording engine |
| `attachRecordedGUITestExecutionToReport` | `true` | Embeds the MP4 in the Allure report |
| `attachRecordedGUITestExecutionToReportOnlyOnFailure` | `false` | Only attaches the video when the test fails, reducing report size |

## Async Compilation and `pendingCompilations()`

When `attachRecordedGUITestExecutionToReport=false`, the MP4 is compiled in a background thread pool so it does not block test execution. Call `ScreenRecorderActions.pendingCompilations()` to check how many compilations are still in progress. On JVM shutdown, the framework waits up to 45 seconds for all pending compilations to finish automatically.

```java
// Check pending compilations before suite teardown
int pending = ScreenRecorderActions.pendingCompilations();
if (pending > 0) {
    System.out.println(pending + " video(s) still compiling...");
}
```

## Notes

- **Pure Java MP4 Compilation**: Uses a custom JCodec-based compiler — no FFmpeg required.
- **CDP Optimization**: Chrome and Edge capture frames via Chrome DevTools Protocol (CDP) for higher frame rates and zero overlay interference.
- **Firefox / Safari**: Falls back to snapshot stitching (~10 FPS) which is parallel-safe.
- **Mobile (Android / iOS)**: Uses native Appium screen recording.
- Works for both web and mobile drivers; the implementation dynamically adapts to the driver type.
- Use `captureScreenshot` for quick state capture without a full recording.