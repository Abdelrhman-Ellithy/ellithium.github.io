---
id: key-press-actions
title: Key Press Actions
sidebar_label: Key Press Actions
description: Android key press actions available via AndroidActions
---

# Key Press Actions

Key press methods for mobile are provided by `MobileActions`. Use them with an Appium Android driver. Note that native key events are only supported on Android.

## Methods (from the framework)

```java
// Android key events (all accessed via actions.mobileActions())
void pressKey(io.appium.java_client.android.nativekey.KeyEvent keyEvent);
void longPressKey(io.appium.java_client.android.nativekey.KeyEvent keyEvent, long durationMillis);
void pressAndroidKey(io.appium.java_client.android.nativekey.AndroidKey key);
void longPressAndroidKey(io.appium.java_client.android.nativekey.AndroidKey key, long durationMillis);
```

## Usage

```java
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

DriverActions actions = new DriverActions(driver);

// Press BACK key using a raw KeyEvent
actions.mobileActions().pressKey(new KeyEvent(AndroidKey.BACK));

// Press HOME key directly using the AndroidKey enum (convenience)
actions.mobileActions().pressAndroidKey(AndroidKey.HOME);

// Long press HOME for 1.5 seconds using a raw KeyEvent
actions.mobileActions().longPressKey(new KeyEvent(AndroidKey.HOME), 1500);

// Long press VOLUME_DOWN for 2 seconds (convenience)
actions.mobileActions().longPressAndroidKey(AndroidKey.VOLUME_DOWN, 2000);
```

## Notes

- Requires an Android Appium driver; calling these methods on iOS throws `UnsupportedOperationException`.
- Durations are in milliseconds.
- iOS does not have native key event APIs; use `mobileActions().handleAlert()` or `mobileActions().twoFingerTap()` for iOS-specific interactions.