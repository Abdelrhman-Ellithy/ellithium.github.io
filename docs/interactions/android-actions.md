---
id: android-actions
title: Android Actions
sidebar_label: Android Actions
description: Android-specific mobile gestures and actions using Appium UIAutomator2
---

# Android Actions

The `AndroidActions` class provides Android-specific mobile gestures and actions using Appium UIAutomator2 driver. It extends `KeyPressActions` and provides native Android gesture support.

## Overview

Android actions include:
- Drag gestures on elements and coordinates
- Fling gestures in different directions
- Double-click gestures
- Long press gestures
- Pinch gestures
- Scroll gestures
- Tap gestures

## Gesture Operations

### Drag Gestures

#### Drag Element to Coordinates
```java
// Drag an element to specific coordinates
WebElement element = driver.findElement(By.id("draggable"));
actions.androidActions().dragGesture(element, 200, 300);
```

#### Drag from Coordinates to Coordinates
```java
// Drag from start coordinates to end coordinates
actions.androidActions().dragGesture(100, 200, 300, 400);
```

### Fling Gestures

#### Fling Element in Direction
```java
// Fling an element in specified direction
WebElement element = driver.findElement(By.id("scrollable"));
actions.androidActions().flingGesture(element, "up");
actions.androidActions().flingGesture(element, "down");
actions.androidActions().flingGesture(element, "left");
actions.androidActions().flingGesture(element, "right");
```

### Click Gestures

#### Double Click Gesture
```java
// Perform double-click on an element
WebElement element = driver.findElement(By.id("clickable"));
actions.androidActions().doubleClickGesture(element);
```

#### Long Press Gesture
```java
// Perform long press on an element
WebElement element = driver.findElement(By.id("longPressable"));
actions.androidActions().longPressGesture(element);
```

### Pinch Gestures

#### Pinch Element
```java
// Perform pinch gesture on an element
WebElement element = driver.findElement(By.id("pinchable"));
actions.androidActions().pinch(element, 0.5f, 2.0f);
```

### Scroll Gestures

#### Scroll Element in Direction
```java
// Scroll an element in specified direction
WebElement element = driver.findElement(By.id("scrollable"));
actions.androidActions().scroll(element, "up");
actions.androidActions().scroll(element, "down");
actions.androidActions().scroll(element, "left");
actions.androidActions().scroll(element, "right");
```

#### Scroll to Element
```java
// Scroll to find an element using predicate string
WebElement element = driver.findElement(By.id("container"));
actions.androidActions().scrollToElement(
    element, 
    "type == 'XCUIElementTypeButton'", 
    "up"
);
```

### Tap Gestures

#### Tap Element
```java
// Tap on an element
WebElement element = driver.findElement(By.id("tappable"));
actions.androidActions().tap(element);
```

#### Tap at Coordinates
```java
// Tap at specific coordinates
actions.androidActions().tap(150, 250);
```

## Gesture Parameters

### Direction Values

Valid direction values for gestures:
- `"up"` - Upward direction
- `"down"` - Downward direction
- `"left"` - Leftward direction
- `"right"` - Rightward direction

### Scale and Velocity

For pinch gestures:
- **scale**: Scale factor (0.0 to 1.0 for pinch in, >1.0 for pinch out)
- **velocity**: Speed of the pinch gesture

## Error Handling

All Android actions include comprehensive error handling:
- Automatic logging of all operations
- Graceful failure handling
- Detailed error messages
- Non-blocking execution

## Best Practices

1. **Element State**: Ensure elements are in the expected state before gestures
2. **Coordinate Bounds**: Use coordinates within screen bounds
3. **Gesture Timing**: Allow sufficient time between gestures
4. **Error Logging**: Check logs for gesture execution status
5. **Element Validation**: Verify elements support the requested gesture

## Example Usage

```java
@Test
public void testAndroidGestures() {
    DriverActions actions = new DriverActions(driver);
    
    // Find scrollable element
    WebElement scrollable = driver.findElement(By.id("scrollable"));
    
    // Scroll down to find target element
    actions.androidActions().scroll(scrollable, "down");
    
    // Find and tap target element
    WebElement target = driver.findElement(By.id("target"));
    actions.androidActions().tap(target);
    
    // Verify action completed
    WebElement result = driver.findElement(By.id("result"));
    assertTrue(result.isDisplayed());
}
```

## Technical Details

The Android actions use Appium's UIAutomator2 driver mobile gestures:
- Native Android gesture support
- Optimized performance
- Reliable gesture execution
- Cross-device compatibility

For more information, see the [Appium UIAutomator2 documentation](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md).
