const cheerio = require('cheerio');
const axios = require("axios");

const getHTML = async () => {
  try {
    return await axios.get('https://maplestory.nexon.com/N23Ranking/World/Union?c=%EA%B3%B5%EB%8F%8C%EC%A7%80%EB%A0%81mk1&w=0')
  } catch (error) {
    console.log(error);
  }
}

// 파싱
const parsing = async () => {

  const html = await getHTML();

  const $ = cheerio.load(html.data);

  const $trs = $(".search_com_chk");
  /** 닉네임 */
  const name = $trs.find("td > dl > dt").text(); 
  /** 직업 */
  const job = $trs.find("td > dl > dd").text(); 
  /** 유니온 레벨 */
  const union = $trs.find("td:nth-child(3)").text(); 
  /** 유니온 전투력 */
  const power = $trs.find("td:nth-child(4)").text(); 

  let dataArr = {
    name: name,
    job: job,
    union: union,
    power: power
  };

  console.log(dataArr);
  return union
}

parsing()