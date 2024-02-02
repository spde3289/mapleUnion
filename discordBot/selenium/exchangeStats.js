const { Builder, Browser, By } = require("selenium-webdriver");
const { setExchangeStatus } = require("../commends/searchChar/embeds");
const list = ["환산", "헥사환산"];

const selenium = async (charName, date) => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(
      `https://maplescouter.com/info?name=${charName}&date=${date}`
    );
    /* let ExchangeStatusFields */
    let Html = await driver.findElement(
      By.className("flex gap-[20px] mo:flex-col")
    );
    let Text = await Html.getText();

    const arr = Text.split("\n");

    const ExchangeFields = setExchangeStatus(arr);/* Text.split("\n").filter((el) => {
      if (list.includes(el)) {
        setExchangeStatus(arr)
      }
    }); */

    return {
      ExchangeField: ExchangeFields,
    };
  } finally {
    await driver.quit();
  }
};

module.exports = {
  selenium: selenium,
};
