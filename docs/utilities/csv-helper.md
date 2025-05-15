---
sidebar_position: 3
---

# CSV Helper

The `CSVHelper` class provides comprehensive utilities for working with CSV (Comma-Separated Values) files. It offers methods for reading, writing, and manipulating CSV data with a focus on ease of use and robust error handling.

## Basic Operations

### Reading CSV Data

```java
// Read all data from a CSV file
List<Map<String, String>> allData = CSVHelper.getCsvData("data/employees.csv");

// Read data by filtering on a specific column
List<Map<String, String>> managers = CSVHelper.getCsvDataByColumn(
    "data/employees.csv", 
    "role", 
    "manager"
);

// Read a specific column
List<String> emails = CSVHelper.readColumn("data/employees.csv", "email");

// Read a specific row
Map<String, String> thirdEmployee = CSVHelper.readRow("data/employees.csv", 2);

// Read a specific cell
String salary = CSVHelper.readCell("data/employees.csv", 5, "salary");

// Get row count
int totalEmployees = CSVHelper.getRowCount("data/employees.csv");
```

### Writing CSV Data

```java
// Create new data
List<Map<String, String>> employeeData = new ArrayList<>();
Map<String, String> employee1 = new HashMap<>();
employee1.put("id", "1001");
employee1.put("name", "John Doe");
employee1.put("email", "john@example.com");
employee1.put("role", "developer");
employeeData.add(employee1);

// Write data to a new or existing CSV file
CSVHelper.setCsvData("data/new_employees.csv", employeeData);

// Append data to an existing CSV file
CSVHelper.appendData("data/employees.csv", newEmployeeData);

// Write a value to a specific cell
CSVHelper.writeCell("data/employees.csv", 3, "salary", "75000");

// Update an entire row
Map<String, String> updatedInfo = new HashMap<>();
updatedInfo.put("email", "john.doe@example.com");
updatedInfo.put("role", "senior developer");
CSVHelper.updateRow("data/employees.csv", 0, updatedInfo);
```

## Data Manipulation

### Structure Modifications

```java
// Add a new column
CSVHelper.addNewColumn("data/employees.csv", "department", "Engineering");

// Rename a column
CSVHelper.renameColumn("data/employees.csv", "dept", "department");

// Delete a row
CSVHelper.deleteRow("data/employees.csv", 4);

// Delete a column
CSVHelper.deleteColumn("data/employees.csv", "phone_number");

// Update all values in a column
CSVHelper.updateColumn("data/employees.csv", "status", "active");

// Replace specific values in a column
CSVHelper.replaceColumnData(
    "data/employees.csv", 
    "department", 
    "Engineering", 
    "Software Engineering"
);
```

### Filtering and Sorting

```java
// Filter data based on multiple conditions
Map<String, String> filters = new HashMap<>();
filters.put("department", "Sales");
filters.put("location", "New York");
List<Map<String, String>> salesNY = CSVHelper.filterData(
    "data/employees.csv", 
    filters
);

// Sort data by a column
List<Map<String, String>> sortedBySalary = CSVHelper.sortData(
    "data/employees.csv", 
    "salary", 
    true // ascending order
);

// Find duplicate entries in a column
List<String> duplicateEmails = CSVHelper.findDuplicateEntries(
    "data/employees.csv", 
    "email"
);
```

## File Operations

```java
// Check if a CSV file exists
boolean exists = CSVHelper.doesFileExist("data/employees.csv");

// Validate if a CSV file has the expected columns
List<String> requiredColumns = Arrays.asList("id", "name", "email", "role");
boolean isValid = CSVHelper.validateFileStructure(
    "data/employees.csv", 
    requiredColumns
);

// Merge two CSV files
CSVHelper.mergeCsvFiles(
    "data/team1.csv", 
    "data/team2.csv", 
    "data/all_teams.csv"
);

// Merge multiple CSV files
List<String> files = Arrays.asList(
    "data/team1.csv", 
    "data/team2.csv", 
    "data/team3.csv"
);
CSVHelper.mergeCsvFiles("data/all_teams.csv", files);

// Export CSV data to a list of lists (for custom processing)
List<List<String>> rawData = CSVHelper.exportToList("data/employees.csv");
```

## Error Handling

The `CSVHelper` class incorporates robust error handling and logging through the Ellithium reporting system. All operations log their status, making it easy to trace CSV operations during test execution.

```java
// All methods include error logging:
try {
    List<Map<String, String>> data = CSVHelper.getCsvData("data/missing.csv");
    // If file is missing, logs: "CSV file not found: data/missing.csv"
} catch (Exception e) {
    // Additional exception handling if needed
}
```

## Working with Large Files

The `CSVHelper` is designed to efficiently handle large CSV files by using streaming APIs where appropriate. This ensures memory efficiency when working with large datasets. 