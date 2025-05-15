---
sidebar_position: 10
---

# Assertion Executor

The `AssertionExecutor` class provides a comprehensive set of utilities for performing both hard and soft assertions in your test code. It offers enhanced versions of TestNG assertions that include detailed logging and reporting through the Ellithium framework.

## Hard Assertions

Hard assertions cause immediate test failure when an assertion fails. These are static methods accessed through the `AssertionExecutor.hard` class:

```java
// Basic assertions
AssertionExecutor.hard.assertTrue(isUserLoggedIn, "User should be logged in");
AssertionExecutor.hard.assertFalse(hasErrors, "No errors should be present");
AssertionExecutor.hard.assertEquals(actualTitle, expectedTitle);
AssertionExecutor.hard.assertNull(deletedUser, "User should be null after deletion");
AssertionExecutor.hard.assertNotNull(response, "Response should not be null");

// Collection and string assertions
AssertionExecutor.hard.assertContains(userRoles, "ADMIN");
AssertionExecutor.hard.assertListEquals(actualUsers, expectedUsers);
AssertionExecutor.hard.assertListContainsAll(actualPermissions, requiredPermissions);
AssertionExecutor.hard.assertContainsIgnoreCase(errorMessage, "invalid credentials");
AssertionExecutor.hard.assertEmpty(errorList, "Error list should be empty");
AssertionExecutor.hard.assertNotEmpty(results, "Results should not be empty");

// Numeric assertions
AssertionExecutor.hard.assertGreaterThan(actualCount, minimumCount, "Count should exceed minimum");
AssertionExecutor.hard.assertLessThan(responseTime, maxResponseTime, "Response time should be under threshold");
AssertionExecutor.hard.assertBetween(temperature, minTemp, maxTemp);

// String specific assertions
AssertionExecutor.hard.assertMatches(email, "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
AssertionExecutor.hard.assertStartsWith(errorCode, "ERR-");
AssertionExecutor.hard.assertEndsWith(filename, ".pdf");

// Array assertions
AssertionExecutor.hard.assertArrayEquals(actualArray, expectedArray);
AssertionExecutor.hard.assertSameSize(actualList, expectedList);

// Map assertions
AssertionExecutor.hard.assertMapEmpty(emptyMap);
AssertionExecutor.hard.assertMapNotEmpty(configMap);

// Type assertions
AssertionExecutor.hard.assertInstanceOf(response, SuccessResponse.class, "Should be a success response");

// Failure
AssertionExecutor.hard.fail("Test failed due to external system unavailability");
```

## Soft Assertions

Soft assertions collect failures but don't stop test execution immediately. They require creating an instance and calling `assertAll()` at the end to evaluate all assertions:

```java
// Create a soft assertion instance
var soft = new AssertionExecutor.soft();

// Perform multiple assertions
soft.assertEquals(user.getName(), "John Doe");
soft.assertEquals(user.getEmail(), "john@example.com");
soft.assertTrue(user.isActive(), "User should be active");
soft.assertGreaterThan(user.getPoints(), 100, "User should have more than 100 points");

// Many more assertion types are available, similar to hard assertions
soft.assertContains(user.getRoles(), "USER");
soft.assertListEquals(user.getPermissions(), expectedPermissions);
soft.assertNotEmpty(user.getAddress(), "Address should not be empty");

// Validate all assertions at once - only at this point will test fail if any assertions failed
soft.assertAll();
```

## Key Features

### Enhanced Logging

All assertions are logged through the Ellithium reporting system:

- Successful assertions are logged with `INFO_GREEN` level
- Failed assertions are logged with `ERROR` level
- All logs include detailed information about the assertion

### Method Overloads

Most assertion methods are available in multiple forms:

- With or without custom failure messages
- Supporting different data types (String, primitive types, collections)
- With specialized behavior for specific data structures

### Specialized Assertions

The AssertionExecutor includes many specialized assertions beyond basic TestNG functionality:

- String operations: startsWith, endsWith, containsIgnoreCase, matches
- Collection operations: contains, containsAll, empty/notEmpty, sameSize
- Numeric comparisons: greaterThan, lessThan, between
- Map operations: empty/notEmpty
- Type checking: instanceOf

## Best Practices

### Choosing Between Hard and Soft Assertions

- Use **hard assertions** when a failure means the rest of the test cannot or should not proceed
- Use **soft assertions** when you want to validate multiple conditions in a single test and see all failures at once

### Creating Custom Messages

Always provide descriptive custom messages for assertions to make test failures easier to understand:

```java
// Good - clear failure message
AssertionExecutor.hard.assertEquals(user.getStatus(), "ACTIVE", 
    "User status should be ACTIVE after account verification");

// Not as helpful when it fails
AssertionExecutor.hard.assertEquals(user.getStatus(), "ACTIVE");
```

### Managing Soft Assertions

When using soft assertions:

1. Create a new instance at the beginning of each test method
2. Call `assertAll()` at the end of the test method
3. Consider using try-finally to ensure `assertAll()` is called even if exceptions occur

```java
var soft = new AssertionExecutor.soft();
try {
    // Test code with multiple soft assertions
} finally {
    soft.assertAll(); // Always executed
}
```

### Leveraging Type-Specific Assertions

Use the most specific assertion type available for clearer reporting:

```java
// Prefer this
AssertionExecutor.hard.assertStartsWith(errorCode, "ERR-");

// Instead of
AssertionExecutor.hard.assertTrue(errorCode.startsWith("ERR-"), 
    "Error code should start with ERR-");
```

The AssertionExecutor class integrates seamlessly with the Ellithium reporting system, making it easy to track assertions during test execution and diagnose failures through detailed logs and reports. 