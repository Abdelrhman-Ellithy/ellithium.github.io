---
id: android-actions
title: Android Actions
sidebar_label: Android Actions
description: Android-specific mobile gestures and actions using Appium UIAutomator2
---

# Android Actions

`AndroidActions` extends `KeyPressActions` and provides native Android gestures via Appium UIAutomator2.

Ellithium exposes these methods (signatures from the framework):

## Drag
```java
// Drag element to coordinates
void dragGesture(WebElement element, int endX, int endY);

// Drag from start to end coordinates
void dragGesture(int startX, int startY, int endX, int endY);
```

## Fling
```java
// Fling element in direction: up, down, left, right
void flingGesture(WebElement element, String direction);

// Fling from region with velocity
void flingGesture(int startX, int startY, int endX, int endY, int velocity);
```

## Double Click
```java
void doubleClickGesture(WebElement element);
void doubleClickGesture(int x, int y);
```

## Long Click (Long Press)
```java
void longClickGesture(WebElement element);
void longClickGesture(int x, int y);
void longClickGesture(int x, int y, int durationMs);
void longClickGesture(WebElement element, int durationMs);
```

## Pinch
```java
// Pinch-close (zoom out)
void pinchCloseGesture(WebElement element, double percent);
void pinchCloseGesture(int left, int top, int width, int height, double percent);

// Pinch-open (zoom in)
void pinchOpenGesture(WebElement element, double percent);
void pinchOpenGesture(int left, int top, int width, int height, double percent);

// Generic pinch with scale/velocity
void pinchGesture(WebElement element, double scale, double velocity);
void pinchGesture(int left, int top, int width, int height, double scale, double velocity);
```

## Swipe
```java
// Swipe on element by percent in direction
void swipeGesture(WebElement element, String direction, double percent);

// Swipe within a region by percent
void swipeGesture(int left, int top, int width, int height, String direction, double percent);

// Swipe from start to end with duration
void swipeGesture(int startX, int startY, int endX, int endY, int duration);
```

## Scroll
```java
// Scroll on element by percent in direction
void scrollGesture(WebElement element, String direction, int percent);

// Scroll within a region by percent
void scrollGesture(int left, int top, int width, int height, String direction, int percent);

// Scroll from start to end by percent
void scrollGesture(int startX, int startY, int endX, int endY, int percent);

// Scroll until UIAutomator selector is found
void scrollToElement(String uiSelector);
```

## Tap
```java
void tapGesture(int x, int y);
void tapGesture(WebElement element);
```

## Multi-touch
```java
void multiTouchGesture(Map<String, Object>[] actions);
```

## Examples

### Initialize
```java
DriverActions actions = new DriverActions(driver);
AndroidActions<?> android = actions.androidActions();
```

### Scroll until element visible by UIAutomator selector
```java
android.scrollToElement("new UiSelector().textContains(\"Settings\")");
```

### Pinch close on image by 30%
```java
WebElement image = driver.findElement(By.id("image"));
android.pinchCloseGesture(image, 0.30);
```

### Pinch open (zoom in) within region
```java
android.pinchOpenGesture(100, 300, 600, 400, 0.25);
```

### Swipe left within element by 60%
```java
WebElement carousel = driver.findElement(By.id("carousel"));
android.swipeGesture(carousel, "left", 0.60);
```

### Swipe from start to end with duration
```java
android.swipeGesture(100, 1200, 900, 1200, 350);
```

### Long press at coordinates for 1500 ms
```java
android.longClickGesture(200, 500, 1500);
```

### Double click on element
```java
WebElement card = driver.findElement(By.id("card"));
android.doubleClickGesture(card);
```

### Fling region with velocity
```java
android.flingGesture(100, 300, 900, 300, 2000);
```

## Per-method demos

Below are minimal demos for every method. Assume:
```java
DriverActions actions = new DriverActions(driver);
AndroidActions<?> android = actions.androidActions();
WebElement el = driver.findElement(By.id("target"));
```

### dragGesture(WebElement element, int endX, int endY)
```java
android.dragGesture(el, 600, 800);
```

### dragGesture(int startX, int startY, int endX, int endY)
```java
android.dragGesture(200, 400, 600, 800);
```

### flingGesture(WebElement element, String direction)
```java
android.flingGesture(el, "up");
```

### doubleClickGesture(WebElement element)
```java
android.doubleClickGesture(el);
```

### doubleClickGesture(int x, int y)
```java
android.doubleClickGesture(350, 550);
```

### longClickGesture(WebElement element)
```java
android.longClickGesture(el);
```

### longClickGesture(int x, int y)
```java
android.longClickGesture(300, 500);
```

### longClickGesture(int x, int y, int durationMs)
```java
android.longClickGesture(300, 500, 1200);
```

### longClickGesture(WebElement element, int durationMs)
```java
android.longClickGesture(el, 1500);
```

### pinchCloseGesture(WebElement element, double percent)
```java
android.pinchCloseGesture(el, 0.25); // zoom out by 25%
```

### pinchCloseGesture(int left, int top, int width, int height, double percent)
```java
android.pinchCloseGesture(100, 300, 600, 400, 0.30);
```

### pinchOpenGesture(WebElement element, double percent)
```java
android.pinchOpenGesture(el, 0.30); // zoom in by 30%
```

### pinchOpenGesture(int left, int top, int width, int height, double percent)
```java
android.pinchOpenGesture(80, 280, 640, 420, 0.20);
```

### swipeGesture(WebElement element, String direction, double percent)
```java
android.swipeGesture(el, "left", 0.60);
```

### swipeGesture(int left, int top, int width, int height, String direction, double percent)
```java
android.swipeGesture(100, 800, 800, 250, "right", 0.50);
```

### scrollGesture(WebElement element, String direction, int percent)
```java
android.scrollGesture(el, "down", 60); // 60% of element height
```

### scrollGesture(int left, int top, int width, int height, String direction, int percent)
```java
android.scrollGesture(100, 400, 800, 600, "up", 70);
```

### scrollToElement(String uiSelector)
```java
android.scrollToElement("new UiSelector().textContains(\"Profile\")");
```

### multiTouchGesture(actions)
```java
Map<String, Object> action1 = new HashMap<>();
action1.put("action", "press");
action1.put("x", 200); action1.put("y", 600);
Map<String, Object> action2 = new HashMap<>();
action2.put("action", "press");
action2.put("x", 600); action2.put("y", 600);
android.multiTouchGesture(new Map[]{ action1, action2 });
```

### tapGesture(int x, int y)
```java
android.tapGesture(420, 880);
```

### tapGesture(WebElement element)
```java
android.tapGesture(el);
```

### swipeGesture(int startX, int startY, int endX, int endY, int duration)
```java
android.swipeGesture(150, 1200, 900, 1200, 300);
```

### scrollGesture(int startX, int startY, int endX, int endY, int percent)
```java
android.scrollGesture(150, 1200, 150, 300, 80);
```

### flingGesture(int startX, int startY, int endX, int endY, int velocity)
```java
android.flingGesture(120, 900, 120, 200, 2500);
```

### pinchGesture(WebElement element, double scale, double velocity)
```java
android.pinchGesture(el, 1.5, 1.0); // scale>1 zoom in
```

### pinchGesture(int left, int top, int width, int height, double scale, double velocity)
```java
android.pinchGesture(80, 300, 720, 420, 0.7, 1.2); // scale<1 zoom out
```
