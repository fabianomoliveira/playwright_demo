Feature: User Login
  Scenario: Successful login with Valid Credentials
    Given the user is on the main page
    When the user clicks on the sign-in button and enters valid email
    Then the web system shows the Shop popup with the email input