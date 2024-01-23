const cheerio = require("cheerio");
const axios = require("axios");

const getExchangeStatsHtml = async (charName, date) => {
  try {
    return await axios.get(
      `https://maplescouter.com/info?name=${charName}&date=${date}`
    );
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = {
  exchangeStats: async function (charName, date) {
    let ExchangeStats = await getExchangeStatsHtml(charName, date);

    let $ = cheerio.load(ExchangeStats.data);

    let $divs = $(".flex items-center justify-around");
    /* let union = $divs.find("td:nth-child(3)").text(); */
    console.log($divs)

  },
};
