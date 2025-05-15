---
sidebar_position: 4
---

# Testing Modes

Ellithium supports two main testing modes: BDD Mode with Cucumber and Default Mode with TestNG.

## BDD Mode With Cucumber

BDD mode lets you write tests in Gherkin syntax, making them accessible to non-technical stakeholders.

### Step 1: Create a Test Runner Class

Create a Test Runner class that extends `BDDSetup`:

```java
package Runner;

import Ellithium.core.base.BDDSetup;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
    glue = "stepDefinitions",
    features = "src/main/resources/features",
    tags = "@Run"
)
public class TestRunner extends BDDSetup {
}
```

### Step 2: Create a Base Step Definitions Class

This class will be used as a parent for your step definition classes:

```java
package Base;

import Ellithium.core.driver.DriverFactory;
import org.openqa.selenium.WebDriver;

public class BaseStepDefinitions {
    protected WebDriver driver;
    
    public BaseStepDefinitions() {
        // Initialize WebDriver
        driver = DriverFactory.getNewLocalDriver(
            LocalDriverType.Chrome,
            HeadlessMode.False,
            PrivateMode.True,
            PageLoadStrategyMode.Normal,
            WebSecurityMode.SecureMode,
            SandboxMode.Sandbox
        );
        
        // Or using the builder pattern
        DriverConfigBuilder driverConfig = new LocalDriverConfig(
            LocalDriverType.Chrome,
            HeadlessMode.False,
            PrivateMode.False,
            PageLoadStrategyMode.Normal,
            WebSecurityMode.SecureMode,
            SandboxMode.Sandbox
        );
        driver = DriverFactory.getNewDriver(driverConfig);
    }
}
```

### Step 3: Create Step Definition Classes

Create step definition classes that extend your base class:

```java
package stepDefinitions;

import Base.BaseStepDefinitions;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

public class LoginSteps extends BaseStepDefinitions {
    
    @Given("I am on the login page")
    public void navigateToLoginPage() {
        driver.get("https://example.com/login");
    }
    
    @When("I enter username {string} and password {string}")
    public void enterCredentials(String username, String password) {
        // Use DriverActions for interactions
        // ...
    }
    
    @Then("I should be logged in successfully")
    public void verifyLogin() {
        // Assertions
        // ...
    }
}
```

## Default Mode with TestNG

Default mode uses TestNG for test execution, providing more control over test flow.

### Step 1: Create a Base Test Class

Create a base class that extends `NonBDDSetup`:

```java
package tests.base;

import Ellithium.core.base.NonBDDSetup;
import Ellithium.core.driver.DriverFactory;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;

public class BaseTests extends NonBDDSetup {
    protected WebDriver driver;

    @BeforeClass
    public void setup() {
        driver = DriverFactory.getNewLocalDriver(
            LocalDriverType.Chrome,
            HeadlessMode.False,
            PrivateMode.True,
            PageLoadStrategyMode.Normal,
            WebSecurityMode.SecureMode,
            SandboxMode.Sandbox
        );
    }

    @AfterClass
    public void tearDown() {
        DriverFactory.quitDriver();
    }
}
```

### Step 2: Create Test Classes

Create test classes that extend your base class:

```java
package tests;

import Base.BaseTests;
import Ellithium.Utilities.assertion.AssertionExecutor;
import Pages.LoginPage;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class LoginTests extends BaseTests {
    
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"validUser", "validPass", true},
            {"invalidUser", "invalidPass", false}
        };
    }
    
    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password, boolean shouldPass) {
        LoginPage loginPage = new LoginPage(driver);
        driver.get("https://example.com/login");
        
        loginPage.setUsername(username);
        loginPage.setPassword(password);
        loginPage.clickLogin();
        
        if (shouldPass) {
            AssertionExecutor.hard.assertTrue(loginPage.isLoggedIn());
        } else {
            AssertionExecutor.hard.assertTrue(loginPage.hasErrorMessage());
        }
    }
}
```

### Step 3: Create Page Objects

Use Page Object pattern with DriverActions for better maintainability:

```java
package Pages;

import Ellithium.Utilities.interactions.DriverActions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {
    private WebDriver driver;
    private DriverActions actions;
    
    // Locators
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.id("login");
    private By errorMessage = By.id("error");
    private By successMessage = By.id("success");
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.actions = new DriverActions(driver);
    }
    
    public void setUsername(String username) {
        actions.elements().sendData(usernameField, username, 10, 200);
    }
    
    public void setPassword(String password) {
        actions.elements().sendData(passwordField, password, 10, 200);
    }
    
    public void clickLogin() {
        actions.elements().clickOnElement(loginButton);
    }
    
    public boolean isLoggedIn() {
        return actions.elements().isElementDisplayed(successMessage);
    }
    
    public boolean hasErrorMessage() {
        return actions.elements().isElementDisplayed(errorMessage);
    }
}
``` 