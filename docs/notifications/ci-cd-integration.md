---
id: ci-cd-integration
title: CI/CD Integration
sidebar_label: CI/CD Integration
description: Integrate notifications with GitHub Actions, Jenkins, and other CI/CD tools
---

# CI/CD Integration

The notification system seamlessly integrates with popular CI/CD tools, automatically sending test execution results to your team. This guide covers setup for GitHub Actions, Jenkins, GitLab CI, and other CI/CD platforms.

## GitHub Actions Integration

### Basic Setup

Create or update `.github/workflows/ci.yml`:

```yaml
name: CI with Notifications

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  # Notification system environment variables
  EMAIL_USERNAME: ${{ secrets.EMAIL_USERNAME }}
  EMAIL_PASSWORD: ${{ secrets.EMAIL_PASSWORD }}
  EMAIL_TO_NOTIFY: ${{ secrets.EMAIL_TO_NOTIFY }}
  SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up JDK 21
      uses: actions/setup-java@v4
      with:
        java-version: '21'
        distribution: 'temurin'
    
    - name: Cache Maven packages
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
        restore-keys: ${{ runner.os }}-m2
    
    - name: Run Tests with Notifications
      run: mvn clean test
      env:
        # Pass environment variables to Maven
        EMAIL_USERNAME: ${{ secrets.EMAIL_USERNAME }}
        EMAIL_PASSWORD: ${{ secrets.EMAIL_PASSWORD }}
        EMAIL_TO_NOTIFY: ${{ secrets.EMAIL_TO_NOTIFY }}
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Advanced GitHub Actions Setup

```yaml
name: Advanced CI with Notifications

on:
  push:
    branches: [ main, develop, feature/* ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

env:
  # Notification configuration
  EMAIL_USERNAME: ${{ secrets.EMAIL_USERNAME }}
  EMAIL_PASSWORD: ${{ secrets.EMAIL_PASSWORD }}
  EMAIL_TO_NOTIFY: ${{ secrets.EMAIL_TO_NOTIFY }}
  SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
  
  # Custom notification settings
  NOTIFICATION_FAILURE_THRESHOLD: 15
  NOTIFICATION_SLACK_CHANNEL: "#ci-results"

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        java-version: [17, 21]
        os: [ubuntu-latest, windows-latest]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up JDK ${{ matrix.java-version }}
      uses: actions/setup-java@v4
      with:
        java-version: ${{ matrix.java-version }}
        distribution: 'temurin'
    
    - name: Cache Maven packages
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: ${{ runner.os }}-${{ matrix.java-version }}-m2-${{ hashFiles('**/pom.xml') }}
        restore-keys: |
          ${{ runner.os }}-${{ matrix.java-version }}-m2-
          ${{ runner.os }}-m2-
    
    - name: Run Tests
      run: mvn clean test
      env:
        EMAIL_USERNAME: ${{ secrets.EMAIL_USERNAME }}
        EMAIL_PASSWORD: ${{ secrets.EMAIL_PASSWORD }}
        EMAIL_TO_NOTIFY: ${{ secrets.EMAIL_TO_NOTIFY }}
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
        NOTIFICATION_FAILURE_THRESHOLD: 15
        NOTIFICATION_SLACK_CHANNEL: "#ci-results"
    
    - name: Upload Test Results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results-${{ matrix.os }}-${{ matrix.java-version }}
        path: target/surefire-reports/
        retention-days: 30

  notify:
    needs: test
    runs-on: ubuntu-latest
    if: always()
    
    steps:
    - name: Send Final Notification
      run: |
        echo "Test execution completed"
        echo "Check previous job for test results"
      env:
        EMAIL_USERNAME: ${{ secrets.EMAIL_USERNAME }}
        EMAIL_PASSWORD: ${{ secrets.EMAIL_PASSWORD }}
        EMAIL_TO_NOTIFY: ${{ secrets.EMAIL_TO_NOTIFY }}
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Required GitHub Secrets

Add these secrets to your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

```
EMAIL_USERNAME          your-email@gmail.com
EMAIL_PASSWORD          your-app-password
EMAIL_TO_NOTIFY         team@company.com
SLACK_WEBHOOK_URL       https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Jenkins Integration

### Pipeline Setup

Create or update `Jenkinsfile`:

```groovy
pipeline {
    agent any
    
    environment {
        // Notification system environment variables
        EMAIL_USERNAME = credentials('email-username')
        EMAIL_PASSWORD = credentials('email-password')
        EMAIL_TO_NOTIFY = credentials('email-to-notify')
        SLACK_WEBHOOK_URL = credentials('slack-webhook-url')
        
        // Custom notification settings
        NOTIFICATION_FAILURE_THRESHOLD = '20'
        NOTIFICATION_SLACK_CHANNEL = '#jenkins-results'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Java') {
            steps {
                sh 'java -version'
                sh 'mvn -version'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh '''
                    mvn clean test \
                    -Dnotification.enabled=true \
                    -Dnotification.failure.threshold=${NOTIFICATION_FAILURE_THRESHOLD} \
                    -Dnotification.slack.channel=${NOTIFICATION_SLACK_CHANNEL}
                '''
            }
            post {
                always {
                    // Archive test results
                    archiveArtifacts artifacts: 'target/surefire-reports/**/*', allowEmptyArchive: true
                    
                    // Publish test results
                    publishTestResults testResultsPattern: 'target/surefire-reports/**/*.xml'
                }
            }
        }
    }
    
    post {
        always {
            // Send final notification
            echo 'Test execution completed'
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Some tests failed!'
        }
    }
}
```

### Jenkins Credentials Setup

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Add the following credentials:

#### Email Username
- **Kind**: Username with password
- **ID**: `email-username`
- **Username**: `your-email@gmail.com`
- **Password**: `your-app-password`

#### Email Password
- **Kind**: Secret text
- **ID**: `email-password`
- **Secret**: `your-app-password`

#### Email To Notify
- **Kind**: Secret text
- **ID**: `email-to-notify`
- **Secret**: `team@company.com`

#### Slack Webhook URL
- **Kind**: Secret text
- **ID**: `slack-webhook-url`
- **Secret**: `https://hooks.slack.com/services/YOUR/WEBHOOK/URL`

### Jenkins Freestyle Job Setup

For freestyle jobs, add these environment variables:

1. Go to **Build Environment** → **Environment variables**
2. Add the following variables:

```
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO_NOTIFY=team@company.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
NOTIFICATION_FAILURE_THRESHOLD=20
```

## GitLab CI Integration

### Basic Setup

Create or update `.gitlab-ci.yml`:

```yaml
variables:
  # Notification system environment variables
  EMAIL_USERNAME: $EMAIL_USERNAME
  EMAIL_PASSWORD: $EMAIL_PASSWORD
  EMAIL_TO_NOTIFY: $EMAIL_TO_NOTIFY
  SLACK_WEBHOOK_URL: $SLACK_WEBHOOK_URL
  
  # Maven settings
  MAVEN_OPTS: "-Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository"

cache:
  paths:
    - .m2/repository

stages:
  - test
  - notify

test:
  stage: test
  image: maven:3.9.9-openjdk-21
  script:
    - mvn clean test
  artifacts:
    reports:
      junit: target/surefire-reports/**/*.xml
    paths:
      - target/surefire-reports/
    expire_in: 1 week
  only:
    - main
    - develop
    - merge_requests

notify:
  stage: notify
  image: maven:3.9.9-openjdk-21
  script:
    - echo "Test execution completed"
    - echo "Check previous stage for test results"
  dependencies:
    - test
  only:
    - main
    - develop
  when: always
```

### GitLab CI/CD Variables

1. Go to **Settings** → **CI/CD** → **Variables**
2. Add the following variables:

```
EMAIL_USERNAME          your-email@gmail.com
EMAIL_PASSWORD          your-app-password
EMAIL_TO_NOTIFY         team@company.com
SLACK_WEBHOOK_URL       https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Azure DevOps Integration

### Pipeline Setup

Create or update `azure-pipelines.yml`:

```yaml
trigger:
  - main
  - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  # Notification system environment variables
  EMAIL_USERNAME: $(EMAIL_USERNAME)
  EMAIL_PASSWORD: $(EMAIL_PASSWORD)
  EMAIL_TO_NOTIFY: $(EMAIL_TO_NOTIFY)
  SLACK_WEBHOOK_URL: $(SLACK_WEBHOOK_URL)
  
  # Maven settings
  MAVEN_CACHE_FOLDER: $(Pipeline.Workspace)/.m2

stages:
- stage: Test
  displayName: 'Run Tests'
  jobs:
  - job: Test
    steps:
    - task: Cache@2
      inputs:
        key: 'maven | "$(Agent.OS)" | **/pom.xml'
        restoreKeys: |
          maven | "$(Agent.OS)"
        path: $(MAVEN_CACHE_FOLDER)
    
    - task: Maven@3
      inputs:
        mavenPomFile: 'pom.xml'
        goals: 'clean test'
        publishJUnitResults: true
        testResultsFiles: '**/surefire-reports/TEST-*.xml'
        javaHomeOption: 'JDKVersion'
        jdkVersionOption: '1.17'
        mavenVersionOption: 'Default'
    
    - task: PublishTestResults@2
      inputs:
        testResultsFormat: 'JUnit'
        testResultsFiles: '**/surefire-reports/TEST-*.xml'
        testRunTitle: 'Test Results'
      condition: always()

- stage: Notify
  displayName: 'Send Notifications'
  dependsOn: Test
  condition: always()
  jobs:
  - job: Notify
    steps:
    - script: |
        echo "Test execution completed"
        echo "Check previous stage for test results"
```

### Azure DevOps Variables

1. Go to **Pipelines** → **Edit** → **Variables**
2. Add the following variables:

```
EMAIL_USERNAME          your-email@gmail.com
EMAIL_PASSWORD          your-app-password
EMAIL_TO_NOTIFY         team@company.com
SLACK_WEBHOOK_URL       https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## CircleCI Integration

### Basic Setup

Create or update `.circleci/config.yml`:

```yaml
version: 2.1

orbs:
  maven: circleci/maven@1.0

jobs:
  test:
    docker:
      - image: cimg/openjdk:21.0
    steps:
      - checkout
      - maven/with-cache:
          maven-version: 3.9.9
          steps:
            - run: mvn clean test
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

```
EMAIL_USERNAME          your-email@gmail.com
EMAIL_PASSWORD          your-app-password
EMAIL_TO_NOTIFY         team@company.com
SLACK_WEBHOOK_URL       https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Best Practices

### Security
1. **Never hardcode credentials** in pipeline files
2. **Use CI/CD secrets** for sensitive information
3. **Rotate credentials** regularly
4. **Limit access** to notification credentials

### Performance
1. **Cache dependencies** to speed up builds
2. **Parallel execution** for matrix builds
3. **Artifact management** for test results
4. **Conditional notifications** based on results

### Monitoring
1. **Track notification delivery** success rates
2. **Monitor notification timing** and delays
3. **Log notification failures** for debugging
4. **Set up alerts** for notification system issues

## Troubleshooting

### Common Issues

#### Notifications Not Sent
- Check environment variables are set correctly
- Verify notification system is enabled
- Check SMTP/Slack connectivity
- Review notification logs

#### Authentication Failures
- Verify credentials are correct
- Check app password for Gmail
- Ensure webhook URL is valid
- Test credentials manually

#### CI/CD Integration Issues
- Verify environment variable syntax
- Check pipeline syntax
- Ensure proper job dependencies
- Review pipeline logs

### Debug Commands

```bash
# Test notification system locally
mvn test -Dnotification.test.email=true
mvn test -Dnotification.test.slack=true

# Check environment variables
echo $EMAIL_USERNAME
echo $SLACK_WEBHOOK_URL

# Test SMTP connection
telnet smtp.gmail.com 587

# Test Slack webhook
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Test notification"}' \
  $SLACK_WEBHOOK_URL
```
