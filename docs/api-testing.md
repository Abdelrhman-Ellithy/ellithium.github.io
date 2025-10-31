---
sidebar_position: 7
---

# API Testing

Ellithium uses Rest Assured directly for API testing. There is no custom request/response wrapper. The framework adds:
- Automatic request/response logging to the report (as step attachments)
- Sensitive data obfuscation and field detection (e.g., passwords, tokens)
- A Postman-like `Environment` utility for variables per test suite

## Quick Start with Rest Assured

```java
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

// Base URI (typically in @BeforeClass)
RestAssured.baseURI = "https://api.example.com";

// Simple GET
Response getResp = given()
    .when()
    .get("/users");

// POST with JSON body
String payload = "{" +
    "\"name\":\"John\"," +
    "\"email\":\"john@example.com\"" +
"}";
Response postResp = given()
    .contentType(ContentType.JSON)
    .body(payload)
    .when()
    .post("/users");
```

Assertions are done with your preferred assertion library (e.g., TestNG/JUnit) on the `Response` returned by Rest Assured.

## What Ellithium Adds

- Request logging: method, URL, path/query params, headers, cookies, and body
- Response logging: status code, headers/cookies, time, and body
- Sensitive data handling: automatic obfuscation for known fields (e.g., password, token)
- Report integration: all above are attached as steps in the execution report

You keep using Rest Assured methods as-is; the framework enriches logs and report outputs.

## Environment (Postman-like)

Use `Ellithium.core.API.Environment` to store and reuse variables (similar to Postman environments). Values are persisted under `src/test/resources/TestData/Environments/<envName>.json`.

Common operations:
```java
import Ellithium.core.API.Environment;

Environment env = new Environment("ContactList");

// Set values
env.set("baseUrl", "https://api.example.com");
env.set("token", "<jwt>");
env.set("retries", 3);

// Get values (typed)
String baseUrl = env.get("baseUrl");
int retries = env.get("retries", Integer.class);
boolean featureOn = env.get("featureOn", Boolean.class);

// Utilities
env.remove("token");
boolean hasToken = env.has("token");
```

## Example: Contact List API (Rest Assured + Environment)

```java
import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.core.API.Environment;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;

public class ContactListAPITests {
    private Environment env;

    @BeforeClass
    public void setUp() {
        RestAssured.baseURI = "https://thinking-tester-contact-list.herokuapp.com/";
        env = new Environment("ContactList");
        env.set("firstName", "Amy");
        env.set("lastName", "Smith");
        env.set("userEmail", "testtt@fake.com");
    }

    @Test(priority = 1)
    public void loginUser() {
        String payload = """
                {
                    "email": "%s",
                    "password": "123456789"
                }
                """.formatted(env.get("userEmail"));

        Response response = given()
                .contentType(ContentType.JSON)
                .body(payload)
                .when()
                .post("/users/login");

        AssertionExecutor.soft soft = new AssertionExecutor.soft();
        soft.assertEquals(response.getStatusCode(), 200);
        env.set("token", response.jsonPath().getString("token"));
        soft.assertNotNull(env.get("token"));
        soft.assertAll();
    }

    @Test(priority = 2)
    public void addContact() {
        String payload = """
                {
                    "firstName": "%s",
                    "lastName": "%s",
                    "email": "asmith@thinkingtester.com"
                }
                """.formatted(env.get("firstName"), env.get("lastName"));

        Response response = given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + env.get("token"))
                .body(payload)
                .when()
                .post("/contacts");

        AssertionExecutor.soft soft = new AssertionExecutor.soft();
        soft.assertEquals(response.getStatusCode(), 201);
        env.set("contactId", response.jsonPath().getString("_id"));
        soft.assertAll();
    }
}
```

## Headers, Auth, and Files (Rest Assured)

- Headers/cookies/params: use Rest Assured (`addHeader`, `headers`, `queryParam`, etc.)
- Auth: Basic/Bearer/OAuth2 via Rest Assured
- File upload/download: use Rest Assured multipart and response file save APIs

Ellithium does not replace any of these; it only logs and reports them with sensitive-field masking. 