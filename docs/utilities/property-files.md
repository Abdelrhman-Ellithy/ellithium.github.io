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

# Default timeout for waiting on elements (seconds)
defaultElementWaitTimeout=0

# Default polling interval for element checks (milliseconds)
defaultElementPollingTime=50

# Enable GUI execution video recording
recordGUITestExecution=true

# Attach the recorded video to the Allure report
attachRecordedGUITestExecutionToReport=true

# Only attach the video when the test fails (reduces report size)
attachRecordedGUITestExecutionToReportOnlyOnFailure=false
```

### Key Settings

| Property | Description | Default |
|----------|-------------|---------|
| `retryCountOnFailure` | Number of times to retry failed tests | 0 |
| `defaultElementWaitTimeout` | Element wait timeout in seconds | 0 |
| `defaultElementPollingTime` | Polling interval in milliseconds | 50 |
| `recordGUITestExecution` | Enable automatic video recording of test execution | true |
| `attachRecordedGUITestExecutionToReport` | Embed MP4 in Allure report | true |
| `attachRecordedGUITestExecutionToReportOnlyOnFailure` | Only attach video on test failure | false |

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


## Notifications Configuration

The `notifications.properties` file configures the test reporting system for email and Slack:

```properties
notification.enabled=true
notification.email.enabled=true
notification.slack.enabled=false
# ... other SMTP and webhook settings
```

## AI & Codegen Configuration

The `ai-config.properties` file controls self-healing strategies, local AI thresholds, and LLM provider settings:

```properties
# Healing strategy: DISABLED | HEAL_AND_CONTINUE | HEAL_AND_NOTIFY | SUGGEST_ONLY
ai.healing.strategy=DISABLED

# Embedded local AI semantic similarity threshold for Tier-2 healing (0.0 – 1.0)
ai.onnx.similarityThreshold=0.70

# Confidence threshold before a healed locator is stored as a new baseline
ai.healing.storeThreshold=0.85

# LLM provider for Tier-3 healing: openai | gemini | claude | azure-openai | custom
ai.llm.provider=

# API key (can reference an environment variable)
ai.llm.apiKey=${LLM_API_KEY}

# Model to use for LLM-powered healing
ai.llm.model=gemini-3.1-flash-lite

# Base URL for the LLM API endpoint
ai.llm.baseUrl=https://generativelanguage.googleapis.com/v1beta/
```

See the [Self-Healing guide](/ai/self-healing) for a full list of properties and configuration examples.

## Using Properties in Tests

You can access these properties in your tests through the PropertyHelper:

```java
import Ellithium.Utilities.helpers.PropertyHelper;

// Get a property value
String timeout = PropertyHelper.getDataFromProperties("config.properties", "defaultElementWaitTimeout");

// Set a property value
PropertyHelper.setDataToProperties("config.properties", "retryCountOnFailure", "2");
```