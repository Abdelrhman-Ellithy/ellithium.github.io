---
id: notifications
title: Notification System
sidebar_label: Overview
description: Automated notification system for test execution results
---

# Notification System

The Ellithium framework includes a **notification system** that sends test execution results via email and Slack, providing feedback to your team.

## Overview

The notification system automatically integrates with your existing TestNG tests, sending reports when:
- Tests complete execution
- Test failures occur
- Failure rate exceeds configured thresholds

## Key Features

### 📧 Email Notifications
- **SMTP Integration**: Supports email providers through SMTP
- **HTML Reports**: Professional email templates with test summaries
- **Configurable Triggers**: Send notifications on test failures, completion, or when failure rate exceeds thresholds
- **Environment Variable Support**: Secure credential management using environment variables

### 💬 Slack Notifications
- **Webhook Integration**: Setup with Slack webhook URLs
- **Message Formatting**: Structured messages with test statistics
- **Channel Targeting**: Send notifications to specific Slack channels
- **Custom Username**: Configurable bot username for notifications

### 🚀 Performance Features
- **Lazy Loading**: Only initializes when notifications are enabled
- **Early Exit**: Zero overhead when notifications are disabled
- **Error Handling**: Non-blocking notifications that don't affect test execution

## Quick Start

### 1. Enable Notifications
Update your `config.properties` file:

```properties
# Enable notifications globally
notification.enabled=true

# Enable/disable email notifications
notification.email.enabled=true

# Enable/disable Slack notifications
notification.slack.enabled=false

# SMTP Configuration
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
notification.email.subject.prefix=[Ellithium Test Results]

# Slack Configuration
notification.slack.webhook.url=
notification.slack.channel=#test-notifications
notification.slack.username=Ellithium Bot

# Trigger Configuration
notification.failure.threshold=20
notification.send.on.failure=true
notification.send.on.completion=true
```

### 2. Set Environment Variables
```bash
# Windows (PowerShell)
$env:EMAIL_USERNAME="your_email@gmail.com"
$env:EMAIL_PASSWORD="your_app_password"
$env:EMAIL_TO_NOTIFY="recipient@example.com"

# Linux / macOS
export EMAIL_USERNAME="your_email@gmail.com"
export EMAIL_PASSWORD="your_app_password"
export EMAIL_TO_NOTIFY="recipient@example.com"
```

### 3. Gmail Setup
For Gmail, you need to:
1. Go to your Google Account settings → Security at https://myaccount.google.com/security
2. Make sure 2-Step Verification is turned on
3. After enabling 2FA, you'll get an App Passwords section
4. Create a new App Password for "Mail" → "Other" (name it Ellithium Notification)
5. Use this 16-character app password in your `notification.email.smtp.password` property

### 4. Run Your Tests
No code changes required! Notifications will be sent automatically based on your configuration.

## What You'll Get

### Email Notifications
- Professional HTML email templates with test execution summary
- Test result statistics with pass/fail counts
- Failure details and stack traces
- Execution duration and timestamp

### Slack Notifications
- Structured message format with test statistics
- Failure details and execution metrics
- Configurable channel targeting

## Next Steps

- [Configuration Guide](./configuration.md) - Detailed configuration options
- [Email Setup](./email-setup.md) - Email provider setup instructions
- [CI/CD Integration](./ci-cd-integration.md) - GitHub Actions and Jenkins setup

## Support

The notification system automatically integrates with your existing TestNG tests. No additional code changes are required - notifications will be sent automatically based on your configuration.
