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
    let StatusFields = [];
    let Html = await driver.findElement(
      By.className("flex gap-[20px] mo:flex-col")
    );
    let Text = await Html.getText();

    const arr = Text.split("\n");

    Text.split("\n").filter((el, index) => {
      if (list.includes(el)) {
        // ExchangeStatusFields = setExchangeStatus(arr, index);
        StatusFields.push(setExchangeStatus(arr, index));
      }
    });
    console.log(StatusFields);
    return {
      StatusFields: StatusFields,
      arr: arr,
    };
  } finally {
    await driver.quit();
  }
};

module.exports = {
  selenium: selenium,
};
