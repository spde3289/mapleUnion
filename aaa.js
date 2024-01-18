const axios = require("axios");

const getOcid = async (charName) => {
  try {
    return await axios.get(
      `https://open.api.nexon.com/maplestory/v1/id?character_name=${charName}`,
      {
        headers: {
          "x-nxopen-api-key":"test_4908b69993a7927867b594b3465b758677f3ba9234cd00f6e23427686e1e417ea3cd8bbb6f6efef735e120e12c0403a2",
        }
      }
    ).then(data=>data.data)
  } catch (error) {
    console.log(error);
  }
};

const a = getOcid("드누다").then((data) => console.log(data.data));
console.log(a)
console.log(getOcid("드누다"));