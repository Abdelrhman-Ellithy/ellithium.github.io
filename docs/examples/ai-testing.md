---
sidebar_position: 6
title: AI-Powered Testing
id: ai-testing
---

# AI-Powered Testing Examples

This page demonstrates real-world usage of the Ellithium 3.0 AI module: self-healing locators, the Codegen Recorder, and natural-language test generation. All features integrate transparently into the standard Ellithium test structure — no extra frameworks required.

---

## 1. Self-Healing Locators

Self-healing is transparent by design. Enable it in `src/test/resources/ai-config.properties` and your existing `DriverActions` calls automatically gain the 3-tier healing cascade when a locator fails.

### Minimal Setup

```properties
# src/test/resources/ai-config.properties

# Choose a strategy (default is DISABLED)
ai.healing.strategy=HEAL_AND_NOTIFY

# Tier 2: embedded local AI semantic similarity floor (0.0–1.0)
ai.onnx.similarityThreshold=0.75

# Tier 3: LLM (only reached if Tier 1 & 2 fail)
ai.tier3.enabled=true
ai.llm.provider=gemini
ai.llm.apiKey=${LLM_API_KEY}
ai.llm.model=gemini-3.1-flash-lite
ai.llm.baseUrl=https://generativelanguage.googleapis.com/v1beta/
```

### Page Object — Standard Code, Healing-Aware

```java
package Pages;

import Ellithium.Utilities.interactions.DriverActions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class CheckoutPage {
    private final DriverActions actions;

    // Stored as By fields — the self-healing engine intercepts when these break
    private final By itemPrice    = By.cssSelector(".item-price .value");
    private final By promoInput   = By.id("promo-code-input");
    private final By applyButton  = By.cssSelector("[data-testid='apply-promo']");
    private final By totalPrice   = By.cssSelector(".order-summary .total");
    private final By placeOrder   = By.id("place-order-btn");

    public CheckoutPage(WebDriver driver) {
        this.actions = new DriverActions(driver);
    }

    public String getItemPrice() {
        return actions.elements().getText(itemPrice);
    }

    public void applyPromoCode(String code) {
        actions.elements().sendData(promoInput, code);
        actions.elements().clickOnElement(applyButton);
    }

    public String getTotal() {
        return actions.elements().getText(totalPrice);
    }

    public void placeOrder() {
        actions.elements().clickOnElement(placeOrder);
    }
}
```

No healing-specific API is needed — the `DriverActions` calls above are already healed automatically when a locator breaks.

### Test Class

```java
package Tests;

import Base.BaseTests;
import Pages.CheckoutPage;
import Ellithium.Utilities.assertion.AssertionExecutor;
import org.testng.annotations.Test;

public class CheckoutTests extends BaseTests {

    @Test
    public void verifyPromoCodeReducesTotal() {
        CheckoutPage checkout = home.navigateToCheckout();

        String originalTotal = checkout.getTotal();
        checkout.applyPromoCode("SAVE20");
        String discountedTotal = checkout.getTotal();

        // If any locator breaks during a UI refactor, the healing engine
        // automatically recovers without touching this test code.
        AssertionExecutor.soft.assertNotEquals(
            discountedTotal, originalTotal,
            "Total should decrease after applying promo code"
        );
    }
}
```

### How Healing Strategies Behave

| Strategy | Behaviour when a locator breaks |
|---|---|
| `DISABLED` | No healing — test fails normally |
| `HEAL_AND_NOTIFY` | Heals silently, logs `[HEAL-ALERT]` warning with suggested fix |
| `HEAL_AND_CONTINUE` | Heals silently, no warning logged |
| `SUGGEST_ONLY` | Logs a suggestion but does NOT apply it; test still fails |

### Source File Patching — Clean Working Tree Requirement

When `ai.execution.mode=LOCAL` (default), Ellithium writes the healed locator directly back into your Page Object source file after a successful heal above the `ai.healing.storeThreshold` confidence.

Before patching, the engine runs `git status --porcelain <file>` to check whether the file has any uncommitted changes (staged or unstaged). If the file is **dirty**, the patch is aborted:

```
AI source-patch aborted: file has uncommitted changes — src/test/java/Pages/CheckoutPage.java
```

If the file is **clean** (tracked, no staged or unstaged modifications), the patch proceeds. Any non-empty output from `git status --porcelain` — including `??` for untracked files — causes the patch to abort, so brand-new uncommitted files are also blocked until they are committed.

> **Rule of thumb:** commit or stash any edits to a Page Object before running tests with self-healing enabled. The guard exists to prevent the engine from silently overwriting edits you are actively working on between runs.

```bash
# If a patch was skipped because of local edits, commit or stash first:
git add src/test/java/Pages/CheckoutPage.java
git commit -m "update CheckoutPage locators"
# then re-run — the next healed execution will apply the source patch
```

In **CI mode** (`ai.execution.mode=CI`), source patching is never attempted regardless of file state. Instead, a `healing-report.md` summary is written and a `[CI-HEAL-ALERT]` error is logged so your pipeline can gate on healing threshold breaches.

---

## 2. AI Codegen Recorder

The Codegen Recorder captures clicks and typing in a live browser and generates production-ready Page Object code. No LLM is needed — locator ranking is 100% deterministic.

### Launch from the Terminal

```bash
# Record a login page and generate a TestNG test class
mvn -q exec:java \
  -Dexec.mainClass=Ellithium.core.ai.codegen.CodegenCli \
  -Dexec.args="https://the-internet.herokuapp.com/login \
    --browser chrome \
    --target test \
    --output src/test/java \
    --package pages"
```

A headed Chrome window opens. Interact with the page (click fields, type values, click the submit button) and then click **Stop** in the overlay panel. Ellithium writes a complete class to `src/test/java/pages/`.

### Generated Output (example)

```java
// Generated by Ellithium Codegen Recorder
package pages;

import Ellithium.Utilities.interactions.DriverActions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPageGenerated {
    private final DriverActions actions;

    private final By usernameInput = By.id("username");
    private final By passwordInput = By.id("password");
    private final By loginButton   = By.cssSelector("button[type='submit']");
    private final By flashMessage  = By.id("flash");

    public LoginPageGenerated(WebDriver driver) {
        this.actions = new DriverActions(driver);
    }

    public void enterUsername(String username) {
        actions.elements().sendData(usernameInput, username);
    }

    public void enterPassword(String password) {
        actions.elements().sendData(passwordInput, password);
    }

    public void clickLogin() {
        actions.elements().clickOnElement(loginButton);
    }

    public String getFlashMessage() {
        return actions.elements().getText(flashMessage);
    }
}
```

All locators are automatically seeded into the self-healing baseline store when the recorder runs.

### Launch Programmatically (Mid-Test Recording)

```java
import Ellithium.Utilities.ai.EllithiumAIEngine;
import Ellithium.Utilities.codegen.RecorderOptions;

// Inside a running, authenticated test — start recording
EllithiumAIEngine.startRecording(driver);

// ... navigate and interact manually in the live browser ...

// Stop recording and generate POM code
EllithiumAIEngine.stopRecording();
EllithiumAIEngine.generateCodeFromRecording();
```

To override output settings, pass `RecorderOptions`:

```java
// Use the factory method for defaults, then customize via the canonical constructor
RecorderOptions opts = new RecorderOptions(
    "src/test/java",   // outputBasePath
    "pages",           // packageName
    "Chrome",          // browser
    "pom",             // target: "pom" = Page Object only, "test" = full TestNG test
    "soft",            // assertMode: "soft" | "hard"
    false,             // llmPolish: true sends the output to LLM for cleanup
    false              // pickModeDefault
);
EllithiumAIEngine.startRecording(driver, opts);
```

### Save and Restore Browser State

```bash
# Record an authenticated flow, save session cookies when done
mvn -q exec:java \
  -Dexec.mainClass=Ellithium.core.ai.codegen.CodegenCli \
  -Dexec.args="https://app.example.com/dashboard \
    --save-storage auth-state.json"

# Later, restore that session and record further steps without re-logging in
mvn -q exec:java \
  -Dexec.mainClass=Ellithium.core.ai.codegen.CodegenCli \
  -Dexec.args="https://app.example.com/checkout \
    --load-storage auth-state.json \
    --output src/test/java \
    --package pages.checkout"
```

---

## 3. AI Engine — Natural Language Test Generation

The `EllithiumAIEngine` takes a plain-English test description, opens a headless browser to capture the live DOM, and generates a complete TestNG class with real, verified locators.

### Test Description File

```json
[
  {
    "testId": "TC-LOGIN-01",
    "description": "Open the login page. Enter username 'tomsmith' and password 'SuperSecretPassword!'. Click the login button. Verify the flash message contains 'You logged into a secure area!'.",
    "targetUrl": "https://the-internet.herokuapp.com/login"
  },
  {
    "testId": "TC-LOGIN-02",
    "description": "Open the login page. Enter an invalid username 'baduser' and password 'badpass'. Click the login button. Verify the flash message contains 'Your username is invalid'.",
    "targetUrl": "https://the-internet.herokuapp.com/login"
  }
]
```

### Generate Code

```java
import Ellithium.Utilities.ai.EllithiumAIEngine;
import Ellithium.Utilities.ai.GeminiProvider;
import Ellithium.Utilities.ai.LLMProvider;

public class GenerateLoginTests {
    public static void main(String[] args) throws Exception {
        // Convenience constructor: defaults to src/main/java output + BDD enabled
        LLMProvider provider = new GeminiProvider(
            "https://generativelanguage.googleapis.com/v1beta/",
            System.getenv("LLM_API_KEY"),
            "gemini-3.1-flash-lite"
        );
        EllithiumAIEngine engine = new EllithiumAIEngine(provider);

        // Generate — idempotent: already-generated tests are skipped
        engine.generateFrom("src/test/resources/test-descriptions/login-tests.json");
    }
}
```

Or control output paths precisely:

```java
// 4-arg constructor: separate source root and test root
EllithiumAIEngine engine = new EllithiumAIEngine(
    provider,
    "src/main/java",   // Page Objects written here
    "src/test/java",   // TestNG/BDD test classes written here
    true               // generateBDD = true → also emit .feature files
);
engine.generateFrom("src/test/resources/test-descriptions/login-tests.json");
```

### Generated Output Structure

```
src/main/java/pages/
└── LoginPage.java           ← Page Object with real locators from live DOM

src/test/java/tests/
└── TC_LOGIN_01_Test.java    ← Runnable TestNG test class

src/test/resources/features/
└── login.feature            ← BDD feature file (when generateBDD=true)
```

### Text Format (Alternative to JSON)

```text
ID: TC-CHECKOUT-01
URL: https://demo.opencart.com/checkout
Add the first product to the cart. Proceed to checkout. Fill the billing address
with first name 'John', last name 'Doe', email 'john@example.com'. Select 'Guest Checkout'.
Verify the order confirmation page is displayed.
```

```java
engine.generateFrom("src/test/resources/test-descriptions/checkout-tests.txt");
```

---

## 4. Live In-Context Generation

`EllithiumAIEngine.continueFrom()` is for moments when you're already inside an authenticated, running WebDriver session and you want the AI to drive the next steps using the live DOM — without opening a new browser or losing session state.

```java
import Ellithium.Utilities.ai.EllithiumAIEngine;
import Ellithium.Utilities.ai.GeminiProvider;
import Ellithium.Utilities.ai.LLMProvider;

public class OnboardingTest extends BaseTests {

    @Test
    public void completeOnboarding() throws Exception {
        // 1. Programmatic login (fast, no AI needed)
        driver.get("https://app.example.com/login");
        actions.elements().sendData(By.id("email"), "user@example.com");
        actions.elements().sendData(By.id("password"), System.getenv("TEST_PASSWORD"));
        actions.elements().clickOnElement(By.id("login-btn"));

        // 2. Hand off to AI for the multi-step onboarding wizard
        LLMProvider provider = new GeminiProvider(
            "https://generativelanguage.googleapis.com/v1beta/",
            System.getenv("LLM_API_KEY"),
            "gemini-3.1-flash-lite"
        );

        EllithiumAIEngine.continueFrom(driver, provider,
            "Fill the company name field with 'Acme Corp', " +
            "select 'Software' from the industry dropdown, " +
            "set team size to '11-50', " +
            "then click 'Finish Setup'."
        );

        // 3. Back to standard assertions
        AssertionExecutor.hard.assertTrue(
            actions.elements().isElementDisplayed(By.cssSelector(".dashboard-welcome")),
            "Dashboard should be visible after onboarding"
        );
    }
}
```

### Load Steps from a File

```java
// Steps can live in a text file for easier management
EllithiumAIEngine.continueFromFile(driver, provider, "src/test/resources/ai-steps/onboarding.txt");
```

```text
# src/test/resources/ai-steps/onboarding.txt
Fill the company name field with 'Acme Corp'.
Select 'Software' from the industry dropdown.
Set team size to '11-50'.
Click 'Finish Setup'.
```

---

## 5. AI Test Data Generation

The `AITestDataGenerator` generates edge-case, boundary, and fuzzing payloads on demand. Useful for exploratory security testing and schema validation.

```java
import Ellithium.core.ai.generators.AITestDataGenerator;
import Ellithium.Utilities.ai.GeminiProvider;
import Ellithium.Utilities.ai.LLMProvider;

public class RegistrationFuzzTests extends BaseTests {

    @Test
    public void fuzzRegistrationForm() throws Exception {
        LLMProvider provider = new GeminiProvider(
            "https://generativelanguage.googleapis.com/v1beta/",
            System.getenv("LLM_API_KEY"),
            "gemini-3.1-flash-lite"
        );

        String schema = "User registration payload: " +
                        "username (string, 3-30 chars), " +
                        "email (string, valid email format), " +
                        "age (integer, 18-120), " +
                        "password (string, min 8 chars)";

        // Generate 10 diverse payloads: nulls, extremes, SQL injection, XSS, boundary values
        List<String> payloads = AITestDataGenerator.generateFuzzingData(schema, 10, provider);

        for (String payload : payloads) {
            // Submit each payload and assert the API handles it gracefully
            Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(payload)
                .post(baseUrl + "/api/register");

            // A 400 or 422 is acceptable — a 500 is a bug
            AssertionExecutor.soft.assertNotEquals(
                response.getStatusCode(), 500,
                "Server should not 500 on payload: " + payload
            );
        }
        AssertionExecutor.soft.assertAll();
    }
}
```

---

## AI Configuration Quick Reference

All AI behaviour is controlled by `src/test/resources/ai-config.properties`. The most commonly tuned properties:

```properties
# Healing
ai.healing.strategy=HEAL_AND_NOTIFY
ai.onnx.similarityThreshold=0.75
ai.healing.confidenceThreshold=0.70
ai.healing.storeThreshold=0.85

# LLM (Tier 3 + Engine + Recorder polish)
ai.llm.provider=gemini
ai.llm.apiKey=${LLM_API_KEY}
ai.llm.model=gemini-3.1-flash-lite
ai.llm.baseUrl=https://generativelanguage.googleapis.com/v1beta/

# CI mode: never patch source files, generate a report instead
ai.execution.mode=LOCAL   # change to CI for pipelines

# Vision (screenshot-assisted healing) — disable in regulated environments
ai.vision.allowWeb=false
ai.vision.allowMobile=false
```

See the full [AI Configuration Reference](/utilities/property-files) for all 25 properties.
