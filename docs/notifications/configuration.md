---
id: configuration
title: Configuration Guide
sidebar_label: Configuration
description: Complete configuration options for the notification system
---

# Notification Configuration

The notification system is configured through the `config.properties` file. This guide covers all available configuration options and their usage.

## Configuration File Location

```
config.properties
```

## Basic Configuration

### Enable/Disable Notifications

```properties
# Master switch for notifications
notification.enabled=true

# Individual service switches
notification.email.enabled=true
notification.slack.enabled=false
```

## Email Configuration

### SMTP Settings

```properties
# SMTP server configuration
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}

# Sender and recipient configuration
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
notification.email.subject.prefix=[Ellithium Test Results]
```

### Email Provider Examples

#### Gmail
```properties
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_APP_PASSWORD}
```

**Important**: For Gmail, you need to:
1. Enable 2-Step Verification in your Google Account
2. Generate an App Password for "Mail" → "Other"
3. Use the 16-character app password instead of your regular password

#### Outlook/Office 365
```properties
notification.email.smtp.host=smtp-mail.outlook.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
```

#### Custom SMTP Server
```properties
notification.email.smtp.host=mail.yourcompany.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
```

## Slack Configuration

### Webhook Settings

```properties
# Slack webhook configuration
notification.slack.webhook.url=
notification.slack.channel=#test-notifications
notification.slack.username=Ellithium Bot
```

### Slack Channel Examples

```properties
# Public channel
notification.slack.channel=#test-notifications

# Private channel
notification.slack.channel=#private-test-results

# Direct message (user ID)
notification.slack.channel=@username
```

## Trigger Configuration

### When to Send Notifications

```properties
# Failure threshold percentage (0-100)
notification.failure.threshold=20

# Send notification when tests fail
notification.send.on.failure=true

# Send notification when test execution completes
notification.send.on.completion=true
```

### Failure Threshold Examples

```properties
# Send notification if more than 10% of tests fail
notification.failure.threshold=10

# Send notification if more than 50% of tests fail
notification.failure.threshold=50

# Send notification for any failure
notification.failure.threshold=0
```

## Environment Variables

### Required Variables

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

### Optional Variables

```bash
# Slack webhook URL (if using Slack notifications)
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
```

## Configuration Examples

### Minimal Email Configuration

```properties
notification.enabled=true
notification.email.enabled=true
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
```

### Full Configuration with Slack

```properties
# Enable notifications
notification.enabled=true

# Email configuration
notification.email.enabled=true
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
notification.email.subject.prefix=[Ellithium Test Results]

# Slack configuration
notification.slack.enabled=true
notification.slack.webhook.url=${SLACK_WEBHOOK_URL}
notification.slack.channel=#test-notifications
notification.slack.username=Ellithium Bot

# Trigger configuration
notification.failure.threshold=20
notification.send.on.failure=true
notification.send.on.completion=true
```

### CI/CD Configuration

```properties
# Enable notifications
notification.enabled=true

# Email configuration (using CI/CD environment variables)
notification.email.enabled=true
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}

# Trigger configuration for CI/CD
notification.failure.threshold=0
notification.send.on.failure=true
notification.send.on.completion=true
```

## Configuration Validation

The notification system automatically validates your configuration:

- **Required Properties**: All required properties must be present and valid
- **Environment Variables**: Environment variables are resolved automatically
- **SMTP Validation**: SMTP settings are validated before sending emails
- **Webhook Validation**: Slack webhook URL is validated if Slack is enabled

## Error Handling

The notification system implements graceful error handling:

- **Configuration Errors**: System continues without notifications if configuration is invalid
- **Network Errors**: Failed notifications don't block test execution
- **Authentication Errors**: Clear error messages for credential issues
- **Fallback Behavior**: System degrades gracefully when services are unavailable

## Best Practices

1. **Use Environment Variables**: Never hardcode credentials in configuration files
2. **Test Configuration**: Verify your setup with a simple test before running full test suites
3. **Monitor Logs**: Check logs for notification system status and errors
4. **Secure Credentials**: Use app passwords for Gmail and secure webhook URLs for Slack
5. **Failure Thresholds**: Set appropriate failure thresholds based on your team's needs
