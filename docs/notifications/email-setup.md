---
id: email-setup
title: Email Setup
sidebar_label: Email Setup
description: Complete guide for setting up email notifications
---

# Email Setup Guide

This guide covers setting up email notifications for the Ellithium framework, including configuration for popular email providers and troubleshooting common issues.

## Overview

The email notification system supports:
- **SMTP Protocol**: Compatible with email providers
- **HTML Content**: Professional email templates
- **Environment Variables**: Secure credential management
- **Error Handling**: Graceful fallbacks and logging

## Quick Setup

### 1. Basic Configuration

Add these properties to your `config.properties` file:

```properties
# Enable email notifications
notification.email.enabled=true

# SMTP Configuration
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
notification.email.subject.prefix=[Ellithium Test Results]
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

### 3. Test Configuration

Run a simple test to verify your email setup works correctly.

## Email Provider Setup

### Gmail

Gmail requires special setup due to security restrictions.

#### Step 1: Enable 2-Step Verification
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled

#### Step 2: Generate App Password
1. In the Security section, find "App passwords"
2. Select "Mail" → "Other (Custom name)"
3. Name it "Ellithium Notification"
4. Copy the 16-character password

#### Step 3: Configuration
```properties
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_APP_PASSWORD}
```

**Important**: Use the app password, not your regular Gmail password.

### Outlook/Office 365

```properties
notification.email.smtp.host=smtp-mail.outlook.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
```

### Yahoo Mail

```properties
notification.email.smtp.host=smtp.mail.yahoo.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
```

### Custom SMTP Server

```properties
notification.email.smtp.host=mail.yourcompany.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
```

## Advanced Configuration

### SMTP Security Settings

The system automatically configures these security settings:

```properties
# TLS/SSL Configuration
mail.smtp.auth=true
mail.smtp.starttls.enable=true
mail.smtp.host=${SMTP_HOST}
mail.smtp.port=${SMTP_PORT}

# Character Encoding
mail.mime.charset=UTF-8
mail.mime.encoding=UTF-8
mail.smtp.allow8bitmime=true
mail.smtp.allowutf8=true
```

### Custom Subject Lines

```properties
# Basic subject prefix
notification.email.subject.prefix=[Ellithium Test Results]

# Dynamic subject with test info
notification.email.subject.prefix=[Ellithium] Test Run
```

### Multiple Recipients

```properties
# Single recipient
notification.email.to=${EMAIL_TO_NOTIFY}

# Multiple recipients (comma-separated)
notification.email.to=team1@company.com,team2@company.com

# Using environment variable for multiple recipients
notification.email.to=${EMAIL_TO_NOTIFY}
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USERNAME` | Your email address | `your_email@gmail.com` |
| `EMAIL_PASSWORD` | Your email password or app password | `abcd efgh ijkl mnop` |
| `EMAIL_TO_NOTIFY` | Recipient email address | `team@company.com` |

### Setting Environment Variables

#### Windows (PowerShell)
```powershell
# Set for current session
$env:EMAIL_USERNAME="your_email@gmail.com"
$env:EMAIL_PASSWORD="your_app_password"
$env:EMAIL_TO_NOTIFY="recipient@example.com"

# Set permanently (requires admin)
[Environment]::SetEnvironmentVariable("EMAIL_USERNAME", "your_email@gmail.com", "User")
[Environment]::SetEnvironmentVariable("EMAIL_PASSWORD", "your_app_password", "User")
[Environment]::SetEnvironmentVariable("EMAIL_TO_NOTIFY", "recipient@example.com", "User")
```

#### Windows (Command Prompt)
```cmd
# Set for current session
set EMAIL_USERNAME=your_email@gmail.com
set EMAIL_PASSWORD=your_app_password
set EMAIL_TO_NOTIFY=recipient@example.com

# Set permanently
setx EMAIL_USERNAME "your_email@gmail.com"
setx EMAIL_PASSWORD "your_app_password"
setx EMAIL_TO_NOTIFY "recipient@example.com"
```

#### Linux / macOS
```bash
# Set for current session
export EMAIL_USERNAME="your_email@gmail.com"
export EMAIL_PASSWORD="your_app_password"
export EMAIL_TO_NOTIFY="recipient@example.com"

# Set permanently (add to ~/.bashrc, ~/.zshrc, etc.)
echo 'export EMAIL_USERNAME="your_email@gmail.com"' >> ~/.bashrc
echo 'export EMAIL_PASSWORD="your_app_password"' >> ~/.bashrc
echo 'export EMAIL_TO_NOTIFY="recipient@example.com"' >> ~/.bashrc
source ~/.bashrc
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Test with Notifications
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: '11'
      - name: Set environment variables
        env:
          EMAIL_USERNAME: ${{ secrets.EMAIL_USERNAME }}
          EMAIL_PASSWORD: ${{ secrets.EMAIL_PASSWORD }}
          EMAIL_TO_NOTIFY: ${{ secrets.EMAIL_TO_NOTIFY }}
        run: |
          echo "EMAIL_USERNAME=$EMAIL_USERNAME" >> $GITHUB_ENV
          echo "EMAIL_PASSWORD=$EMAIL_PASSWORD" >> $GITHUB_ENV
          echo "EMAIL_TO_NOTIFY=$EMAIL_TO_NOTIFY" >> $GITHUB_ENV
      - name: Run tests
        run: mvn test
```

### Jenkins

```groovy
pipeline {
    agent any
    
    environment {
        EMAIL_USERNAME = credentials('email-username')
        EMAIL_PASSWORD = credentials('email-password')
        EMAIL_TO_NOTIFY = credentials('email-to-notify')
    }
    
    stages {
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
```

## Troubleshooting

### Common Issues

#### Authentication Failed
```
Error: Authentication failed
```
**Solution**: 
- Verify username and password are correct
- For Gmail, ensure you're using an app password, not your regular password
- Check if 2-Step Verification is enabled (Gmail)

#### Connection Refused
```
Error: Connection refused
```
**Solution**:
- Verify SMTP host and port are correct
- Check firewall settings
- Ensure the email provider allows SMTP access

#### Port Blocked
```
Error: Connection timeout
```
**Solution**:
- Try alternative ports (587, 465, 25)
- Check if your network blocks SMTP ports
- Use your company's SMTP server if available

### Debug Mode

Enable debug logging to troubleshoot email issues:

```properties
# Add to config.properties for debugging
logging.level.Ellithium.core.reporting.notification=DEBUG
```

### Test Email Configuration

Create a simple test to verify your email setup:

```java
@Test
public void testEmailConfiguration() {
    NotificationConfig config = NotificationConfig.getInstance();
    
    // Check if email is enabled
    assertTrue(config.isEmailEnabled(), "Email should be enabled");
    
    // Validate configuration
    assertTrue(config.validateEmailConfiguration(), "Email configuration should be valid");
    
    // Test sending a simple email
    NotificationSender sender = new NotificationSender(config);
    boolean sent = sender.sendEmail(
        "Test Email", 
        "This is a test email from Ellithium", 
        false
    );
    
    assertTrue(sent, "Test email should be sent successfully");
}
```

## Best Practices

1. **Use App Passwords**: Never use your main password for SMTP
2. **Environment Variables**: Store credentials in environment variables, not in code
3. **Test First**: Always test email configuration before running full test suites
4. **Monitor Logs**: Check logs for email delivery status and errors
5. **Secure Storage**: Use secure methods to store credentials in CI/CD systems
6. **Regular Updates**: Keep app passwords and credentials updated
7. **Fallback Plan**: Have alternative notification methods if email fails

## Security Considerations

- **App Passwords**: Use app passwords instead of main passwords
- **Environment Variables**: Store sensitive data in environment variables
- **No Hardcoding**: Never hardcode credentials in configuration files
- **Access Control**: Limit who has access to email credentials
