---
sidebar_position: 7
---

# JAR Extractor

The `JarExtractor` class provides utilities for extracting content from JAR (Java Archive) files. It offers secure methods to extract both individual files and entire folders from JAR archives.

## Usage Examples

### Extracting Folders from JAR Files

```java
// Extract a folder from a JAR file
File jarFile = new File("path/to/library.jar");
String folderPathInJar = "resources/templates/"; // Path inside the JAR
File targetDirectory = new File("path/to/output/templates");

boolean success = JarExtractor.extractFolderFromJar(
    jarFile, 
    folderPathInJar, 
    targetDirectory
);

if (success) {
    System.out.println("Folder extracted successfully!");
} else {
    System.err.println("Failed to extract folder from JAR.");
}
```

### Extracting Individual Files

```java
// Extract a single file from a JAR
File jarFile = new File("path/to/library.jar");
String filePathInJar = "resources/config/default.properties"; // File path inside the JAR
File outputFile = new File("path/to/output/default.properties");

JarExtractor.extractFileFromJar(
    jarFile, 
    filePathInJar, 
    outputFile
);
```

## Key Features

### Security Considerations

The `JarExtractor` class implements several security measures to prevent common vulnerabilities:

1. **Path Traversal Protection**: Validates all extracted paths to prevent directory traversal attacks.
2. **Safe Extraction**: Uses atomic file operations and temporary files for reliable extraction.
3. **Error Recovery**: Cleans up target directories if extraction fails.

### Folder Extraction Process

When extracting a folder from a JAR file, the process follows these steps:

1. Validates the target directory
2. Creates the target directory if needed
3. Performs security validation on all entries
4. Creates necessary directory structures
5. Extracts files with safe copy operations

### Error Handling

The extraction methods include comprehensive error handling for common scenarios:

- Missing JAR files
- Invalid target directories
- Path traversal attempts
- File system permission issues
- IO errors during extraction

## Use Cases

The `JarExtractor` is particularly useful in these scenarios:

1. **Runtime Resource Access**: Extracting configuration files or templates from application JARs.
2. **Plugin Systems**: Extracting plugin content from plugin JAR files.
3. **Resource Updates**: Updating resource files without rebuilding the entire application.
4. **Testing**: Extracting test data or resources from test libraries.
5. **Installation Processes**: Extracting initial configuration or resources during application installation.

## Implementation Details

### Directory Handling

When extracting directories, the `JarExtractor` handles both directory entries and file entries:

- Directory entries are created as directories in the target location
- Files are extracted with their relative paths maintained
- Existing directories with the same name are safely cleaned up before extraction

### Logging

The `JarExtractor` logs operation status to standard output and standard error, helping to track the extraction process and diagnose any issues that might occur. 