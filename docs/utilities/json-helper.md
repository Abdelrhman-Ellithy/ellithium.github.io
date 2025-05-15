---
sidebar_position: 1
---

# JSON Helper

The `JsonHelper` class provides comprehensive utilities for working with JSON files and data structures. It simplifies JSON file operations with methods for reading, writing, manipulating, and validating JSON data.

## Basic Operations

### Reading JSON Data

```java
// Read JSON data from a file into a List of Maps
List<Map<String, String>> userData = JsonHelper.getJsonData("data/users.json");

// Read a nested JSON structure
Map<String, Object> nestedData = JsonHelper.getNestedJsonData("data/complex.json");

// Read a specific key's value
String username = JsonHelper.getJsonKeyValue("data/config.json", "username");
```

### Writing JSON Data

```java
// Create and populate a list of maps
List<Map<String, String>> userData = new ArrayList<>();
Map<String, String> user1 = new HashMap<>();
user1.put("name", "John Doe");
user1.put("email", "john@example.com");
userData.add(user1);

// Write to a JSON file (appends to existing array or creates new file)
JsonHelper.setJsonData("data/users.json", userData);

// Set or update a specific key-value pair
JsonHelper.setJsonKeyValue("data/config.json", "apiKey", "abc123xyz");
```

## Working with Nested JSON

### Accessing Nested Values

```java
// Access a value deep in a nested structure
List<String> path = Arrays.asList("user", "address", "city");
String city = JsonHelper.getValueFromNestedPath("data/profile.json", path);

// Modify a value in a nested structure
JsonHelper.modifyInNestedPath("data/profile.json", path, "New York");
```

### Working with JSON Arrays

```java
// Append to a JSON array at a specific path
List<String> arrayPath = Arrays.asList("users", "permissions");
JsonHelper.appendToJsonArray("data/permissions.json", arrayPath, "READ");

// Insert into a JSON array at a specific index
JsonHelper.insertIntoJsonArray("data/permissions.json", arrayPath, 1, "WRITE");

// Remove from a JSON array at a specific index
JsonHelper.removeFromJsonArray("data/permissions.json", arrayPath, 2);

// Check if an array contains a specific value
boolean hasPermission = JsonHelper.arrayContainsValue("data/permissions.json", arrayPath, "ADMIN");

// Create a new array at a specific path
JsonHelper.createArrayAtPath("data/settings.json", Arrays.asList("preferences", "themes"));
```

## JSON Manipulation

### Comparing and Merging

```java
// Compare two JSON files for equality
boolean areEqual = JsonHelper.compareJsonFiles("data/config1.json", "data/config2.json");

// Merge two JSON files into a target file
JsonHelper.mergeJsonFiles("data/part1.json", "data/part2.json", "data/merged.json");
```

### Cleaning and Transforming

```java
// Remove all null values from a JSON file
JsonHelper.removeNullValues("data/data.json");

// Create a backup of a JSON file (returns backup path)
String backupPath = JsonHelper.backupJsonFile("data/important.json");

// Pretty print JSON file contents
JsonHelper.prettyPrintJson("data/messy.json");
```

## Validation and Analysis

```java
// Validate that a JSON file contains all required keys
List<String> requiredKeys = Arrays.asList("username", "password", "email");
boolean isValid = JsonHelper.validateJsonKeys("data/user.json", requiredKeys);

// Check if a file contains valid JSON
boolean isValidJson = JsonHelper.isValidJson("data/unknown.json");

// Analyze key occurrences in a JSON file
Map<String, Integer> occurrences = JsonHelper.getJsonKeyOccurrences("data/complex.json");
```

## Object Mapping

```java
// Parse JSON file to a Java object
User user = JsonHelper.parseJsonToObject("data/user.json", User.class);

// Parse JSON file to a list of Java objects
List<Product> products = JsonHelper.parseJsonToList("data/products.json", Product.class);
```

The `JsonHelper` class automatically handles error logging through the Ellithium reporting system, making it easy to track JSON-related operations and diagnose issues when working with JSON data. 