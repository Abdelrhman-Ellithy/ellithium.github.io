---
sidebar_position: 6
---

# Database Testing

Ellithium provides comprehensive support for both SQL and NoSQL database testing with built-in caching mechanisms for performance optimization.

## Supported Database Types

| SQL Databases | NoSQL Databases |
|--------------|-----------------|
| MySQL        | MongoDB         |
| SQL Server   | Couchbase       |
| PostgreSQL   | Redis           |
| Oracle       |                 |
| IBM DB2      |                 |
| SQLite       |                 |

## SQL Database Testing

### Connecting to SQL Databases

```java
// Connect to MySQL database
SQLDatabaseProvider mysql = new SQLDatabaseProvider(
    SQLDBType.MY_SQL,
    "username",
    "password",
    "localhost",
    3306,
    "test_db"
);

// Connect to SQL Server
SQLDatabaseProvider sqlServer = new SQLDatabaseProvider(
    SQLDBType.SQL_SERVER,
    "username",
    "password",
    "localhost",
    1433,
    "test_db"
);

// Connect to Oracle with SID
SQLDatabaseProvider oracleSid = new SQLDatabaseProvider(
    SQLDBType.ORACLE_SID,
    "username",
    "password",
    "localhost",
    1521,
    "ORCL"
);

// Connect to Oracle with Service Name
SQLDatabaseProvider oracleService = new SQLDatabaseProvider(
    SQLDBType.ORACLE_SERVICE_NAME,
    "username",
    "password",
    "localhost",
    1521,
    "service_name"
);

// Connect to SQLite (file-based)
SQLDatabaseProvider sqlite = new SQLDatabaseProvider(
    SQLDBType.SQLITE,
    "/path/to/sqlite.db"
);
```

### Executing SQL Queries

```java
// Execute SELECT query
ResultSet resultSet = mysql.executeQuery("SELECT * FROM users WHERE status = 'active'");

// Process results
while (resultSet.next()) {
    String username = resultSet.getString("username");
    String email = resultSet.getString("email");
    // Process data
}

// Execute UPDATE/INSERT/DELETE query
int rowsAffected = mysql.executeUpdate("UPDATE users SET status = 'inactive' WHERE last_login < '2023-01-01'");

// Execute stored procedure
ResultSet procResult = mysql.executeStoredProcedure("GetUserDetails", Map.of("userId", 123));
```

### Advanced SQL Operations

```java
// Batch operations
List<String> queries = Arrays.asList(
    "INSERT INTO users (name, email) VALUES ('John', 'john@example.com')",
    "INSERT INTO users (name, email) VALUES ('Jane', 'jane@example.com')"
);
mysql.executeBatch(queries);

// Transaction management
mysql.beginTransaction();
try {
    mysql.executeUpdate("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    mysql.executeUpdate("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    mysql.commitTransaction();
} catch (Exception e) {
    mysql.rollbackTransaction();
    throw e;
}
```

## NoSQL Database Testing

### MongoDB

```java
// Connect to MongoDB
MongoDatabaseProvider mongo = new MongoDatabaseProvider(
    "mongodb://localhost:27017",
    "test_db"
);

// Insert document
Document user = new Document("name", "John Doe")
    .append("email", "john@example.com")
    .append("age", 30);
mongo.insertDocument("users", user);

// Find documents
Document query = new Document("age", new Document("$gt", 25));
List<Document> users = mongo.findDocuments("users", query);

// Update document
Document filter = new Document("email", "john@example.com");
Document update = new Document("$set", new Document("status", "active"));
mongo.updateDocument("users", filter, update);

// Delete document
mongo.deleteDocument("users", new Document("status", "inactive"));
```

### Couchbase

```java
// Connect to Couchbase
CouchbaseDatabaseProvider couchbase = new CouchbaseDatabaseProvider(
    "couchbase://localhost",
    "username",
    "password",
    "default"
);

// Insert document
JsonObject user = JsonObject.create()
    .put("type", "user")
    .put("name", "John Doe")
    .put("email", "john@example.com");
couchbase.upsertDocument("user::1234", user);

// Get document
JsonObject result = couchbase.getDocument("user::1234");

// Query documents
String query = "SELECT * FROM default WHERE type = 'user'";
List<JsonObject> users = couchbase.query(query);
```

### Redis

```java
// Connect to Redis
RedisDatabaseProvider redis = new RedisDatabaseProvider("redis://localhost:6379");

// Set key-value
redis.set("user:1234:name", "John Doe");
redis.set("user:1234:email", "john@example.com", 3600); // with expiration (seconds)

// Get value
String name = redis.get("user:1234:name");

// Check if key exists
boolean exists = redis.exists("user:1234:email");

// Delete key
redis.delete("user:1234:name");

// Work with lists
redis.listPush("recent_users", "user:1234");
List<String> users = redis.listRange("recent_users", 0, -1);
```

## Caching Mechanisms

Ellithium implements intelligent caching for database operations to improve performance:

```java
// Enable caching (enabled by default)
mysql.setCacheEnabled(true);

// Set cache expiration time (in seconds)
mysql.setCacheExpirationTime(300); // 5 minutes

// Clear cache
mysql.clearCache();

// Execute cached query (results will be cached)
ResultSet users = mysql.executeQuery("SELECT * FROM users");

// Force fresh execution (bypass cache)
ResultSet freshUsers = mysql.executeQueryNoCache("SELECT * FROM users");
``` 