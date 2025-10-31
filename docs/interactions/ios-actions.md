---
id: ios-actions
title: iOS Actions
sidebar_label: iOS Actions
description: iOS-specific mobile gestures and actions using Appium XCUITest
---

# iOS Actions

`IOSActions` provides native iOS gestures via Appium XCUITest.

Ellithium exposes these methods (signatures from the framework):

## Swipe
```java
// Swipe on element in direction: up, down, left, right
void swipe(String direction, WebElement element);

// Swipe from start to end with duration (seconds)
void swipe(float startX, float startY, float endX, float endY, float duration);
```

## Scroll
```java
// Scroll element in direction
void scroll(WebElement element, String direction);

// Scroll from start to end with duration (seconds)
void scroll(float startX, float startY, float endX, float endY, float duration);

// Scroll to element using predicate string and direction
void scrollToElement(WebElement element, String predicateString, String direction);
```

## Pinch
```java
// Pinch with scale and velocity on element (overload with double also exists)
void pinch(WebElement element, float scale, float velocity);
void pinch(WebElement element, double scale, double velocity);

// Pinch at coordinates with scale/velocity
void pinch(float x, float y, double scale, double velocity);
```

## Tap / Double Tap
```java
// Tap
void tap(float x, float y);
void tap(WebElement element);

// Double tap
void doubleTap(WebElement element);
void doubleTap(float x, float y);
void doubleTap(float x, float y, float duration);
void doubleTap(WebElement element, float duration);
```

## Touch and Hold (Long Press)
```java
void touchAndHold(WebElement element, float duration);
void touchAndHold(float x, float y, float duration);
void touchAndHold(float x, float y);
void touchAndHold(WebElement element);
```

## Drag
```java
// Drag on element for duration
void dragFromToForDuration(WebElement element, float fromX, float fromY, float toX, float toY, float duration);

// Drag from coordinates for duration
void dragFromToForDuration(float fromX, float fromY, float toX, float toY, float duration);
```

## Two-Finger Tap
```java
void twoFingerTap(WebElement element);
```

## Alerts
```java
// Perform alert action, optionally pass a button label
void alert(String action, String buttonLabel);
```

## Multi-touch
```java
void multiTouchGesture(Map<String, Object>[] actions);
```

## Examples

### Initialize
```java
DriverActions actions = new DriverActions(driver);
IOSActions<?> ios = actions.iosActions();
```

### Scroll within element and tap target
```java
WebElement scrollable = driver.findElement(By.id("scrollable"));
ios.scroll(scrollable, "down");
WebElement target = driver.findElement(By.id("target"));
ios.tap(target);
```

### Scroll to element using predicate
```java
WebElement container = driver.findElement(By.id("container"));
ios.scrollToElement(container, "type == 'XCUIElementTypeButton' AND name CONTAINS 'Save'", "up");
```

### Pinch to zoom in on element
```java
WebElement map = driver.findElement(By.id("map"));
ios.pinch(map, 1.5, 1.0);
```

### Double tap with duration at coordinates
```java
ios.doubleTap(150f, 250f, 0.2f);
```

### Drag for 1.5s from one point to another
```java
ios.dragFromToForDuration(50f, 600f, 50f, 200f, 1.5f);
```

### Touch and hold on element for 1s
```java
WebElement pin = driver.findElement(By.id("pin"));
ios.touchAndHold(pin, 1.0f);
```

### Handle alert (accept)
```java
ios.alert("accept", null);
```

## Per-method demos

Below are minimal demos for every method. Assume:
```java
DriverActions actions = new DriverActions(driver);
IOSActions<?> ios = actions.iosActions();
WebElement el = driver.findElement(By.id("target"));
```

### swipe(String direction, WebElement element)
```java
ios.swipe("left", el);
```

### swipe(float startX, float startY, float endX, float endY, float duration)
```java
ios.swipe(300f, 600f, 50f, 600f, 0.25f);
```

### scroll(WebElement element, String direction)
```java
ios.scroll(el, "down");
```

### scroll(float startX, float startY, float endX, float endY, float duration)
```java
ios.scroll(200f, 700f, 200f, 200f, 0.4f);
```

### scrollToElement(WebElement element, String predicateString, String direction)
```java
WebElement container = driver.findElement(By.id("list"));
ios.scrollToElement(container, "name CONTAINS 'Save'", "up");
```

### pinch(WebElement element, float scale, float velocity)
```java
ios.pinch(el, 1.4f, 1.0f); // zoom in
```

### pinch(WebElement element, double scale, double velocity)
```java
ios.pinch(el, 0.7, 1.2); // zoom out
```

### pinch(float x, float y, double scale, double velocity)
```java
ios.pinch(160f, 320f, 1.3, 0.9);
```

### doubleTap(WebElement element)
```java
ios.doubleTap(el);
```

### doubleTap(float x, float y)
```java
ios.doubleTap(150f, 250f);
```

### touchAndHold(WebElement element, float duration)
```java
ios.touchAndHold(el, 1.0f);
```

### touchAndHold(float x, float y, float duration)
```java
ios.touchAndHold(140f, 260f, 1.2f);
```

### twoFingerTap(WebElement element)
```java
ios.twoFingerTap(el);
```

### dragFromToForDuration(WebElement element, float fromX, float fromY, float toX, float toY, float duration)
```java
ios.dragFromToForDuration(el, 0f, 0f, 0f, -300f, 1.5f);
```

### alert(String action, String buttonLabel)
```java
ios.alert("accept", null); // or ios.alert("dismiss", "Cancel")
```

### swipe (coordinates variant)
```java
ios.swipe(300f, 600f, 50f, 600f, 0.25f);
```

### scroll (coordinates variant)
```java
ios.scroll(200f, 700f, 200f, 200f, 0.4f);
```

### pinch at coordinates
```java
ios.pinch(160f, 320f, 1.3, 0.9);
```

### tap at coordinates
```java
ios.tap(120f, 220f);
```

### pinch (coords overload)
```java
ios.pinch(200f, 400f, 0.8, 1.1);
```

### dragFromToForDuration (coordinates variant)
```java
ios.dragFromToForDuration(50f, 600f, 50f, 200f, 1.0f);
```

### touchAndHold at coordinates
```java
ios.touchAndHold(100f, 180f);
```

### doubleTap at coordinates with duration
```java
ios.doubleTap(180f, 240f, 0.15f);
```
