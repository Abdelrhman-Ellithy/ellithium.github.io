---
id: ios-actions
title: iOS Actions
sidebar_label: iOS Actions
description: iOS-specific mobile gestures and actions for mobile testing
---

# iOS Actions

The `IOSActions` class provides iOS-specific mobile gestures and actions for mobile testing using Appium XCUITest driver. This class extends `BaseActions` and offers a comprehensive set of iOS-native gesture methods.

## Overview

iOS Actions is designed to work with iOS devices through Appium and provides native iOS gesture support including:
- Swipe gestures
- Scroll gestures
- Pinch gestures
- Tap gestures
- Long press gestures
- Multi-touch gestures
- And many more iOS-specific interactions

## Getting Started

```java
import Ellithium.Utilities.interactions.IOSActions;
import Ellithium.Utilities.interactions.DriverActions;

// Get IOSActions from DriverActions
IOSActions<AppiumDriver> iosActions = driverActions.iosActions();
```

## Available Methods

### Swipe Gestures

#### swipe(String direction, WebElement element)
Performs a swipe gesture on an element in the specified direction.

```java
WebElement element = driver.findElement(By.id("swipeable"));
iosActions.swipe("left", element);  // left, right, up, down
```

#### swipe(int startX, int startY, int endX, int endY, float velocity)
Performs a swipe gesture from start to end coordinates with specified velocity.

```java
iosActions.swipe(100, 200, 300, 400, 0.8f);  // Swipe with high velocity
```

### Scroll Gestures

#### scroll(WebElement element, String direction)
Performs a scroll gesture on an element in the specified direction.

```java
WebElement element = driver.findElement(By.id("scrollable"));
iosActions.scroll(element, "down");  // up, down, left, right
```

#### scrollToElement(WebElement element, String predicateString, String direction)
Scrolls to an element using predicate string in the specified direction.

```java
WebElement element = driver.findElement(By.id("container"));
iosActions.scrollToElement(element, "type == 'XCUIElementTypeButton'", "down");
```

### Pinch Gestures

#### pinch(WebElement element, float scale, float velocity)
Performs a pinch gesture on an element with specified scale and velocity.

```java
WebElement element = driver.findElement(By.id("zoomable"));
iosActions.pinch(element, 0.5f, 2.0f);  // Scale down with medium velocity
```

#### pinch(WebElement element, float scale)
Performs a pinch gesture on an element with specified scale.

```java
WebElement element = driver.findElement(By.id("zoomable"));
iosActions.pinch(element, 2.0f);  // Scale up
```

### Tap Gestures

#### tap(WebElement element, int count)
Performs a tap gesture on an element with specified tap count.

```java
WebElement element = driver.findElement(By.id("tappable"));
iosActions.tap(element, 2);  // Double tap
```

#### tap(int x, int y, int count)
Performs a tap gesture at specified coordinates with specified tap count.

```java
iosActions.tap(150, 250, 1);  // Single tap at coordinates
```

### Long Press Gestures

#### longPress(WebElement element, long durationMillis)
Performs a long press gesture on an element for specified duration.

```java
WebElement element = driver.findElement(By.id("longpressable"));
iosActions.longPress(element, 2000);  // Long press for 2 seconds
```

#### longPress(int x, int y, long durationMillis)
Performs a long press gesture at specified coordinates for specified duration.

```java
iosActions.longPress(150, 250, 1500);  // Long press for 1.5 seconds
```

### Multi-Touch Gestures

#### multiTouch(WebElement element, int fingers, float scale, float velocity)
Performs a multi-touch gesture on an element.

```java
WebElement element = driver.findElement(By.id("multitouchable"));
iosActions.multiTouch(element, 2, 1.5f, 1.0f);  // Two-finger scale up
```

### Rotate Gestures

#### rotate(WebElement element, float rotation, float velocity)
Performs a rotation gesture on an element.

```java
WebElement element = driver.findElement(By.id("rotatable"));
iosActions.rotate(element, 90.0f, 0.5f);  // Rotate 90 degrees with slow velocity
```

### Drag Gestures

#### drag(WebElement element, int endX, int endY, float velocity)
Performs a drag gesture on an element to specified coordinates.

```java
WebElement element = driver.findElement(By.id("draggable"));
iosActions.drag(element, 300, 400, 0.6f);  // Drag with medium velocity
```

#### drag(int startX, int startY, int endX, int endY, float velocity)
Performs a drag gesture from start to end coordinates.

```java
iosActions.drag(100, 200, 300, 400, 0.7f);  // Drag with medium-high velocity
```

## Complete Example

```java
import Ellithium.Utilities.interactions.DriverActions;
import Ellithium.Utilities.interactions.IOSActions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class IOSTestExample {
    
    public void performIOSGestures(DriverActions<AppiumDriver> driverActions) {
        IOSActions<AppiumDriver> iosActions = driverActions.iosActions();
        
        // Find elements
        WebElement swipeable = driver.findElement(By.id("swipeable"));
        WebElement scrollable = driver.findElement(By.id("scrollable"));
        WebElement zoomable = driver.findElement(By.id("zoomable"));
        WebElement tappable = driver.findElement(By.id("tappable"));
        
        // Perform various gestures
        iosActions.swipe("left", swipeable);
        iosActions.scroll(scrollable, "down");
        iosActions.pinch(zoomable, 2.0f);
        iosActions.tap(tappable, 2);
        iosActions.longPress(swipeable, 2000);
    }
}
```

## Best Practices

1. **Element Validation**: Always ensure elements are present and interactable before performing gestures
2. **Coordinate Accuracy**: Use precise coordinates for gesture operations
3. **Velocity Control**: Adjust gesture velocity based on device performance and test requirements
4. **Error Handling**: Implement proper error handling for gesture failures
5. **Device Compatibility**: Test gestures on different iOS versions and device types

## Troubleshooting

### Common Issues

- **Gesture Not Recognized**: Ensure the element supports the gesture type
- **Coordinate Out of Bounds**: Verify coordinates are within screen boundaries
- **Driver Compatibility**: Ensure using Appium XCUITest driver
- **Element State**: Check if element is visible and enabled

### Debug Tips

- Use logging to track gesture execution
- Verify element properties before gesture execution
- Test gestures on physical devices when possible
- Check Appium logs for detailed error information

## iOS-Specific Considerations

### Gesture Support
- iOS gestures are more restrictive than Android
- Some gestures may not work on all iOS versions
- Simulator behavior may differ from physical devices

### Performance
- iOS gestures are generally smoother than Android
- Velocity parameters have different effects on iOS
- Coordinate system is different from Android

## Related Classes

- [Driver Actions](./driver-actions.md) - Main interaction class
- [Android Actions](./android-actions.md) - Android-specific gestures
- [Key Press Actions](./key-press-actions.md) - Keyboard interactions
- [Element Actions](./element-actions.md) - Basic element interactions
