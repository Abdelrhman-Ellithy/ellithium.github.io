---
id: ios-actions
title: iOS Actions
sidebar_label: iOS Actions
description: iOS-specific mobile gestures and actions using Appium XCUITest
---

# iOS Actions

The `IOSActions` class provides iOS-specific mobile gestures and actions using Appium XCUITest driver. It extends `BaseActions` and provides native iOS gesture support.

## Overview

iOS actions include:
- Swipe gestures on elements
- Scroll gestures in different directions
- Scroll to element using predicate strings
- Pinch gestures with scale and velocity
- Tap gestures on elements and coordinates
- Long press gestures
- Drag gestures

## Gesture Operations

### Swipe Gestures

#### Swipe Element in Direction
```java
// Swipe an element in specified direction
WebElement element = driver.findElement(By.id("swipeable"));
actions.iosActions().swipe("left", element);
actions.iosActions().swipe("right", element);
actions.iosActions().swipe("up", element);
actions.iosActions().swipe("down", element);
```

### Scroll Gestures

#### Scroll Element in Direction
```java
// Scroll an element in specified direction
WebElement element = driver.findElement(By.id("scrollable"));
actions.iosActions().scroll(element, "up");
actions.iosActions().scroll(element, "down");
actions.iosActions().scroll(element, "left");
actions.iosActions().scroll(element, "right");
```

#### Scroll to Element
```java
// Scroll to find an element using predicate string
WebElement element = driver.findElement(By.id("container"));
actions.iosActions().scrollToElement(
    element, 
    "type == 'XCUIElementTypeButton'", 
    "up"
);
```

### Pinch Gestures

#### Pinch Element
```java
// Perform pinch gesture on an element
WebElement element = driver.findElement(By.id("pinchable"));
actions.iosActions().pinch(element, 0.5f, 2.0f);
```

### Tap Gestures

#### Tap Element
```java
// Tap on an element
WebElement element = driver.findElement(By.id("tappable"));
actions.iosActions().tap(element);
```

#### Tap at Coordinates
```java
// Tap at specific coordinates
actions.iosActions().tap(150, 250);
```

### Long Press Gestures

#### Long Press Element
```java
// Perform long press on an element
WebElement element = driver.findElement(By.id("longPressable"));
actions.iosActions().longPress(element);
```

### Drag Gestures

#### Drag Element
```java
// Drag an element
WebElement element = driver.findElement(By.id("draggable"));
actions.iosActions().drag(element);
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

### Predicate Strings

For scroll to element operations, use XCUITest predicate strings:
- `"type == 'XCUIElementTypeButton'"` - Find button elements
- `"name CONTAINS 'text'"` - Find elements with name containing text
- `"visible == true"` - Find visible elements

## Error Handling

All iOS actions include comprehensive error handling:
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
6. **Predicate Strings**: Use specific and efficient predicate strings

## Example Usage

```java
@Test
public void testIOSGestures() {
    DriverActions actions = new DriverActions(driver);
    
    // Find scrollable element
    WebElement scrollable = driver.findElement(By.id("scrollable"));
    
    // Scroll down to find target element
    actions.iosActions().scroll(scrollable, "down");
    
    // Find and tap target element
    WebElement target = driver.findElement(By.id("target"));
    actions.iosActions().tap(target);
    
    // Verify action completed
    WebElement result = driver.findElement(By.id("result"));
    assertTrue(result.isDisplayed());
}
```

## Technical Details

The iOS actions use Appium's XCUITest driver mobile gestures:
- Native iOS gesture support
- Optimized performance
- Reliable gesture execution
- Cross-device compatibility

For more information, see the [Appium XCUITest documentation](https://appium.readthedocs.io/en/latest/en/writing-running-appium/ios/ios-xctest-mobile-gestures/).
