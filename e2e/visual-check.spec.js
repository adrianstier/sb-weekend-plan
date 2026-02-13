import { test } from "@playwright/test";

const BASE = "http://localhost:4173";

test.describe("SB Weekend Plan Visual Check", () => {
  test("mobile view - plan with Friday expanded", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE + "/sb-weekend-plan/");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: "screenshots/mobile-plan-friday.png",
      fullPage: true,
    });
  });

  test("mobile view - all days expanded", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE + "/sb-weekend-plan/");
    await page.waitForTimeout(500);
    // Expand Saturday and Sunday
    const buttons = await page.locator("button").filter({ hasText: /Saturday|Sunday/ });
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await page.waitForTimeout(300);
    }
    await page.screenshot({
      path: "screenshots/mobile-all-expanded.png",
      fullPage: true,
    });
  });

  test("mobile view - summary", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE + "/sb-weekend-plan/");
    await page.waitForTimeout(500);
    await page.locator("button", { hasText: "Summary" }).click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: "screenshots/mobile-summary.png",
      fullPage: true,
    });
  });

  test("desktop view - plan", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(BASE + "/sb-weekend-plan/");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: "screenshots/desktop-plan.png",
      fullPage: true,
    });
  });
});
