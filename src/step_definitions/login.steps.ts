import { Given, Then, When, world } from "@cucumber/cucumber";
import { ICustomWorld } from "../utils/custom_world";
import { expect } from "@playwright/test";

let customWorld: ICustomWorld = world;

Given("I visit the home page", async () => {
  await customWorld.page?.goto("/");
  await customWorld.page?.waitForLoadState("domcontentloaded");
});

When(
  "I input username {string} and password {string}",
  async (username, password) => {
    let usernameInputField = await customWorld.page?.getByPlaceholder(
      "Username"
    );
    await usernameInputField?.fill(username);

    let passwordInputField = await customWorld.page?.locator(
      'input[name="password"]'
    );
    await passwordInputField?.fill(password);
  }
);

When("I clicks on the home page login button", async () => {
  let loginButton = await customWorld.page?.getByRole("button", {
    name: "Login",
  });
  await loginButton?.click();
});

Then("I should navigate to {string}", async (path: string) => {
  let url = await customWorld.page?.url();
  expect(url).toContain(path);
});
