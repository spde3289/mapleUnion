const cheerio = require('cheerio');
const axios = require("axios");
const EXP = require('../../EXP.json'); 

const getUnionHTML = async (echoMessage) => {
  try {
    return await axios.get(`https://maplestory.nexon.com/N23Ranking/World/Union?c=${echoMessage}&w=0`)
  } catch (error) {
    console.log(error);
  }
}

const getNomalHTML = async (echoMessage) => {
  try {
    return await axios.get(`https://maplestory.nexon.com/N23Ranking/World/Total?c=${echoMessage}&w=0`)
  } catch (error) {
    console.log(error);
  }
}

const getRebootHTML = async (echoMessage) => {
  try {
    return await axios.get(`https://maplestory.nexon.com/N23Ranking/World/Total?c=${echoMessage}&w=254`)
  } catch (error) {
    console.log(error);
  }
}

// 파싱
module.exports = {
  parsing: async function(echoMessage){
    let UnionHTML = await getUnionHTML(echoMessage);
    let NomalHTML = await getNomalHTML(echoMessage);
    let RebootHTML = await getRebootHTML(echoMessage);

    let $ = cheerio.load(UnionHTML.data);
    let $$ = cheerio.load(NomalHTML.data);
    /** 캐릭터 정보 */
    let $trs = $(".search_com_chk");
    /** 캐릭터 정보 */
    let $$trs = $$(".search_com_chk");

    if ($$trs.html() === null) {
      $$ = cheerio.load(RebootHTML.data);
      $$trs = $$(".search_com_chk");
    }

    /** 유니온 레벨 */
    let union = $trs.find("td:nth-child(3)").text();
    /** 유니온 전투력 */
    let power = $trs.find("td:nth-child(4)").text();
    
    /** 닉네임 */
    let severIcon = $$trs.find("td:nth-child(2)> dl img").attr("src");
    /** 이미지 */
    let charImg = $$trs.find(".char_img > img:nth-child(1)").attr("src");
    /** 직업 */
    let job = $$trs.find("td:nth-child(2) > dl > dd").text();
    /** 레벨 */
    let lv = $$trs.find("td:nth-child(3)").text();
    /** 경험치 */
    let exp = $$trs.find("td:nth-child(4)").text().replace(/,/g, "");
    /** 인기도 */
    let popularity = $$trs.find("td:nth-child(5)").text();
    /** 길드 */
    let guild = $$trs.find("td:nth-child(6)").text();

    EXP.map((el) => {
      if (el.lv === lv.replace("Lv.", "")) {
        exp = ((exp/el.exp)*100).toFixed(3)
      } 
    })

    if (guild === "") {
      guild = "가입된 길드가 없습니다."
    }

    if (union === "" && power === "") {
      union = "대표캐릭터가 아닙니다."
      power = "대표캐릭터가 아닙니다."
    }

    let dataArr = {
      charImg: charImg, 
      severIcon: severIcon,
      job: job,
      union: union,
      power: power,
      lv: lv,
      exp: exp,
      popularity: popularity,
      guild: guild
    };

    if ($$trs.html() === null) {
      return dataArr = null
    }

    return dataArr
  }
} 
