---
id: key-press-actions
title: Key Press Actions
sidebar_label: Key Press Actions
description: Android key press actions available via AndroidActions
---

# Key Press Actions

Key press methods are provided by `AndroidActions` (which extends `KeyPressActions`). Use them with an Appium Android driver. There is no separate accessor on `DriverActions` for generic key presses.

## Methods (from the framework)

```java
// Android key events
void pressKey(io.appium.java_client.android.nativekey.KeyEvent keyEvent);
void longPressKey(io.appium.java_client.android.nativekey.KeyEvent keyEvent, long durationMillis);
void longPressAndroidKey(io.appium.java_client.android.nativekey.AndroidKey key, long durationMillis);
```

## Usage

```java
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

DriverActions actions = new DriverActions(driver);

// Press BACK key
actions.androidActions().pressKey(new KeyEvent(AndroidKey.BACK));

// Long press HOME for 1.5 seconds
actions.androidActions().longPressKey(new KeyEvent(AndroidKey.HOME), 1500);

// Long press VOLUME_DOWN for 2 seconds (convenience)
actions.androidActions().longPressAndroidKey(AndroidKey.VOLUME_DOWN, 2000);
```

## Notes

- Requires Android (Appium) driver; these methods are not available on desktop web.
- Durations are in milliseconds.
- For iOS, use the gesture methods in `IOSActions` instead of key events. 