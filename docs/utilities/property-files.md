---
sidebar_position: 11
title: Configuration Properties
---

# Configuration Properties

Ellithium uses various property files to configure testing behavior, logging, and reporting. These files are located in the `src/main/resources/properties` directory of your project.

## Main Configuration

The `config.properties` file contains core framework settings:

```properties
# Number of retries for failed tests/scenarios
retryCountOnFailure=0

# Enable detailed logging (true/false)
loggerExtensiveTraceMode=true

# Default timeout for waiting on elements (seconds)
defaultElementWaitTimeout=60

# Default polling interval for element checks (milliseconds)
defaultElementPollingTime=50
```

### Key Settings

| Property | Description | Default |
|----------|-------------|---------|
| `retryCountOnFailure` | Number of times to retry failed tests | 0 |
| `loggerExtensiveTraceMode` | Enable detailed trace logging | true |
| `defaultElementWaitTimeout` | Element wait timeout in seconds | 60 |
| `defaultElementPollingTime` | Polling interval in milliseconds | 50 |

## Allure Reporting Configuration

The `allure.properties` file controls the Allure report generation:

```properties
# Enable/disable Allure report generation
allure.generate.report=true

# Open report automatically after test execution
allure.open.afterExecution=true

# Directory for Allure results
allure.results.directory=Test-Output/Reports/Allure/allure-results

# Directory for generated Allure reports
allure.report.directory=Test-Output/Reports/Allure/allure-report
```

### Key Settings

| Property | Description | Default |
|----------|-------------|---------|
| `allure.generate.report` | Enable Allure report generation | true |
| `allure.open.afterExecution` | Auto-open report after test run | true |
| `allure.results.directory` | Directory for results data | Test-Output/Reports/Allure/allure-results |
| `allure.report.directory` | Directory for generated report | Test-Output/Reports/Allure/allure-report |


## Using Properties in Tests

You can access these properties in your tests through the PropertyHelper:

```java
import Ellithium.core.utilities.PropertyHelper;

// Get a property value
String timeout = PropertyHelper.getProperty("config.properties", "defaultElementWaitTimeout");

// Set a property value
PropertyHelper.setProperty("config.properties", "retryCountOnFailure", "2");
```

## Customizing Properties

You can override these properties for specific projects by:

1. Creating your own property files in the same directory structure
2. Setting system properties during test execution:
   ```bash
   mvn test -DdefaultElementWaitTimeout=30
   ``` 