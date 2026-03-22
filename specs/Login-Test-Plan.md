# OrangeHRM Login Functionality Test Plan

## Application Overview

This test plan covers comprehensive testing of the OrangeHRM login functionality located at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login. The application provides a standard authentication interface with username/password fields, a login button, and a forgot password link. Testing will validate successful authentication with valid credentials, proper error handling for invalid credentials, input validation, security measures, UI/UX elements, and password recovery functionality.

## Test Scenarios

### 1. Authentication Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/Login-Suite/successful-login.spec.ts`

**Steps:**
  1. Navigate to the login page at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
    - expect: The login page loads successfully
    - expect: The page title displays 'OrangeHRM'
    - expect: Username and password fields are visible
    - expect: Login button is displayed
  2. Enter valid username 'Admin' in the username field
    - expect: The username is entered and visible in the field
    - expect: No error messages are displayed
  3. Enter valid password 'admin123' in the password field
    - expect: The password is masked (displayed as dots or asterisks)
    - expect: No error messages are displayed
  4. Click the 'Login' button
    - expect: The page navigates to the dashboard
    - expect: The URL contains '/dashboard'
    - expect: User profile or dashboard elements are visible
    - expect: Login form is no longer displayed

#### 1.2. Login with invalid username

**File:** `tests/Login-Suite/invalid-username.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter invalid username 'InvalidUser' in the username field
    - expect: The username is entered in the field
  3. Enter valid password 'admin123' in the password field
    - expect: The password is masked in the field
  4. Click the 'Login' button
    - expect: An error message is displayed indicating 'Invalid credentials'
    - expect: The user remains on the login page
    - expect: The URL does not change to dashboard
    - expect: Input fields are still visible

#### 1.3. Login with invalid password

**File:** `tests/Login-Suite/invalid-password.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter valid username 'Admin' in the username field
    - expect: The username is entered in the field
  3. Enter invalid password 'wrongpassword' in the password field
    - expect: The password is masked in the field
  4. Click the 'Login' button
    - expect: An error message is displayed indicating 'Invalid credentials'
    - expect: The user remains on the login page
    - expect: The URL does not change
    - expect: Password field may be cleared for security

#### 1.4. Login with both invalid credentials

**File:** `tests/Login-Suite/both-invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter invalid username 'WrongUser' in the username field
    - expect: The username is entered in the field
  3. Enter invalid password 'WrongPass123' in the password field
    - expect: The password is masked in the field
  4. Click the 'Login' button
    - expect: An error message is displayed indicating 'Invalid credentials'
    - expect: The user remains on the login page
    - expect: No navigation occurs

### 2. Input Validation Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. Login with empty username field

**File:** `tests/Login-Suite/empty-username.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Leave the username field empty
    - expect: The field remains empty
  3. Enter valid password 'admin123' in the password field
    - expect: The password is entered and masked
  4. Click the 'Login' button
    - expect: A validation error message is displayed for the username field
    - expect: The error indicates 'Required' or 'Username is required'
    - expect: The login is prevented
    - expect: The user remains on the login page

#### 2.2. Login with empty password field

**File:** `tests/Login-Suite/empty-password.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter valid username 'Admin' in the username field
    - expect: The username is entered in the field
  3. Leave the password field empty
    - expect: The field remains empty
  4. Click the 'Login' button
    - expect: A validation error message is displayed for the password field
    - expect: The error indicates 'Required' or 'Password is required'
    - expect: The login is prevented
    - expect: The user remains on the login page

#### 2.3. Login with both fields empty

**File:** `tests/Login-Suite/both-fields-empty.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Leave both username and password fields empty
    - expect: Both fields remain empty
  3. Click the 'Login' button
    - expect: Validation error messages are displayed for both fields
    - expect: Both fields show 'Required' error messages
    - expect: The login is prevented
    - expect: The user remains on the login page

#### 2.4. Login with whitespace-only username

**File:** `tests/Login-Suite/whitespace-username.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter only whitespace characters (spaces or tabs) in the username field
    - expect: The whitespace is entered in the field
  3. Enter valid password 'admin123' in the password field
    - expect: The password is entered and masked
  4. Click the 'Login' button
    - expect: An error message is displayed
    - expect: Either a validation error or invalid credentials message appears
    - expect: Login is prevented

### 3. Security Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. Password field masking verification

**File:** `tests/Login-Suite/password-masking.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter any text in the password field
    - expect: The entered text is masked (displayed as dots, asterisks, or similar)
    - expect: The actual password text is not visible on screen
  3. Inspect the password field type attribute
    - expect: The field type is 'password'
    - expect: The input has proper password field characteristics

#### 3.2. SQL injection attempt in username

**File:** `tests/Login-Suite/sql-injection-username.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter SQL injection payload in username field (e.g., "admin' OR '1'='1")
    - expect: The input is accepted
  3. Enter any password in the password field
    - expect: The password is entered
  4. Click the 'Login' button
    - expect: The SQL injection is prevented
    - expect: An invalid credentials error is displayed
    - expect: The application does not execute the SQL code
    - expect: Login is denied
    - expect: No security error or stack trace is exposed

#### 3.3. XSS attempt in login fields

**File:** `tests/Login-Suite/xss-attempt.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter XSS payload in username field (e.g., "<script>alert('XSS')</script>")
    - expect: The input is accepted
  3. Enter valid password in the password field
    - expect: The password is entered
  4. Click the 'Login' button
    - expect: The XSS script does not execute
    - expect: No alert or popup appears
    - expect: An error message is displayed or login fails
    - expect: The input is properly sanitized

#### 3.4. Multiple failed login attempts

**File:** `tests/Login-Suite/multiple-failed-attempts.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Attempt to login with invalid credentials 5 times consecutively
    - expect: Each attempt shows an invalid credentials error
  3. Observe the behavior after multiple failed attempts
    - expect: Either account is locked with appropriate message
    - expect: Or CAPTCHA is presented
    - expect: Or a delay is introduced between attempts
    - expect: Security measures are in place to prevent brute force attacks

### 4. UI and UX Tests

**Seed:** `tests/seed.spec.ts`

#### 4.1. Tab navigation between fields

**File:** `tests/Login-Suite/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Click on the username field to focus it
    - expect: The username field receives focus
    - expect: A focus indicator (border or outline) is visible
  3. Press the Tab key
    - expect: Focus moves to the password field
    - expect: The password field shows focus indicator
  4. Press the Tab key again
    - expect: Focus moves to the Login button
    - expect: The button shows focus indicator
  5. Verify all interactive elements are accessible via keyboard
    - expect: Forgot password link is also reachable via Tab
    - expect: All elements are keyboard accessible

#### 4.2. Enter key submission from username field

**File:** `tests/Login-Suite/enter-from-username.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter valid username 'Admin' in the username field
    - expect: The username is entered
  3. Enter valid password 'admin123' in the password field
    - expect: The password is entered
  4. Click back into the username field and press Enter key
    - expect: The form is submitted
    - expect: Login is processed
    - expect: User is navigated to dashboard upon successful authentication

#### 4.3. Enter key submission from password field

**File:** `tests/Login-Suite/enter-from-password.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter valid username 'Admin' in the username field
    - expect: The username is entered
  3. Enter valid password 'admin123' in the password field
    - expect: The password is entered
  4. Press Enter key while in the password field
    - expect: The form is submitted
    - expect: Login is processed
    - expect: User is navigated to dashboard
    - expect: The URL contains '/dashboard'

#### 4.4. Login button disabled state verification

**File:** `tests/Login-Suite/button-state.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Check the initial state of the Login button
    - expect: The Login button is enabled by default or appropriately disabled if fields are empty
  3. Enter credentials and click Login
    - expect: During submission, observe if the button shows a loading state or is temporarily disabled
    - expect: This prevents multiple submissions

#### 4.5. Error message visibility and clarity

**File:** `tests/Login-Suite/error-message-display.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter invalid credentials and submit
    - expect: An error message is displayed
  3. Verify the error message characteristics
    - expect: The error message is clearly visible
    - expect: The message text is descriptive and user-friendly
    - expect: The message is positioned near the relevant fields
    - expect: Error styling (color, icon) makes it noticeable
    - expect: The error message is accessible to screen readers

### 5. Password Recovery Tests

**Seed:** `tests/seed.spec.ts`

#### 5.1. Forgot password link functionality

**File:** `tests/Login-Suite/forgot-password-link.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
    - expect: The 'Forgot your password?' link is visible
  2. Click on the 'Forgot your password?' link
    - expect: The page navigates to the password recovery page
    - expect: The URL changes to the forgot password endpoint
    - expect: A password recovery form or instructions are displayed

#### 5.2. Forgot password link accessibility

**File:** `tests/Login-Suite/forgot-password-accessibility.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Navigate to the 'Forgot your password?' link using Tab key
    - expect: The link is reachable via keyboard navigation
    - expect: Focus indicator is visible on the link
  3. Press Enter key while the link is focused
    - expect: The link activates
    - expect: The page navigates to the password recovery page

### 6. Browser Compatibility Tests

**Seed:** `tests/seed.spec.ts`

#### 6.1. Login functionality in Chrome

**File:** `tests/Login-Suite/chrome-compatibility.spec.ts`

**Steps:**
  1. Open the login page in Chrome browser
    - expect: The page loads and renders correctly
    - expect: All elements are properly positioned
  2. Enter valid credentials and login
    - expect: Login is successful
    - expect: Navigation to dashboard works
    - expect: All functionality operates as expected

#### 6.2. Login functionality in Firefox

**File:** `tests/Login-Suite/firefox-compatibility.spec.ts`

**Steps:**
  1. Open the login page in Firefox browser
    - expect: The page loads and renders correctly
    - expect: All elements are properly positioned
  2. Enter valid credentials and login
    - expect: Login is successful
    - expect: Navigation to dashboard works
    - expect: All functionality operates as expected

#### 6.3. Login functionality in WebKit/Safari

**File:** `tests/Login-Suite/webkit-compatibility.spec.ts`

**Steps:**
  1. Open the login page in WebKit/Safari browser
    - expect: The page loads and renders correctly
    - expect: All elements are properly positioned
  2. Enter valid credentials and login
    - expect: Login is successful
    - expect: Navigation to dashboard works
    - expect: All functionality operates as expected

### 7. Edge Cases and Boundary Tests

**Seed:** `tests/seed.spec.ts`

#### 7.1. Login with extremely long username

**File:** `tests/Login-Suite/long-username.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter an extremely long username (e.g., 500 characters)
    - expect: Either the input is accepted with truncation
    - expect: Or a character limit is enforced
    - expect: Or validation error is shown
  3. Enter valid password and attempt login
    - expect: The system handles the long input gracefully
    - expect: No system error or crash occurs
    - expect: Appropriate error message is displayed

#### 7.2. Login with special characters in username

**File:** `tests/Login-Suite/special-chars-username.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter username with special characters (e.g., "Admin@#$%^&*()")
    - expect: The input is accepted
  3. Enter valid password and attempt login
    - expect: The system handles special characters appropriately
    - expect: Either login fails with proper error or succeeds if valid
    - expect: No system error occurs

#### 7.3. Login with Unicode characters

**File:** `tests/Login-Suite/unicode-characters.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Enter username with Unicode characters (e.g., "Admin™™")
    - expect: The input is accepted and displayed correctly
  3. Enter password and attempt login
    - expect: The system handles Unicode characters properly
    - expect: Characters are not corrupted
    - expect: Appropriate authentication result is returned

#### 7.4. Copy-paste credentials

**File:** `tests/Login-Suite/copy-paste-credentials.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: The login page loads successfully
  2. Copy the text 'Admin' and paste it into the username field
    - expect: The text is pasted successfully
    - expect: The username field displays 'Admin'
  3. Copy the text 'admin123' and paste it into the password field
    - expect: The text is pasted successfully
    - expect: The password field shows masked characters
  4. Click the Login button
    - expect: Login is successful
    - expect: User is navigated to the dashboard

#### 7.5. Session persistence after successful login

**File:** `tests/Login-Suite/session-persistence.spec.ts`

**Steps:**
  1. Navigate to the login page and login with valid credentials
    - expect: Login is successful
    - expect: User is on the dashboard
  2. Refresh the page
    - expect: User remains logged in
    - expect: Dashboard is still displayed
    - expect: No redirect to login page occurs
  3. Open a new tab and navigate to the application URL
    - expect: User is still authenticated
    - expect: The session persists across tabs

#### 7.6. Direct dashboard access without login

**File:** `tests/Login-Suite/direct-dashboard-access.spec.ts`

**Steps:**
  1. Navigate directly to the dashboard URL without logging in
    - expect: User is redirected to the login page
    - expect: Access to dashboard is denied
    - expect: Authentication is enforced
  2. Login with valid credentials
    - expect: After successful login, user is redirected to the originally requested dashboard page
