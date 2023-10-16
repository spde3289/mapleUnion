const cheerio = require('cheerio');
const axios = require("axios");
const fs = require("fs");

const getHTML = async () => {
  try {
    return await axios.get(`https://namu.wiki/w/%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC/%EC%8B%9C%EC%8A%A4%ED%85%9C/%EA%B2%BD%ED%97%98%EC%B9%98#s-3.1`)
  } catch (error) {
    console.log(error);
  }
}

// 파싱
const parsing = async() => {

  const html = await getHTML();

  const $ = cheerio.load(html.data);

  const json = []

  const crawlingModule = (html) => {
    
    const $trs = $(html);

    $trs.each((_, tag) => {
      let lv = $(tag).find("td:nth(0)").text().split(" ")[0]
      let exp = $(tag).find("td:nth(1)").text().replace(/,/g, "").split("[")[0]
      if (lv && exp) {
        if (!isNaN(+lv)) {
          json.push({lv: lv, exp: exp}) 
        }
      }
    })
  }

  crawlingModule("table:nth(1) > tbody > tr");
  crawlingModule("table:nth(2) > tbody > tr");
  crawlingModule("table:nth(3) > tbody > tr");

  const stringJson = JSON.stringify(json)
  fs.writeFileSync("product.json", stringJson)

}

parsing()
