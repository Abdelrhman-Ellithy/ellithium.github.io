---
sidebar_position: 9
---

# Test Data Generator

The `TestDataGenerator` class provides a comprehensive set of utilities for generating random test data. It leverages the popular JavaFaker library to produce realistic data for various testing scenarios, including personal information, addresses, financial data, and more.

## Personal Information

```java
// Generate random names
String fullName = TestDataGenerator.getRandomFullName();
String firstName = TestDataGenerator.getRandomFirstName();
String lastName = TestDataGenerator.getRandomLastName();
String funnyName = TestDataGenerator.getRandomFunnyName();
String username = TestDataGenerator.getRandomUsername();

// Generate contact information
String email = TestDataGenerator.getRandomEmail();
String phoneNumber = TestDataGenerator.getRandomPhoneNumber();
String website = TestDataGenerator.getRandomWebsite();

// Generate personal identifiers
String birthDate = TestDataGenerator.getRandomBirthDate();
String password = TestDataGenerator.getRandomPassword();
```

## Date and Time

```java
// Get current timestamp in yyyy-MM-dd-h-m-ssa format
String timestamp = TestDataGenerator.getTimeStamp();

// Get current date in yyyy-MM-dd format
String date = TestDataGenerator.getDayDateStamp();
```

## Address Information

```java
// Generate full address
String address = TestDataGenerator.getRandomAddress();

// Generate address components
String buildingNumber = TestDataGenerator.getRandomBuildingNumber();
String streetName = TestDataGenerator.getRandomStreetName();
String streetAddress = TestDataGenerator.getRandomStreetAddress();
String city = TestDataGenerator.getRandomCity();
String state = TestDataGenerator.getRandomState();
String zipCode = TestDataGenerator.getRandomZipCode();
String country = TestDataGenerator.getRandomCountry();
String countryCode = TestDataGenerator.getRandomCountryCode();

// Generate geographic coordinates
String latitude = TestDataGenerator.getRandomLatitude();
String longitude = TestDataGenerator.getRandomLongitude();
String timeZone = TestDataGenerator.getRandomTimeZone();
```

## Financial Information

```java
// Generate credit card data
String creditCardNumber = TestDataGenerator.getRandomCreditCardNumber();
String creditCardExpiry = TestDataGenerator.getRandomCreditCardExpiry();

// Generate banking information
String bankAccountNumber = TestDataGenerator.getRandomBankAccountNumber();
String swiftCode = TestDataGenerator.getRandomSWIFTCode();

// Generate currency information
String currencyCode = TestDataGenerator.getRandomCurrencyCode();
String currencyName = TestDataGenerator.getRandomCurrencyName();
```

## Business Information

```java
// Generate company data
String company = TestDataGenerator.getRandomCompany();
String companyIndustry = TestDataGenerator.getRandomCompanyIndustry();
String companyCatchPhrase = TestDataGenerator.getRandomCompanyCatchPhrase();
String jobTitle = TestDataGenerator.getRandomJobTitle();
String department = TestDataGenerator.getRandomDepartment();

// Generate product information
String productName = TestDataGenerator.getRandomProductName();
String productPrice = TestDataGenerator.getRandomProductPrice();
String productMaterial = TestDataGenerator.getRandomProductMaterial();
```

## Internet and Technology

```java
// Generate network information
String ipAddress = TestDataGenerator.getRandomIPAddress();
```

## Education and Medicine

```java
// Generate education data
String university = TestDataGenerator.getRandomUniversity();
String degree = TestDataGenerator.getRandomDegree();

// Generate medical data
String medicineName = TestDataGenerator.getMedicineName();
```

## Miscellaneous Data

```java
// Generate color and animal names
String color = TestDataGenerator.getRandomColor();
String animal = TestDataGenerator.getRandomAnimal();

// Generate text content
String sentence = TestDataGenerator.getRandomSentence();
String paragraph = TestDataGenerator.getRandomParagraph();
String quote = TestDataGenerator.getRandomQuote();

// Generate book title
String book = TestDataGenerator.getRandomBook();

// Generate country flag emoji
String countryFlag = TestDataGenerator.getRandomCountryFlagEmoji();
```

## Implementation Details

The `TestDataGenerator` uses the JavaFaker library to generate realistic random data. All methods are static for easy access throughout your test code. Each method logs its operation through the Ellithium reporting system using the `INFO_BLUE` log level, making it easy to trace data generation in test reports.

## Best Practices

1. **Data Traceability**: Since all generated data is logged, you can easily trace back which values were used in your tests.

2. **Test Repeatability**: If you need repeatable test data, consider setting a fixed seed for the Faker instance or storing generated values for later use.

3. **Custom Generators**: For specialized test data needs, consider extending this class with custom generators that build upon the existing methods.

4. **Performance Consideration**: Data generation is relatively lightweight, but for performance-critical tests with many data points, consider generating data in advance. 