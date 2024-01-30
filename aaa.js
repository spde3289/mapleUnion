const { Builder, Browser, By } = require("selenium-webdriver");
const { setExchangeStatus } = require("./discordBot/selenium/embeds");
const list = ["환산", "헥사환산"];

const selenium = async (charName, date) => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(
      `https://maplescouter.com/info?name=${charName}&date=${date}`
    );
    let s = await driver.findElement(
      By.className("flex gap-[20px] mo:flex-col")
    );
    let ss = await s.getText();

    const arr = ss.split("\n");

    ss.split("\n").filter((el, index) => {
      if (list.includes(el)) setExchangeStatus(arr, index);
    });
  } finally {
    /* await driver.quit(); */
  }
};

selenium("공돌지렁mk1", "2024-01-26"); 

module.exports = {
  selenium: selenium,
};
