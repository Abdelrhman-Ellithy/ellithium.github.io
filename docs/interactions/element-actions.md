---
id: element-actions
title: Element Actions
sidebar_label: Element Actions
description: Basic element interactions including click, type, text and attributes
---

# Element Actions

The `ElementActions` class provides element interactions with built-in waits.

## Capabilities

- Send text or keys
- Click elements
- Get text/attributes/properties
- Work with element collections
- Upload single/multiple files

## Sending Data

```java
// Text
actions.elements().sendData(By.id("username"), "testuser");

// Keys
actions.elements().sendData(By.id("search"), Keys.ENTER);

// With custom timeout/polling
actions.elements().sendData(By.name("email"), "user@example.com", 10, 200);
actions.elements().sendData(By.id("search"), Keys.TAB, 5, 250);
```

## Clicking

```java
actions.elements().clickOnElement(By.id("submit"));
actions.elements().clickOnElement(By.cssSelector(".btn-primary"), 15, 500);
```

### Text Retrieval

#### Get Text from Single Element
```java
String message = actions.elements().getText(By.id("message"));
String title = actions.elements().getText(By.tagName("h1"), 5, 250);
```

## Attributes and Properties

```java
// Get text from all elements matching a locator
List<String> texts = actions.elements().getTextFromMultipleElements(By.cssSelector(".item"), 10, 500);

// Attribute (single)
String href = actions.elements().getAttributeValue(By.cssSelector("a"), "href", 10, 200);

// Property (single)
String value = actions.elements().getPropertyValue(By.id("field"), "value");

// Attributes from collection
List<String> srcs = actions.elements().getAttributeFromMultipleElements(
    By.cssSelector("img"), "src", 10, 200
);

// Properties from collection
List<String> aria = actions.elements().getPropertyFromMultipleElements(
    By.cssSelector("[role='button']"), "aria-label", 10, 200
);
```

## Element Collections

```java
// Click every element matching a locator
actions.elements().clickOnMultipleElements(By.cssSelector(".list .item"), 10, 200);
actions.elements().clickOnMultipleElements(By.cssSelector(".list .item")); // default timeout

// Get raw Selenium elements (use driver.findElements directly — ElementActions has no getElements wrapper)
List<WebElement> cards = driver.findElements(By.cssSelector(".card"));
```

## Clear Element

```java
// Clear the value of an input or textarea
actions.elements().clearElement(By.id("search"));
actions.elements().clearElement(By.id("search"), 10);         // custom timeout
actions.elements().clearElement(By.id("search"), 10, 200);    // custom timeout + polling
```

## Scroll Into View

```java
// Scroll the page until the element is visible in the viewport
actions.elements().scrollIntoView(By.id("footer-section"));
actions.elements().scrollIntoView(By.id("footer-section"), 10);        // custom timeout
actions.elements().scrollIntoView(By.id("footer-section"), 10, 200);   // custom timeout + polling
```

## Element State Checks

All state-check methods return `boolean` and accept optional `(int timeout)` or `(int timeout, int pollingEvery)` overloads.

```java
// Is element in the DOM (may not be visible)?
boolean present  = actions.elements().isElementPresent(By.id("modal"));
boolean present  = actions.elements().isElementPresent(By.id("modal"), 5, 200);

// Is element visible on the page?
boolean visible  = actions.elements().isElementDisplayed(By.id("banner"));
boolean visible  = actions.elements().isElementDisplayed(By.id("banner"), 5, 200);

// Is element enabled (not disabled)?
boolean enabled  = actions.elements().isElementEnabled(By.id("submit"));
boolean enabled  = actions.elements().isElementEnabled(By.id("submit"), 5, 200);

// Is element selected (checkbox / radio)?
boolean checked  = actions.elements().isElementSelected(By.id("agree"));
boolean checked  = actions.elements().isElementSelected(By.id("agree"), 5, 200);

// Is element clickable (visible + enabled)?
boolean clickable = actions.elements().isElementClickable(By.id("buy-now"));
boolean clickable = actions.elements().isElementClickable(By.id("buy-now"), 5, 200);
```

## Text and Attribute Checks

```java
// Does the element's text contain the given substring?
boolean hasSale   = actions.elements().isTextContains(By.id("promo-banner"), "SALE");
boolean hasSale   = actions.elements().isTextContains(By.id("promo-banner"), "SALE", 5, 200);

// Does the element's attribute value contain the given substring?
boolean hasActive = actions.elements().isAttributeContains(By.id("nav"), "class", "active");
boolean hasActive = actions.elements().isAttributeContains(By.id("nav"), "class", "active", 5, 200);

// Does the element's text exactly equal the expected string?
boolean exact     = actions.elements().isTextEqual(By.id("status"), "Order Confirmed");
boolean exact     = actions.elements().isTextEqual(By.id("status"), "Order Confirmed", 5, 200);
```

## File Uploads

```java
// Single file
actions.elements().uploadFile(By.id("fileInput"), "path/to/file.pdf", 10, 200);

// Multiple files
String[] files = {"a.png", "b.png"};
actions.elements().uploadMultipleFiles(By.id("imagesInput"), files, 15, 200);
```

## Notes

All element actions automatically wait for elements to be in the appropriate state:

- **Visibility**: Elements are waited to be visible before interaction
- **Clickability**: Elements are waited to be clickable before clicking
- **Presence**: Elements are waited to be present in DOM before operations

## Error Handling

The class includes comprehensive error handling:
- Automatic retry with configurable timeout and polling
- Detailed logging of all operations
- Graceful failure handling
- Element state validation

## Best Practices

1. **Use Descriptive Locators**: Prefer ID, name, or CSS selectors over XPath
2. **Set Appropriate Timeouts**: Use longer timeouts for slower elements
3. **Consistent Polling**: Use consistent polling intervals across your tests
4. **Element State**: Ensure elements are in the expected state before interaction
5. **Error Logging**: Check logs for detailed operation information

## Example Usage

```java
@Test
public void testLoginForm() {
    DriverActions actions = new DriverActions(driver);
    
    // Navigate to login page
    actions.navigation().navigateToUrl("https://example.com/login");
    
    // Fill login form
    actions.elements().sendData(By.id("username"), "testuser", 10, 500);
    actions.elements().sendData(By.id("password"), "password123", 10, 500);
    
    // Submit form
    actions.elements().clickOnElement(By.id("loginButton"), 10, 500);
    
    // Verify success message
    String message = actions.elements().getText(By.id("message"), 15, 1000);
    assertEquals("Login successful", message);
}
``` 
- Methods have overloads with default timeout/polling.
- `ElementActions` does not perform screenshots; use `ScreenRecorderActions.captureScreenshot` if needed. 