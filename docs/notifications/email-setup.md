---
id: email-setup
title: Email Setup
sidebar_label: Email Setup
description: Setup email notifications with Gmail, Outlook, and custom SMTP servers
---

# Email Setup

This guide covers setting up email notifications with various email providers including Gmail, Outlook, and custom SMTP servers.

## Overview

The notification system supports all major email providers through SMTP:
- **Gmail** - Most popular, requires app password
- **Outlook/Office 365** - Enterprise-friendly
- **Custom SMTP** - Company email servers
- **Other providers** - Yahoo, iCloud, etc.

## Gmail Setup

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password

1. Go to **Security** → **App passwords**
2. Select **Mail** as the app and **Other** as the device
3. Click **Generate**
4. Copy the generated 16-character password

### Step 3: Configuration

Update your `config.properties`:

```properties
# Gmail SMTP Configuration
notification.email.enabled=true
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_APP_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
```

### Step 4: Environment Variables

```bash
# Windows
set EMAIL_USERNAME=your-email@gmail.com
set EMAIL_APP_PASSWORD=your-16-char-app-password
set EMAIL_TO_NOTIFY=team@company.com

# Linux/Mac
export EMAIL_USERNAME=your-email@gmail.com
export EMAIL_APP_PASSWORD=your-16-char-app-password
export EMAIL_TO_NOTIFY=team@company.com
```

## Outlook/Office 365 Setup

### Step 1: Get Credentials

1. Use your Office 365 email address
2. Use your regular Office 365 password
3. No app password required for most accounts

### Step 2: Configuration

```properties
# Outlook SMTP Configuration
notification.email.enabled=true
notification.email.smtp.host=smtp-mail.outlook.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
```

### Step 3: Environment Variables

```bash
# Windows
set EMAIL_USERNAME=your-email@outlook.com
set EMAIL_PASSWORD=your-regular-password
set EMAIL_TO_NOTIFY=team@company.com

# Linux/Mac
export EMAIL_USERNAME=your-email@outlook.com
export EMAIL_PASSWORD=your-regular-password
export EMAIL_TO_NOTIFY=team@company.com
```

## Custom SMTP Server Setup

### Step 1: Get Server Information

Contact your IT department or email provider for:
- SMTP server hostname
- Port number (usually 25, 465, or 587)
- Username and password
- Security requirements (TLS/SSL)

### Step 2: Configuration

```properties
# Custom SMTP Configuration
notification.email.enabled=true
notification.email.smtp.host=mail.yourcompany.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}

# Security settings (if required)
notification.email.smtp.starttls.enable=true
notification.email.smtp.auth=true
```

### Step 3: Environment Variables

```bash
# Windows
set EMAIL_USERNAME=your-email@company.com
set EMAIL_PASSWORD=your-email-password
set EMAIL_TO_NOTIFY=team@company.com

# Linux/Mac
export EMAIL_USERNAME=your-email@company.com
export EMAIL_PASSWORD=your-email-password
export EMAIL_TO_NOTIFY=team@company.com
```

## Other Email Providers

### Yahoo Mail

```properties
notification.email.smtp.host=smtp.mail.yahoo.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_APP_PASSWORD}
```

### iCloud Mail

```properties
notification.email.smtp.host=smtp.mail.me.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_APP_PASSWORD}
```

### ProtonMail

```properties
notification.email.smtp.host=127.0.0.1
notification.email.smtp.port=1025
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
```

## Email Content Configuration

### Basic Content Settings

```properties
# Email subject and content
notification.email.subject=Test Execution Results - ${project.name}
notification.email.template=default

# Include options
notification.email.include.screenshots=true
notification.email.include.failure.details=true
notification.email.include.metrics=true
notification.email.include.charts=true
```

### Custom Email Templates

```properties
# Use custom template
notification.email.template=custom
notification.email.template.path=src/main/resources/email-templates/
```

### Email Formatting

```properties
# Email size limits
notification.email.max.size=10
notification.email.max.screenshots=5

# Timeout settings
notification.email.timeout=30
notification.email.retry.attempts=3
```

## Testing Email Configuration

### Test Command

```bash
# Test email configuration
mvn test -Dnotification.test.email=true

# Test with specific email
mvn test -Dnotification.test.email=true -Dnotification.email.to=test@example.com
```

### Manual Testing

```java
import Ellithium.core.reporting.NotificationSender;

public class EmailTest {
    public void testEmailConfiguration() {
        // Test email sending
        NotificationSender sender = new NotificationSender();
        boolean success = sender.sendTestEmail();
        System.out.println("Email test: " + (success ? "SUCCESS" : "FAILED"));
    }
}
```

## Troubleshooting

### Common Email Issues

#### Authentication Failed
```
Error: Authentication failed
Solution: Check username/password and app password settings
```

#### Connection Refused
```
Error: Connection refused
Solution: Verify SMTP host and port, check firewall settings
```

#### Port Blocked
```
Error: Connection timeout
Solution: Try different ports (25, 465, 587) or contact IT
```

#### Gmail App Password Issues
```
Error: Invalid credentials
Solution: Generate new app password, ensure 2FA is enabled
```

### Debug Steps

1. **Verify Credentials**
   ```bash
   echo $EMAIL_USERNAME
   echo $EMAIL_PASSWORD
   ```

2. **Test SMTP Connection**
   ```bash
   # Test Gmail
   telnet smtp.gmail.com 587
   
   # Test Outlook
   telnet smtp-mail.outlook.com 587
   ```

3. **Check Firewall**
   - Ensure port 587 (or your configured port) is open
   - Check corporate firewall policies

4. **Verify Email Provider Settings**
   - Check if SMTP is enabled for your account
   - Verify account security settings

### Email Provider Status

| Provider | Status | Notes |
|----------|--------|-------|
| Gmail | ✅ Supported | Requires app password |
| Outlook | ✅ Supported | Works with regular password |
| Yahoo | ✅ Supported | Requires app password |
| iCloud | ✅ Supported | Requires app password |
| Custom SMTP | ✅ Supported | Depends on server configuration |

## Security Best Practices

### Credential Management

1. **Never hardcode** credentials in configuration files
2. **Use environment variables** for sensitive information
3. **Rotate passwords** regularly
4. **Use app passwords** when available

### Network Security

1. **Use TLS/SSL** when possible
2. **Verify SMTP server** authenticity
3. **Check firewall rules** for SMTP ports
4. **Monitor email logs** for suspicious activity

### Access Control

1. **Limit email access** to necessary users
2. **Use dedicated email accounts** for notifications
3. **Monitor email usage** and quotas
4. **Implement rate limiting** if needed

## Performance Optimization

### Email Sending

1. **Batch notifications** when possible
2. **Use async sending** for better performance
3. **Implement retry logic** for failed emails
4. **Monitor email queue** size

### Content Optimization

1. **Compress screenshots** before sending
2. **Limit email size** to avoid delivery issues
3. **Use efficient templates** for faster rendering
4. **Cache email content** when appropriate

## Monitoring and Logging

### Email Logs

```properties
# Enable email logging
notification.logging.enabled=true
notification.logging.level=INFO
notification.logging.mask.emails=true
```

### Metrics to Track

- Email delivery success rate
- Email sending time
- Email size and content
- Failed delivery reasons
- SMTP connection issues

### Alerting

Set up alerts for:
- Email delivery failures
- SMTP connection issues
- Authentication problems
- Rate limiting warnings
