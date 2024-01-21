const axios = require("axios");
const apiKey = require("../../../apiKey.json");

/* const getOcid = async (charName) => {
  try {
    return await axios
      .get(
        `https://open.api.nexon.com/maplestory/v1/id?character_name=${charName}`,
        {
          headers: apiKey,
          
        }
      );
  } catch (error) {
    console.log(error);
  }
}; */

const getgild = async (name) => {
  try {
    const gild = await axios.get(
      `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${name}&world_name=%EB%A6%AC%EB%B6%80%ED%8A%B8`,
      {
        headers: apiKey,
      }
    );

    return gild.data
  } catch (error) {
    console.log(error);
  }
};

/* const a = getOcid("드누다"); */

const getGildInfo = async (name) => {
  try {
    const oguild_id = await getgild(name).then((res) => res.oguild_id);
    const gildInfo = await axios.get(
      `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${oguild_id}&date=2024-01-16`,
      {
        headers: apiKey,
      }
    );

    return gildInfo.data;
  } catch (error) {
    console.log(error);
  }
};

const searchGild = () => async (_, interaction) => {
  const echoMessage = interaction.options.get("길드")?.value || "";
  const data = await getGildInfo(echoMessage);

  let point = 0
  for (let i in data.guild_noblesse_skill) {
    console.log(i, data.guild_noblesse_skill[i].skill_level);
    point += data.guild_noblesse_skill[i].skill_level;
  }
  let Embed = {
    fields: [
      {
        name: "노블 포인트",
        value: point + " 포",
      },
    ],
  };

  await interaction.editReply({
    ephemeral: true,
    embeds: [Embed],
  });
};

module.exports = {
  gild: searchGild,
};
