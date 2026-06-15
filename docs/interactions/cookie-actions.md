---
sidebar_position: 13
---

# Cookie Actions

The `CookieActions` class provides a streamlined, fluent interface for managing browser cookies during your test execution.

You can access the `CookieActions` interface via:

```java
driverActions.cookies()
```

## Available Methods

### Add Cookie
Adds a new cookie to the current browsing context. Note that you must be on the domain that the cookie applies to before adding it.

```java
import org.openqa.selenium.Cookie;

Cookie sessionCookie = new Cookie("session_id", "12345ABC");
driverActions.cookies().addCookie(sessionCookie);
```

### Delete a Specific Cookie (By Name)
Deletes a cookie using its string name.

```java
driverActions.cookies().deleteCookieNamed("session_id");
```

### Delete a Specific Cookie (By Object)
Deletes a specific `Cookie` object from the browser.

```java
Cookie myCookie = driverActions.cookies().getCookieNamed("auth_token");
if (myCookie != null) {
    driverActions.cookies().deleteCookie(myCookie);
}
```

### Delete All Cookies
Clears all cookies from the current domain. This is highly useful for cleanly logging out a user or resetting session state before continuing tests.

```java
driverActions.cookies().deleteAllCookies();
```

### Get All Cookies
Retrieves all cookies visible to the current domain as a set.

```java
Set<Cookie> cookies = driverActions.cookies().getCookies();
for (Cookie c : cookies) {
    System.out.println(c.getName() + ": " + c.getValue());
}
```

### Get Cookie by Name
Retrieves a specific cookie by its name. Returns `null` if the cookie does not exist.

```java
Cookie themeCookie = driverActions.cookies().getCookieNamed("theme");
if (themeCookie != null && themeCookie.getValue().equals("dark")) {
    // Perform validation
}
```
