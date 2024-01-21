const axios = require("axios");
const apiKey = require("./apiKey.json");

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
    return await axios.get(
      `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${name}&world_name=%EB%A6%AC%EB%B6%80%ED%8A%B8`,
      {
        headers: apiKey,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

/* const a = getOcid("드누다"); */

const getaaa = async (name) => {
  try {
    const a = await getgild(name).then((res) => res.data.oguild_id);

    return await axios.get(
      `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${a}&date=2024-01-16`,
      {
        headers: apiKey,
      }
    )
  } catch (error) {
    console.log(error);
  }
};

const aaa = (name) => async (name) => {
  /* const echoMessage = interaction.options.get("길드")?.value || ""; */
  const data = await getaaa(name);
  /*   let Embed = {
    fields: [
      {
        name: "포인트",
        value: data.data.guild_noblesse_skill,
      },
    ],
  };

  await interaction.editReply({
    ephemeral: true,
    embeds: [Embed],
  }); */
  console.log(data.data.guild_noblesse_skill);
  return data.data.guild_noblesse_skill;
};
console.log(getaaa('별을삼킨고래').data)
getaaa('별을삼킨고래');

/* module.exports = {
  gild: aaa,
}; */
