---
sidebar_position: 12
---

# Mobile Actions

The `MobileActions` utility provides a unified, cross-platform interface for mobile interactions, replacing the deprecated `AndroidActions` and `IOSActions`. It automatically detects the platform (iOS or Android) and executes the appropriate backend commands seamlessly.

You can access the `MobileActions` interface from your page object via:

```java
driverActions.mobileActions()
```

## Cross-Platform Gestures

The following methods work seamlessly on both Android and iOS devices.

### Tap
Performs a tap gesture on a specific element or coordinates.

```java
// Tap on an element
driverActions.mobileActions().tap(By.id("login_button"));

// Tap on specific coordinates
driverActions.mobileActions().tap(150.0, 300.0);
```

### Double Tap
Performs a double-tap gesture.

```java
// Double-tap an element
driverActions.mobileActions().doubleTap(By.id("image_view"));

// Double-tap an element with a custom duration (iOS only, standard double-tap on Android)
driverActions.mobileActions().doubleTap(By.id("image_view"), 0.5);

// Double-tap at coordinates
driverActions.mobileActions().doubleTap(150.0, 300.0);

// Double-tap at coordinates with a custom duration (iOS only)
driverActions.mobileActions().doubleTap(150.0, 300.0, 0.5);
```

### Long Press (Touch and Hold)
Performs a long press (touch and hold) gesture. The default duration is 1 second.

```java
// Long press an element (default 1 second)
driverActions.mobileActions().longPress(By.id("context_menu_item"));

// Long press an element for 3 seconds
driverActions.mobileActions().longPress(By.id("context_menu_item"), 3.0);

// Long press at coordinates (default 1 second)
driverActions.mobileActions().longPress(200.0, 400.0);

// Long press at coordinates for a custom duration
driverActions.mobileActions().longPress(200.0, 400.0, 2.0);
```

### Swipe
Performs a directional swipe or coordinate-based swipe.
Valid directions are: `"up"`, `"down"`, `"left"`, `"right"`.

```java
// Swipe across an element in a direction (default 50% distance on Android)
driverActions.mobileActions().swipe("left", By.id("carousel"));

// Swipe across an element with a specific percentage threshold
driverActions.mobileActions().swipe(By.id("carousel"), "right", 0.75);

// Swipe between absolute viewport coordinates over a given duration
driverActions.mobileActions().swipe(100.0, 500.0, 100.0, 100.0, 1.5);

// Swipe within a bounded area (Android only)
driverActions.mobileActions().swipeInArea(0, 200, 1080, 600, "up", 0.5);
```

### Scroll
Performs a scrolling action.

```java
// Scroll on an element in a direction (default 50% distance on Android)
driverActions.mobileActions().scroll(By.id("list_view"), "down");

// Scroll on an element with a custom percentage (0-100; Android honors it, iOS ignores it)
driverActions.mobileActions().scroll(By.id("list_view"), "down", 75);

// Scroll between absolute viewport coordinates (600 ms default duration)
driverActions.mobileActions().scroll(100.0, 800.0, 100.0, 200.0);

// Scroll between absolute viewport coordinates over a custom duration
driverActions.mobileActions().scroll(100.0, 800.0, 100.0, 200.0, 1.2);

// Scroll within a bounded area (Android only)
driverActions.mobileActions().scrollInArea(0, 200, 1080, 1600, "down", 50);

// Scroll until a specific element is found using a predicate/UiSelector
driverActions.mobileActions().scrollToElement(By.id("list_view"), "text(\"Item 10\")", "down");

// Scroll using a raw UiSelector string (Android only)
driverActions.mobileActions().scrollToElementBySelector("text(\"Item 10\")");
```

### Drag and Drop
Performs a drag gesture from a source to a destination.

```java
// Drag an element to target coordinates (default 1 second duration)
driverActions.mobileActions().drag(By.id("draggable_item"), 300.0, 400.0);

// Drag an element to target coordinates with a custom duration
driverActions.mobileActions().drag(By.id("draggable_item"), 300.0, 400.0, 2.0);

// Drag between absolute coordinates (default 1 second duration)
driverActions.mobileActions().drag(100.0, 200.0, 300.0, 400.0);

// Drag between absolute coordinates with a custom duration
driverActions.mobileActions().drag(100.0, 200.0, 300.0, 400.0, 2.0);
```

### Pinch and Zoom
Performs multi-touch pinch or zoom gestures.

```java
// Zoom in (true) or zoom out (false) on an element by percentage (Android honors percent; iOS uses default scale)
driverActions.mobileActions().pinch(By.id("map_view"), true, 0.5);

// Pinch with explicit scale and velocity (scale > 1 = zoom in, < 1 = zoom out)
driverActions.mobileActions().pinch(By.id("image_view"), 1.5, 2.0);

// Pinch at specific coordinates (iOS only)
driverActions.mobileActions().pinch(540.0, 960.0, 2.0, 1.5);

// Pinch close (zoom out) within a bounded area (Android only)
driverActions.mobileActions().pinchCloseInArea(0, 200, 1080, 1400, 0.5);

// Pinch open (zoom in) within a bounded area (Android only)
driverActions.mobileActions().pinchOpenInArea(0, 200, 1080, 1400, 0.5);

// Pinch within a bounded area with scale and velocity (Android only)
driverActions.mobileActions().pinchInArea(0, 200, 1080, 1400, 1.5, 2.0);
```

---

## Platform-Specific Actions

Some actions are native to a specific operating system. Calling these methods on the wrong platform will throw an `UnsupportedOperationException`.

### Android Only

**Native Key Events**
```java
// Press a key using Appium KeyEvent
driverActions.mobileActions().pressKey(new KeyEvent(AndroidKey.HOME));

// Press a key using AndroidKey enum directly
driverActions.mobileActions().pressAndroidKey(AndroidKey.BACK);

// Long press a key
driverActions.mobileActions().longPressAndroidKey(AndroidKey.POWER, 2000L);
```

**Advanced Gestures**
```java
// Fling on an element in a direction
driverActions.mobileActions().fling(By.id("scroll_view"), "down");

// Fling between absolute coordinates with a velocity value
driverActions.mobileActions().fling(100, 800, 100, 200, 3000);

// Multi-touch gesture — pass an array of touch action maps (one per finger)
Map<String, Object>[] fingerActions = new Map[]{finger1Params, finger2Params};
driverActions.mobileActions().multiTouchGesture(fingerActions);
```

### iOS Only

**Alert Handling**
```java
// Handle iOS native alerts natively
driverActions.mobileActions().handleAlert("accept", "Yes");
```

**Two Finger Tap**
```java
driverActions.mobileActions().twoFingerTap(By.id("element"));
```

---

## Exception Handling and Healing

The unified API automatically manages state issues. If an element becomes stale during a gesture (for example, due to a dynamic UI update), the framework will gracefully catch the `StaleElementReferenceException`, re-locate the element using the provided locator, and retry the gesture.

Additionally, gestures map backend failures into specific actionable exceptions (e.g., `TimeoutException`, `InvalidElementStateException`, `NoSuchElementException`) so that assertions can capture the true cause without failing generically.
