---
sidebar_position: 8
---

# Command Executor

The `CommandExecutor` class provides utilities for executing operating system commands and interacting with the system environment. It offers cross-platform support for Windows, macOS, and Linux.

## Command Execution

### Basic Command Execution

```java
// Execute a command synchronously (blocks until completion)
CommandExecutor.executeCommand("echo Hello, World!");

// Execute a command and capture the output
String output = CommandExecutor.executeCommandWithOutput("git status");

// Execute a command asynchronously (non-blocking)
Process process = CommandExecutor.executeCommandNonBlocking("npm start");
// Later, you can check if the process is still running
boolean isRunning = process.isAlive();
// Or terminate it when needed
process.destroy();
```

### Script Execution

```java
// Execute a script file
CommandExecutor.executeScript("scripts/setup.sh");
// On Windows, works with .bat, .cmd files
// On macOS/Linux, works with .sh files
```

## Process Management

```java
// List all running processes
List<String> runningProcesses = CommandExecutor.listProcesses();
for (String process : runningProcesses) {
    System.out.println(process);
}

// Check if a specific process is running
boolean isRunning = CommandExecutor.isProcessRunning("chrome.exe");

// Kill a process by its ID
CommandExecutor.killProcess("1234");
```

## File and Directory Operations

```java
// Open a file with the default application
CommandExecutor.openFile("documents/report.pdf");

// Create a directory (creates parent directories if needed)
CommandExecutor.createDirectory("data/logs/archive");

// Delete a directory and all its contents
CommandExecutor.deleteDirectory("temp/cache");

// Copy a file
CommandExecutor.copyFile(
    "templates/default.html", 
    "output/index.html"
);
```

## System Information

```java
// Get basic system information
String sysInfo = CommandExecutor.getSystemInfo();
System.out.println(sysInfo);
// Output includes: OS name, version, architecture, Java version, etc.

// Get environment variables
Map<String, String> envVars = CommandExecutor.getEnvironmentVariables();
String javaHome = envVars.get("JAVA_HOME");

// Set an environment variable (for the current JVM process)
CommandExecutor.setEnvironmentVariable("DEBUG_MODE", "true");
```

## Cross-Platform Support

The `CommandExecutor` class automatically detects the operating system and uses the appropriate commands:

```java
// These methods work across Windows, macOS, and Linux with the same API
CommandExecutor.openFile("document.txt"); // Uses appropriate open mechanism
CommandExecutor.listProcesses();          // Uses tasklist or ps depending on OS
CommandExecutor.killProcess("1234");      // Uses taskkill or kill depending on OS
```

## Error Handling

All methods in the `CommandExecutor` class include robust error handling and logging through the Ellithium reporting system. Operations log their status, making it easy to trace command execution during test runs.

```java
// All operations include error handling and logging
CommandExecutor.executeCommand("invalid_command");
// Logs: "Command failed. Exit code: 1"
// Logs the error output
```

## Security Considerations

The `CommandExecutor` implements security measures to prevent common issues:

1. **Command Sanitization**: All commands are sanitized before execution to prevent command injection.
2. **Process Cleanup**: Processes are properly managed to prevent resource leaks.
3. **Error Handling**: Comprehensive error handling prevents system instability.

## Usage in Testing

The `CommandExecutor` is particularly useful in testing scenarios:

1. **Environment Setup**: Preparing test environments by creating directories or copying files.
2. **Application Launching**: Starting applications or servers for testing.
3. **Test Teardown**: Cleaning up resources or killing processes after tests.
4. **System Integration**: Testing interactions with other applications or OS features.

## Logging

All operations log their status to the Ellithium reporting system, with appropriate log levels:

- Successful operations: `INFO_GREEN`
- Failed operations: `ERROR`
- Debug information: `DEBUG`

This makes it easy to trace command execution during test runs and diagnose issues that might occur. 