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

When(
    "I add the first {int} items to the cart",
    async (number_of_added_items: number) => {
        const page = customWorld.page;
        if (page) {
            const cardItems = page.locator('div[class="inventory_item"]');
            expect(cardItems).not.toBeNull();

            for (let i = 0; i < number_of_added_items; i++) {
                const currentCard = cardItems.nth(i);
                const currentButton = currentCard.getByRole("button", {
                    name: "Add to cart",
                });

                expect(currentButton).not.toBeNull;

                await currentButton.click();
            }
        }
    }
);

When(
    "I remove {int} items from the cart, starting with the first item displayed",
    async (remove_count: number) => {
        const page = customWorld.page;
        if (page) {
            const cardItems = page.locator('div[class="inventory_item"]');

            for (let i = 0; i < remove_count; i++) {
                const currentCard = cardItems.nth(i);
                const currentButton = currentCard.getByRole("button", {
                    name: "Remove",
                });

                expect(currentButton).not.toBeNull;

                await currentButton.click();
            }
        }
    }
);

Then("I should see {int} items in the cart", async (total_count: number) => {
    const page = customWorld.page;
    if (page) {
        const badge = page.locator('[data-test="shopping-cart-badge"]');
        const count = parseInt(await badge?.innerText()) ?? 0;
        expect(count).toBe(total_count);
    }
});

Then(
    "I should see a {string} button for the remaining items",
    async (button: string) => {
        const page = customWorld.page;
        if (page) {
            const cards = page.locator('div[class="inventory_item"]');
            const removeButtons = cards.locator("button", { hasText: button });
            const count = await removeButtons.count();
            expect(count).toBeGreaterThan(0);
        }
    }
);
