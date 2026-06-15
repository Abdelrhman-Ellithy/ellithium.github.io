---
sidebar_position: 4
---

# AI Engine & Natural Language Codegen

The `EllithiumAIEngine` is the central facade for all AI generation capabilities within the framework. It bridges the gap between natural language requirements, live DOM context, and generated executable test code.

## Natural Language Codegen

Ellithium allows you to write test cases in plain English (or any natural language) and automatically generate fully scaffolded TestNG test classes, reusable Page Objects, and even BDD feature files.

### Using JSON or Text Test Cases

You can supply your test steps and descriptions in JSON or Text format.

**JSON Format Example (`tests.json`):**
```json
[
  {
    "testId": "TC-01",
    "description": "Login with valid credentials",
    "targetUrl": "https://the-internet.herokuapp.com/login"
  }
]
```

**Text Format Example (`tests.txt`):**
```text
ID: TC-01
URL: https://the-internet.herokuapp.com/login
Login with valid credentials and verify the secure area loads.
```

If a `targetUrl` is provided, the AI Engine will open a headless browser to capture the live DOM and use it to intelligently and reliably generate exact, real locators without hallucinating.

### Generating Code

Pass the file to the engine to process the natural language into source code. The generator is idempotent—it will safely skip tests that it has already generated.

```java
import Ellithium.Utilities.ai.EllithiumAIEngine;
import Ellithium.Utilities.ai.LLMProvider;

LLMProvider provider = new MyLLMProvider();

// 1-arg constructor — defaults: output="src/main/java", generateBDD=true
EllithiumAIEngine engine = new EllithiumAIEngine(provider);

// 3-arg constructor — custom output path and BDD flag
EllithiumAIEngine engine = new EllithiumAIEngine(provider, "src/main/java", true);

// 4-arg constructor — separate output paths for POM source and test source
EllithiumAIEngine engine = new EllithiumAIEngine(
    provider,
    "src/main/java",      // outputBasePath: where Page Objects are written
    "src/test/java",      // testOutputBasePath: where TestNG/BDD test classes are written
    true                  // generateBDD: true = emit .feature files alongside Java
);

// Start Generation
engine.generateFrom("src/test/resources/tests.json");
```

## Live In-Context Generation

If you are currently paused inside an active, authenticated WebDriver session, you can instruct the AI engine to evaluate the current live state, determine how to interact with it, generate the code, and immediately execute those actions.

```java
// From within a running test...
EllithiumAIEngine.continueFrom(driver, provider,
    "Fill shipping name 'John', city 'Cairo', then click 'Place Order'");

// Or load steps from a local file...
EllithiumAIEngine.continueFromFile(driver, provider, "checkout-steps.txt");
```

No new browser is opened. The AI Engine securely scrapes the minimized DOM accessibility tree from your *existing* authenticated session to figure out the required interactions.

## AI Test Data Generation

The `AITestDataGenerator` utilizes the AI Engine to dynamically generate test data and fuzzing payloads. You describe the schema, and the AI will reply with a list of edge-cases, invalid types, extreme values, SQL injection attempts, and boundary objects formatted as JSON strings.

```java
import Ellithium.core.ai.generators.AITestDataGenerator;

String schemaDesc = "User registration payload: username (string), age (int), email (string)";

// Generate exactly 10 diverse fuzzing payloads
List<String> payloads = AITestDataGenerator.generateFuzzingData(schemaDesc, 10, provider);

for (String payload : payloads) {
    // Send API request with this generated edge-case payload
    System.out.println(payload);
}
```
