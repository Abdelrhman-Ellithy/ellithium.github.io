---
sidebar_position: 2
id: interactions
title: Element Interactions
slug: /core/interactions
---

# Element Interactions

Use DriverActions for consistent element interactions across web and mobile.

## Basic Usage

```java
DriverActions actions = new DriverActions(driver);

// Element interactions
actions.elements().clickOnElement(By.id("submitButton"));
actions.elements().sendData(By.id("username"), "testuser");

// Wait operations
actions.elements().waitForElementToBeVisible(By.id("loading"));

// Element verification
boolean isDisplayed = actions.elements().isElementDisplayed(By.id("status"));
```

## Timeouts

```java
// With custom timeout (seconds)
actions.elements().sendData(By.id("username"), "testuser", 10);

// With timeout and polling interval
actions.elements().sendData(By.id("username"), "testuser", 10, 200);
```

[Back to Driver Factory Documentation →](/driverfactory)
