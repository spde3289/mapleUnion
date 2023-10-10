const cheerio = require('cheerio');
const axios = require("axios");

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

  const $trs = $("table:nth(1) > tbody > tr");
  const $$trs = $("table:nth(2) > tbody > tr");
  const $$$trs = $("table:nth(3) > tbody > tr");

  await $trs.each( async (_, tag) => {
    /* console.log($(tag).find, i) */
    let lv = $(tag).find("td:nth(0)").text()
    let exp = $(tag).find("td:nth(1)").text()

    if (lv && exp) {

      var json = 
      {
        lv: lv.split(" ")[0],
        exp: exp.replace(/,/g, "").split("[")[0]
      }
      
    }
    console.log(json)
  })

  await $$trs.each( async (_, tag) => {
    /* console.log($(tag).find, i) */
    let lv = $(tag).find("td:nth(0)").text()
    let exp = $(tag).find("td:nth(1)").text()

    if (lv && exp) {

      var json = 
      {
        lv: lv.split(" ")[0],
        exp: exp.replace(/,/g, "").split("[")[0]
      }
      
    }
    console.log(json)
  })

  await $$$trs.each( async (_, tag) => {
    let lv = $(tag).find("td:nth(0)").text()
    let exp = $(tag).find("td:nth(1)").text()

    if ((lv && exp)) {

      var json = {
        lv: lv.split(" ")[0],
        exp: exp.replace(/,/g, "").split("[")[0]
      }
    }
    console.log(json)
  })

}

parsing()
