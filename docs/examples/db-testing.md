---
sidebar_position: 3
title: Database Testing
id: db-testing
---

# Database Testing Examples

This page provides examples of database testing using the Ellithium framework. These examples demonstrate how to interact with databases and validate their content.

## Database Test Structure

The database test structure in Ellithium is organized as follows:

```
src/test/java/
└── DB/
    ├── SQLiteDBTest.java          # Basic SQLite database tests
    ├── SQLiteDBAdvancedTest.java  # Advanced SQLite database operations
    ├── SQLiteDBEdgeCasesTest.java # Edge case handling
    ├── MongoTest.java            # MongoDB tests
    ├── CouchbaseTest.java        # Couchbase tests
    └── RedisTest.java            # Redis tests
```

## Basic SQLite Tests Example

Here's an example of basic SQLite database operations:

```java
package DB;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.Utilities.helpers.JsonHelper;
import Ellithium.core.database.SQLDatabaseProvider;
import Ellithium.core.database.SQLDBType;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.nio.file.Paths;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SQLiteDBTest {
    private SQLDatabaseProvider databaseProvider;
    private String dbPath;

    @BeforeClass
    public void setUp() {
        // Create path to test database
        dbPath = Paths.get(System.getProperty("user.dir"), "src", "test", "resources", "sample.db").toString();
        
        // Initialize database provider
        databaseProvider = new SQLDatabaseProvider(SQLDBType.SQLITE, dbPath);
        
        // Create test tables
        createTables();
        
        // Insert sample data
        insertSampleData();
    }

    private void createTables() {
        // Create users table
        String createUsersTable = "CREATE TABLE IF NOT EXISTS users (\n"
                + "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                + "    username TEXT NOT NULL UNIQUE,\n"
                + "    email TEXT NOT NULL,\n"
                + "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n"
                + ");";
        
        // Create products table
        String createProductsTable = "CREATE TABLE IF NOT EXISTS products (\n"
                + "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                + "    name TEXT NOT NULL,\n"
                + "    price REAL NOT NULL,\n"
                + "    category TEXT NOT NULL\n"
                + ");";
        
        // Execute create table statements
        databaseProvider.executeUpdate(createUsersTable);
        databaseProvider.executeUpdate(createProductsTable);
    }

    private void insertSampleData() {
        // Clear existing data
        databaseProvider.executeUpdate("DELETE FROM users");
        databaseProvider.executeUpdate("DELETE FROM products");
        
        // Insert users
        databaseProvider.executeUpdate(
            "INSERT INTO users (username, email) VALUES (?, ?), (?, ?), (?, ?)",
            "john_doe", "john@example.com",
            "jane_smith", "jane@example.com",
            "bob_jackson", "bob@example.com"
        );
        
        // Insert products
        databaseProvider.executeUpdate(
            "INSERT INTO products (name, price, category) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)",
            "Laptop", 1299.99, "Electronics",
            "Smartphone", 799.99, "Electronics",
            "Coffee Maker", 59.99, "Kitchen"
        );
    }

    @Test
    public void testQuerySingleValue() {
        // Query total count of users
        Integer userCount = databaseProvider.querySingleValue("SELECT COUNT(*) FROM users", Integer.class);
        
        // Verify count
        AssertionExecutor.hard.assertEquals(userCount, 3, "There should be 3 users in the database");
    }

    @Test
    public void testQueryForObject() {
        // Query a single user as a Map
        Map<String, Object> user = databaseProvider.queryForObject(
            "SELECT * FROM users WHERE username = ?", 
            "john_doe"
        );
        
        // Verify user data
        AssertionExecutor.hard.assertNotNull(user, "User should be found");
        AssertionExecutor.hard.assertEquals(user.get("username"), "john_doe");
        AssertionExecutor.hard.assertEquals(user.get("email"), "john@example.com");
    }

    @Test
    public void testQueryForList() {
        // Query all products in Electronics category
        List<Map<String, Object>> products = databaseProvider.queryForList(
            "SELECT * FROM products WHERE category = ? ORDER BY price DESC", 
            "Electronics"
        );
        
        // Verify results
        AssertionExecutor.hard.assertEquals(products.size(), 2, "Should find 2 products in Electronics category");
        AssertionExecutor.hard.assertEquals(products.get(0).get("name"), "Laptop");
        AssertionExecutor.hard.assertEquals(products.get(1).get("name"), "Smartphone");
    }

    @Test
    public void testInsertAndUpdate() {
        // Insert a new product
        int rowsAffected = databaseProvider.executeUpdate(
            "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
            "Headphones", 149.99, "Electronics"
        );
        
        // Verify insertion
        AssertionExecutor.hard.assertEquals(rowsAffected, 1, "One row should be inserted");
        
        // Update the product
        rowsAffected = databaseProvider.executeUpdate(
            "UPDATE products SET price = ? WHERE name = ?",
            129.99, "Headphones"
        );
        
        // Verify update
        AssertionExecutor.hard.assertEquals(rowsAffected, 1, "One row should be updated");
        
        // Verify the updated value
        Double price = databaseProvider.querySingleValue(
            "SELECT price FROM products WHERE name = ?", 
            Double.class,
            "Headphones"
        );
        
        AssertionExecutor.hard.assertEquals(price, 129.99, "Price should be updated correctly");
    }

    @Test
    public void testBatchOperations() {
        // Prepare batch data
        List<Object[]> batch = new ArrayList<>();
        batch.add(new Object[]{"Book", 29.99, "Media"});
        batch.add(new Object[]{"Tablet", 499.99, "Electronics"});
        batch.add(new Object[]{"Monitor", 349.99, "Electronics"});
        
        // Execute batch insert
        int[] rowsAffected = databaseProvider.executeBatch(
            "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
            batch
        );
        
        // Verify all rows were inserted
        AssertionExecutor.hard.assertEquals(rowsAffected.length, 3, "Three batch operations should be executed");
        for (int count : rowsAffected) {
            AssertionExecutor.hard.assertEquals(count, 1, "Each operation should affect 1 row");
        }
        
        // Count products in Electronics category
        Integer count = databaseProvider.querySingleValue(
            "SELECT COUNT(*) FROM products WHERE category = ?", 
            Integer.class,
            "Electronics"
        );
        
        AssertionExecutor.hard.assertEquals(count, 4, "After batch insert, should have 4 Electronics products");
    }

    @Test
    public void testTransactions() {
        // Start a transaction
        databaseProvider.beginTransaction();
        
        try {
            // Insert a new user
            databaseProvider.executeUpdate(
                "INSERT INTO users (username, email) VALUES (?, ?)",
                "alice_wonder", "alice@example.com"
            );
            
            // Update an existing user
            databaseProvider.executeUpdate(
                "UPDATE users SET email = ? WHERE username = ?",
                "john.doe@company.com", "john_doe"
            );
            
            // Commit the transaction
            databaseProvider.commitTransaction();
        } catch (Exception e) {
            // Rollback on error
            databaseProvider.rollbackTransaction();
            throw e;
        }
        
        // Verify both operations were successful
        String johnEmail = databaseProvider.querySingleValue(
            "SELECT email FROM users WHERE username = ?", 
            String.class,
            "john_doe"
        );
        
        Integer aliceCount = databaseProvider.querySingleValue(
            "SELECT COUNT(*) FROM users WHERE username = ?", 
            Integer.class,
            "alice_wonder"
        );
        
        AssertionExecutor.hard.assertEquals(johnEmail, "john.doe@company.com", "Email should be updated in transaction");
        AssertionExecutor.hard.assertEquals(aliceCount, 1, "New user should be added in transaction");
    }

    @AfterClass
    public void tearDown() {
        // Close the database connection
        if (databaseProvider != null) {
            databaseProvider.close();
        }
    }
}
```

## Advanced Database Operations

Here's an example of more advanced database operations:

```java
package DB;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.core.database.SQLDatabaseProvider;
import Ellithium.core.database.SQLDBType;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.nio.file.Paths;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public class SQLiteDBAdvancedTest {
    private SQLDatabaseProvider databaseProvider;
    private String dbPath;

    @BeforeClass
    public void setUp() {
        // Create path to test database
        dbPath = Paths.get(System.getProperty("user.dir"), "src", "test", "resources", "advanced.db").toString();
        
        // Initialize database provider
        databaseProvider = new SQLDatabaseProvider(SQLDBType.SQLITE, dbPath);
        
        // Create complex schema
        setupComplexSchema();
    }

    private void setupComplexSchema() {
        // Drop tables if they exist
        String[] dropTables = {
            "DROP TABLE IF EXISTS order_items",
            "DROP TABLE IF EXISTS orders",
            "DROP TABLE IF EXISTS products",
            "DROP TABLE IF EXISTS customers"
        };
        
        for (String sql : dropTables) {
            databaseProvider.executeUpdate(sql);
        }
        
        // Create tables
        String createCustomers = "CREATE TABLE customers (\n"
                + "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                + "    name TEXT NOT NULL,\n"
                + "    email TEXT NOT NULL UNIQUE,\n"
                + "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n"
                + ");";
        
        String createProducts = "CREATE TABLE products (\n"
                + "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                + "    name TEXT NOT NULL,\n"
                + "    price REAL NOT NULL,\n"
                + "    inventory INTEGER NOT NULL DEFAULT 0\n"
                + ");";
        
        String createOrders = "CREATE TABLE orders (\n"
                + "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                + "    customer_id INTEGER NOT NULL,\n"
                + "    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n"
                + "    status TEXT NOT NULL DEFAULT 'pending',\n"
                + "    FOREIGN KEY (customer_id) REFERENCES customers (id)\n"
                + ");";
        
        String createOrderItems = "CREATE TABLE order_items (\n"
                + "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                + "    order_id INTEGER NOT NULL,\n"
                + "    product_id INTEGER NOT NULL,\n"
                + "    quantity INTEGER NOT NULL,\n"
                + "    price REAL NOT NULL,\n"
                + "    FOREIGN KEY (order_id) REFERENCES orders (id),\n"
                + "    FOREIGN KEY (product_id) REFERENCES products (id)\n"
                + ");";
        
        // Execute create statements
        databaseProvider.executeUpdate(createCustomers);
        databaseProvider.executeUpdate(createProducts);
        databaseProvider.executeUpdate(createOrders);
        databaseProvider.executeUpdate(createOrderItems);
        
        // Insert sample data
        insertSampleData();
    }

    private void insertSampleData() {
        // Insert customers
        databaseProvider.executeUpdate(
            "INSERT INTO customers (name, email) VALUES (?, ?), (?, ?), (?, ?)",
            "John Smith", "john@example.com",
            "Alice Johnson", "alice@example.com",
            "Robert Brown", "robert@example.com"
        );
        
        // Insert products
        databaseProvider.executeUpdate(
            "INSERT INTO products (name, price, inventory) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)",
            "Laptop", 1299.99, 10,
            "Smartphone", 799.99, 15,
            "Tablet", 499.99, 8,
            "Headphones", 159.99, 20
        );
        
        // Insert orders
        databaseProvider.executeUpdate(
            "INSERT INTO orders (customer_id, status) VALUES (?, ?), (?, ?), (?, ?)",
            1, "completed",
            2, "processing",
            3, "completed"
        );
        
        // Insert order items
        databaseProvider.executeUpdate(
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)",
            1, 1, 1, 1299.99,
            1, 4, 1, 159.99,
            2, 2, 1, 799.99,
            3, 3, 2, 499.99
        );
    }

    @Test
    public void testComplexQuery() {
        // Create a complex query with joins
        String sql = "SELECT c.name as customer_name, p.name as product_name, oi.quantity, oi.price, o.status " +
                "FROM customers c " +
                "JOIN orders o ON c.id = o.customer_id " +
                "JOIN order_items oi ON o.id = oi.order_id " +
                "JOIN products p ON oi.product_id = p.id " +
                "WHERE o.status = ? " +
                "ORDER BY c.name, p.name";
        
        // Execute query for completed orders
        List<Map<String, Object>> completedOrders = databaseProvider.queryForList(sql, "completed");
        
        // Verify results
        AssertionExecutor.hard.assertTrue(completedOrders.size() >= 3, "Should find at least 3 items in completed orders");
        
        // Verify specific order details
        boolean foundJohnLaptop = false;
        
        for (Map<String, Object> order : completedOrders) {
            if ("John Smith".equals(order.get("customer_name")) && 
                "Laptop".equals(order.get("product_name"))) {
                foundJohnLaptop = true;
                AssertionExecutor.hard.assertEquals(order.get("quantity"), 1);
                AssertionExecutor.hard.assertEquals(((Number)order.get("price")).doubleValue(), 1299.99);
            }
        }
        
        AssertionExecutor.hard.assertTrue(foundJohnLaptop, "Should find John's laptop order");
    }

    @Test
    public void testAggregateQueries() {
        // Test aggregate functions
        String totalSalesQuery = "SELECT SUM(oi.quantity * oi.price) as total_sales " +
                "FROM order_items oi " +
                "JOIN orders o ON oi.order_id = o.id " +
                "WHERE o.status = ?";
        
        Double totalSales = databaseProvider.querySingleValue(totalSalesQuery, Double.class, "completed");
        AssertionExecutor.hard.assertNotNull(totalSales, "Total sales should not be null");
        
        // Test group by query
        String salesByProductQuery = "SELECT p.name, SUM(oi.quantity) as total_quantity, " +
                "SUM(oi.quantity * oi.price) as total_sales " +
                "FROM products p " +
                "JOIN order_items oi ON p.id = oi.product_id " +
                "GROUP BY p.id " +
                "ORDER BY total_sales DESC";
        
        List<Map<String, Object>> salesByProduct = databaseProvider.queryForList(salesByProductQuery);
        
        // Verify product sales ranking
        AssertionExecutor.hard.assertTrue(salesByProduct.size() >= 3, "Should have sales data for at least 3 products");
        AssertionExecutor.hard.assertEquals(salesByProduct.get(0).get("name"), "Laptop", "Laptop should have highest sales");
    }

    @Test
    public void testTransactionRollback() {
        // Get initial inventory
        Integer initialInventory = databaseProvider.querySingleValue(
            "SELECT inventory FROM products WHERE id = 1", 
            Integer.class
        );
        
        // Start transaction
        databaseProvider.beginTransaction();
        
        try {
            // Update inventory
            databaseProvider.executeUpdate(
                "UPDATE products SET inventory = inventory - 5 WHERE id = 1"
            );
            
            // Create an order
            int orderId = databaseProvider.executeUpdateAndReturnKey(
                "INSERT INTO orders (customer_id, status) VALUES (?, ?)",
                1, "processing"
            );
            
            // Add order item
            databaseProvider.executeUpdate(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                orderId, 1, 5, 1299.99
            );
            
            // Intentionally trigger an error
            databaseProvider.executeUpdate(
                "INSERT INTO customers (name, email) VALUES (?, ?)",
                "Duplicate Email", "john@example.com"  // Duplicate email will violate constraint
            );
            
            // This should not be reached due to the exception
            databaseProvider.commitTransaction();
        } catch (Exception e) {
            // Rollback transaction
            databaseProvider.rollbackTransaction();
        }
        
        // Verify inventory was not changed due to rollback
        Integer currentInventory = databaseProvider.querySingleValue(
            "SELECT inventory FROM products WHERE id = 1", 
            Integer.class
        );
        
        AssertionExecutor.hard.assertEquals(currentInventory, initialInventory, 
            "Inventory should remain unchanged after transaction rollback");
    }

    @AfterClass
    public void tearDown() {
        // Close the database connection
        if (databaseProvider != null) {
            databaseProvider.close();
        }
    }
}
```

## Key Features Demonstrated

These examples showcase several key database testing features in Ellithium:

1. **Database Provider**: Using the `SQLDatabaseProvider` to connect to different types of databases
2. **CRUD Operations**: Performing Create, Read, Update, and Delete operations
3. **Transaction Management**: Managing database transactions with commit and rollback
4. **Batch Operations**: Executing batch operations for better performance
5. **Complex Queries**: Working with joins, aggregates, and complex SQL queries
6. **Result Mapping**: Automatically mapping database results to Java objects and collections
7. **Parameterized Statements**: Using parameterized statements to prevent SQL injection
8. **Error Handling**: Proper error handling and transaction rollback on failure

Ellithium supports a variety of database types, including:

- SQLite (shown in examples)
- MySQL
- SQL Server
- PostgreSQL
- Oracle
- IBM DB2
- MongoDB
- Couchbase
- Redis

For more database testing examples, including NoSQL databases, check out the complete [source code](https://github.com/Abdelrhman-Ellithy/Ellithium/tree/main/src/test/java/DB) of the Ellithium project.

## MongoDB Tests Example

Here's an example of MongoDB database operations with caching:

```java
package DB;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.core.DB.MongoDatabaseProvider;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.bson.Document;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;

public class MongoTest {
    private MongoDatabaseProvider mongoProvider;
    private static final String DB_NAME = "test_db";
    private static final String COLLECTION_NAME = "users";

    @BeforeClass
    public void setUp() {
        // Initialize MongoDB provider with caching
        mongoProvider = new MongoDatabaseProvider(
            "mongodb://localhost:27017",
            DB_NAME,
            30,  // Cache TTL in minutes
            1000 // Maximum cache size
        );

        // Create test collection and indexes
        mongoProvider.createIndex(COLLECTION_NAME, "email", true);
        mongoProvider.createIndex(COLLECTION_NAME, "age", false);

        // Insert test data
        insertTestData();
    }

    private void insertTestData() {
        // Clear existing data
        mongoProvider.deleteDocument(COLLECTION_NAME, "user1");
        mongoProvider.deleteDocument(COLLECTION_NAME, "user2");

        // Insert test users
        Document user1 = new Document("_id", "user1")
            .append("name", "John Doe")
            .append("email", "john@example.com")
            .append("age", 30);

        Document user2 = new Document("_id", "user2")
            .append("name", "Jane Smith")
            .append("email", "jane@example.com")
            .append("age", 25);

        mongoProvider.insertDocument(COLLECTION_NAME, user1);
        mongoProvider.insertDocument(COLLECTION_NAME, user2);
    }

    @Test
    public void testDocumentOperations() {
        // Get document by ID
        Optional<Document> user = mongoProvider.getDocument(COLLECTION_NAME, "user1");
        
        // Verify document exists and has correct data
        AssertionExecutor.hard.assertTrue(user.isPresent(), "User should exist");
        AssertionExecutor.hard.assertEquals(user.get().getString("name"), "John Doe");
        AssertionExecutor.hard.assertEquals(user.get().getString("email"), "john@example.com");
        AssertionExecutor.hard.assertEquals(user.get().getInteger("age"), 30);
    }

    @Test
    public void testUpdateDocument() {
        // Update user age
        Document update = new Document("$set", new Document("age", 31));
        mongoProvider.updateDocument(COLLECTION_NAME, "user1", update);

        // Verify update
        Optional<Document> updatedUser = mongoProvider.getDocument(COLLECTION_NAME, "user1");
        AssertionExecutor.hard.assertTrue(updatedUser.isPresent(), "User should exist after update");
        AssertionExecutor.hard.assertEquals(updatedUser.get().getInteger("age"), 31);
    }

    @Test
    public void testCaching() {
        // Execute query (will be cached)
        Object result1 = mongoProvider.executeQuery("{ find: 'users', filter: { age: { $gt: 25 } } }");
        
        // Execute same query (should use cache)
        Object result2 = mongoProvider.executeQuery("{ find: 'users', filter: { age: { $gt: 25 } } }");
        
        // Clear cache for specific query
        mongoProvider.clearCache("{ find: 'users', filter: { age: { $gt: 25 } } }");
        
        // Clear all caches
        mongoProvider.clearAllCaches();
    }

    @Test
    public void testHealthCheck() {
        // Check database health
        boolean isHealthy = mongoProvider.isHealthy();
        AssertionExecutor.hard.assertTrue(isHealthy, "Database should be healthy");
    }

    @AfterClass
    public void tearDown() {
        // Close connection
        if (mongoProvider != null) {
            mongoProvider.closeConnection();
        }
    }
}
```

## Couchbase Tests Example

Here's an example of Couchbase database operations with caching:

```java
package DB;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.core.DB.CouchbaseDatabaseProvider;
import com.couchbase.client.java.json.JsonObject;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.List;

public class CouchbaseTest {
    private CouchbaseDatabaseProvider couchbaseProvider;
    private static final String BUCKET_NAME = "default";

    @BeforeClass
    public void setUp() {
        // Initialize Couchbase provider with caching
        couchbaseProvider = new CouchbaseDatabaseProvider(
            "couchbase://localhost",
            "username",
            "password",
            BUCKET_NAME,
            30,  // Cache TTL in minutes
            1000 // Maximum cache size
        );

        // Insert test data
        insertTestData();
    }

    private void insertTestData() {
        // Clear existing data
        couchbaseProvider.delete("user::1");
        couchbaseProvider.delete("user::2");

        // Insert test users
        JsonObject user1 = JsonObject.create()
            .put("type", "user")
            .put("name", "John Doe")
            .put("email", "john@example.com")
            .put("age", 30);

        JsonObject user2 = JsonObject.create()
            .put("type", "user")
            .put("name", "Jane Smith")
            .put("email", "jane@example.com")
            .put("age", 25);

        couchbaseProvider.upsertDocument("user::1", user1);
        couchbaseProvider.upsertDocument("user::2", user2);
    }

    @Test
    public void testDocumentOperations() {
        // Get document
        JsonObject user = couchbaseProvider.getDocument("user::1");
        
        // Verify document data
        AssertionExecutor.hard.assertNotNull(user, "User should exist");
        AssertionExecutor.hard.assertEquals(user.getString("name"), "John Doe");
        AssertionExecutor.hard.assertEquals(user.getString("email"), "john@example.com");
        AssertionExecutor.hard.assertEquals(user.getInt("age"), 30);
    }

    @Test
    public void testQuery() {
        // Query users
        String query = "SELECT * FROM default WHERE type = 'user' AND age > 25";
        List<JsonObject> users = couchbaseProvider.query(query);
        
        // Verify query results
        AssertionExecutor.hard.assertEquals(users.size(), 1, "Should find one user over 25");
        AssertionExecutor.hard.assertEquals(users.get(0).getString("name"), "John Doe");
    }

    @Test
    public void testCaching() {
        // Execute query (will be cached)
        Object result1 = couchbaseProvider.executeQuery("SELECT * FROM default WHERE type = 'user'");
        
        // Execute same query (should use cache)
        Object result2 = couchbaseProvider.executeQuery("SELECT * FROM default WHERE type = 'user'");
        
        // Clear cache for specific query
        couchbaseProvider.clearCache("SELECT * FROM default WHERE type = 'user'");
        
        // Clear all caches
        couchbaseProvider.clearAllCaches();
    }

    @Test
    public void testHealthCheck() {
        // Check database health
        boolean isHealthy = couchbaseProvider.isHealthy();
        AssertionExecutor.hard.assertTrue(isHealthy, "Database should be healthy");
    }

    @AfterClass
    public void tearDown() {
        // Close connection
        if (couchbaseProvider != null) {
            couchbaseProvider.closeConnection();
        }
    }
}
```

## Redis Tests Example

Here's an example of Redis database operations with caching:

```java
package DB;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.core.DB.RedisDatabaseProvider;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.List;

public class RedisTest {
    private RedisDatabaseProvider redisProvider;

    @BeforeClass
    public void setUp() {
        // Initialize Redis provider with caching
        redisProvider = new RedisDatabaseProvider(
            "redis://localhost:6379",
            30,  // Cache TTL in minutes
            1000 // Maximum cache size
        );

        // Insert test data
        insertTestData();
    }

    private void insertTestData() {
        // Clear existing data
        redisProvider.delete("user:1:name");
        redisProvider.delete("user:1:email");
        redisProvider.delete("user:2:name");
        redisProvider.delete("user:2:email");

        // Insert test users
        redisProvider.set("user:1:name", "John Doe");
        redisProvider.set("user:1:email", "john@example.com");
        redisProvider.set("user:2:name", "Jane Smith");
        redisProvider.set("user:2:email", "jane@example.com");
    }

    @Test
    public void testKeyValueOperations() {
        // Get value
        String name = redisProvider.get("user:1:name");
        
        // Verify value
        AssertionExecutor.hard.assertEquals(name, "John Doe", "Name should match");
        
        // Check if key exists
        boolean exists = redisProvider.exists("user:1:name");
        AssertionExecutor.hard.assertTrue(exists, "Key should exist");
    }

    @Test
    public void testExpiration() {
        // Set key with expiration
        redisProvider.set("temp:key", "value", 60); // 60 seconds
        
        // Verify key exists
        boolean exists = redisProvider.exists("temp:key");
        AssertionExecutor.hard.assertTrue(exists, "Key should exist before expiration");
        
        // Set expiration on existing key
        boolean expired = redisProvider.expire("user:1:name", 3600); // 1 hour
        AssertionExecutor.hard.assertTrue(expired, "Expiration should be set");
    }

    @Test
    public void testListOperations() {
        // Clear list
        redisProvider.delete("recent_users");
        
        // Push items to list
        redisProvider.listPush("recent_users", "user:1");
        redisProvider.listPush("recent_users", "user:2");
        
        // Get list range
        List<String> users = redisProvider.listRange("recent_users", 0, -1);
        
        // Verify list contents
        AssertionExecutor.hard.assertEquals(users.size(), 2, "List should have 2 items");
        AssertionExecutor.hard.assertEquals(users.get(0), "user:2", "First item should be user:2");
        AssertionExecutor.hard.assertEquals(users.get(1), "user:1", "Second item should be user:1");
    }

    @Test
    public void testCaching() {
        // Execute query (will be cached)
        Object result1 = redisProvider.executeQuery("GET user:1:name");
        
        // Execute same query (should use cache)
        Object result2 = redisProvider.executeQuery("GET user:1:name");
        
        // Clear cache for specific query
        redisProvider.clearCache("GET user:1:name");
        
        // Clear all caches
        redisProvider.clearAllCaches();
    }

    @Test
    public void testHealthCheck() {
        // Check database health
        boolean isHealthy = redisProvider.isHealthy();
        AssertionExecutor.hard.assertTrue(isHealthy, "Database should be healthy");
    }

    @AfterClass
    public void tearDown() {
        // Close connection
        if (redisProvider != null) {
            redisProvider.closeConnection();
        }
    }
} 