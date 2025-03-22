import { Given, Then, When, world } from "@cucumber/cucumber";
import { ICustomWorld } from "../../utils/custom_world";
import { expect } from "@playwright/test";

let customWorld: ICustomWorld = world;

Given(
    "I log in to the inventory page with username {string} and password {string}",
    async function (username: string, password: string) {
        const page = customWorld.page;

        if (page) {
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");

            await page.getByPlaceholder("Username").fill(username);
            await page.getByPlaceholder("Password").fill(password);
            await page
                .getByRole("button", {
                    name: "Login",
                })
                .click();
        }
    }
);
