---
sidebar_position: 1
slug: /
---

# Ellithium Framework

Ellithium is a unified test automation framework for Web, Mobile, API, SQL and NoSQL database testing. It provides a seamless experience across different testing platforms with a consistent API.

:::info Official Recognition
**Ellithium is officially recognized in the [Selenium Ecosystem](https://www.selenium.dev/ecosystem/#frameworks) as a recommended test automation framework.**
:::

## Supported Testing Platforms

|Web |Mobile| API|Database|
| :---: |:---: |:---: |:---: |
| ✅  |✅  |✅   |✅  |

## Supported Database Types (Live Queries)

|Mongo | Couchbase |Redis | MySQL| SQL Server | Oracle | IBM DB2| PostgreSQL|SQLite |
| :---: |:---: |:---: |:---: |:---: |:---: |:---: |:---: |:---: |
| ✅  |✅  |✅   |✅  |✅  |✅  |✅   |✅  |✅  |

## Key Features

|BDD Support|Parallel Execution|Cross-Browser Testing|Headless Testing|Logging|Screenshots|Reporting|Synchronization|CI/CD|Test Data|AI Healing|BiDi Network|
|:--------:|:--------:|:--------:|:------:|:------:|:------:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|✅        |✅         |✅         |✅        |✅      |✅       |✅      |✅       |✅       |✅       |✅        |✅          |

## Framework Highlights

### Unified API for Different Platforms

Ellithium provides a consistent API for all testing platforms, making it easy to switch between web, mobile, API, and database testing without learning new concepts.

### Declarative Fixtures & Java 25 Scoped Values

Eliminate `@BeforeMethod` and `@AfterMethod` boilerplate using `@WithDriver` declarative parameter injection (`WebDriver`, `DriverActions`, `ElementActions`, `NetworkActions`). Safely propagate contexts across virtual threads using `DriverFactory.runWithDriver(...)`.

### WebDriver BiDi Network Actions

Perform real-time HTTP request interception, route-specific response mocking (`mockJsonResponse`, `mockResponse`), and automatic Basic/Digest authentication directly through Chrome/Edge BiDi protocols.

### Transparent Shadow DOM & Typed Locators

Seamlessly pierce nested open Shadow Roots using compound `>>>` selectors, or build compile-time safe, self-documenting locators with `TypedLocator`.

### Zero-Reflection Native Plugin SPI

Extend the framework with custom driver, test lifecycle, and reporting listeners via standard Java `ServiceLoader` SPI without reflection overhead, ensuring complete GraalVM Native Image compatibility.

### 3-Tier Cascading AI Self-Healing

Recover from stale or modified locators at runtime: Tier 1 SQLite-backed baselines, Tier 2 local ONNX semantic embedding with ambiguity margin tie-breaking and two-way label-control bridging, and Tier 3 LLM heals with CI proposal patch export.

### Database Testing (Zero Stale Data)

Execute live parameterized queries with connection pooling, transactional rollbacks, and SQL injection sanitization across 9 database engines, guaranteeing pristine test data integrity without caching artifacts.

### Rich Reporting & Non-Blocking Async Video

Detailed Allure reporting with automatic screenshot capture and non-blocking background video compilation, keeping test teardowns lightning-fast.

## Comprehensive Utility Libraries

Ellithium comes with a rich set of utility libraries that simplify test automation tasks:

| Utility | Description |
|---------|-------------|
| [JSON Helper](/utilities/json-helper) | Manipulate and validate JSON data |
| [Excel Helper](/utilities/excel-helper) | Read and write Excel files with Apache POI |
| [CSV Helper](/utilities/csv-helper) | Process CSV files with ease |
| [Text Helper](/utilities/text-helper) | Handle plain text file operations |
| [PDF Helper](/utilities/pdf-helper) | Extract and validate PDF content |
| [Property Helper](/utilities/property-helper) | Manage Java properties files |
| [JAR Extractor](/utilities/jar-extractor) | Extract content from JAR files securely |
| [Command Executor](/utilities/command-executor) | Run OS commands cross-platform |
| [Test Data Generator](/utilities/test-data-generator) | Generate realistic test data |
| [Assertion Executor](/utilities/assertion-executor) | Advanced assertions with detailed logging |

## Powered By

- Selenium WebDriver
- REST Assured
- Cucumber
- TestNG
- Allure Reports
- Appium

[Get Started →](getting-started)
