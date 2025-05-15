---
sidebar_position: 8
---

# Wait Actions

The `WaitActions` class provides specialized methods for waiting for various browser conditions. It's accessed via the `waits()` method of the `DriverActions` class.

## Element State Waits

```java
DriverActions actions = new DriverActions(driver);

// Wait for element to be visible
actions.waits().waitForElementToBeVisible(By.id("myElement"));

// Wait for element to be clickable
actions.waits().waitForElementToBeClickable(By.id("myButton"));

// Wait for element to be present in DOM
actions.waits().waitForElementPresence(By.id("myElement"));

// Wait for element to disappear
actions.waits().waitForElementToDisappear(By.id("loadingIndicator"));

// Wait for element to be enabled
actions.waits().waitForElementToBeEnabled(By.id("submitButton"));

// Wait for element to be selected (checkbox, radio)
actions.waits().waitForElementToBeSelected(By.id("agreeCheckbox"));

// Wait for element to become stale (no longer attached to DOM)
WebElement element = driver.findElement(By.id("oldElement"));
actions.waits().waitForElementStaleness(element);

// Wait for specific text in element
actions.waits().waitForTextToBePresentInElement(By.id("message"), "Success");
```

## Page State Waits

```java
// Wait for page title
actions.waits().waitForTitleContains("Dashboard");
actions.waits().waitForTitleIs("User Dashboard");

// Wait for URL
actions.waits().waitForUrlContains("/dashboard");
actions.waits().waitForUrlToBe("https://example.com/dashboard");

// Wait for number of windows/tabs
actions.waits().waitForNumberOfWindowsToBe(2);
```

## Element Collection Waits

```java
// Wait for all elements to be visible
List<WebElement> elements = actions.waits().waitForVisibilityOfAllElements(By.cssSelector(".item"));

// Wait for specific number of elements
actions.waits().waitForNumberOfElementsToBe(By.cssSelector(".item"), 5);

// Wait for more than a specific number of elements
actions.waits().waitForNumberOfElementsToBeMoreThan(By.cssSelector(".item"), 3);

// Wait for less than a specific number of elements
actions.waits().waitForNumberOfElementsToBeLessThan(By.cssSelector(".item"), 10);
```

## Frame Waits

```java
// Wait for frame and switch to it (by locator)
actions.waits().waitForFrameToBeAvailableAndSwitchToIt(By.id("myFrame"));

// Wait for frame and switch to it (by name or ID)
actions.waits().waitForFrameByNameOrIdToBeAvailableAndSwitchToIt("frameNameOrId");

// Wait for frame and switch to it (by index)
actions.waits().waitForFrameByIndexToBeAvailableAndSwitchToIt(0);
```

## Element Attribute Waits

```java
// Wait for attribute to have specific value
actions.waits().waitForElementAttributeToBe(By.id("status"), "class", "active");

// Wait for attribute to contain value
actions.waits().waitForElementAttributeContains(By.id("status"), "class", "success");

// Wait for element selection state
actions.waits().waitForElementSelectionStateToBe(By.id("checkbox"), true);

// Wait for text in element value
actions.waits().waitForTextToBePresentInElementValue(By.id("searchField"), "search term");
```

## Timeout Options

All wait methods accept optional timeout parameters:

```java
// Default timeout
actions.waits().waitForElementToBeVisible(By.id("myElement"));

// With custom timeout (10 seconds)
actions.waits().waitForElementToBeVisible(By.id("myElement"), 10);

// With custom timeout (10 seconds) and polling interval (200ms)
actions.waits().waitForElementToBeVisible(By.id("myElement"), 10, 200);
```

## Practical Example

```java
public void completeCheckout() {
    DriverActions actions = new DriverActions(driver);
    
    // Click checkout button
    actions.elements().clickOnElement(By.id("checkoutButton"));
    
    // Wait for payment form to load
    actions.waits().waitForElementToBeVisible(By.id("paymentForm"));
    
    // Fill payment details
    actions.elements().sendData(By.id("cardNumber"), "4111111111111111");
    actions.elements().sendData(By.id("expiryDate"), "12/25");
    actions.elements().sendData(By.id("cvv"), "123");
    
    // Submit payment
    actions.elements().clickOnElement(By.id("submitPayment"));
    
    // Wait for processing spinner to appear
    actions.waits().waitForElementToBeVisible(By.id("processingSpinner"));
    
    // Wait for spinner to disappear
    actions.waits().waitForElementToDisappear(By.id("processingSpinner"));
    
    // Wait for success message
    actions.waits().waitForElementToBeVisible(By.id("successMessage"));
    
    // Wait for order number to be present
    actions.waits().waitForElementPresence(By.id("orderNumber"));
}
``` 