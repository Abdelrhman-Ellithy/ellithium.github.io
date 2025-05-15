---
sidebar_position: 4
---

# Text Helper

The `TextHelper` class provides utilities for working with plain text files. It includes comprehensive methods for reading, writing, searching, and manipulating text files.

## Basic File Operations

### Reading Text Files

```java
// Read entire file as a list of lines
List<String> lines = TextHelper.readTextFile("data/config.txt");

// Read entire file as a single string
String content = TextHelper.readFileAsString("data/config.txt");

// Read specific lines by range
List<String> section = TextHelper.readSpecificLines(
    "data/log.txt", 
    10, // start line (inclusive)
    20  // end line (inclusive)
);

// Read first N lines
List<String> header = TextHelper.readFirstNLines("data/log.txt", 5);

// Read last N lines
List<String> recent = TextHelper.readLastNLines("data/log.txt", 10);

// Read a specific line by number
String line = TextHelper.readLineNumber("data/config.txt", 3);
```

### Writing Text Files

```java
// Write a list of lines to a file
List<String> lines = Arrays.asList("Line 1", "Line 2", "Line 3");
TextHelper.writeTextFile("data/output.txt", lines);

// Write a string to a file
String content = "This is the content of the file.\nIt has multiple lines.";
TextHelper.writeStringToFile("data/output.txt", content);

// Append a line to a file
TextHelper.appendLineToFile("data/log.txt", "New log entry: " + new Date());

// Write with specific encoding
TextHelper.writeWithEncoding(
    "data/international.txt", 
    lines, 
    "UTF-8"
);
```

## Search and Find

```java
// Check if file contains a keyword
boolean hasError = TextHelper.containsKeyword("data/log.txt", "ERROR");

// Find the first line containing a keyword
String errorLine = TextHelper.findLineWithKeyword(
    "data/log.txt", 
    "ERROR"
);

// Get all lines containing a keyword
List<String> errorLines = TextHelper.getAllLinesWithKeyword(
    "data/log.txt", 
    "ERROR"
);

// Get line numbers containing a keyword
List<Integer> errorLineNumbers = TextHelper.getLineNumbersWithKeyword(
    "data/log.txt", 
    "ERROR"
);

// Search lines matching a regex pattern
List<String> ipAddresses = TextHelper.searchLinesMatching(
    "data/access.log", 
    "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}"
);
```

## File Modification

```java
// Delete a specific line
TextHelper.deleteLine("data/config.txt", "debug=true");

// Delete all lines containing a keyword
TextHelper.deleteLinesContainingKeyword("data/log.txt", "DEBUG");

// Replace all occurrences of text
TextHelper.replaceAllOccurrences(
    "data/config.txt", 
    "development", 
    "production"
);

// Replace a specific line
TextHelper.replaceLineInFile(
    "data/config.txt", 
    "debug=true", 
    "debug=false"
);

// Insert a line at a specific position
TextHelper.insertLineAt(
    "data/config.txt", 
    5, // line number (1-based)
    "# Added configuration"
);

// Append text after a specific line
TextHelper.appendAfterLine(
    "data/config.txt", 
    10, // line number 
    "# Additional settings"
);

// Write at a specific line (replacing that line)
TextHelper.writeAtLine(
    "data/config.txt", 
    15, // line number
    "timeout=30"
);

// Truncate file to specified number of lines
TextHelper.truncateFile("data/log.txt", 1000);

// Remove duplicate lines
TextHelper.removeDuplicateLines("data/keywords.txt");

// Reverse file content
TextHelper.reverseFileContent("data/list.txt");
```

## File Analysis

```java
// Count lines in a file
int lineCount = TextHelper.countLinesInFile("data/log.txt");

// Check if file is empty
boolean isEmpty = TextHelper.isEmptyFile("data/new.txt");

// Get file size in bytes
long size = TextHelper.getFileSizeBytes("data/large.txt");

// Get last modified timestamp
long lastModified = TextHelper.getLastModifiedTimestamp("data/config.txt");

// Get word frequency in a file
Map<String, Integer> wordCounts = TextHelper.getWordFrequency("data/article.txt");

// Get file extension
String extension = TextHelper.getFileExtension("data/document.txt"); // returns "txt"
```

## File Comparison and Copying

```java
// Check if two files are identical
boolean identical = TextHelper.areFilesIdentical(
    "data/original.txt", 
    "data/copy.txt"
);

// Copy a text file
TextHelper.copyTextFile(
    "data/original.txt", 
    "data/backup.txt"
);

// Merge two files
TextHelper.mergeTwoFiles(
    "data/part1.txt", 
    "data/part2.txt", 
    "data/combined.txt"
);
```

## Encoding Support

```java
// Read with specific encoding
List<String> lines = TextHelper.readWithEncoding(
    "data/international.txt", 
    "UTF-8"
);

// Write with specific encoding
TextHelper.writeWithEncoding(
    "data/international.txt", 
    linesWithSpecialChars, 
    "UTF-8"
);
```

## Error Handling

The `TextHelper` class incorporates robust error handling and logging through the Ellithium reporting system. All operations log their status, making it easy to trace file operations during test execution.

```java
// All methods include proper error handling and logging
try {
    List<String> lines = TextHelper.readTextFile("nonexistent.txt");
    // Logs: "Text file does not exist: nonexistent.txt"
} catch (Exception e) {
    // Additional error handling if needed
}
``` 