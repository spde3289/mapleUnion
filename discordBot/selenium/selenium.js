const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(
      "https://maplescouter.com/info?name=%EA%B3%B5%EB%8F%8C%EC%A7%80%EB%A0%81mk1&date=2024-01-24"
    );
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    let textBox = await driver.findElement(By.name("my-text"));
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
    console.log(textBox);
  } finally {
    await driver.quit();
  }
})();
