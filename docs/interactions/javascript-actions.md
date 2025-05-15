---
sidebar_position: 3
---

# JavaScript Actions

The `JavaScriptActions` class provides methods to execute JavaScript in the browser, which is useful for scenarios where standard WebDriver methods are insufficient. It's accessed via the `JSActions()` method of the `DriverActions` class.

## Common Use Cases

JavaScript actions are particularly helpful for:

- Handling elements that are difficult to interact with using standard Selenium methods
- Scrolling the page or within containers
- Working with elements that are hidden or in shadow DOM
- File uploads in complex UI frameworks
- Modifying element properties directly

## Basic Operations

### Element Interaction with JavaScript

```java
DriverActions actions = new DriverActions(driver);

// Click an element using JavaScript
actions.JSActions().javascriptClick(By.id("difficultButton"));

// Set element value directly
actions.JSActions().setElementValueUsingJS(By.id("hiddenField"), "test value");
```

### Page Scrolling

```java
// Scroll to element
actions.JSActions().scrollToElement(By.id("elementAtBottom"));

// Scroll by specific distance
actions.JSActions().scrollByOffset(0, 500); // Scroll down 500 pixels
```

### File Upload

JavaScript can help with file upload components that are difficult to access:

```java
// Upload file using JavaScript
actions.JSActions().uploadFileUsingJS(By.id("complexFileUpload"), "C:/path/to/file.txt");

// With custom timeout (10 seconds) and polling (200ms)
actions.JSActions().uploadFileUsingJS(By.id("uploadField"), "C:/path/to/document.pdf", 10, 200);
```

## Advanced JavaScript Execution

For more complex JavaScript operations, you can execute custom scripts directly:

```java
// Access the underlying JavascriptExecutor
JavascriptExecutor js = (JavascriptExecutor) driver;

// Execute custom JavaScript
js.executeScript("document.querySelector('#myElement').style.backgroundColor = 'yellow';");

// Execute JavaScript with arguments
js.executeScript("arguments[0].scrollIntoView(true); arguments[0].click();", 
    driver.findElement(By.id("button")));
```

## Wait and JavaScript

You can combine JavaScript actions with Ellithium's wait mechanisms:

```java
// Click with explicit wait
actions.JSActions().javascriptClick(By.id("ajaxButton"), 10); // 10 second timeout

// With custom timeout (10 seconds) and polling (200ms)
actions.JSActions().javascriptClick(By.id("ajaxButton"), 10, 200);
```

## Practical Examples

### Highlighting Elements

```java
public void highlightElement(WebElement element, WebDriver driver) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    
    // Store original style
    String originalStyle = element.getAttribute("style");
    
    // Apply highlight
    js.executeScript(
        "arguments[0].setAttribute('style', 'background: yellow; border: 2px solid red;');", 
        element
    );
    
    // Wait briefly to see the highlight
    try {
        Thread.sleep(500);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    
    // Restore original style
    js.executeScript("arguments[0].setAttribute('style', arguments[1]);", element, originalStyle);
}
```

### Handling Shadow DOM

```java
public WebElement findElementInShadowDOM(WebDriver driver, String shadowHost, String elementSelector) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    
    WebElement hostElement = driver.findElement(By.cssSelector(shadowHost));
    
    return (WebElement) js.executeScript(
        "return arguments[0].shadowRoot.querySelector(arguments[1])", 
        hostElement, 
        elementSelector
    );
}
```

### Scroll to Element and Wait for It

```java
public void scrollToElementAndWaitForIt(By locator, WebDriver driver) {
    DriverActions actions = new DriverActions(driver);
    
    // Scroll to the element
    actions.JSActions().scrollToElement(locator);
    
    // Wait for it to become visible after scrolling
    actions.elements().waitForElementToBeVisible(locator);
    
    // Now interact with the element
    actions.elements().clickOnElement(locator);
}
``` 