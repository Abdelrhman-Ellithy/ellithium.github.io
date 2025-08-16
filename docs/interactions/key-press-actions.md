---
id: key-press-actions
title: Key Press Actions
sidebar_label: Key Press Actions
description: Keyboard and key press actions for both web and mobile drivers
---

# Key Press Actions

The `KeyPressActions` class provides keyboard and key press actions for both web and mobile drivers. This class extends `BaseActions` and handles Android KeyEvents and iOS key press operations.

## Overview

Key Press Actions is designed to work with both web and mobile drivers, providing:
- Android KeyEvent support
- iOS key press operations
- Long press key functionality
- Cross-platform keyboard interactions
- Native mobile key handling

## Getting Started

```java
import Ellithium.Utilities.interactions.KeyPressActions;
import Ellithium.Utilities.interactions.DriverActions;

// Get KeyPressActions from DriverActions (for mobile)
KeyPressActions<AppiumDriver> keyActions = driverActions.keyPressActions();
```

## Available Methods

### Android Key Events

#### pressKey(KeyEvent keyEvent)
Presses any key event on Android device.

```java
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

// Press specific Android key
KeyEvent backKey = new KeyEvent(AndroidKey.BACK);
keyActions.pressKey(backKey);

// Press home key
KeyEvent homeKey = new KeyEvent(AndroidKey.HOME);
keyActions.pressKey(homeKey);

// Press menu key
KeyEvent menuKey = new KeyEvent(AndroidKey.MENU);
keyActions.pressKey(menuKey);
```

#### longPressKey(KeyEvent keyEvent, long durationMillis)
Long presses any key event on Android device for specified duration.

```java
// Long press back key for 2 seconds
KeyEvent backKey = new KeyEvent(AndroidKey.BACK);
keyActions.longPressKey(backKey, 2000);

// Long press home key for 1.5 seconds
KeyEvent homeKey = new KeyEvent(AndroidKey.HOME);
keyActions.longPressKey(homeKey, 1500);
```

#### longPressAndroidKey(AndroidKey key, long durationMillis)
Long presses a key on Android device using AndroidKey enum.

```java
// Long press volume up for 3 seconds
keyActions.longPressAndroidKey(AndroidKey.VOLUME_UP, 3000);

// Long press volume down for 2 seconds
keyActions.longPressAndroidKey(AndroidKey.VOLUME_DOWN, 2000);
```

## Common Android Keys

### Navigation Keys
- `AndroidKey.BACK` - Back button
- `AndroidKey.HOME` - Home button
- `AndroidKey.MENU` - Menu button
- `AndroidKey.APP_SWITCH` - Recent apps button

### Media Keys
- `AndroidKey.VOLUME_UP` - Volume up
- `AndroidKey.VOLUME_DOWN` - Volume down
- `AndroidKey.MUTE` - Mute
- `AndroidKey.PLAY` - Play/Pause
- `AndroidKey.NEXT` - Next track
- `AndroidKey.PREVIOUS` - Previous track

### System Keys
- `AndroidKey.POWER` - Power button
- `AndroidKey.CAMERA` - Camera button
- `AndroidKey.SEARCH` - Search button
- `AndroidKey.ENTER` - Enter key
- `AndroidKey.DEL` - Delete key

### Directional Keys
- `AndroidKey.DPAD_UP` - D-pad up
- `AndroidKey.DPAD_DOWN` - D-pad down
- `AndroidKey.DPAD_LEFT` - D-pad left
- `AndroidKey.DPAD_RIGHT` - D-pad right
- `AndroidKey.DPAD_CENTER` - D-pad center

## Complete Example

```java
import Ellithium.Utilities.interactions.DriverActions;
import Ellithium.Utilities.interactions.KeyPressActions;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

public class KeyPressTestExample {
    
    public void performKeyPressActions(DriverActions<AppiumDriver> driverActions) {
        KeyPressActions<AppiumDriver> keyActions = driverActions.keyPressActions();
        
        // Basic key presses
        KeyEvent backKey = new KeyEvent(AndroidKey.BACK);
        keyActions.pressKey(backKey);
        
        KeyEvent homeKey = new KeyEvent(AndroidKey.HOME);
        keyActions.pressKey(homeKey);
        
        // Long press actions
        KeyEvent volumeUpKey = new KeyEvent(AndroidKey.VOLUME_UP);
        keyActions.longPressKey(volumeUpKey, 2000);
        
        // Using convenience method
        keyActions.longPressAndroidKey(AndroidKey.VOLUME_DOWN, 1500);
        
        // Menu navigation
        KeyEvent menuKey = new KeyEvent(AndroidKey.MENU);
        keyActions.pressKey(menuKey);
    }
}
```

## Best Practices

1. **Driver Validation**: Always ensure using AndroidDriver for Android-specific key events
2. **Key Event Creation**: Create KeyEvent objects once and reuse them
3. **Duration Control**: Use appropriate durations for long press actions
4. **Error Handling**: Implement proper error handling for key press failures
5. **Device Compatibility**: Test key events on different Android versions

## Troubleshooting

### Common Issues

- **UnsupportedOperationException**: Occurs when not using AndroidDriver
- **Key Not Recognized**: Some keys may not work on all devices
- **Timing Issues**: Long press duration may vary by device

### Debug Tips

- Verify driver type before using key events
- Check Android device key support
- Use logging to track key press execution
- Test on physical devices when possible

## Platform Considerations

### Android
- Full support for AndroidKey enum
- Native KeyEvent handling
- Long press functionality
- Volume and media control

### iOS
- Limited key press support
- Different key handling approach
- May require alternative methods

### Web
- Standard keyboard events
- No native mobile key support
- Use standard WebDriver methods

## Related Classes

- [Driver Actions](./driver-actions.md) - Main interaction class
- [Android Actions](./android-actions.md) - Android-specific gestures
- [iOS Actions](./ios-actions.md) - iOS-specific gestures
- [Element Actions](./element-actions.md) - Basic element interactions 