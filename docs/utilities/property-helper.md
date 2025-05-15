---
sidebar_position: 6
---

# Property Helper

The `PropertyHelper` class provides utilities for working with Java properties files (`.properties`). It offers enhanced functionality for reading, writing, and manipulating property files while preserving key order.

## Basic Operations

### Reading Properties

```java
// Get a single property value
String dbUrl = PropertyHelper.getDataFromProperties(
    "config/database.properties", 
    "db.url"
);

// Get a property with default value
String timeout = PropertyHelper.getOrDefault(
    "config/app.properties", 
    "connection.timeout", 
    "30000" // default value
);

// Load all properties into a Properties object
Properties allConfig = PropertyHelper.getAllProperties("config/app.properties");

// Get properties as a Map
Map<String, String> configMap = PropertyHelper.getPropertiesAsMap("config/app.properties");
```

### Writing Properties

```java
// Set a single property
PropertyHelper.setDataToProperties(
    "config/app.properties", 
    "app.name", 
    "My Application"
);

// Add or update multiple properties from a Map
Map<String, String> newSettings = new HashMap<>();
newSettings.put("app.version", "1.2.3");
newSettings.put("app.build.date", "2023-05-15");
PropertyHelper.updatePropertiesFromMap(
    "config/app.properties", 
    newSettings
);

// Add only new properties from a Map (doesn't modify existing ones)
PropertyHelper.addNewPropertiesFromMap(
    "config/app.properties", 
    newSettings
);

// Update multiple properties using Properties object
Properties updates = new Properties();
updates.setProperty("db.host", "localhost");
updates.setProperty("db.port", "5432");
PropertyHelper.updateMultipleProperties(
    "config/database.properties", 
    updates
);
```

## Property Management

```java
// Check if a key exists
boolean hasKey = PropertyHelper.keyExists(
    "config/app.properties", 
    "app.debug"
);

// Remove a key
PropertyHelper.removeKeyFromProperties(
    "config/app.properties", 
    "temp.setting"
);

// Clear all properties
PropertyHelper.clearProperties("config/temp.properties");

// Count properties
int count = PropertyHelper.getPropertyCount("config/app.properties");
```

## File Operations

```java
// Create a backup of a properties file
PropertyHelper.backupProperties("config/important.properties");
// Creates a file like: config/important.properties.bak

// Restore from backup
PropertyHelper.restoreFromBackup("config/important.properties");

// Sort properties by key
PropertyHelper.sortPropertiesByKey("config/unsorted.properties");
```

## Advanced Operations

```java
// Load with specific character encoding
Properties unicodeProps = PropertyHelper.loadWithEncoding(
    "config/international.properties", 
    "UTF-8"
);

// Save with specific character encoding
PropertyHelper.saveWithEncoding(
    "config/international.properties", 
    properties, 
    "UTF-8"
);

// Compare two properties files
Map<String, String[]> diff = PropertyHelper.compareProperties(
    "config/app-dev.properties", 
    "config/app-prod.properties"
);
// Returns map with: different values, keys only in file1, keys only in file2

// Get keys matching a pattern
Set<String> dbKeys = PropertyHelper.getKeysMatchingPattern(
    "config/app.properties", 
    "db\\..*" // regex for keys starting with "db."
);

// Find values containing specific text
List<String> debugSettings = PropertyHelper.findValuesContaining(
    "config/app.properties", 
    "debug"
);

// Validate a property value against a regex pattern
boolean isValid = PropertyHelper.validatePropertyValue(
    "config/app.properties", 
    "app.version", 
    "\\d+\\.\\d+\\.\\d+" // regex for semantic versioning
);

// Get properties whose values match a pattern
Map<String, String> ipAddresses = PropertyHelper.getPropertiesMatchingValuePattern(
    "config/network.properties", 
    "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}" // regex for IP addresses
);
```

## Thread Safety

The `PropertyHelper` class ensures thread safety for write operations by using synchronized blocks. This prevents concurrent modifications that could lead to data corruption.

```java
// This operation is thread-safe
PropertyHelper.setDataToProperties(
    "config/shared.properties", 
    "last.access", 
    new Date().toString()
);
```

## Error Handling

All methods in the `PropertyHelper` class incorporate robust error handling and logging through the Ellithium reporting system. Operations log their status, making it easy to trace property file operations during test execution.

```java
// Error handling example
try {
    String value = PropertyHelper.getDataFromProperties("nonexistent.properties", "key");
    // Logs error: "Error accessing properties file: ..."
} catch (Exception e) {
    // Additional error handling if needed
}
```

## Key Order Preservation

Unlike the standard Java `Properties` class, `PropertyHelper` preserves the order of keys in properties files. This is achieved through a custom internal implementation of `LinkedProperties` that maintains insertion order. 