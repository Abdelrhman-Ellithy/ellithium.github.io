---
id: notifications
title: Notification System
sidebar_label: Overview
description: Automated notification system for test execution results
---

# Notification System

The Ellithium framework includes a powerful **automated notification system** that sends test execution results via email and Slack, providing real-time feedback to your team.

## Overview

The notification system automatically integrates with your existing TestNG and Cucumber tests, sending comprehensive reports when:
- Tests complete execution
- Test failures occur
- Failure rate exceeds configured thresholds
- Specific test scenarios complete

## Key Features

### 📧 Email Notifications
- **SMTP Integration**: Supports all major email providers (Gmail, Outlook, custom SMTP servers)
- **Rich HTML Reports**: Professional, mobile-responsive email templates with test summaries
- **Configurable Triggers**: Send notifications on test failures, completion, or when failure rate exceeds thresholds
- **Environment Variable Support**: Secure credential management using environment variables and GitHub secrets
- **Attachment Support**: Include test screenshots and detailed failure information

### 💬 Slack Notifications
- **Webhook Integration**: Easy setup with Slack webhook URLs
- **Rich Message Formatting**: Structured messages with test statistics and failure details
- **Channel Targeting**: Send notifications to specific Slack channels
- **Custom Username**: Configurable bot username for notifications

### 🚀 Performance Optimized
- **Lazy Loading**: Only initializes when notifications are enabled
- **Early Exit**: Zero overhead when notifications are disabled
- **Efficient Resource Management**: Minimal memory and CPU usage
- **Graceful Error Handling**: Non-blocking notifications that don't affect test execution

### 📊 Rich Reporting Features
- **Test Summary Tables**: Comprehensive test result statistics
- **Progress Bars**: Visual representation of success/failure rates
- **Failure Details**: Detailed error information for failed tests
- **Execution Metrics**: Duration, date, and performance data
- **Mobile Responsive**: Professional email templates that work on all devices

### 🔐 Security Features
- **Environment Variables**: Secure credential management
- **GitHub Secrets**: CI/CD integration with repository secrets
- **Email Obfuscation**: Masked email addresses in logs
- **Error Handling**: Graceful fallbacks without exposing sensitive information

## Quick Start

### 1. Enable Notifications
Update your `config.properties` file:

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

# Slack configuration
notification.slack.enabled=true
notification.slack.webhook.url=${SLACK_WEBHOOK_URL}
notification.slack.channel=#test-results
notification.slack.username=Ellithium Bot
```

### 2. Set Environment Variables
```bash
# Windows
set EMAIL_USERNAME=your-email@gmail.com
set EMAIL_PASSWORD=your-app-password
set EMAIL_TO_NOTIFY=team@company.com
set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Linux/Mac
export EMAIL_USERNAME=your-email@gmail.com
export EMAIL_PASSWORD=your-app-password
export EMAIL_TO_NOTIFY=team@company.com
export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 3. Run Your Tests
No code changes required! Notifications will be sent automatically based on your configuration.

## What You'll Get

### Email Notifications
- Professional HTML email templates
- Test execution summary with statistics
- Detailed failure information
- Progress bars and visual indicators
- Mobile-responsive design

### Slack Notifications
- Structured message format
- Test result statistics
- Failure details and stack traces
- Configurable channel targeting
- Rich formatting and emojis

## Next Steps

- [Configuration Guide](./configuration.md) - Detailed configuration options
- [Email Setup](./email-setup.md) - Email provider setup instructions
- [CI/CD Integration](./ci-cd-integration.md) - GitHub Actions and Jenkins setup

## Support

The notification system automatically integrates with your existing TestNG and Cucumber tests. No additional code changes are required - notifications will be sent automatically based on your configuration.
