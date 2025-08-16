---
id: android-actions
title: Android Actions
sidebar_label: Android Actions
description: Android-specific mobile gestures and actions for mobile testing
---

# Android Actions

The `AndroidActions` class provides Android-specific mobile gestures and actions for mobile testing using Appium UIAutomator2 driver. This class extends `KeyPressActions` and offers a comprehensive set of mobile gesture methods.

## Overview

Android Actions is designed to work with Android devices through Appium and provides native Android gesture support including:
- Drag and drop gestures
- Fling gestures
- Double-click gestures
- Pinch gestures
- Swipe gestures
- Scroll gestures
- And many more mobile-specific interactions

## Getting Started

```java
import Ellithium.Utilities.interactions.AndroidActions;
import Ellithium.Utilities.interactions.DriverActions;

// Get AndroidActions from DriverActions
AndroidActions<AppiumDriver> androidActions = driverActions.androidActions();
```

## Available Methods

### Drag Gestures

#### dragGesture(WebElement element, int endX, int endY)
Performs a drag gesture on an element to specified coordinates.

```java
WebElement element = driver.findElement(By.id("draggable"));
androidActions.dragGesture(element, 300, 400);
```

#### dragGesture(int startX, int startY, int endX, int endY)
Performs a drag gesture from specified start coordinates to end coordinates.

```java
androidActions.dragGesture(100, 200, 300, 400);
```

### Fling Gestures

#### flingGesture(WebElement element, String direction)
Performs a fling gesture on an element in the specified direction.

```java
WebElement element = driver.findElement(By.id("scrollable"));
androidActions.flingGesture(element, "up");    // up, down, left, right
```

### Double-Click Gestures

#### doubleClickGesture(WebElement element)
Performs a double-click gesture on an element.

```java
WebElement element = driver.findElement(By.id("clickable"));
androidActions.doubleClickGesture(element);
```

### Pinch Gestures

#### pinch(WebElement element, float scale, float velocity)
Performs a pinch gesture on an element with specified scale and velocity.

```java
WebElement element = driver.findElement(By.id("zoomable"));
androidActions.pinch(element, 0.5f, 2.0f);  // Scale down with medium velocity
```

#### pinch(WebElement element, float scale)
Performs a pinch gesture on an element with specified scale.

```java
WebElement element = driver.findElement(By.id("zoomable"));
androidActions.pinch(element, 2.0f);  // Scale up
```

### Swipe Gestures

#### swipe(WebElement element, String direction, float percent, float speed)
Performs a swipe gesture on an element in the specified direction.

```java
WebElement element = driver.findElement(By.id("swipeable"));
androidActions.swipe(element, "left", 0.75f, 0.5f);  // Swipe left with 75% distance and medium speed
```

#### swipe(int startX, int startY, int endX, int endY, float speed)
Performs a swipe gesture from start to end coordinates.

```java
androidActions.swipe(100, 200, 300, 400, 0.8f);  // Swipe with high speed
```

### Scroll Gestures

#### scroll(WebElement element, String direction, float percent, float speed)
Performs a scroll gesture on an element in the specified direction.

```java
WebElement element = driver.findElement(By.id("scrollable"));
androidActions.scroll(element, "down", 0.5f, 0.3f);  // Scroll down with 50% distance and slow speed
```

#### scroll(int startX, int startY, int endX, int endY, float speed)
Performs a scroll gesture from start to end coordinates.

```java
androidActions.scroll(100, 200, 100, 100, 0.5f);  // Scroll up with medium speed
```

### Long Press Gestures

#### longClickGesture(WebElement element, long durationMillis)
Performs a long press gesture on an element for specified duration.

```java
WebElement element = driver.findElement(By.id("longpressable"));
androidActions.longClickGesture(element, 2000);  // Long press for 2 seconds
```

### Multi-Touch Gestures

#### multiTouchGesture(WebElement element, int fingers, float scale, float velocity)
Performs a multi-touch gesture on an element.

```java
WebElement element = driver.findElement(By.id("multitouchable"));
androidActions.multiTouchGesture(element, 2, 1.5f, 1.0f);  // Two-finger scale up
```

## Complete Example

```java
import Ellithium.Utilities.interactions.DriverActions;
import Ellithium.Utilities.interactions.AndroidActions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class AndroidTestExample {
    
    public void performAndroidGestures(DriverActions<AppiumDriver> driverActions) {
        AndroidActions<AppiumDriver> androidActions = driverActions.androidActions();
        
        // Find elements
        WebElement draggable = driver.findElement(By.id("draggable"));
        WebElement scrollable = driver.findElement(By.id("scrollable"));
        WebElement zoomable = driver.findElement(By.id("zoomable"));
        
        // Perform various gestures
        androidActions.dragGesture(draggable, 300, 400);
        androidActions.scroll(scrollable, "down", 0.5f, 0.3f);
        androidActions.pinch(zoomable, 2.0f);
        androidActions.swipe(scrollable, "left", 0.75f, 0.5f);
        androidActions.longClickGesture(draggable, 2000);
    }
}
```

## Best Practices

1. **Element Validation**: Always ensure elements are present and interactable before performing gestures
2. **Coordinate Accuracy**: Use precise coordinates for gesture operations
3. **Speed Control**: Adjust gesture speed based on device performance and test requirements
4. **Error Handling**: Implement proper error handling for gesture failures
5. **Device Compatibility**: Test gestures on different Android versions and device types

## Troubleshooting

### Common Issues

- **Gesture Not Recognized**: Ensure the element supports the gesture type
- **Coordinate Out of Bounds**: Verify coordinates are within screen boundaries
- **Driver Compatibility**: Ensure using Appium UIAutomator2 driver
- **Element State**: Check if element is visible and enabled

### Debug Tips

- Use logging to track gesture execution
- Verify element properties before gesture execution
- Test gestures on physical devices when possible
- Check Appium logs for detailed error information

## Related Classes

- [Driver Actions](./driver-actions.md) - Main interaction class
- [iOS Actions](./ios-actions.md) - iOS-specific gestures
- [Key Press Actions](./key-press-actions.md) - Keyboard interactions
- [Element Actions](./element-actions.md) - Basic element interactions
