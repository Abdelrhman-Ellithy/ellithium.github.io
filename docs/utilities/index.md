---
sidebar_position: 1
id: index
title: Ellithium Utilities
slug: /utilities
---

# Ellithium Utilities

The Ellithium framework provides a comprehensive set of utility libraries that simplify common test automation tasks. These utilities make it easier to handle data, files, assertions, and system interactions in your test code.

## Available Utilities

### Data Processing

| Utility | Description |
|---------|-------------|
| [JSON Helper](/ellithium.github.io/utilities/json-helper) | Manipulate, read, and validate JSON data with support for nested structures, arrays, and complex operations. |
| [Excel Helper](/ellithium.github.io/utilities/excel-helper) | Read and write Excel files using Apache POI with support for multiple sheets, formatting, and data manipulation. |
| [CSV Helper](/ellithium.github.io/utilities/csv-helper) | Process CSV files with methods for reading, writing, filtering, and transforming tabular data. |
| [Text Helper](/ellithium.github.io/utilities/text-helper) | Handle plain text file operations including reading, writing, searching, and manipulating content. |
| [PDF Helper](/ellithium.github.io/utilities/pdf-helper) | Extract text, manipulate pages, and validate content in PDF documents using Apache PDFBox. |
| [Property Helper](/ellithium.github.io/utilities/property-helper) | Manage Java properties files with order preservation and enhanced functionality. |

### System Integration

| Utility | Description |
|---------|-------------|
| [JAR Extractor](/ellithium.github.io/utilities/jar-extractor) | Extract content from JAR files securely with protection against common vulnerabilities. |
| [Command Executor](/ellithium.github.io/utilities/command-executor) | Run OS commands with cross-platform support for Windows, macOS, and Linux. |

### Test Support

| Utility | Description |
|---------|-------------|
| [Test Data Generator](/ellithium.github.io/utilities/test-data-generator) | Generate realistic test data for various domains including personal info, addresses, and business data. |
| [Assertion Executor](/ellithium.github.io/utilities/assertion-executor) | Perform advanced assertions with detailed logging, supporting both hard and soft assertion modes. |
| [Configuration Properties](/ellithium.github.io/utilities/property-files) | Configure framework behavior through property files for logging, reporting, and execution settings. |

## Key Features

All utility classes in Ellithium share these common characteristics:

1. **Consistent Logging** - Operations are logged through the Ellithium reporting system
2. **Error Handling** - Robust error handling with meaningful error messages
3. **Thread Safety** - Safe to use in parallel test execution environments
4. **Fluent API** - Easy-to-use methods with intuitive naming
5. **Integration** - Seamless integration with Ellithium test reports

## Using Utilities in Your Tests

Importing and using utilities in your test code is straightforward:

```java
import Ellithium.Utilities.generators.TestDataGenerator;
import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.Utilities.helpers.JsonHelper;

public class MyTest {
    @Test
    public void testUserRegistration() {
        // Generate test data
        String username = TestDataGenerator.getRandomUsername();
        String email = TestDataGenerator.getRandomEmail();
        
        // Create user and verify response
        String response = userApi.createUser(username, email);
        
        // Use JSON helper to parse and verify response
        String userId = JsonHelper.getJsonKeyValue(response, "id");
        
        // Use assertion executor for validation
        AssertionExecutor.hard.assertNotNull(userId, "User ID should be generated");
        AssertionExecutor.hard.assertTrue(userId.length() > 5, "User ID should be valid");
    }
}
```

## Best Practices

- Import only the specific utilities needed in each test class
- Consider creating wrapper classes for frequent utility operations in your specific domain
- Use soft assertions with `AssertionExecutor` when validating multiple conditions
- Combine test data generation with property files for reproducible test runs 
- Configure test behavior through the [property files](property-files) for consistent execution 