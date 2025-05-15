---
sidebar_position: 7
---

# API Testing

Ellithium provides a powerful API testing framework built on top of REST Assured, offering a simplified and intuitive interface for testing RESTful and SOAP services.

## Basic API Requests

### Making GET Requests

```java
// Simple GET request
ApiResponse response = ApiRequest.get("https://api.example.com/users")
    .execute();

// GET with query parameters
ApiResponse response = ApiRequest.get("https://api.example.com/users")
    .addQueryParam("page", "1")
    .addQueryParam("limit", "10")
    .execute();

// GET with path parameters
ApiResponse response = ApiRequest.get("https://api.example.com/users/{userId}")
    .addPathParam("userId", "123")
    .execute();
```

### POST Requests

```java
// POST with JSON body
ApiResponse response = ApiRequest.post("https://api.example.com/users")
    .setContentType(ContentType.JSON)
    .setBody("{\"name\":\"John\",\"email\":\"john@example.com\"}")
    .execute();

// POST with form parameters
ApiResponse response = ApiRequest.post("https://api.example.com/login")
    .setContentType(ContentType.FORM)
    .addFormParam("username", "john")
    .addFormParam("password", "secret")
    .execute();

// POST with object as JSON (automatic serialization)
User user = new User("John Doe", "john@example.com");
ApiResponse response = ApiRequest.post("https://api.example.com/users")
    .setContentType(ContentType.JSON)
    .setBody(user)
    .execute();
```

### Other HTTP Methods

```java
// PUT request
ApiResponse response = ApiRequest.put("https://api.example.com/users/123")
    .setContentType(ContentType.JSON)
    .setBody("{\"name\":\"John Updated\"}")
    .execute();

// DELETE request
ApiResponse response = ApiRequest.delete("https://api.example.com/users/123")
    .execute();

// PATCH request
ApiResponse response = ApiRequest.patch("https://api.example.com/users/123")
    .setContentType(ContentType.JSON)
    .setBody("{\"status\":\"inactive\"}")
    .execute();
```

## Headers and Authentication

```java
// Add request headers
ApiResponse response = ApiRequest.get("https://api.example.com/users")
    .addHeader("Accept", "application/json")
    .addHeader("X-API-Key", "your-api-key")
    .execute();

// Basic authentication
ApiResponse response = ApiRequest.get("https://api.example.com/protected-resource")
    .setBasicAuth("username", "password")
    .execute();

// Bearer token authentication
ApiResponse response = ApiRequest.get("https://api.example.com/protected-resource")
    .addHeader("Authorization", "Bearer " + token)
    .execute();

// OAuth2 authentication
ApiResponse response = ApiRequest.get("https://api.example.com/protected-resource")
    .setOAuth2Token(token)
    .execute();
```

## Response Handling

```java
// Get response status code
int statusCode = response.getStatusCode();
Assert.assertEquals(200, statusCode);

// Get response body as string
String body = response.getBody();

// Get response body as JSON object
JsonObject jsonResponse = response.getJsonObject();
String name = jsonResponse.get("name").getAsString();

// Get response body as deserialized object
User user = response.getObject(User.class);
String email = user.getEmail();

// Get specific header
String contentType = response.getHeader("Content-Type");

// Get response time in milliseconds
long responseTime = response.getResponseTime();
Assert.assertTrue(responseTime < 1000);
```

## JSON Path Assertions

```java
// Assert value using JSON path
response.assertThat()
    .jsonPath("$.name", equalTo("John Doe"))
    .jsonPath("$.age", greaterThan(18))
    .jsonPath("$.active", is(true))
    .jsonPath("$.roles", hasItem("admin"))
    .jsonPath("$.address.city", containsString("New York"));

// Extract values using JSON path
String email = response.jsonPath("$.email");
List<String> roles = response.jsonPathAsList("$.roles");
int age = response.jsonPathAs("$.age", Integer.class);
```

## File Upload and Download

```java
// Upload file
File fileToUpload = new File("test.txt");
ApiResponse response = ApiRequest.post("https://api.example.com/upload")
    .addMultiPart("file", fileToUpload)
    .execute();

// Download file
ApiResponse response = ApiRequest.get("https://api.example.com/download/report.pdf")
    .execute();
File downloadedFile = response.saveBodyAsFile("downloaded-report.pdf");
```

## Request and Response Logging

```java
// Log request and response details
ApiResponse response = ApiRequest.get("https://api.example.com/users")
    .logRequest()
    .logResponse()
    .execute();

// Conditional logging (only on errors)
ApiResponse response = ApiRequest.get("https://api.example.com/users")
    .logRequestIfError()
    .logResponseIfError()
    .execute();
```

## Assertions with TestNG Integration

```java
// Using built-in assertion methods
response.assertStatusCodeIs(200)
    .assertContentTypeIs(ContentType.JSON)
    .assertResponseTimeBelow(1000)
    .assertBodyContains("success");

// Chainable assertions
response.assertThat()
    .statusCode(equalTo(200))
    .contentType(startsWith("application/json"))
    .body("status", equalTo("success"))
    .body("data.users.size()", greaterThan(0))
    .body("data.users[0].id", notNullValue());
```

## API Testing in BDD with Cucumber

```java
// Step definition for API testing with Cucumber
@Given("I have a valid authentication token")
public void iHaveAValidAuthenticationToken() {
    token = // Get token
}

@When("I request the user profile with ID {string}")
public void iRequestUserProfile(String userId) {
    response = ApiRequest.get("https://api.example.com/users/{id}")
        .addPathParam("id", userId)
        .addHeader("Authorization", "Bearer " + token)
        .execute();
}

@Then("the response status code should be {int}")
public void theResponseStatusCodeShouldBe(int expectedStatusCode) {
    response.assertStatusCodeIs(expectedStatusCode);
}

@And("the response should contain the user's email")
public void theResponseShouldContainEmail() {
    response.assertThat()
        .jsonPath("$.email", notNullValue())
        .jsonPath("$.email", containsString("@"));
}
``` 