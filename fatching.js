const cheerio = require('cheerio');
const axios = require("axios");

const getHTML = async (echoMessage) => {
  try {
    return await axios.get(`https://maplestory.nexon.com/N23Ranking/World/Union?c=${echoMessage}&w=0`)
  } catch (error) {
    console.log(error);
  }
}

// 파싱
module.exports = {
  parsing: async function(echoMessage){

    const html = await getHTML(echoMessage);

    const $ = cheerio.load(html.data);

    const $trs = $(".search_com_chk");
    /** 이미지 */
    const charImg = $trs.find("td > .char_img > img:first-child").attr("src");
    /** 닉네임 */
    const name = $trs.find("td > dl > dt").text();
    /** 직업 */
    const job = $trs.find("td > dl > dd").text();
    /** 유니온 레벨 */
    const union = $trs.find("td:nth-child(3)").text();
    /** 유니온 전투력 */
    const power = $trs.find("td:nth-child(4)").text();
    let dataArr = {
      charImg: charImg,
      name: name,
      job: job,
      union: union,
      power: power
    };

    if (name === "") {
      return dataArr = null
    }

    return dataArr
  }
} 
