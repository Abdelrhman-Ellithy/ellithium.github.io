---
sidebar_position: 6
---

# Mouse Actions

The `MouseActions` class provides methods for advanced mouse interactions such as hovering, drag-and-drop, and complex clicks. It's accessed via the `mouse()` method of the `DriverActions` class.

## Basic Mouse Operations

```java
DriverActions actions = new DriverActions(driver);

// Double click on an element
actions.mouse().doubleClick(By.id("doubleClickTarget"));

// Right click (context click) on an element
actions.mouse().rightClick(By.id("rightClickTarget"));

// Hover over an element (move to element)
actions.mouse().moveToElement(By.id("hoverMenu"));

// Click and hold an element
actions.mouse().clickAndHold(By.id("dragItem"));

// Release the mouse button
actions.mouse().release();
```

## Drag and Drop

```java
// Drag and drop using element locators
actions.mouse().dragAndDrop(
    By.id("sourceElement"), 
    By.id("targetElement")
);

// Drag and drop by offset (x,y coordinates)
actions.mouse().dragAndDropByOffset(
    By.id("sourceElement"), 
    100,  // x offset in pixels
    50    // y offset in pixels
);
```

## Complex Actions

```java
// Move to element with offset from its top-left corner
actions.mouse().moveToElementWithOffset(
    By.id("element"), 
    10,  // x offset
    15   // y offset
);

// Perform complex sequences
actions.mouse().clickAndHold(By.id("slider"))
    .moveToElementWithOffset(By.id("sliderTrack"), 100, 0)
    .release();
```

## Using Custom Timeouts

```java
// With custom timeout (10 seconds)
actions.mouse().doubleClick(By.id("element"), 10);

// With custom timeout (10 seconds) and polling interval (200ms)
actions.mouse().rightClick(By.id("element"), 10, 200);
```

## Common Use Cases

### Working with Drop-down Menus

```java
public void selectMenuOption(String menuName, String optionName) {
    DriverActions actions = new DriverActions(driver);
    
    // Hover over main menu to reveal dropdown
    actions.mouse().moveToElement(By.linkText(menuName));
    
    // Wait for dropdown to appear and click option
    actions.elements().waitForElementToBeVisible(By.linkText(optionName));
    actions.elements().clickOnElement(By.linkText(optionName));
}
```

### Slider Interaction

```java
public void moveSlider(By sliderLocator, By trackLocator, int percentage) {
    DriverActions actions = new DriverActions(driver);
    
    // Get track element to calculate width
    WebElement track = driver.findElement(trackLocator);
    int width = track.getSize().getWidth();
    
    // Calculate target position
    int targetPosition = (int)(width * (percentage / 100.0));
    
    // Perform drag operation
    actions.mouse().clickAndHold(sliderLocator)
        .moveToElementWithOffset(trackLocator, targetPosition, 0)
        .release();
    
    // Wait for value to update (assuming there's a value display)
    actions.elements().waitForElementTextToContain(By.id("sliderValue"), String.valueOf(percentage));
}
```

### Drag and Drop with Verification

```java
public void dragItemToTarget(String itemName, String targetName) {
    DriverActions actions = new DriverActions(driver);
    
    By sourceLocator = By.xpath("//div[@class='item'][text()='" + itemName + "']");
    By targetLocator = By.xpath("//div[@class='target'][text()='" + targetName + "']");
    
    // Perform drag and drop
    actions.mouse().dragAndDrop(sourceLocator, targetLocator);
    
    // Verify the drop was successful (look for a success indicator)
    actions.elements().waitForElementToBeVisible(By.cssSelector(".drop-success"));
} 