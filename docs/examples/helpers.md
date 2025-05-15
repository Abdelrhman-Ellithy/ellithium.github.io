---
sidebar_position: 5
title: Helper Utilities
id: helpers
---

# Helper Utilities Examples

This page provides examples of using the various helper utilities in the Ellithium framework. These examples demonstrate how to work with different file formats and perform common utility operations.

## Helper Test Structure

The helper utility test structure in Ellithium is organized as follows:

```
src/test/java/
└── Helpers/
    ├── JsonHelperTests.java      # Tests for JSON utilities
    ├── ExcelHelperTests.java     # Tests for Excel operations
    ├── CSVHelperTests.java       # Tests for CSV file handling
    ├── TextHelperTests.java      # Tests for text file operations
    ├── PDFHelperTests.java       # Tests for PDF document handling
    ├── PropertyHelperTests.java  # Tests for properties file management
    └── JarExtractorTests.java    # Tests for JAR extraction
```

## JSON Helper Examples

Here's an example of using the JsonHelper to manipulate JSON data:

```java
package Helpers;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.Utilities.helpers.JsonHelper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.testng.annotations.Test;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsonHelperTests {

    @Test
    public void testCreateAndReadJsonFile() {
        // Create a JSON object to write to file
        JSONObject user = new JSONObject();
        user.put("firstName", "John");
        user.put("lastName", "Doe");
        user.put("age", 30);
        
        JSONObject address = new JSONObject();
        address.put("street", "123 Main St");
        address.put("city", "Anytown");
        address.put("state", "CA");
        address.put("postalCode", "12345");
        
        user.put("address", address);
        
        JSONArray phoneNumbers = new JSONArray();
        phoneNumbers.put(new JSONObject().put("type", "home").put("number", "555-1234"));
        phoneNumbers.put(new JSONObject().put("type", "work").put("number", "555-5678"));
        
        user.put("phoneNumbers", phoneNumbers);
        
        // Write to file
        String filePath = Paths.get(System.getProperty("user.dir"), "target", "test-output", "user.json").toString();
        JsonHelper.writeJsonToFile(user.toString(), filePath);
        
        // Read from file
        String jsonContent = JsonHelper.readFromJsonFile(filePath);
        
        // Validate content
        AssertionExecutor.hard.assertNotNull(jsonContent, "JSON content should not be null");
        AssertionExecutor.hard.assertTrue(jsonContent.contains("John"), "JSON content should contain firstName");
        
        // Get values from the JSON
        String firstName = JsonHelper.getJsonKeyValue(jsonContent, "firstName");
        AssertionExecutor.hard.assertEquals(firstName, "John", "First name should match");
        
        // Get nested value
        String city = JsonHelper.getJsonNestedKeyValue(jsonContent, "address", "city");
        AssertionExecutor.hard.assertEquals(city, "Anytown", "City should match");
        
        // Get array value
        String workNumber = JsonHelper.getJsonArrayValue(jsonContent, "phoneNumbers", 1, "number");
        AssertionExecutor.hard.assertEquals(workNumber, "555-5678", "Work phone number should match");
    }
    
    @Test
    public void testJsonManipulation() {
        // Create a base JSON
        JSONObject product = new JSONObject();
        product.put("id", 1001);
        product.put("name", "Laptop");
        product.put("price", 999.99);
        product.put("inStock", true);
        
        // Convert to string
        String jsonString = product.toString();
        
        // Update values
        jsonString = JsonHelper.updateJsonValue(jsonString, "price", 899.99);
        jsonString = JsonHelper.updateJsonValue(jsonString, "inStock", false);
        
        // Add new key-value pairs
        jsonString = JsonHelper.updateJsonValue(jsonString, "discount", 10.0);
        jsonString = JsonHelper.updateJsonValue(jsonString, "description", "High-performance laptop");
        
        // Verify updates
        AssertionExecutor.hard.assertEquals(JsonHelper.getJsonKeyValue(jsonString, "price"), "899.99");
        AssertionExecutor.hard.assertEquals(JsonHelper.getJsonKeyValue(jsonString, "inStock"), "false");
        AssertionExecutor.hard.assertEquals(JsonHelper.getJsonKeyValue(jsonString, "discount"), "10.0");
        
        // Add nested object
        Map<String, Object> specs = new HashMap<>();
        specs.put("processor", "Intel i7");
        specs.put("memory", "16GB");
        specs.put("storage", "512GB SSD");
        
        jsonString = JsonHelper.addNestedJsonObject(jsonString, "specifications", specs);
        
        // Verify nested object
        String processor = JsonHelper.getJsonNestedKeyValue(jsonString, "specifications", "processor");
        AssertionExecutor.hard.assertEquals(processor, "Intel i7", "Processor spec should match");
    }
    
    @Test
    public void testJsonArrayOperations() {
        // Create a JSON with an array
        JSONObject catalog = new JSONObject();
        catalog.put("store", "Electronics Shop");
        
        JSONArray products = new JSONArray();
        products.put(new JSONObject().put("id", 1).put("name", "TV").put("price", 799.99));
        products.put(new JSONObject().put("id", 2).put("name", "Laptop").put("price", 1299.99));
        
        catalog.put("products", products);
        
        String jsonString = catalog.toString();
        
        // Add item to array
        JSONObject newProduct = new JSONObject();
        newProduct.put("id", 3);
        newProduct.put("name", "Smartphone");
        newProduct.put("price", 699.99);
        
        jsonString = JsonHelper.addItemToJsonArray(jsonString, "products", newProduct);
        
        // Verify array size
        JSONObject updatedJson = new JSONObject(jsonString);
        JSONArray updatedProducts = updatedJson.getJSONArray("products");
        
        AssertionExecutor.hard.assertEquals(updatedProducts.length(), 3, "Array should have 3 items");
        
        // Update item in array
        jsonString = JsonHelper.updateJsonArrayItem(
            jsonString, 
            "products", 
            0, 
            "price", 
            749.99
        );
        
        // Verify update
        String updatedPrice = JsonHelper.getJsonArrayValue(jsonString, "products", 0, "price");
        AssertionExecutor.hard.assertEquals(updatedPrice, "749.99", "Updated price should match");
        
        // Extract array to list
        List<String> productNames = JsonHelper.getJsonArrayValuesList(jsonString, "products", "name");
        AssertionExecutor.hard.assertEquals(productNames.size(), 3, "Should extract 3 product names");
        AssertionExecutor.hard.assertTrue(productNames.contains("Laptop"), "Product list should contain Laptop");
        AssertionExecutor.hard.assertTrue(productNames.contains("Smartphone"), "Product list should contain Smartphone");
    }
    
    @Test
    public void testJsonValidation() {
        // Valid JSON
        String validJson = "{\"name\":\"John\",\"age\":30}";
        AssertionExecutor.hard.assertTrue(JsonHelper.isValidJson(validJson), "Should be valid JSON");
        
        // Invalid JSON
        String invalidJson = "{name:John,age:30}";  // Missing quotes
        AssertionExecutor.hard.assertFalse(JsonHelper.isValidJson(invalidJson), "Should be invalid JSON");
        
        // Valid JSON with specific key
        String userJson = "{\"firstName\":\"John\",\"lastName\":\"Doe\"}";
        AssertionExecutor.hard.assertTrue(
            JsonHelper.hasJsonKey(userJson, "firstName"), 
            "JSON should have firstName key"
        );
        
        AssertionExecutor.hard.assertFalse(
            JsonHelper.hasJsonKey(userJson, "age"), 
            "JSON should not have age key"
        );
    }
}
```

## Excel Helper Examples

Here's an example demonstrating ExcelHelper functionality:

```java
package Helpers;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.Utilities.helpers.ExcelHelper;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExcelHelperTests {
    private String excelFilePath;

    @BeforeClass
    public void setUp() {
        // Create path for test Excel file
        excelFilePath = Paths.get(System.getProperty("user.dir"), "target", "test-output", "test-data.xlsx").toString();
        
        // Create a new Excel file
        ExcelHelper.createNewExcelFile(excelFilePath);
    }

    @Test(priority = 1)
    public void testCreateSheet() {
        // Create sheets in the Excel file
        ExcelHelper.createSheet(excelFilePath, "Users");
        ExcelHelper.createSheet(excelFilePath, "Products");
        
        // Get sheet names and verify
        List<String> sheetNames = ExcelHelper.getSheetNames(excelFilePath);
        AssertionExecutor.hard.assertTrue(sheetNames.contains("Users"), "Excel should contain Users sheet");
        AssertionExecutor.hard.assertTrue(sheetNames.contains("Products"), "Excel should contain Products sheet");
    }

    @Test(priority = 2)
    public void testWriteAndReadData() {
        // Create headers
        String[] headers = {"ID", "First Name", "Last Name", "Email", "Age"};
        ExcelHelper.writeDataInExcel(excelFilePath, "Users", 0, 0, headers);
        
        // Write data rows
        Object[][] userData = {
            {1, "John", "Doe", "john@example.com", 30},
            {2, "Jane", "Smith", "jane@example.com", 28},
            {3, "Bob", "Johnson", "bob@example.com", 35}
        };
        
        for (int i = 0; i < userData.length; i++) {
            ExcelHelper.writeDataInExcel(excelFilePath, "Users", i + 1, 0, userData[i]);
        }
        
        // Read cell value
        String firstName = ExcelHelper.getCellValue(excelFilePath, "Users", 1, 1);
        AssertionExecutor.hard.assertEquals(firstName, "John", "First name should match");
        
        // Read row as map
        Map<String, String> userRow = ExcelHelper.getRowDataAsMap(excelFilePath, "Users", 2, 0, headers.length);
        AssertionExecutor.hard.assertEquals(userRow.get("First Name"), "Jane", "Map should contain correct first name");
        AssertionExecutor.hard.assertEquals(userRow.get("Email"), "jane@example.com", "Map should contain correct email");
        
        // Read entire sheet data
        List<Map<String, String>> allUsers = ExcelHelper.getSheetDataAsListOfMaps(excelFilePath, "Users");
        AssertionExecutor.hard.assertEquals(allUsers.size(), 3, "Should read 3 data rows");
        AssertionExecutor.hard.assertEquals(allUsers.get(2).get("Last Name"), "Johnson", "Third row should have correct last name");
    }

    @Test(priority = 3)
    public void testUpdateData() {
        // Update a cell
        ExcelHelper.updateCellValue(excelFilePath, "Users", 1, 4, 31);  // Update John's age
        
        // Verify update
        String updatedAge = ExcelHelper.getCellValue(excelFilePath, "Users", 1, 4);
        AssertionExecutor.hard.assertEquals(updatedAge, "31", "Age should be updated");
        
        // Add a new row
        Object[] newUser = {4, "Alice", "Williams", "alice@example.com", 25};
        ExcelHelper.writeDataInExcel(excelFilePath, "Users", 4, 0, newUser);
        
        // Verify row count
        int rowCount = ExcelHelper.getRowCount(excelFilePath, "Users");
        AssertionExecutor.hard.assertEquals(rowCount, 5, "Should have 5 rows including header");
    }

    @Test(priority = 4)
    public void testFormulasAndStyles() {
        // Create a new sheet for this test
        ExcelHelper.createSheet(excelFilePath, "Finances");
        
        // Add headers
        String[] headers = {"Item", "Quantity", "Price", "Total"};
        ExcelHelper.writeDataInExcel(excelFilePath, "Finances", 0, 0, headers);
        
        // Add data
        Object[][] items = {
            {"Laptop", 2, 1200.0, null},
            {"Monitor", 3, 300.0, null},
            {"Keyboard", 5, 80.0, null}
        };
        
        for (int i = 0; i < items.length; i++) {
            ExcelHelper.writeDataInExcel(excelFilePath, "Finances", i + 1, 0, items[i]);
        }
        
        // Add formulas for total column (Price * Quantity)
        for (int i = 1; i <= items.length; i++) {
            ExcelHelper.setCellFormula(excelFilePath, "Finances", i, 3, "B" + (i+1) + "*C" + (i+1));
        }
        
        // Add sum formula
        ExcelHelper.setCellFormula(excelFilePath, "Finances", items.length + 1, 3, "SUM(D2:D" + (items.length+1) + ")");
        ExcelHelper.writeDataInExcel(excelFilePath, "Finances", items.length + 1, 0, new Object[]{"Total", "", ""});
        
        // Apply styles
        ExcelHelper.applyCellBackground(excelFilePath, "Finances", 0, 0, headers.length, "LIGHT_BLUE");
        ExcelHelper.applyCellBackground(excelFilePath, "Finances", items.length + 1, 0, headers.length, "LIGHT_YELLOW");
    }

    @AfterClass
    public void tearDown() {
        // No need to delete the file, it will be useful for manual inspection
    }
}
```

## CSV Helper Examples

Here's an example for CSVHelper:

```java
package Helpers;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.Utilities.helpers.CSVHelper;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CSVHelperTests {
    private String csvFilePath;

    @BeforeClass
    public void setUp() {
        // Create path for test CSV file
        csvFilePath = Paths.get(System.getProperty("user.dir"), "target", "test-output", "test-data.csv").toString();
    }

    @Test(priority = 1)
    public void testWriteAndReadCSV() {
        // Create data with headers
        String[] headers = {"ID", "Name", "Email", "Department", "Salary"};
        List<String[]> data = new ArrayList<>();
        data.add(headers);
        data.add(new String[]{"1", "John Doe", "john@example.com", "Engineering", "85000"});
        data.add(new String[]{"2", "Jane Smith", "jane@example.com", "Marketing", "75000"});
        data.add(new String[]{"3", "Bob Johnson", "bob@example.com", "Finance", "90000"});
        
        // Write to CSV
        CSVHelper.writeCSV(csvFilePath, data);
        
        // Read from CSV
        List<String[]> readData = CSVHelper.readCSV(csvFilePath);
        
        // Verify data
        AssertionExecutor.hard.assertEquals(readData.size(), 4, "CSV should have 4 rows including header");
        AssertionExecutor.hard.assertEquals(readData.get(1)[1], "John Doe", "First data row should have correct name");
        AssertionExecutor.hard.assertEquals(readData.get(2)[3], "Marketing", "Second data row should have correct department");
    }

    @Test(priority = 2)
    public void testReadCSVAsMap() {
        // Read CSV as a list of maps (each row is a map of column name to value)
        List<Map<String, String>> dataAsMap = CSVHelper.readCSVAsMap(csvFilePath);
        
        // Verify data
        AssertionExecutor.hard.assertEquals(dataAsMap.size(), 3, "Should have 3 data rows as maps");
        
        Map<String, String> firstRow = dataAsMap.get(0);
        AssertionExecutor.hard.assertEquals(firstRow.get("Name"), "John Doe", "First row should have correct name");
        AssertionExecutor.hard.assertEquals(firstRow.get("Salary"), "85000", "First row should have correct salary");
        
        Map<String, String> thirdRow = dataAsMap.get(2);
        AssertionExecutor.hard.assertEquals(thirdRow.get("Department"), "Finance", "Third row should have correct department");
    }

    @Test(priority = 3)
    public void testAppendToCSV() {
        // Append new rows to the CSV
        List<String[]> newData = new ArrayList<>();
        newData.add(new String[]{"4", "Alice Williams", "alice@example.com", "HR", "70000"});
        newData.add(new String[]{"5", "Charlie Brown", "charlie@example.com", "Engineering", "82000"});
        
        CSVHelper.appendToCSV(csvFilePath, newData);
        
        // Read the updated CSV
        List<String[]> updatedData = CSVHelper.readCSV(csvFilePath);
        
        // Verify data
        AssertionExecutor.hard.assertEquals(updatedData.size(), 6, "CSV should now have 6 rows including header");
        AssertionExecutor.hard.assertEquals(updatedData.get(4)[1], "Alice Williams", "New row should have correct name");
        AssertionExecutor.hard.assertEquals(updatedData.get(5)[3], "Engineering", "New row should have correct department");
    }

    @Test(priority = 4)
    public void testFilterCSV() {
        // Filter rows where Department is "Engineering"
        List<Map<String, String>> engineers = CSVHelper.filterCSVByColumn(csvFilePath, "Department", "Engineering");
        
        // Verify filtered data
        AssertionExecutor.hard.assertEquals(engineers.size(), 2, "Should find 2 engineers");
        
        boolean foundJohn = false;
        boolean foundCharlie = false;
        
        for (Map<String, String> row : engineers) {
            if (row.get("Name").equals("John Doe")) foundJohn = true;
            if (row.get("Name").equals("Charlie Brown")) foundCharlie = true;
        }
        
        AssertionExecutor.hard.assertTrue(foundJohn && foundCharlie, "Should find both John and Charlie as engineers");
    }

    @Test(priority = 5)
    public void testUpdateCSV() {
        // Update a specific cell (increase John's salary)
        CSVHelper.updateCSVCell(csvFilePath, 1, 4, "90000");
        
        // Read the updated CSV as map
        List<Map<String, String>> updatedData = CSVHelper.readCSVAsMap(csvFilePath);
        
        // Verify update
        AssertionExecutor.hard.assertEquals(updatedData.get(0).get("Salary"), "90000", "John's salary should be updated");
    }

    @AfterClass
    public void tearDown() {
        // No cleanup needed
    }
}
```

## Key Features Demonstrated

These examples showcase several key helper utility features in Ellithium:

1. **File Manipulation**: Reading, writing, and updating various file formats
2. **Data Transformation**: Converting between different data structures and formats
3. **Error Handling**: Robust error management for file operations
4. **Formula Support**: Working with advanced features like Excel formulas
5. **Validation**: Validating file content and structure
6. **Cross-Platform Compatibility**: Working consistently across different operating systems
7. **Performance Optimization**: Efficient handling of large data sets

The Ellithium framework provides a rich set of utilities for working with:

- JSON data
- Excel spreadsheets
- CSV files
- Text files
- PDF documents
- Properties files
- JAR files
- Operating system commands

For more helper utility examples, check out the complete [source code](https://github.com/Abdelrhman-Ellithy/Ellithium/tree/main/src/test/java/Helpers) of the Ellithium project. 