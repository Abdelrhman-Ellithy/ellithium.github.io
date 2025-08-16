---
id: wait-actions
title: Wait Actions
sidebar_label: Wait Actions
description: Specialized wait conditions for elements and page states
---

# Wait Actions

The `WaitActions` class provides specialized wait conditions for elements and page states. All wait methods use fluent waits with configurable timeout and polling intervals.

## Overview

Wait actions include:
- Element visibility and presence waits
- Element state waits (clickable, selected)
- Text and attribute condition waits
- URL and page state waits
- Multiple element waits
- Custom timeout and polling configuration

## Element State Waits

### Visibility Waits

#### Wait for Element to be Visible
```java
// Wait for element to be visible with custom timeout and polling
WebElement element = actions.waits().waitForElementToBeVisible(
    By.id("message"), 10, 500
);
```

#### Wait for Element to Disappear
```java
// Wait for element to disappear from DOM
actions.waits().waitForElementToDisappear(
    By.id("loadingSpinner"), 15, 1000
);
```

### Presence Waits

#### Wait for Element Presence
```java
// Wait for element to be present in DOM
WebElement element = actions.waits().waitForElementPresence(
    By.cssSelector(".content"), 10, 500
);
```

### Clickability Waits

#### Wait for Element to be Clickable
```java
// Wait for element to be clickable
WebElement button = actions.waits().waitForElementToBeClickable(
    By.id("submit"), 10, 500
);
```

### Selection State Waits

#### Wait for Element to be Selected
```java
// Wait for element to be selected
boolean isSelected = actions.waits().waitForElementToBeSelected(
    By.id("checkbox"), 10, 500
);
```

#### Wait for Element Selection State
```java
// Wait for element to have specific selection state
boolean hasState = actions.waits().waitForElementSelectionStateToBe(
    By.id("radio"), true, 10, 500
);
```

## Text and Content Waits

### Text Presence Waits

#### Wait for Text in Element
```java
// Wait for specific text to be present in element
WebElement element = actions.waits().waitForTextToBePresentInElement(
    By.id("status"), "Success", 10, 500
);
```

#### Wait for Text in Element Value
```java
// Wait for specific text to be present in element value attribute
WebElement element = actions.waits().waitForTextToBePresentInElementValue(
    By.id("input"), "expected_value", 10, 500
);
```

### Attribute Waits

#### Wait for Element Attribute
```java
// Wait for element attribute to have specific value
boolean hasAttribute = actions.waits().waitForElementAttributeToBe(
    By.id("status"), "class", "active", 10, 500
);
```

#### Wait for Element Attribute Contains
```java
// Wait for element attribute to contain specific text
boolean containsAttribute = actions.waits().waitForElementAttributeContains(
    By.id("status"), "class", "success", 10, 500
);
```

## URL and Page State Waits

### URL Condition Waits

#### Wait for URL Contains
```java
// Wait for URL to contain specific text
boolean urlContains = actions.waits().waitForUrlContains(
    "/dashboard", 10, 500
);
```

#### Wait for URL to be
```java
// Wait for URL to be exactly as expected
boolean urlIs = actions.waits().waitForUrlToBe(
    "https://example.com/dashboard", 10, 500
);
```

## Multiple Element Waits

### Element Count Waits

#### Wait for Number of Elements
```java
// Wait for specific number of elements
boolean hasCount = actions.waits().waitForNumberOfElementsToBe(
    By.cssSelector(".item"), 5, 10, 500
);
```

#### Wait for Elements More Than
```java
// Wait for more than specified number of elements
boolean hasMore = actions.waits().waitForNumberOfElementsToBeMoreThan(
    By.cssSelector(".item"), 3, 10, 500
);
```

#### Wait for Elements Less Than
```java
// Wait for less than specified number of elements
boolean hasLess = actions.waits().waitForNumberOfElementsToBeLessThan(
    By.cssSelector(".item"), 10, 10, 500
);
```

### Multiple Element Visibility

#### Wait for All Elements Visible
```java
// Wait for all elements to be visible
List<WebElement> elements = actions.waits().waitForVisibilityOfAllElements(
    By.cssSelector(".item"), 10, 500
);
```

## Wait Configuration

### Timeout and Polling

All wait methods accept two parameters:
- **timeout**: Maximum wait time in seconds
- **pollingEvery**: Polling interval in milliseconds

```java
// Short timeout, frequent polling
actions.waits().waitForElementToBeVisible(By.id("fast"), 5, 100);

// Long timeout, less frequent polling
actions.waits().waitForElementToBeVisible(By.id("slow"), 30, 2000);
```

### Default Configuration

Default timeout and polling values can be configured in `config.properties`:

```properties
defaultElementWaitTimeout=60
defaultElementPollingTime=50
```

## Best Practices

1. **Appropriate Timeouts**: Use longer timeouts for slower operations
2. **Polling Frequency**: Balance responsiveness with performance
3. **Element State**: Wait for the appropriate element state
4. **Error Handling**: Check return values for wait success
5. **Logging**: All wait operations are logged for debugging

## Example Usage

```java
@Test
public void testDynamicContent() {
    DriverActions actions = new DriverActions(driver);
    
    // Wait for page to load
    actions.waits().waitForElementPresence(By.id("content"), 10, 500);
    
    // Wait for loading to complete
    actions.waits().waitForElementToDisappear(By.id("loading"), 15, 1000);
    
    // Wait for results to appear
    actions.waits().waitForNumberOfElementsToBeMoreThan(
        By.cssSelector(".result"), 0, 10, 500
    );
    
    // Wait for success message
    actions.waits().waitForTextToBePresentInElement(
        By.id("status"), "Success", 10, 500
    );
}
``` 