---
sidebar_position: 3
---

# AI Codegen Recorder

Record manual clicks and typing on a live page to automatically generate robust, deterministic Ellithium Page Object code. 

Unlike other codegen tools, every captured element gets **ranked, uniqueness-verified locator candidates** — the best is picked automatically and shown in an in-browser overlay where you can override it. Dynamic values (indices, random IDs) are intelligently flagged and emitted as parameterizable values (`String.format(...)`), and the recorded locators automatically seed the self-healing baseline store.

> **Note:** The locator selection and POM code generation are **100% deterministic** and run offline; no external LLM is called.

## Launching from the CLI

Run the Codegen Recorder via the Exec Maven Plugin:

```bash
mvn -q exec:java -Dexec.mainClass=Ellithium.core.ai.codegen.CodegenCli -Dexec.args="codegen https://your-app.test/page --output src/test/java --package pages"
```

A headed browser will open. Interact with the page, and then click **Stop** in the overlay panel to generate your code.

### Command Line Options

| Option | Default | Description |
|---|---|---|
| `[url]` (positional) | — | Page to open. If omitted, you can type a URL in the browser and the first navigation becomes the start URL. |
| `--browser` | `chrome` | Target browser (`chrome`, `edge`, `firefox`, `safari`). |
| `--target` | `test` | `test` (generates a runnable TestNG class) or `pom` (generates a reusable Page Object). |
| `--assert` | `soft` | Default assertion style. `soft` collects failures; `hard` fail-fast. |
| `--output` | `src/test/java` | Output base directory for generated files. |
| `--package` | `Pages` | Target Java package for the generated class. |
| `--class` | (derived from page title) | Override the generated Java class name. |
| `--save-storage <file>` | — | Save browser cookies and local-storage state to a JSON file after the session ends. Useful for re-using an authenticated session in a future run. |
| `--load-storage <file>` | — | Load browser cookies and local-storage state from a JSON file before recording starts. Pairs with `--save-storage`. |
| `--headless` | off | Runs the browser in headless mode. |
| `--llm-polish` | off | After recording, send the generated code to the configured LLM for a cleanup pass (imports, naming, javadoc). Requires `ai-config.properties` to be configured with a valid `ai.llm.provider` and `ai.llm.apiKey`. |

## Overlay Toolbar Features

The injected in-page panel is the control center for your recording session. It is draggable and allows fine-grained control:

- **Pause / Resume**: Toggle capture. While paused, you can click around without recording steps.
- **Inspect**: Freezes recording. Hovering highlights elements, and clicking an element shows its ranked locator candidates without adding a step.
- **Eye (Assert visible)**: Arms a visibility assertion for the *next* element you click.
- **Aa (Assert text)**: Arms a text assertion for the *next* element you click.
- **Val (Assert value)**: Arms a value assertion for inputs.
- **Assert (soft/hard)**: Toggles the assertion mode.
- **Evaluate bar**: Type a CSS or XPath selector to see matching elements outlined live.
- **Step list**: View recorded steps. Each step shows its ranked candidates; you can override the selected locator or remove the step entirely.
- **Live Preview**: A real-time preview of the generated code updates as you record.

## Programmatic Execution

You can programmatically launch the recorder from inside a running, authenticated test script.

```java
import Ellithium.Utilities.ai.EllithiumAIEngine;
import Ellithium.Utilities.codegen.RecorderOptions;

// Basic: start recording with default options
EllithiumAIEngine.startRecording(driver);

// Advanced: start recording with custom options
// RecorderOptions is a record — use the factory method or the full canonical constructor
RecorderOptions opts = RecorderOptions.defaults(); // outputBasePath="src/test/java", package="Pages", browser="Chrome", target="test", assertMode="soft"
// or with a custom assert mode:
RecorderOptions opts = new RecorderOptions("src/test/java", "pages", "Chrome", "test", "hard", false, false);
EllithiumAIEngine.startRecording(driver, opts);

// ... Interact manually via the live browser ...

// Stop and generate POM code
EllithiumAIEngine.stopRecording();
EllithiumAIEngine.generateCodeFromRecording();
```

## Security & Best Practices

- Typed inputs are captured on blur or when Enter is pressed.
- **Password fields are masked**: The recording log and the generated code never contain plaintext passwords. They automatically emit `System.getenv("ELLITHIUM_SECRET")`.
- Navigation caused by user actions (like clicking a redirect link) is not explicitly recorded as a separate `navigate` step; the framework assumes the click handles it.
- **Mobile (Appium) Limitations**: Native mobile apps expose no DOM and no injectable JS layer. The overlay toolbar and evaluate bar are only available for web and WebView testing. Mobile native element actions are captured via the Appium-aware backend but without the in-browser UI overlay.
