---
id: ci-cd-integration
title: CI/CD Integration
sidebar_label: CI/CD Integration
description: Integrate notifications with GitHub Actions, Jenkins, and other CI/CD tools
---

# CI/CD Integration

The Ellithium notification system integrates seamlessly with popular CI/CD tools, providing real-time feedback on test execution results in your automated pipelines.

## Overview

The notification system automatically detects when running in CI/CD environments and:
- Sends notifications on test completion
- Reports test failures immediately
- Integrates with build status reporting
- Provides detailed execution metrics
- Supports environment-specific configurations

## GitHub Actions Integration

### Basic Setup

Create a `.github/workflows/test.yml` file:

```yaml
name: Test with Notifications
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
          
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
        
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: target/surefire-reports/
```

### Repository Secrets

Add these secrets in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `EMAIL_USERNAME` | Your email address | `your_email@gmail.com` |
| `EMAIL_PASSWORD` | Your email password or app password | `abcd efgh ijkl mnop` |
| `EMAIL_TO_NOTIFY` | Recipient email address | `team@company.com` |

### Advanced GitHub Actions

#### Matrix Testing with Notifications

```yaml
name: Matrix Test with Notifications
on: [push, pull_request]

jobs:
  test:
    strategy:
      matrix:
        java: [8, 11, 17]
        os: [ubuntu-latest, windows-latest]
    
    runs-on: ${{ matrix.os }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: ${{ matrix.java }}
          
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
        
      - name: Collect test results
        if: always()
        run: |
          echo "Test completed on ${{ matrix.os }} with Java ${{ matrix.java }}"
          echo "Results will be sent via email notification"
```

#### Conditional Notifications

```yaml
name: Conditional Notifications
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
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
        id: test
        run: mvn test
        
      - name: Send failure notification
        if: failure()
        run: |
          echo "Tests failed - notification will be sent automatically"
          
      - name: Send success notification
        if: success()
        run: |
          echo "Tests passed - notification will be sent automatically"
```

## Jenkins Integration

### Pipeline Setup

Create a `Jenkinsfile` in your project root:

```groovy
pipeline {
    agent any
    
    environment {
        EMAIL_USERNAME = credentials('email-username')
        EMAIL_PASSWORD = credentials('email-password')
        EMAIL_TO_NOTIFY = credentials('email-to-notify')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                sh 'java -version'
                sh 'mvn -version'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn clean test'
            }
            post {
                always {
                    // Test results will be sent via email automatically
                    echo 'Test execution completed - notifications sent'
                }
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}
```

### Jenkins Credentials

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **System** → **Global credentials** → **Add Credentials**
3. Add the following credentials:

| Type | ID | Description |
|------|----|-------------|
| Username with password | `email-username` | Your email address |
| Username with password | `email-password` | Your email password or app password |
| Username with password | `email-to-notify` | Recipient email address |

### Freestyle Job Setup

For traditional Jenkins freestyle jobs:

1. **Build Environment**: Check "Inject environment variables"
2. **Properties Content**:
   ```
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_TO_NOTIFY=team@company.com
   ```
3. **Build Steps**: Add "Execute shell" step with `mvn test`
4. **Post-build Actions**: Notifications are sent automatically

## GitLab CI Integration

### `.gitlab-ci.yml` Configuration

```yaml
stages:
  - test

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository"

test:
  stage: test
  image: openjdk:11-jdk
  before_script:
    - export EMAIL_USERNAME=$EMAIL_USERNAME
    - export EMAIL_PASSWORD=$EMAIL_PASSWORD
    - export EMAIL_TO_NOTIFY=$EMAIL_TO_NOTIFY
  script:
    - mvn clean test
  artifacts:
    reports:
      junit: target/surefire-reports/TEST-*.xml
    paths:
      - target/surefire-reports/
    expire_in: 1 week
```

### GitLab Variables

1. Go to **Settings** → **CI/CD** → **Variables**
2. Add the following variables:

| Variable | Value | Protected | Masked |
|----------|-------|-----------|---------|
| `EMAIL_USERNAME` | `your_email@gmail.com` | ✅ | ❌ |
| `EMAIL_PASSWORD` | `your_app_password` | ✅ | ✅ |
| `EMAIL_TO_NOTIFY` | `team@company.com` | ✅ | ❌ |

## Azure DevOps Integration

### `azure-pipelines.yml` Configuration

```yaml
trigger:
  - main
  - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  MAVEN_CACHE_FOLDER: $(Pipeline.Workspace)/.m2/repository
  MAVEN_OPTS: '-Dmaven.repo.local=$(MAVEN_CACHE_FOLDER)'

stages:
- stage: Test
  displayName: 'Test and Notify'
  jobs:
  - job: Test
    displayName: 'Run Tests'
    steps:
    - task: Cache@2
      inputs:
        key: 'maven | "$(Agent.OS)" | **/pom.xml'
        restoreKeys: |
          maven | "$(Agent.OS)"
        path: $(MAVEN_CACHE_FOLDER)
      displayName: 'Cache Maven packages'
      
    - task: JavaToolInstaller@0
      inputs:
        versionSpec: '11'
        jdkArchitectureOption: 'x64'
      displayName: 'Install Java 11'
      
    - script: |
        export EMAIL_USERNAME=$(EMAIL_USERNAME)
        export EMAIL_PASSWORD=$(EMAIL_PASSWORD)
        export EMAIL_TO_NOTIFY=$(EMAIL_TO_NOTIFY)
        mvn clean test
      displayName: 'Run Tests with Notifications'
      
    - task: PublishTestResults@2
      inputs:
        testResultsFormat: 'JUnit'
        testResultsFiles: '**/TEST-*.xml'
        testRunTitle: 'Ellithium Test Results'
      condition: always()
      displayName: 'Publish Test Results'
```

### Azure DevOps Variables

1. Go to **Pipelines** → **Edit** → **Variables**
2. Add the following variables:

| Variable | Value | Secret |
|----------|-------|---------|
| `EMAIL_USERNAME` | `your_email@gmail.com` | ❌ |
| `EMAIL_PASSWORD` | `your_app_password` | ✅ |
| `EMAIL_TO_NOTIFY` | `team@company.com` | ❌ |

## CircleCI Integration

### `.circleci/config.yml` Configuration

```yaml
version: 2.1

jobs:
  test:
    docker:
      - image: openjdk:11-jdk
    steps:
      - checkout
      - run:
          name: Set environment variables
          command: |
            echo 'export EMAIL_USERNAME="$EMAIL_USERNAME"' >> $BASH_ENV
            echo 'export EMAIL_PASSWORD="$EMAIL_PASSWORD"' >> $BASH_ENV
            echo 'export EMAIL_TO_NOTIFY="$EMAIL_TO_NOTIFY"' >> $BASH_ENV
      - run:
          name: Run tests
          command: mvn clean test
      - store_test_results:
          path: target/surefire-reports
      - store_artifacts:
          path: target/surefire-reports
          destination: test-results

workflows:
  version: 2
  test:
    jobs:
      - test
```

### CircleCI Environment Variables

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables:

| Variable | Value |
|----------|-------|
| `EMAIL_USERNAME` | `your_email@gmail.com` |
| `EMAIL_PASSWORD` | `your_app_password` |
| `EMAIL_TO_NOTIFY` | `team@company.com` |

## Configuration for CI/CD

### Environment-Specific Properties

Create a `config-ci.properties` file for CI/CD environments:

```properties
# CI/CD specific configuration
notification.enabled=true
notification.email.enabled=true
notification.email.smtp.host=smtp.gmail.com
notification.email.smtp.port=587
notification.email.smtp.username=${EMAIL_USERNAME}
notification.email.smtp.password=${EMAIL_PASSWORD}
notification.email.from=${EMAIL_USERNAME}
notification.email.to=${EMAIL_TO_NOTIFY}
notification.email.subject.prefix=[CI/CD] Ellithium Test Results

# CI/CD trigger settings
notification.failure.threshold=0
notification.send.on.failure=true
notification.send.on.completion=true
```

### Maven Profile

Add a CI/CD profile to your `pom.xml`:

```xml
<profiles>
    <profile>
        <id>ci</id>
        <properties>
            <config.file>config-ci.properties</config.file>
        </properties>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <version>3.0.0-M5</version>
                    <configuration>
                        <systemPropertyVariables>
                            <config.file>${config.file}</config.file>
                        </systemPropertyVariables>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```

## Best Practices

### Security

1. **Use Secrets**: Store credentials in CI/CD secrets, not in code
2. **App Passwords**: Use app passwords for Gmail instead of main passwords
3. **Environment Variables**: Pass credentials through environment variables
4. **Access Control**: Limit who can access notification credentials

### Configuration

1. **Environment-Specific**: Use different config files for different environments
2. **Fallback Values**: Provide sensible defaults for non-critical settings
3. **Validation**: Test notification configuration before deploying to production
4. **Monitoring**: Track notification success rates in CI/CD pipelines

### Performance

1. **Async Notifications**: Notifications don't block test execution
2. **Conditional Sending**: Only send notifications when necessary
3. **Batch Processing**: Group notifications when possible
4. **Error Handling**: Graceful fallbacks when notifications fail

## Troubleshooting

### Common CI/CD Issues

#### Environment Variables Not Set
```
Error: EMAIL_USERNAME not found
```
**Solution**: Verify environment variables are set in CI/CD platform

#### Credentials Invalid
```
Error: Authentication failed
```
**Solution**: Check if credentials are correctly stored in CI/CD secrets

#### Network Restrictions
```
Error: Connection refused
```
**Solution**: Ensure CI/CD environment allows SMTP connections

### Debug Steps

1. **Check Environment Variables**:
   ```bash
   echo "EMAIL_USERNAME: $EMAIL_USERNAME"
   echo "EMAIL_TO_NOTIFY: $EMAIL_TO_NOTIFY"
   # Don't echo password for security
   ```

2. **Verify Configuration**:
   ```bash
   mvn test -Dconfig.file=config-ci.properties
   ```

3. **Check Logs**: Review CI/CD logs for notification system messages

4. **Test Locally**: Verify configuration works in local environment first

## Monitoring and Metrics

### Notification Success Rates

Track these metrics in your CI/CD pipelines:
- Email delivery success rate
- Notification timing
- Failure reasons
- Configuration validation results

### Integration Points

The notification system integrates with:
- Test execution results
- Build status reporting
- Deployment notifications
- Team collaboration tools

By following these integration patterns, you can ensure that your team receives timely notifications about test execution results across all your CI/CD environments.
