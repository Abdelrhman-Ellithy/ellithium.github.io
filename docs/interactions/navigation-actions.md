---
sidebar_position: 7
---

# Navigation Actions

The `NavigationActions` class provides methods for navigating browser windows, handling URLs, and page navigation. It's accessed via the `navigation()` method of the `DriverActions` class.

## Basic Navigation

```java
DriverActions actions = new DriverActions(driver);

// Navigate to a URL
actions.navigation().navigateToUrl("https://example.com");

// Refresh the current page
actions.navigation().refreshPage();

// Navigate back in browser history
actions.navigation().navigateBack();

// Navigate forward in browser history
actions.navigation().navigateForward();
```

## Working with URLs

```java
// Get the current URL
String currentUrl = driver.getCurrentUrl();

// Verify URL containing text
boolean containsText = actions.waits().waitForUrlContains("dashboard");

// Verify exact URL
boolean isExactUrl = actions.waits().waitForUrlToBe("https://example.com/dashboard", 10, 200);
```

## Working with Page Titles

```java
// Get the current page title
String pageTitle = driver.getTitle();

// Verify title containing text
boolean containsText = actions.waits().waitForTitleContains("Dashboard", 10, 200);

// Verify exact title
boolean isExactTitle = actions.waits().waitForTitleIs("User Dashboard");
```

## Practical Examples

### Multi-Step Navigation Flow

```java
public void completeOnboardingFlow() {
    DriverActions actions = new DriverActions(driver);
    
    // Start at homepage
    actions.navigation().navigateToUrl("https://example.com");
    
    // Navigate through the onboarding steps
    actions.elements().clickOnElement(By.id("getStarted"), 10, 200);
    actions.waits().waitForUrlContains("/step1", 10, 200);
    
    actions.elements().sendData(By.id("userName"), "TestUser", 10, 200);
    actions.elements().clickOnElement(By.id("nextButton"), 10, 200);
    actions.waits().waitForUrlContains("/step2", 10, 200);
    
    actions.elements().sendData(By.id("email"), "test@example.com");
    actions.elements().clickOnElement(By.id("nextButton"));
    actions.waits().waitForUrlContains("/step3");
    
    actions.elements().clickOnElement(By.id("finishButton"), 10, 200);
    
    // Verify we reached the dashboard
    actions.waits().waitForUrlContains("/dashboard", 10, 200);
    actions.waits().waitForTitleContains("Dashboard", 10, 200);
}
```

### Testing Browser Navigation Buttons

```java
public void testBrowserNavigation() {
    DriverActions actions = new DriverActions(driver);
    
    // Start at homepage
    actions.navigation().navigateToUrl("https://example.com");
    
    // Go to another page
    actions.elements().clickOnElement(By.linkText("About Us"), 10, 200);
    actions.waits().waitForUrlContains("/about", 10, 200);
    
    // Navigate back to homepage
    actions.navigation().navigateBack();
    actions.waits().waitForUrlToBe("https://example.com/", 10, 200);
    
    // Navigate forward to About page again
    actions.navigation().navigateForward();
    actions.waits().waitForUrlContains("/about", 10, 200);
    
    // Refresh the page
    actions.navigation().refreshPage();
    actions.waits().waitForElementToBeVisible(By.id("aboutHeading"), 10, 200);
} 