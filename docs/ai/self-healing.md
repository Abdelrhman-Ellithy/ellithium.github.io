---
sidebar_position: 2
---

# Self-Healing Configuration

Ellithium features an intelligent 3-Tier cascading Self-Healing strategy. When a target locator becomes stale or fails to resolve during test execution, the engine can automatically re-locate the element using historical baselines, DOM context, and LLM-powered visual/semantic heuristics without terminating your test.

## Enabling Self-Healing

The entire self-healing module is configured via a dedicated properties file:
**`src/test/resources/ai-config.properties`**

All keys are optional — omitting a key uses the code default shown below.

### Strategies

Set `ai.healing.strategy` to control what happens after a successful heal:

- **`DISABLED`** (default): AI healing completely off; no tiers are invoked.
- **`HEAL_AND_NOTIFY`** (Recommended): Heals the locator, continues the test, and logs a warning so you can permanently fix the source.
- **`HEAL_AND_CONTINUE`**: Silently heals and continues without any warning.
- **`SUGGEST_ONLY`**: Logs the suggested fix but does not apply it; skips DOM/screenshot capture.

### Healing Strategy

```properties
# DISABLED | HEAL_AND_CONTINUE | HEAL_AND_NOTIFY | SUGGEST_ONLY
# Default: DISABLED
ai.healing.strategy=HEAL_AND_NOTIFY
```

### Tier 1 — Baseline Store

Tier 1 is the fastest path: it looks up a previously recorded fingerprint for the broken locator.

```properties
# Days before a stored fingerprint is evicted. Set 0 to disable TTL eviction.
# Default: 30
ai.healing.baselineTtlDays=30
```

### Tier 2 — Embedded Local AI Model (Semantic Matching)

Tier 2 uses an embedded local AI model to score DOM candidates by semantic similarity.

```properties
# Minimum combined score for Tier 2 to accept a candidate.
# Default: 0.70
ai.onnx.similarityThreshold=0.75

# Maximum DOM candidates passed to the local AI scorer per attempt.
# Default: 15
ai.onnx.maxCandidates=15

# Hard upper bound on DOM candidates regardless of ai.onnx.maxCandidates.
# Protects against very large SPAs.
# Default: 300
ai.onnx.hardCandidateLimit=300

# Confidence score assigned when no stored baseline exists (cold-start heal).
# Default: 0.65
ai.healing.semanticFallbackScore=0.65
```

### Tier 3 — LLM (Large Language Model)

Tier 3 calls an external LLM when Tier 1 and Tier 2 cannot resolve the element.

```properties
# Set false to disable LLM (Tier 3) while keeping Tier 1 and Tier 2 active.
# Default: true
ai.tier3.enabled=true

# LLM provider: openai | gemini | claude | azure-openai | custom
# Default: (empty — Tier 3 disabled until a provider is configured)
ai.llm.provider=gemini

# API key — always use an environment variable placeholder, never a raw key.
ai.llm.apiKey=${LLM_API_KEY}

# Model identifier as understood by the provider's API.
# Default: gemini-3.1-flash-lite
ai.llm.model=gemini-3.1-flash-lite

# Base URL for the provider endpoint (required for self-hosted or Azure).
ai.llm.baseUrl=https://generativelanguage.googleapis.com/v1beta/

# Fully-qualified class name of a custom LLMProvider implementation.
# When set, ai.llm.provider is ignored.
# Default: (empty)
# ai.llm.providerClass=com.example.MyLLMProvider

# Maximum milliseconds to wait for a single LLM response. LLMs typically take 5–15 s.
# Default: 15000
ai.llm.healMaxWaitMs=15000

# Number of LLM call attempts before giving up (LOCAL mode). CI mode always uses 1.
# Default: 3
ai.llm.maxRetries=3
```

### Shared Thresholds

```properties
# Maximum LLM candidate suggestions per heal attempt. Capped at 10.
# Default: 3
ai.healing.maxCandidates=3

# Minimum self-reported confidence for a Tier 3 candidate to be accepted.
# Default: 0.70
ai.healing.confidenceThreshold=0.80

# A heal below this score is applied for the current run but never written to
# the baseline store or patched in source. Must be ≥ ai.healing.confidenceThreshold.
# Default: 0.85
ai.healing.storeThreshold=0.85

# Minimum fingerprint similarity a Tier 3 element must score against the stored
# baseline to be accepted. Set 0.0 to skip this cross-validation entirely.
# Default: 0.40
ai.healing.tier3BaselineMatchFloor=0.40
```

### Vision (Screenshot-Assisted Healing)

```properties
# Send screenshots to the LLM for visual healing on web browsers.
# IMPORTANT: screenshots expose visible screen content — disable in environments
# handling personal data (healthcare, finance, HR) to comply with GDPR/HIPAA.
# Default: false
ai.vision.allowWeb=false

# Send screenshots to the LLM for visual healing on mobile (Appium) sessions.
# Default: false
ai.vision.allowMobile=false

# Attach an AI-generated root-cause analysis screenshot to Allure on test failure.
# Requires a vision-capable provider and ai.vision.allowWeb=true.
# Default: false
ai.vision.rca.enabled=false
```

### Execution Mode

```properties
# Controls post-heal source file behavior.
#   LOCAL — write healed locators back to source files (local development).
#   CI    — never touch source; generate healing-report.md and telemetry only.
# Default: LOCAL
ai.execution.mode=LOCAL

# In CI mode, write a [CI-HEAL-ALERT] ERROR and a .healstatus file when the
# number of applied heals in this run reaches this threshold. Use as a PR gate.
# Set -1 to disable.
# Default: -1 (disabled)
ai.healing.ciAlertThreshold=-1
```

### Live In-Context Generation Security

```properties
# Whether EllithiumAIEngine.continueFrom() may follow an LLM-emitted "navigate"
# step to a DIFFERENT origin. Set false to restrict navigation to the current
# origin and block potential prompt-injection steering attacks.
# Default: true
ai.live.allowCrossOriginNavigate=true
```

### Telemetry

```properties
# Maximum telemetry records kept in memory per run (ring-buffer).
# Increase for long suites; decrease to reduce heap usage.
# Default: 100000
ai.telemetry.maxRecords=100000
```

> **Security note:** Never commit raw API keys. Always use environment variable placeholders such as `ai.llm.apiKey=${LLM_API_KEY}` and export the variable in your shell or CI/CD secrets.
