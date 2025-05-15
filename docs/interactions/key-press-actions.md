---
sidebar_position: 10
id: key-press-actions
title: Key Presses Actions
slug: /interactions/key-press-actions
---

# Keyboard Actions

The `KeyPressActions` class provides methods for keyboard interactions, particularly for Android mobile testing. It's accessed via the `keyPress()` method of the `DriverActions` class.

## Mobile Key Operations

For Android devices, the framework supports native key events:

```java
// For Android devices
AndroidDriver androidDriver = (AndroidDriver) driver;
DriverActions actions = new DriverActions(androidDriver);

// Press Android key
actions.keyPress().pressKey(new KeyEvent(AndroidKey.BACK));

// Long press an Android key with duration in milliseconds
actions.keyPress().longPressKey(new KeyEvent(AndroidKey.HOME), 2000);

// Simplified method for long pressing an Android key
actions.keyPress().longPressAndroidKey(AndroidKey.HOME, 2000);
```

## Common Android Key Examples

```java
// Press Android back button
actions.keyPress().pressKey(new KeyEvent(AndroidKey.BACK));

// Press Android home button
actions.keyPress().pressKey(new KeyEvent(AndroidKey.HOME));

// Press Android volume up button
actions.keyPress().pressKey(new KeyEvent(AndroidKey.VOLUME_UP));

// Press Android volume down button
actions.keyPress().pressKey(new KeyEvent(AndroidKey.VOLUME_DOWN));

// Long press the home button (for app switcher)
actions.keyPress().longPressAndroidKey(AndroidKey.HOME, 1500);
```

## Error Handling

The KeyPressActions class handles errors gracefully:

- If a non-AndroidDriver is used with these methods, an appropriate error message is logged
- Any exceptions during key operations are caught and logged

## Implementation Notes

The actual `KeyPressActions` class in the Ellithium framework is primarily focused on Android device operations. It does not currently implement web-specific keyboard actions like:

- press()
- pressAndHold()
- release()
- typeWithModifier()
- typeSequence()

If you need to perform keyboard operations for web testing, you can use the `sendData()` method from the `ElementActions` class with `Keys` enum values:

```java
// Press Tab key in web element
actions.elements().sendData(By.id("inputField"), Keys.TAB);

// Type text in web element
actions.elements().sendData(By.id("inputField"), "Hello World");
``` 