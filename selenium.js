const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new webdriver.Builder()
  .forBrowser(webdriver.Browser.CHROME)
  .setChromeOptions(/* ... */)
  .setFirefoxOptions(/* ... */)
  .build();

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get("https://www.google.com/ncr");
    console.log(driver)
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
  } finally {
    await driver.quit();
  }
})();
