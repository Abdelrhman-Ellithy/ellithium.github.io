---
id: configuration
title: Configuration Guide
sidebar_label: Configuration
description: Complete configuration options for the notification system
---

# Notification Configuration

The notification system is configured through the `src/main/resources/properties/config.properties` file. This guide covers all available configuration options and their usage.

## Configuration File Location

```
src/main/resources/properties/config.properties
```

## Basic Configuration

### Enable/Disable Notifications

```properties
# Master switch for notifications
notification.enabled=true

# Individual service switches
notification.email.enabled=true
notification.slack.enabled=true
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
notification.email.subject=Test Execution Results - ${project.name}

# Email content configuration
notification.email.template=default
notification.email.include.screenshots=true
notification.email.include.failure.details=true
```

### Email Provider Examples

#### Gmail
```properties
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_APP_PASSWORD}
```

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
notification.slack.webhook.url=${SLACK_WEBHOOK_URL}
notification.slack.channel=#test-results
notification.slack.username=Ellithium Bot
notification.slack.icon.emoji=:robot_face:

# Message configuration
notification.slack.include.failure.details=true
notification.slack.include.screenshots=false
notification.slack.message.template=default
```

### Slack Channel Examples

```properties
# Public channel
notification.slack.channel=#test-results

# Private channel
notification.slack.channel=#private-testing

# Direct message (user ID)
notification.slack.channel=@username

# Multiple channels (comma-separated)
notification.slack.channel=#test-results,#qa-team
```

## Trigger Configuration

### When to Send Notifications

```properties
# Send notifications on test completion
notification.send.on.completion=true

# Send notifications on test failures
notification.send.on.failure=true

# Send notifications when failure rate exceeds threshold
notification.failure.threshold=20

# Minimum number of tests before sending notifications
notification.minimum.tests=5

# Delay before sending notifications (seconds)
notification.delay.seconds=30
```

### Failure Threshold Examples

```properties
# Send notification if more than 20% of tests fail
notification.failure.threshold=20

# Send notification if more than 5 tests fail
notification.failure.threshold=5

# Send notification if any test fails
notification.failure.threshold=1
```

## Content Configuration

### Email Content Options

```properties
# Include test screenshots in email
notification.email.include.screenshots=true

# Include detailed failure information
notification.email.include.failure.details=true

# Include test execution metrics
notification.email.include.metrics=true

# Include progress bars and charts
notification.email.include.charts=true

# Custom email template
notification.email.template=custom
```

### Slack Content Options

```properties
# Include failure details in Slack
notification.slack.include.failure.details=true

# Include screenshots in Slack
notification.slack.include.screenshots=false

# Include test metrics in Slack
notification.slack.include.metrics=true

# Custom Slack message template
notification.slack.message.template=custom
```

## Advanced Configuration

### Performance Settings

```properties
# Maximum email size (MB)
notification.email.max.size=10

# Maximum number of screenshots to include
notification.email.max.screenshots=5

# Email sending timeout (seconds)
notification.email.timeout=30

# Slack message timeout (seconds)
notification.slack.timeout=10
```

### Logging Configuration

```properties
# Enable notification logging
notification.logging.enabled=true

# Log level for notifications
notification.logging.level=INFO

# Log email addresses (masked for security)
notification.logging.mask.emails=true
```

### Error Handling

```properties
# Continue test execution if notifications fail
notification.continue.on.error=true

# Retry failed notifications
notification.retry.enabled=true

# Maximum retry attempts
notification.retry.max.attempts=3

# Retry delay (seconds)
notification.retry.delay.seconds=60
```

## Environment Variables

### Required Variables

```bash
# Email configuration
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO_NOTIFY=team@company.com

# Slack configuration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Optional Variables

```bash
# Custom configuration
NOTIFICATION_EMAIL_SUBJECT="Custom Test Results Subject"
NOTIFICATION_SLACK_CHANNEL="#custom-channel"
NOTIFICATION_FAILURE_THRESHOLD=15
```

## Complete Configuration Example

```properties
# ========================================
# NOTIFICATION SYSTEM CONFIGURATION
# ========================================

# Master switch
notification.enabled=true

# ========================================
# EMAIL CONFIGURATION
# ========================================
notification.email.enabled=true

# SMTP settings
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}

# Email content
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
notification.email.subject=Test Execution Results - ${project.name}

# Email features
notification.email.include.screenshots=true
notification.email.include.failure.details=true
notification.email.include.metrics=true
notification.email.include.charts=true

# ========================================
# SLACK CONFIGURATION
# ========================================
notification.slack.enabled=true

# Webhook settings
notification.slack.webhook.url=${SLACK_WEBHOOK_URL}
notification.slack.channel=#test-results
notification.slack.username=Ellithium Bot
notification.slack.icon.emoji=:robot_face:

# Slack features
notification.slack.include.failure.details=true
notification.slack.include.screenshots=false
notification.slack.include.metrics=true

# ========================================
# TRIGGER CONFIGURATION
# ========================================
notification.send.on.completion=true
notification.send.on.failure=true
notification.failure.threshold=20
notification.minimum.tests=5
notification.delay.seconds=30

# ========================================
# PERFORMANCE SETTINGS
# ========================================
notification.email.max.size=10
notification.email.max.screenshots=5
notification.email.timeout=30
notification.slack.timeout=10

# ========================================
# ERROR HANDLING
# ========================================
notification.continue.on.error=true
notification.retry.enabled=true
notification.retry.max.attempts=3
notification.retry.delay.seconds=60

# ========================================
# LOGGING
# ========================================
notification.logging.enabled=true
notification.logging.level=INFO
notification.logging.mask.emails=true
```

## Configuration Validation

The notification system validates your configuration and provides helpful error messages for:
- Missing required properties
- Invalid SMTP settings
- Invalid Slack webhook URLs
- Missing environment variables
- Configuration conflicts

## Best Practices

1. **Use Environment Variables**: Never hardcode credentials in configuration files
2. **Test Configuration**: Verify settings with a small test run
3. **Monitor Logs**: Check notification logs for configuration issues
4. **Gradual Rollout**: Start with basic notifications and add features incrementally
5. **Security**: Use app passwords for Gmail and secure webhook URLs for Slack

## Troubleshooting

### Common Configuration Issues

- **SMTP Authentication Failed**: Check username/password and app password settings
- **Slack Webhook Invalid**: Verify webhook URL format and permissions
- **Environment Variables Missing**: Ensure all required variables are set
- **Port Blocked**: Check firewall settings for SMTP ports

### Configuration Testing

```bash
# Test email configuration
mvn test -Dnotification.test.email=true

# Test Slack configuration
mvn test -Dnotification.test.slack=true

# Test full notification system
mvn test -Dnotification.test.full=true
```
