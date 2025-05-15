---
sidebar_position: 1
title: Web UI Testing
id: web-testing
---

# Web UI Testing Examples

This page provides real-world examples of Web UI testing using the Ellithium framework. These examples demonstrate how to create maintainable UI tests with proper structure and best practices.

## Test Structure

Ellithium uses a Page Object Model approach for UI testing to ensure maintainability and readability:

```
src/test/java/
├── Base/
│   └── BaseTests.java      # Base test configuration
├── Pages/
│   ├── HomPage.java        # Page objects for different pages
│   ├── LoginPage.java
│   └── AlertsPage.java
└── UI_NonBDD/
    ├── loginTests.java     # Actual test classes
    └── AlertsTests.java
```

## Login Test Example

Login tests demonstrate how to handle form submission and validation:

```java
package UI_NonBDD;

import Base.BaseTests;
import Ellithium.Utilities.assertion.AssertionExecutor;
import Pages.LoginPage;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class loginTests extends BaseTests {
    @DataProvider(name = "invalidLoginData")
    Object[][] getInvalidTestData() {
        return new Object[][]{
                {"tomsmith", "hamada", "Your password is invalid"},
                {"hamada", "SuperSecretPassword!", "Your username is invalid"}
        };
    }

    LoginPage login;

    @Test(priority = 1, dataProvider = "invalidLoginData")
    public void invalidLogin(String username, String password, String expectedMessage) {
        login = home.clickFormAuthentication();
        login.setUserName(username);
        login.setPassword(password);
        var secureAreaPage = login.clickLoginBtn();
        String actualMessage = secureAreaPage.getLoginMassega();
        AssertionExecutor.hard.assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test(priority = 2)
    public void validLogin() {
        login = home.clickFormAuthentication();
        login.setPassword("SuperSecretPassword!");
        login.setUserName("tomsmith");
        var secureAreaPage = login.clickLoginBtn();
        String actualMessage = secureAreaPage.getLoginMassega();
        String expectedMessage = "You logged into a secure area!";
        AssertionExecutor.hard.assertTrue(actualMessage.contains(expectedMessage));
    }
}
```

## Page Object Implementation

Here's how a page object is implemented in Ellithium:

```java
package Pages;

import Ellithium.Utilities.interactions.DriverActions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {
    WebDriver driver;
    DriverActions driverActions;
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        driverActions = new DriverActions(driver);
    }
    
    public void setUserName(String username) {
        // Note the use of timeout and polling time for better synchronization
        driverActions.elements().sendData(By.id("username"), username, 5, 200);
    }
    
    public void setPassword(String password) {
        driverActions.elements().sendData(By.id("password"), password, 5);
    }
    
    public SecureAreaPage clickLoginBtn() {
        driverActions.elements().clickOnElement(By.tagName("button"));
        return new SecureAreaPage(driver);
    }
}
```

## Alert Handling Example

The following test demonstrates how to handle browser alerts:

```java
package UI_NonBDD;

import Base.BaseTests;
import Pages.AlertsPage;
import org.testng.annotations.Test;
import Ellithium.Utilities.assertion.AssertionExecutor;

public class AlertsTests extends BaseTests {
    
    @Test
    public void testAcceptAlert() {
        AlertsPage alertsPage = home.clickJavaScriptAlerts();
        alertsPage.triggerAlert();
        alertsPage.acceptAlert();
        AssertionExecutor.hard.assertEquals(alertsPage.getResult(), "You successfully clicked an alert");
    }

    @Test
    public void testGetTextFromAlert() {
        AlertsPage alertsPage = home.clickJavaScriptAlerts();
        alertsPage.triggerConfirm();
        String text = alertsPage.getAlertText();
        alertsPage.dismissAlert();
        AssertionExecutor.hard.assertEquals(text, "I am a JS Confirm");
    }

    @Test
    public void testSetInputInAlert() {
        AlertsPage alertsPage = home.clickJavaScriptAlerts();
        alertsPage.triggerPrompt();
        
        String text = "Hello World!";
        alertsPage.setAlertText(text);
        alertsPage.acceptAlert();
        
        AssertionExecutor.hard.assertEquals(alertsPage.getResult(), "You entered: " + text);
    }
}
```

## Dynamic Loading Example

This example shows how to handle dynamically loaded elements with proper waiting:

```java
package UI_NonBDD;

import Base.BaseTests;
import Pages.DynamicLoadingPage;
import Pages.LoadingExample1;
import org.testng.annotations.Test;
import Ellithium.Utilities.assertion.AssertionExecutor;

public class DynamicLoadingPageTests extends BaseTests {
    
    @Test
    public void testWaitUntilHidden() {
        DynamicLoadingPage dynamicLoadingPage = home.clickDynamicLoading();
        LoadingExample1 loadingExample1 = dynamicLoadingPage.clickExample1();
        
        loadingExample1.clickStart();
        
        // DriverActions in LoadingExample1 handles the waiting for us
        AssertionExecutor.hard.assertEquals(
            loadingExample1.getLoadedText(),
            "Hello World!"
        );
    }
}
```

## Key Features Demonstrated

These examples showcase several key features of Ellithium:

1. **Synchronization Handling**: The `DriverActions` class automatically handles waiting for elements
2. **Page Object Pattern**: Clean separation of test logic and page interactions
3. **TestNG Integration**: Using annotations like `@Test` and `@DataProvider`
4. **Assertion Reporting**: Enhanced assertions with detailed logging
5. **Fluent Navigation**: Page objects returning other page objects for fluent test flows

For more examples, check out the [source code](https://github.com/Abdelrhman-Ellithy/Ellithium/tree/main/src/test/java) of the Ellithium project. 