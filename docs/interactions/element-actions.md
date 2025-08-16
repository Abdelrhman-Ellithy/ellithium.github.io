---
id: element-actions
title: Element Actions
sidebar_label: Element Actions
description: Basic element interactions including click, type, and text retrieval
---

# Element Actions

The `ElementActions` class provides basic element interactions with built-in waiting and error handling. All methods automatically wait for elements to be in the appropriate state before performing actions.

## Overview

Element actions include:
- Sending text data to elements
- Clicking elements
- Retrieving text content
- Getting attribute values
- Working with multiple elements
- File uploads
- Screenshot capture

## Basic Element Operations

### Sending Data

#### Send Text Data
```java
// Send text to an element with custom timeout and polling
actions.elements().sendData(By.id("username"), "testuser", 10, 500);
actions.elements().sendData(By.name("email"), "user@example.com", 15, 1000);
```

#### Send Keyboard Keys
```java
// Send keyboard keys (ENTER, TAB, etc.)
actions.elements().sendData(By.id("search"), Keys.ENTER, 10, 500);
actions.elements().sendData(By.id("input"), Keys.TAB, 5, 250);
```

### Clicking Elements

```java
// Click on an element with custom timeout and polling
actions.elements().clickOnElement(By.id("submit"), 10, 500);
actions.elements().clickOnElement(By.cssSelector(".btn-primary"), 15, 1000);
```

### Text Retrieval

#### Get Text from Single Element
```java
// Get text content from an element
String text = actions.elements().getText(By.id("message"), 10, 500);
String title = actions.elements().getText(By.tagName("h1"), 5, 250);
```

#### Get Text from Multiple Elements
```java
// Get text from all elements matching a locator
List<String> texts = actions.elements().getTextFromMultipleElements(
    By.cssSelector(".item"), 10, 500
);
```

### Attribute Operations

#### Get Attribute Values
```java
// Get attribute value from an element
String href = actions.elements().getAttributeValue(
    By.cssSelector("a"), "href", 10, 500
);
String className = actions.elements().getAttributeValue(
    By.id("element"), "class", 5, 250
);
```

#### Get Attributes from Multiple Elements
```java
// Get attribute values from all elements matching a locator
List<String> attributes = actions.elements().getAttributeValueFromMultipleElements(
    By.cssSelector("img"), "src", 10, 500
);
```

## File Operations

### File Upload
```java
// Upload a file to a file input element
actions.elements().uploadFile(
    By.id("fileInput"), 
    "path/to/file.pdf", 
    10, 
    500
);
```

### Screenshot Capture
```java
// Take a screenshot of an element
actions.elements().takeScreenshot(
    By.id("content"), 
    "element_screenshot.png", 
    10, 
    500
);
```

## Multiple Element Operations

### Get Multiple Elements
```java
// Get all elements matching a locator
List<WebElement> elements = actions.elements().getMultipleElements(
    By.cssSelector(".item"), 10, 500
);
```

### Check Element Count
```java
// Verify the number of elements
boolean hasThreeItems = actions.elements().checkElementCount(
    By.cssSelector(".item"), 3, 10, 500
);
```

## Wait Integration

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