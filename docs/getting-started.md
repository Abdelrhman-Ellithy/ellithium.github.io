---
sidebar_position: 2
---

# Getting Started

Set up Ellithium in your project with these simple steps.

## Prerequisites
- Java Development Kit (JDK) 21
- Maven 3.8.1+ (3.9.9 recommended)
- Your favorite IDE (IntelliJ IDEA recommended)

## Quick Start

### 1. Add Dependency
Add to your `pom.xml`:

```xml
<dependency>
    <groupId>io.github.abdelrhman-ellithy</groupId>
    <artifactId>ellithium</artifactId>
    <version>2.1.0</version> // check the latest version on the repo
</dependency>
```
### 2. follow the instruction to installation and project setup
- [Installation ](installation.md)

### 3. Initialize Project
Run in terminal:
```bash
mvn clean test
```

## Next Steps

After installing Ellithium, you can start exploring its capabilities:

- [Learn about Driver Creation](driverfactory) - Set up WebDriver instances for browser automation
- [Explore Testing Modes](test-modes) - Choose between BDD and default testing approaches 
- [Discover Utility Libraries](utilities) - Simplify tasks with the built-in utilities

### Utility Essentials

The Ellithium framework includes a rich set of utilities to speed up your test automation development:

```java
// Generate test data
String name = TestDataGenerator.getRandomFullName();
String email = TestDataGenerator.getRandomEmail();

// Perform assertions with detailed reporting
AssertionExecutor.hard.assertTrue(user.isActive(), "User should be active");

// Work with various file formats
List<Map<String, String>> testData = JsonHelper.getJsonData("test-data.json");
```

[Learn more about Utilities →](utilities)
