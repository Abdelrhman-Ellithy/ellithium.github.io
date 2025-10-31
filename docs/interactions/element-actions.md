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
List<String> texts = actions.elements().getTextFromMultipleElements(
    By.cssSelector(".item"), 10, 500
);
```
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
// Get elements
List<WebElement> cards = actions.elements().getElements(By.cssSelector(".card"), 10, 200);

// Click multiple
actions.elements().clickOnMultipleElements(By.cssSelector(".list .item"), 10, 200);
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