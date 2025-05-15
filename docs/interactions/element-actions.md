---
sidebar_position: 2
---

# Element Actions

The `ElementActions` class provides comprehensive methods for interacting with web elements. It's accessed via the `elements()` method of the `DriverActions` class.

## Element Operations

### Clicking and Interaction

```java
// Click operations
actions.elements().clickOnElement(By.id("button"));
actions.elements().doubleClickOnElement(By.id("doubleClickTarget"));
actions.elements().rightClickOnElement(By.id("rightClickTarget"));

// Submit form
actions.elements().submitForm(By.id("loginForm"));
```

### Text and Input Operations

```java
// Send text data
actions.elements().sendData(By.id("username"), "testuser");
actions.elements().sendData(By.id("password"), "password123", 10); // 10 second timeout
actions.elements().sendData(By.id("search"), Keys.ENTER); // Send keyboard keys

// Clear field
actions.elements().clearElement(By.id("searchInput"));

// Get text
String text = actions.elements().getElementText(By.id("message"));
String value = actions.elements().getElementAttribute(By.id("field"), "value");
```

### File Upload

```java
// Upload file using sendKeys (standard approach)
actions.elements().uploadFile(By.id("fileUpload"), "C:/path/to/file.txt");

// For complex scenarios, use JavaScript approach
actions.JSActions().uploadFileUsingJS(By.id("complexFileUpload"), "C:/path/to/document.pdf");
```

### Element State Verification

```java
// Verify element states
boolean isDisplayed = actions.elements().isElementDisplayed(By.id("notification"));
boolean isPresent = actions.elements().isElementPresent(By.id("optionalElement"));
boolean isEnabled = actions.elements().isElementEnabled(By.id("submitButton"));
boolean isSelected = actions.elements().isElementSelected(By.id("agreeCheckbox"));

// Count elements
int count = actions.elements().countElements(By.cssSelector(".result-item"));
```

### Wait Operations

These methods wait for specific element conditions:

```java
// Wait for element states
WebElement visible = actions.elements().waitForElementToBeVisible(By.id("loading"));
WebElement clickable = actions.elements().waitForElementToBeClickable(By.id("button"));
WebElement present = actions.elements().waitForElementPresence(By.id("element"));

// Wait for element to disappear
actions.elements().waitForElementToDisappear(By.id("loadingSpinner"));

// Wait for element selection state
actions.elements().waitForElementToBeSelected(By.id("checkbox"));
actions.elements().waitForElementSelectionStateToBe(By.id("checkbox"), true);

// Wait for text conditions
actions.elements().waitForTextToBePresentInElement(By.id("message"), "Success");
actions.elements().waitForTextToBePresentInElementValue(By.id("field"), "value");

// Wait for element attribute conditions
actions.elements().waitForElementAttributeToBe(By.id("status"), "class", "active");
actions.elements().waitForElementAttributeContains(By.id("status"), "class", "success");

// Wait for number of elements
actions.elements().waitForNumberOfElementsToBe(By.cssSelector(".result"), 5);
actions.elements().waitForNumberOfElementsToBeMoreThan(By.cssSelector(".item"), 3);
actions.elements().waitForNumberOfElementsToBeLessThan(By.cssSelector(".item"), 10);

// Wait for visibility of multiple elements
List<WebElement> elements = actions.elements().waitForVisibilityOfAllElements(By.cssSelector(".item"));
```

### Finding Elements

```java
// Find elements
WebElement element = actions.elements().findWebElement(By.id("searchButton"));
List<WebElement> elements = actions.elements().findWebElements(By.cssSelector(".result-item"));
```

## Common Patterns

### Form Filling

```java
public void fillContactForm(String name, String email, String message) {
    DriverActions actions = new DriverActions(driver);
    
    actions.elements().sendData(By.id("name"), name);
    actions.elements().sendData(By.id("email"), email);
    actions.elements().sendData(By.id("message"), message);
    actions.elements().clickOnElement(By.id("submitButton"));
    
    // Wait for confirmation message
    actions.elements().waitForElementToBeVisible(By.id("confirmationMessage"));
}
```

### Handling Dynamic Content

```java
public void waitForSearchResults() {
    DriverActions actions = new DriverActions(driver);
    
    // Wait for loading spinner to disappear
    actions.elements().waitForElementToDisappear(By.id("loadingSpinner"));
    
    // Verify results appeared
    actions.elements().waitForNumberOfElementsToBeMoreThan(By.cssSelector(".search-result"), 0);
    
    // Get count of results
    int resultCount = actions.elements().countElements(By.cssSelector(".search-result"));
    System.out.println("Found " + resultCount + " search results");
}
```

### Working with Timeouts

All wait methods accept optional timeout and polling parameters:

```java
// Default timeout and polling
actions.elements().waitForElementToBeVisible(By.id("result"));

// Custom timeout (5 seconds)
actions.elements().waitForElementToBeVisible(By.id("result"), 5);

// Custom timeout (5 seconds) and polling interval (100ms)
actions.elements().waitForElementToBeVisible(By.id("result"), 5, 100);
```

The default timeout and polling values can be configured in the Ellithium properties file:

```properties
defaultElementWaitTimeout=10
defaultElementPollingTime=200
``` 