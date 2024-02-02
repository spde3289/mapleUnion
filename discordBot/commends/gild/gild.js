const axios = require("axios");
const apiKey = require("../../../apiKey.json");

const getgild = async (name) => {
  try {
    const gild = await axios.get(
      `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${name}&world_name=%EB%A6%AC%EB%B6%80%ED%8A%B8`,
      {
        headers: apiKey,
      }
    );
    return gild.data;
  } catch (error) {
    return "error";
  }
};

const getGildInfo = async (name) => {
  try {
    let d = new Date();
    let sel_day = -1; //일자를 조절하시면 됩니다. -1이면 하루전/ +1이면 내일
    d.setDate(d.getDate() + sel_day);

    let year = d.getFullYear();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let day = ("0" + d.getDate()).slice(-2);
    let dt = year + "-" + month + "-" + day;
    const oguild_id = await getgild(name).then((res) => res.oguild_id);
    const gildInfo = await axios.get(
      `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${oguild_id}&date=${dt}`,
      {
        headers: apiKey,
      }
    );

    return gildInfo.data;
  } catch (error) {
    return "error";
  }
};

const searchGild = () => async (_, interaction) => {
  const getGild = interaction.options.get("길드")?.value || "";
  // const getWold = interaction.options.get("월드")?.value || "";
  const data = await getGildInfo(getGild);
  let point = 0;
  for (let i in data?.guild_noblesse_skill) {
    point += data?.guild_noblesse_skill[i].skill_level;
  }
  let Embed = {
    fields: [
      {
        name: "노블 포인트",
        value: point + " 포",
      },
    ],
  };

  if (data === "error") {
    Embed = {
      fields: [
        {
          name: "길드명을 다시 입력해주세요.",
          value: "error",
        },
      ],
    };
  }

  await interaction.editReply({
    ephemeral: true,
    embeds: [Embed],
  });
};

module.exports = {
  gild: searchGild,
};
