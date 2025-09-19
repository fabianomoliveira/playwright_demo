import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";
import * as playwright from "playwright";

let request: APIRequestContext;
let response: any;
let responseJson: any;

Given("the API endpoint is {string}", async function (this: any, url: string) {
  this.url = url;
  if (this.request) {
    request = this.request as APIRequestContext;
  } else {
    request = await playwright.request.newContext();
  }
});

When("I send a GET request to the endpoint", async function () {
  response = await request.get(this.url);
  responseJson = await response.json();
});

Then(
  "the response status code should be {int}",
  async function (statusCode: number) {
    expect(response.status()).toBe(statusCode);
  }
);

Then("the response should contain a list of users", async function () {
  expect(Array.isArray(responseJson)).toBeTruthy();
  expect(responseJson.length).toBeGreaterThan(0);
});

Then("each user should have a name and email", async function () {
  responseJson.forEach((user: any) => {
    expect(user).toHaveProperty("name");
    expect(user.name).toBeTruthy();
    expect(user).toHaveProperty("email");
    expect(user.email).toMatch(/.+@.+\..+/); // Basic email format validation
  });
});
