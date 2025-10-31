---
sidebar_position: 6
---

# Mouse Actions

The `MouseActions` class provides advanced mouse interactions: hover, drag-and-drop, context/double click, and slider moves. Access it via `mouse()` on `DriverActions`.

## Methods (from the framework)

```java
// Hover
void hoverOverElement(By locator, int timeout);
void hoverOverElement(By locator);

// Hover then click a target
void hoverAndClick(By locatorToHover, By locatorToClick, int timeout, int pollingEvery);
void hoverAndClick(By locatorToHover, By locatorToClick, int timeout);
void hoverAndClick(By locatorToHover, By locatorToClick);

// Drag and drop
void dragAndDrop(By sourceLocator, By targetLocator);
void dragAndDropByOffset(By sourceLocator, int xOffset, int yOffset);

// Clicks
void rightClick(By locator, int timeout, int pollingEvery);
void rightClick(By locator, int timeout);
void rightClick(By locator);

void doubleClick(By locator, int timeout, int pollingEvery);
void doubleClick(By locator, int timeout);
void doubleClick(By locator);

// Slider controls
float moveSliderTo(By sliderLocator, By rangeLocator, float targetValue);
void moveSliderByOffset(By sliderLocator, int xOffset, int yOffset, int timeout, int pollingEvery);
void moveSliderByOffset(By sliderLocator, int xOffset, int yOffset);
```

## Usage

```java
DriverActions actions = new DriverActions(driver);

// Hover menu and click submenu
actions.mouse().hoverAndClick(By.id("menu"), By.id("submenu"), 10, 200);

// Right click on element
actions.mouse().rightClick(By.cssSelector(".item"));

// Double click a card
actions.mouse().doubleClick(By.id("card"), 10, 200);

// Drag card onto target
actions.mouse().dragAndDrop(By.id("card"), By.id("dropzone"));

// Drag element by offset (100 px right, 0 px down)
actions.mouse().dragAndDropByOffset(By.id("thumb"), 100, 0);

// Move slider to 0.75 (75%) using slider and its filled-range element
float actual = actions.mouse().moveSliderTo(By.id("slider"), By.cssSelector(".range"), 0.75f);

// Nudge slider by offset
actions.mouse().moveSliderByOffset(By.id("slider"), 20, 0, 10, 200);
```

## Tips

- Prefer element locators that are stable during drag operations.
- For hover menus, allow time for animations; use the timeout/polling overloads.
- Use `moveSliderTo` when the slider has a visible range element to compute current value reliably. 