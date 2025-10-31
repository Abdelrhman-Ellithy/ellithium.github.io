---
sidebar_position: 11
---

# Select Actions

The `SelectActions` class provides specialized methods for interacting with native `<select>` dropdowns. It's accessed via the `select()` method of the `DriverActions` class.

## Selecting Options

```java
DriverActions actions = new DriverActions(driver);

// By visible text
actions.select().selectDropdownByText(By.id("countrySelect"), "United States");

// By value
actions.select().selectDropdownByValue(By.id("countrySelect"), "US");

// By index (0-based)
actions.select().selectDropdownByIndex(By.id("countrySelect"), 0);
```

With custom timeout and polling:
```java
// 10 seconds timeout, 200ms polling
actions.select().selectDropdownByText(By.id("countrySelect"), "United States", 10, 200);
```

## Reading Selected Options

```java
// Get selected options' texts (supports single or multi-select)
List<String> selected = actions.select().getDropdownSelectedOptions(By.id("tagsSelect"));

// With custom timeout/polling
List<String> selectedTimed = actions.select().getDropdownSelectedOptions(By.id("tagsSelect"), 10, 200);
```

## Selecting on Multiple Elements

```java
// Apply the same visible text selection to all matching select elements
actions.select().selectDropdownByTextForMultipleElements(
    By.cssSelector(".bulk-country"),
    "Germany",
    10,
    200
);
```

## Practical Examples

### Cascading Dropdowns

```java
public void selectCountryAndState() {
    DriverActions actions = new DriverActions(driver);

    // Open country dropdown (custom UI) and wait for native select to be visible
    actions.elements().clickOnElement(By.id("countryDropdown"), 10, 200);
    actions.waits().waitForElementToBeVisible(By.id("countrySelect"), 10, 200);

    // Select country (native select)
    actions.select().selectDropdownByText(By.id("countrySelect"), "Germany", 10, 200);

    // Wait for state select to become visible/enabled
    actions.waits().waitForElementToBeVisible(By.id("stateSelect"), 10, 200);

    // Select state
    actions.select().selectDropdownByText(By.id("stateSelect"), "Bavaria", 10, 200);
}
```

### Multi-Select Readback

```java
public void readMultiSelectValues() {
    DriverActions actions = new DriverActions(driver);

    // Select multiple values (native multi-select)
    actions.select().selectDropdownByText(By.id("skills"), "Java", 10, 200);
    actions.select().selectDropdownByText(By.id("skills"), "JavaScript", 10, 200);

    // Read selected values as text
    List<String> values = actions.select().getDropdownSelectedOptions(By.id("skills"), 10, 200);
    System.out.println("Selected: " + String.join(", ", values));
}
``` 