---
sidebar_position: 2
---

# Excel Helper

The `ExcelHelper` class provides comprehensive utilities for working with Microsoft Excel files (XLSX format). This class leverages Apache POI to offer a simplified API for reading, writing, and manipulating Excel workbooks and worksheets.

## Basic Operations

### Reading Excel Data

```java
// Read all data from a sheet
List<Map<String, String>> userData = ExcelHelper.getExcelData(
    "data/employees.xlsx", 
    "Users"
);

// Read a specific column
List<String> emails = ExcelHelper.getColumnData(
    "data/employees.xlsx", 
    "Users", 
    2 // column index (0-based)
);
// Alternative by name rather than index
List<String> emails = ExcelHelper.readColumn(
    "data/employees.xlsx", 
    "Users", 
    3 // column index (0-based)
);

// Read a specific row
List<String> rowData = ExcelHelper.getRowData(
    "data/employees.xlsx", 
    "Users", 
    5 // row index (0-based)
);
// Alternative with header mapping
Map<String, String> rowData = ExcelHelper.readRow(
    "data/employees.xlsx", 
    "Users", 
    5 // row index (0-based)
);

// Read a specific cell
String value = ExcelHelper.getCellData(
    "data/employees.xlsx", 
    "Users", 
    3, // row index
    2  // column index
);
// Alternative method
String value = ExcelHelper.readCell(
    "data/employees.xlsx", 
    "Users", 
    3, // row index
    2  // column index
);
```

### Writing Excel Data

```java
// Create a list of data to write
List<Map<String, String>> employeeData = new ArrayList<>();
Map<String, String> employee1 = new HashMap<>();
employee1.put("ID", "1001");
employee1.put("Name", "John Doe");
employee1.put("Email", "john@example.com");
employee1.put("Department", "Engineering");
employeeData.add(employee1);

// Write data to Excel file
ExcelHelper.setExcelData(
    "data/employees.xlsx", 
    "Users", 
    employeeData
);

// Append rows to existing data
ExcelHelper.appendData(
    "data/employees.xlsx", 
    "Users", 
    newEmployeeData
);

// Write to a specific cell
ExcelHelper.writeCell(
    "data/employees.xlsx", 
    "Users", 
    3, // row index
    2, // column index
    "new.email@example.com"
);
```

## Sheet Management

```java
// Check if a sheet is empty
boolean isEmpty = ExcelHelper.isSheetEmpty(
    "data/workbook.xlsx", 
    "NewSheet"
);

// Create a new sheet
ExcelHelper.createSheet(
    "data/workbook.xlsx", 
    "NewSheet"
);
```

## Data Manipulation

### Modifying Data

```java
// Replace all occurrences of a value in a column
ExcelHelper.replaceColumnData(
    "data/employees.xlsx", 
    "Users", 
    "Department", // column name
    "Engineering", // old value
    "Software Engineering" // new value
);

// Delete a row
ExcelHelper.deleteRow(
    "data/employees.xlsx", 
    "Users", 
    5 // row index
);

// Delete a column
ExcelHelper.deleteColumn(
    "data/employees.xlsx", 
    "Users", 
    3 // column index
);
```

### Filtering and Sorting

```java
// Filter rows based on a column value
List<Row> filteredRows = ExcelHelper.filterRows(
    "data/employees.xlsx", 
    "Users", 
    2, // column index
    "HR" // filter value
);

// Sort rows by a column
ExcelHelper.sortRows(
    "data/employees.xlsx", 
    "Users", 
    3, // column index
    true // ascending order
);
```

## File Operations

```java
// Merge multiple Excel files
List<String> filesToMerge = Arrays.asList(
    "data/team1.xlsx",
    "data/team2.xlsx",
    "data/team3.xlsx"
);
ExcelHelper.mergeExcelFiles(
    filesToMerge,
    "data/all_teams.xlsx"
);

// Validate sheet structure (check headers)
List<String> expectedHeaders = Arrays.asList("ID", "Name", "Email", "Department");
boolean isValid = ExcelHelper.validateFileStructure(
    "data/employees.xlsx", 
    "Users", 
    expectedHeaders
);
```

## Cell Value Handling

The `ExcelHelper` automatically handles different cell types (text, numeric, boolean, date, formula) and converts them appropriately when reading from Excel.

```java
// The getCellValueAsString method (used internally) handles:
// - STRING: Returns the string value
// - NUMERIC: Returns the numeric value as string (with special handling for dates)
// - BOOLEAN: Returns "true" or "false"
// - FORMULA: Returns the evaluated result as a string
// - BLANK: Returns an empty string
// - ERROR: Returns an empty string
```

## Error Handling

All methods in the `ExcelHelper` class include robust error handling and logging through the Ellithium reporting system. Operations log their status, making it easy to trace Excel operations during test execution.

```java
// All operations include error handling:
try {
    List<Map<String, String>> data = ExcelHelper.getExcelData(
        "data/missing.xlsx", 
        "Sheet1"
    );
    // If file is missing, logs error: "Failed to read Excel data from file: data/missing.xlsx, sheet: Sheet1"
} catch (Exception e) {
    // Additional exception handling if needed
}
```

## Resource Management

The `ExcelHelper` carefully manages resources, ensuring that workbooks and streams are properly closed after operations to prevent memory leaks and file locking issues. 