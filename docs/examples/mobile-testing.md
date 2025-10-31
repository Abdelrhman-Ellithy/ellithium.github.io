---
sidebar_position: 4
title: Mobile Testing
id: mobile-testing
---

# Mobile Testing Examples

This page provides examples of mobile testing using the Ellithium framework. These examples demonstrate how to create maintainable and robust tests for Android and iOS applications.

## Mobile Test Structure

The mobile test structure in Ellithium follows a similar pattern to web UI testing, using the Page Object Model:

```
src/test/java/
├── Base/
│   └── BaseTests.java       # Base test configuration for mobile
├── Pages/
│   └── Mobile pages         # Page objects for mobile screens
└── Mobile/
    └── NotesTests.java      # Mobile test classes
```

## Mobile Notes App Example

The following example demonstrates testing a Notes application on a mobile device:

```java
package Mobile;

import Base.BaseTests;
import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.Utilities.interactions.DriverActions;
import Ellithium.core.driver.DriverFactory;
import Ellithium.core.driver.MobileDriverType;
import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.net.URL;

public class NotesTests {
    private AndroidDriver driver;
    private DriverActions actions;
    
    // Locators
    private final By addNoteBtn = AppiumBy.id("com.example.notes:id/fab_add_note");
    private final By noteTitleField = AppiumBy.id("com.example.notes:id/edit_title");
    private final By noteContentField = AppiumBy.id("com.example.notes:id/edit_content");
    private final By saveNoteBtn = AppiumBy.id("com.example.notes:id/action_save");
    private final By notesList = AppiumBy.id("com.example.notes:id/notes_list");
    
    @BeforeClass
    public void setUp() throws Exception {
        // Set up capabilities for the Notes app
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("deviceName", "Android Emulator");
        capabilities.setCapability("automationName", "UiAutomator2");
        capabilities.setCapability("appPackage", "com.example.notes");
        capabilities.setCapability("appActivity", "com.example.notes.MainActivity");
        
        // Initialize the driver
        driver = DriverFactory.getNewMobileDriver(
            MobileDriverType.Android,
            new URL("http://localhost:4723"),
            capabilities
        );
        
        // Initialize the driver actions
        actions = new DriverActions(driver);
    }
    
    @Test(priority = 1)
    public void testAddNote() {
        // Click on add note button
        actions.elements().clickOnElement(addNoteBtn);
        
        // Enter note title
        String noteTitle = "Shopping List";
        actions.elements().sendData(noteTitleField, noteTitle);
        
        // Enter note content
        String noteContent = "1. Milk\n2. Eggs\n3. Bread\n4. Fruits";
        actions.elements().sendData(noteContentField, noteContent);
        
        // Save the note
        actions.elements().clickOnElement(saveNoteBtn);
        
        // Verify the note appears in the list
        By savedNoteTitle = AppiumBy.xpath("//android.widget.TextView[@text='" + noteTitle + "']");
        AssertionExecutor.hard.assertTrue(
            actions.elements().isElementDisplayed(savedNoteTitle),
            "Note should appear in the list after saving"
        );
    }
    
    @Test(priority = 2)
    public void testEditNote() {
        // Click on the previously created note
        By savedNoteTitle = AppiumBy.xpath("//android.widget.TextView[@text='Shopping List']");
        actions.elements().clickOnElement(savedNoteTitle);
        
        // Add more items to the note
        String updatedContent = "1. Milk\n2. Eggs\n3. Bread\n4. Fruits\n5. Cheese\n6. Vegetables";
        actions.elements().clearElement(noteContentField);
        actions.elements().sendData(noteContentField, updatedContent);
        
        // Save the updated note
        actions.elements().clickOnElement(saveNoteBtn);
        
        actions.elements().clickOnElement(savedNoteTitle);
        String actualContent = actions.elements().getAttributeValue(noteContentField, "text");
        AssertionExecutor.hard.assertEquals(actualContent, updatedContent, "Note content should be updated");
        
        driver.navigate().back();
    }
    
    @Test(priority = 3)
    public void testDeleteNote() {
        // Long press on the note to open context menu
        By savedNoteTitle = AppiumBy.xpath("//android.widget.TextView[@text='Shopping List']");
        // Long press using AndroidActions
        actions.androidActions().longClickGesture(driver.findElement(savedNoteTitle), 1500);
        
        By deleteOption = AppiumBy.xpath("//android.widget.TextView[@text='Delete']");
        actions.elements().clickOnElement(deleteOption);
        
        // Confirm deletion
        By confirmButton = AppiumBy.id("android:id/button1");
        actions.elements().clickOnElement(confirmButton);
        
        // Verify note is no longer in the list
        AssertionExecutor.hard.assertFalse(
            driver.findElement(savedNoteTitle).isDisplayed(),
            "Note should not be present after deletion"
        );
    }
    
    @Test(priority = 4)
    public void testSearchNote() {
        // First add a note to search for
        actions.elements().clickOnElement(addNoteBtn);
        actions.elements().sendData(noteTitleField, "Meeting Notes");
        actions.elements().sendData(noteContentField, "Discuss project timeline and deliverables");
        actions.elements().clickOnElement(saveNoteBtn);
        
        // Click on search icon
        By searchIcon = AppiumBy.id("com.example.notes:id/action_search");
        actions.elements().clickOnElement(searchIcon);
        
        // Enter search query
        By searchField = AppiumBy.id("com.example.notes:id/search_src_text");
        actions.elements().sendData(searchField, "Meeting");
        
        // Verify search results
        By meetingNote = AppiumBy.xpath("//android.widget.TextView[@text='Meeting Notes']");
        AssertionExecutor.hard.assertTrue(
            driver.findElement(savedNoteTitle).isDisplayed(),
            "Meeting note should appear in search results"
        );
    }
    
    @AfterClass
    public void tearDown() {
        // Quit the driver
        if (driver != null) {
            DriverFactory.quitDriver();
        }
    }
}
```

## Setting Up Mobile Tests with Ellithium

To set up mobile tests with Ellithium, follow these steps:

1. **Configure Appium Server**: Ensure Appium server is installed and running
2. **Set Up Device/Emulator**: Have a physical device connected or an emulator running
3. **Create Driver Configuration**:

```java
// For Android
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability("platformName", "Android");
capabilities.setCapability("deviceName", "Android Device");
capabilities.setCapability("automationName", "UiAutomator2");
capabilities.setCapability("appPackage", "com.example.app");
capabilities.setCapability("appActivity", "com.example.app.MainActivity");

AndroidDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.Android,
    new URL("http://localhost:4723"),
    capabilities
);

// For iOS
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability("platformName", "iOS");
capabilities.setCapability("deviceName", "iPhone");
capabilities.setCapability("automationName", "XCUITest");
capabilities.setCapability("bundleId", "com.example.app");

IOSDriver driver = DriverFactory.getNewMobileDriver(
    MobileDriverType.IOS,
    new URL("http://localhost:4723"),
    capabilities
);
```

## Using the DriverActions Class for Mobile Testing

Ellithium's `DriverActions` class provides enhanced interaction capabilities for mobile testing:

```java
DriverActions actions = new DriverActions(driver);

// Element interactions
actions.elements().clickOnElement(AppiumBy.id("button_id"));
actions.elements().sendData(AppiumBy.id("input_field"), "Test data");

// Android gestures
actions.androidActions().tap(driver.findElement(AppiumBy.id("element_id")));
actions.androidActions().longClickGesture(200, 400, 1200);

// Wait operations
actions.elements().waitForElementToBeVisible(AppiumBy.id("loading_indicator"));
```

## Key Features Demonstrated

These examples showcase several key mobile testing features in Ellithium:

1. **DriverFactory Integration**: Using Ellithium's DriverFactory to create and manage mobile drivers
2. **Enhanced Mobile Actions**: Using DriverActions for reliable mobile interactions
3. **Appium Support**: Seamless integration with Appium for both Android and iOS testing
4. **Locator Strategies**: Using AppiumBy locators for identifying mobile elements
5. **Synchronization Handling**: Automatic waiting and synchronization for mobile elements
6. **Common Touch Actions**: Support for touch actions like tap, swipe, and long press
7. **Page Object Pattern**: Similar structure to web testing for maintainability

For more mobile testing examples, check out the complete [source code](https://github.com/Abdelrhman-Ellithy/Ellithium/tree/main/src/test/java/Mobile) of the Ellithium project. 