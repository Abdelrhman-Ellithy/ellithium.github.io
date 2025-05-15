---
sidebar_position: 11
---

# Select Actions

The `SelectActions` class provides specialized methods for interacting with dropdown menus, select elements, and option lists. It's accessed via the `select()` method of the `DriverActions` class.

## Basic Select Operations

```java
DriverActions actions = new DriverActions(driver);

// Select by visible text
actions.select().selectByVisibleText(By.id("countrySelect"), "United States");

// Select by value
actions.select().selectByValue(By.id("countrySelect"), "US");

// Select by index
actions.select().selectByIndex(By.id("countrySelect"), 0); // First option

// Deselect options (for multi-select)
actions.select().deselectByVisibleText(By.id("tagsSelect"), "Urgent");
actions.select().deselectByValue(By.id("tagsSelect"), "urgent");
actions.select().deselectByIndex(By.id("tagsSelect"), 0);
actions.select().deselectAll(By.id("tagsSelect"));
```

## Getting Select Information

```java
// Get all options
List<WebElement> options = actions.select().getOptions(By.id("countrySelect"));

// Get selected options
List<WebElement> selectedOptions = actions.select().getAllSelectedOptions(By.id("tagsSelect"));

// Get first selected option
WebElement firstSelected = actions.select().getFirstSelectedOption(By.id("countrySelect"));

// Check if multiple selection is allowed
boolean isMultiple = actions.select().isMultiple(By.id("tagsSelect"));
```

## With Custom Timeouts

```java
// With custom timeout (10 seconds)
actions.select().selectByVisibleText(By.id("countrySelect"), "United States", 10);

// With custom timeout (10 seconds) and polling interval (200ms)
actions.select().selectByValue(By.id("countrySelect"), "US", 10, 200);
```

## Practical Examples

### Dynamic Dropdown Handling

```java
public void selectFromDynamicDropdown() {
    DriverActions actions = new DriverActions(driver);
    
    // Click dropdown to load options
    actions.elements().clickOnElement(By.id("countryDropdown"));
    
    // Wait for options to load
    actions.elements().waitForNumberOfElementsToBeMoreThan(
        By.cssSelector("#countryDropdown option"), 
        1
    );
    
    // Select country by visible text
    actions.select().selectByVisibleText(By.id("countryDropdown"), "Germany");
    
    // Wait for state dropdown to be enabled (cascading dropdown)
    actions.elements().waitForElementToBeEnabled(By.id("stateDropdown"));
    
    // Now select from the state dropdown
    actions.select().selectByVisibleText(By.id("stateDropdown"), "Bavaria");
}
```

### Multi-Select Lists

```java
public void handleMultiSelectList() {
    DriverActions actions = new DriverActions(driver);
    
    // Verify this is a multi-select element
    boolean isMultiple = actions.select().isMultiple(By.id("skillsList"));
    
    if (isMultiple) {
        // Select multiple options
        actions.select().selectByVisibleText(By.id("skillsList"), "Java");
        actions.select().selectByVisibleText(By.id("skillsList"), "JavaScript");
        actions.select().selectByVisibleText(By.id("skillsList"), "Python");
        
        // Get all selected options
        List<WebElement> selectedOptions = actions.select().getAllSelectedOptions(By.id("skillsList"));
        System.out.println("Selected " + selectedOptions.size() + " skills");
        
        // Remove one option
        actions.select().deselectByVisibleText(By.id("skillsList"), "Python");
        
        // Verify selection count changed
        selectedOptions = actions.select().getAllSelectedOptions(By.id("skillsList"));
        System.out.println("Now selected " + selectedOptions.size() + " skills");
        
        // Clear all selections
        actions.select().deselectAll(By.id("skillsList"));
    }
}
```

### Custom Dropdowns (Non-Select Elements)

For custom dropdowns that don't use the standard `<select>` element:

```java
public void handleCustomDropdown() {
    DriverActions actions = new DriverActions(driver);
    
    // Click to open custom dropdown
    actions.elements().clickOnElement(By.cssSelector(".custom-dropdown-toggle"));
    
    // Wait for dropdown menu to appear
    actions.elements().waitForElementToBeVisible(By.cssSelector(".dropdown-menu"));
    
    // Click on specific option
    actions.elements().clickOnElement(
        By.xpath("//div[@class='dropdown-menu']//div[text()='Option 2']")
    );
    
    // Verify selection was applied
    String selectedValue = actions.elements().getElementText(By.cssSelector(".selected-value"));
    System.out.println("Selected: " + selectedValue);
}
``` 