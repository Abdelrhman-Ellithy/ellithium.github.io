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
// Connect to MongoDB with caching configuration
MongoDatabaseProvider mongo = new MongoDatabaseProvider(
    "mongodb://localhost:27017",
    "test_db",
    30,  // Cache TTL in minutes
    1000 // Maximum cache size
);

// Insert document
Document user = new Document("name", "John Doe")
    .append("email", "john@example.com")
    .append("age", 30);
mongo.insertDocument("users", user);

// Get document by ID
Optional<Document> userDoc = mongo.getDocument("users", "user123");

// Update document
Bson update = new Document("$set", new Document("status", "active"));
mongo.updateDocument("users", "user123", update);

// Delete document
mongo.deleteDocument("users", "user123");

// Create index
mongo.createIndex("users", "email", true); // unique index on email field

// Health check
boolean isHealthy = mongo.isHealthy();

// Cache management
mongo.clearCache("query_key");
mongo.clearAllCaches();
```

### Couchbase

```java
// Connect to Couchbase with caching configuration
CouchbaseDatabaseProvider couchbase = new CouchbaseDatabaseProvider(
    "couchbase://localhost",
    "username",
    "password",
    "default",
    30,  // Cache TTL in minutes
    1000 // Maximum cache size
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

// Health check
boolean isHealthy = couchbase.isHealthy();

// Cache management
couchbase.clearCache("query_key");
couchbase.clearAllCaches();
```

### Redis

```java
// Connect to Redis with caching configuration
RedisDatabaseProvider redis = new RedisDatabaseProvider(
    "redis://localhost:6379",
    30,  // Cache TTL in minutes
    1000 // Maximum cache size
);

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

// Health check
boolean isHealthy = redis.isHealthy();

// Cache management
redis.clearCache("query_key");
redis.clearAllCaches();
```

## Caching Mechanisms

Ellithium implements intelligent caching for database operations to improve performance. The caching system is built on top of Caffeine cache and provides the following features:

- Configurable cache TTL (Time To Live)
- Configurable maximum cache size
- Automatic cache invalidation
- Per-key cache clearing
- Global cache clearing

All NoSQL database providers implement the `NoSQLDatabaseProvider` interface which includes these caching methods:

```java
// Clear cache for specific key
databaseProvider.clearCache("query_key");

// Clear all cached results
databaseProvider.clearAllCaches();

// Add result to cache
databaseProvider.addToCache("query_key", result);

// Get cached result
Object cachedResult = databaseProvider.getFromCache("query_key");
```

The caching system is enabled by default and can be configured during provider initialization. The cache configuration includes:

- Cache TTL (Time To Live) in minutes
- Maximum number of entries in the cache
- Automatic eviction of expired entries
- Thread-safe operations 