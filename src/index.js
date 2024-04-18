import puppeteer from "puppeteer-core";
import URLS from "./urls.js";

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.setViewport({ width: 1280, height: 1024 });

  for (let index = 0; index < URLS.length; index++) {
    await page.goto(URLS[index], {
      waitUntil: ["load", "domcontentloaded"],
    });

    await page.screenshot({
      type: "png",
      path: `../photos/screenshot-${index}.png`,
      fullPage: true,
    });
  }

  await browser.close();
})();
