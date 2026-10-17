---
sidebar_position: 6
---

# Database Testing

Ellithium provides comprehensive support for both SQL and NoSQL database testing. Queries and updates are executed live against the database with connection pooling, transactional rollback capabilities, and parameterized sanitization — guaranteeing zero stale-data artifacts across test suites.

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
    "3306",
    "test_db"
);

// Connect to SQL Server
SQLDatabaseProvider sqlServer = new SQLDatabaseProvider(
    SQLDBType.SQL_SERVER,
    "username",
    "password",
    "localhost",
    "1433",
    "test_db"
);

// Connect to Oracle with SID
SQLDatabaseProvider oracleSid = new SQLDatabaseProvider(
    SQLDBType.ORACLE_SID,
    "username",
    "password",
    "localhost",
    "1521",
    "ORCL"
);

// Connect to Oracle with Service Name
SQLDatabaseProvider oracleService = new SQLDatabaseProvider(
    SQLDBType.ORACLE_SERVICE_NAME,
    "username",
    "password",
    "localhost",
    "1521",
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

// Connect to MongoDB using a default collection
MongoDatabaseProvider mongoWithDefault = new MongoDatabaseProvider(
    "mongodb://localhost:27017",
    "test_db",
    30,
    1000,
    "users_collection" // default collection name
);

// Dependency-injection constructor (useful for unit testing with mocks)
MongoDatabaseProvider mongoDI = new MongoDatabaseProvider(
    mongoClient,     // pre-configured or mocked MongoClient
    mongoDatabase,   // pre-configured or mocked MongoDatabase
    queryResultCache // Caffeine Cache instance
);

// DI constructor with a custom default collection name
MongoDatabaseProvider mongoDIWithDefault = new MongoDatabaseProvider(
    mongoClient,
    mongoDatabase,
    queryResultCache,
    "users_collection" // default collection name
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

// Query documents live
String query = "SELECT * FROM default WHERE type = 'user'";
List<JsonObject> users = couchbase.query(query);

// Health check
boolean isHealthy = couchbase.isHealthy();
```

### Redis

```java
// Connect to Redis using host and port, or a URI connection string
RedisDatabaseProvider redis = new RedisDatabaseProvider("localhost", 6379);
// Alternatively: new RedisDatabaseProvider("redis://localhost:6379");

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
```

## Live Execution & Security Hardening

Ellithium executes all database queries and commands directly against the database with zero caching layer, ensuring test isolation and deterministic assertions:

### Why Zero Database Caching?
In automated test suites, tests frequently mutate state (creating users, placing orders, updating records). In-memory caching risks serving stale data to subsequent assertions or across parallel worker threads. By removing intermediate caching:
- Every query returns the exact, ground-truth database state at that millisecond.
- Tests can safely run concurrently in isolated test containers without cache-invalidation bugs.
- Eliminates heavy third-party cache dependencies for a leaner, faster classpath.

### SQL Parameter Sanitization & Injection Defense
All SQL operations support parameterized queries to prevent SQL injection vulnerabilities and handle character escaping automatically:

```java
// Safe parameterized query
List<Map<String, Object>> users = mysql.executeQuery(
    "SELECT id, username, email FROM users WHERE status = ? AND age >= ?",
    "ACTIVE", 18
);

// Parameterized update
int rowsAffected = mysql.executeUpdate(
    "UPDATE accounts SET balance = balance - ? WHERE account_id = ?",
    500.0, "ACC-9921"
);
```

### Transaction Management
Support for atomic transactions with automatic rollback on assertion failure:

```java
try {
    mysql.beginTransaction();
    mysql.executeUpdate("UPDATE inventory SET qty = qty - 1 WHERE item_id = ?", "SKU-01");
    mysql.executeUpdate("INSERT INTO order_items (order_id, item_id) VALUES (?, ?)", "ORD-1", "SKU-01");
    mysql.commitTransaction();
} catch (Exception e) {
    mysql.rollbackTransaction();
    throw e;
}
```