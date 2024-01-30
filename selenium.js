const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


(async function example() {
  const list = ["환산", "헥사환산"];
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(
      "https://maplescouter.com/info?name=%EA%B3%B5%EB%8F%8C%EC%A7%80%EB%A0%81mk1&date=2024-01-24"
    );
    let s = await driver.findElement(
      By.className("flex gap-[20px] mo:flex-col")
    );
    let ss = await s.getText();

    console.log(ss.split("\n").map((el) => list.includes(el)));
    console.log(ss.split("\n").find( el => list.includes(el)));
  } finally {
    await driver.quit();
  }
})();
