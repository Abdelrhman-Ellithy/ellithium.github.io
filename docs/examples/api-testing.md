---
sidebar_position: 2
title: API Testing
id: api-testing
---

# API Testing Examples

This page provides real-world examples of API testing using the Ellithium framework. These examples demonstrate how to create robust API tests with proper structure and best practices.

## API Test Structure

The API test structure in Ellithium follows these patterns:

```
src/test/java/
└── APIs/
    ├── BookingAPITests.java      # Tests for booking-related APIs
    └── ContactListAPITests.java  # Tests for contact-related APIs
```

## Contact List API Test Example

The following example demonstrates comprehensive API testing for a contact list application:

```java
package APIs;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.Utilities.helpers.JsonHelper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.json.JSONObject;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class ContactListAPITests {
    private String baseUrl = "https://thinking-tester-contact-list.herokuapp.com";
    private String token;
    private String contactId;
    
    // Reusable test data
    String email = "test_" + UUID.randomUUID().toString().substring(0, 8) + "@example.com";
    String password = "Password123";
    String firstName = "John";
    String lastName = "Doe";

    @BeforeClass
    public void setUp() {
        // Register a new user
        registerUser();
        // Log in to get the authentication token
        login();
    }

    private void registerUser() {
        JSONObject requestBody = new JSONObject();
        requestBody.put("firstName", firstName);
        requestBody.put("lastName", lastName);
        requestBody.put("email", email);
        requestBody.put("password", password);

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(requestBody.toString())
                .post(baseUrl + "/users");

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 201, "User should be created successfully");
    }

    private void login() {
        JSONObject requestBody = new JSONObject();
        requestBody.put("email", email);
        requestBody.put("password", password);

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(requestBody.toString())
                .post(baseUrl + "/users/login");

        token = response.getHeader("Authorization");
        AssertionExecutor.hard.assertNotNull(token, "Authentication token should be returned");
    }

    @Test(priority = 1)
    public void testAddContact() {
        JSONObject requestBody = new JSONObject();
        requestBody.put("firstName", "Jane");
        requestBody.put("lastName", "Smith");
        requestBody.put("email", "jane.smith@example.com");
        requestBody.put("phone", "1234567890");
        requestBody.put("street1", "123 Main St");
        requestBody.put("city", "Anytown");
        requestBody.put("state", "CA");
        requestBody.put("postalCode", "12345");
        requestBody.put("country", "USA");

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .header("Authorization", token)
                .body(requestBody.toString())
                .post(baseUrl + "/contacts");

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 201, "Contact should be created successfully");
        
        // Store contact ID for later tests
        contactId = response.jsonPath().getString("_id");
        AssertionExecutor.hard.assertNotNull(contactId, "Contact ID should be returned");
    }

    @Test(priority = 2)
    public void testGetContact() {
        Response response = RestAssured.given()
                .header("Authorization", token)
                .get(baseUrl + "/contacts/" + contactId);

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "Contact should be retrieved successfully");
        AssertionExecutor.hard.assertEquals(response.jsonPath().getString("firstName"), "Jane");
        AssertionExecutor.hard.assertEquals(response.jsonPath().getString("lastName"), "Smith");
        AssertionExecutor.hard.assertEquals(response.jsonPath().getString("email"), "jane.smith@example.com");
    }

    @Test(priority = 3)
    public void testUpdateContact() {
        JSONObject requestBody = new JSONObject();
        requestBody.put("firstName", "Jane");
        requestBody.put("lastName", "Smith-Update");
        requestBody.put("email", "jane.updated@example.com");

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .header("Authorization", token)
                .body(requestBody.toString())
                .put(baseUrl + "/contacts/" + contactId);

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "Contact should be updated successfully");
        
        // Verify the update
        Response getResponse = RestAssured.given()
                .header("Authorization", token)
                .get(baseUrl + "/contacts/" + contactId);

        AssertionExecutor.hard.assertEquals(getResponse.jsonPath().getString("lastName"), "Smith-Update");
        AssertionExecutor.hard.assertEquals(getResponse.jsonPath().getString("email"), "jane.updated@example.com");
    }

    @Test(priority = 4)
    public void testDeleteContact() {
        Response response = RestAssured.given()
                .header("Authorization", token)
                .delete(baseUrl + "/contacts/" + contactId);

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "Contact should be deleted successfully");
        
        // Verify the contact is deleted
        Response getResponse = RestAssured.given()
                .header("Authorization", token)
                .get(baseUrl + "/contacts/" + contactId);

        AssertionExecutor.hard.assertEquals(getResponse.getStatusCode(), 404, "Contact should not be found after deletion");
    }

    @Test(priority = 5)
    public void testLogout() {
        Response response = RestAssured.given()
                .header("Authorization", token)
                .post(baseUrl + "/users/logout");

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "User should be logged out successfully");
        
        // Verify token is no longer valid
        Response contactsResponse = RestAssured.given()
                .header("Authorization", token)
                .get(baseUrl + "/contacts");

        AssertionExecutor.hard.assertEquals(contactsResponse.getStatusCode(), 401, "Token should be invalidated");
    }
}
```

## Booking API Test Example

Here's another example showing how to test a booking API:

```java
package APIs;

import Ellithium.Utilities.assertion.AssertionExecutor;
import Ellithium.Utilities.generators.TestDataGenerator;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.json.JSONObject;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class BookingAPITests {
    private String baseUrl = "https://restful-booker.herokuapp.com";
    private String token;
    private int bookingId;

    @BeforeClass
    public void setUp() {
        // Get authentication token
        getAuthToken();
    }

    private void getAuthToken() {
        JSONObject requestBody = new JSONObject();
        requestBody.put("username", "admin");
        requestBody.put("password", "password123");

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(requestBody.toString())
                .post(baseUrl + "/auth");

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "Authentication should succeed");
        token = response.jsonPath().getString("token");
        AssertionExecutor.hard.assertNotNull(token, "Token should be returned");
    }

    @Test(priority = 1)
    public void testCreateBooking() {
        // Generate random test data
        String firstName = TestDataGenerator.getRandomFirstName();
        String lastName = TestDataGenerator.getRandomLastName();
        
        JSONObject bookingDates = new JSONObject();
        bookingDates.put("checkin", "2023-06-01");
        bookingDates.put("checkout", "2023-06-10");

        JSONObject requestBody = new JSONObject();
        requestBody.put("firstname", firstName);
        requestBody.put("lastname", lastName);
        requestBody.put("totalprice", 999);
        requestBody.put("depositpaid", true);
        requestBody.put("bookingdates", bookingDates);
        requestBody.put("additionalneeds", "Breakfast");

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(requestBody.toString())
                .post(baseUrl + "/booking");

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "Booking should be created successfully");
        bookingId = response.jsonPath().getInt("bookingid");
        AssertionExecutor.hard.assertTrue(bookingId > 0, "Booking ID should be positive");
    }

    @Test(priority = 2)
    public void testGetBooking() {
        Response response = RestAssured.given()
                .accept(ContentType.JSON)
                .get(baseUrl + "/booking/" + bookingId);

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "Booking should be retrieved successfully");
        AssertionExecutor.hard.assertEquals(response.jsonPath().getInt("totalprice"), 999);
        AssertionExecutor.hard.assertTrue(response.jsonPath().getBoolean("depositpaid"));
        AssertionExecutor.hard.assertEquals(response.jsonPath().getString("additionalneeds"), "Breakfast");
    }

    @Test(priority = 3)
    public void testUpdateBooking() {
        JSONObject bookingDates = new JSONObject();
        bookingDates.put("checkin", "2023-07-01");
        bookingDates.put("checkout", "2023-07-15");

        JSONObject requestBody = new JSONObject();
        requestBody.put("firstname", "Updated");
        requestBody.put("lastname", "User");
        requestBody.put("totalprice", 1200);
        requestBody.put("depositpaid", true);
        requestBody.put("bookingdates", bookingDates);
        requestBody.put("additionalneeds", "Breakfast and Dinner");

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .header("Cookie", "token=" + token)
                .body(requestBody.toString())
                .put(baseUrl + "/booking/" + bookingId);

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "Booking should be updated successfully");
        AssertionExecutor.hard.assertEquals(response.jsonPath().getString("firstname"), "Updated");
        AssertionExecutor.hard.assertEquals(response.jsonPath().getInt("totalprice"), 1200);
    }

    @Test(priority = 4)
    public void testPartialUpdateBooking() {
        JSONObject requestBody = new JSONObject();
        requestBody.put("totalprice", 1500);
        requestBody.put("additionalneeds", "Airport Transfer");

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .header("Cookie", "token=" + token)
                .body(requestBody.toString())
                .patch(baseUrl + "/booking/" + bookingId);

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 200, "Booking should be partially updated");
        AssertionExecutor.hard.assertEquals(response.jsonPath().getInt("totalprice"), 1500);
        AssertionExecutor.hard.assertEquals(response.jsonPath().getString("additionalneeds"), "Airport Transfer");
    }

    @Test(priority = 5)
    public void testDeleteBooking() {
        Response response = RestAssured.given()
                .header("Cookie", "token=" + token)
                .delete(baseUrl + "/booking/" + bookingId);

        AssertionExecutor.hard.assertEquals(response.getStatusCode(), 201, "Booking should be deleted successfully");

        // Verify booking is deleted
        Response getResponse = RestAssured.given()
                .accept(ContentType.JSON)
                .get(baseUrl + "/booking/" + bookingId);

        AssertionExecutor.hard.assertEquals(getResponse.getStatusCode(), 404, "Booking should not be found after deletion");
    }
}
```

## Key Features Demonstrated

These examples showcase several key API testing features in Ellithium:

1. **REST Assured Integration**: Seamless integration with REST Assured for API testing
2. **Test Data Generation**: Using TestDataGenerator to create realistic test data
3. **Enhanced Assertions**: Using AssertionExecutor for better error reporting
4. **Test Flow**: Creating a logical test flow with @BeforeClass setup and prioritized tests
5. **Authentication Handling**: Proper handling of authentication tokens
6. **JSON Manipulation**: Working with JSON request and response bodies
7. **Status Code Validation**: Checking appropriate HTTP status codes
8. **Response Validation**: Verifying response content

For more complex API testing scenarios, including handling OAuth, JWT authentication, or GraphQL APIs, check out the complete [source code](https://github.com/Abdelrhman-Ellithy/Ellithium/tree/main/src/test/java/APIs) of the Ellithium project. 