Feature: API testing sample
  Scenario: Retrieve list of users from the API
    Given the API endpoint is "https://jsonplaceholder.typicode.com/users"
    When I send a GET request to the endpoint
    Then the response status code should be 200
    And the response should contain a list of users
    And each user should have a name and email