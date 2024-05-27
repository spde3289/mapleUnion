const { AttachmentBuilder } = require("discord.js");
const { parsing } = require("../../fach/fatching");
// const { selenium } = require('../../selenium/exchangeStats')

const searchChar = () => async (_, interaction) => {
  const name = interaction.options.get("닉네임")?.value || "";
  // const date = interaction.options.get("날짜")?.value || "";
  const data = await parsing(name);
  // const { ExchangeField } = await selenium(name, date);

  let file = new AttachmentBuilder(
    "./discordBot/commends/searchChar/assets/charImg.png"
  );

  if (data === null) {
    file = new AttachmentBuilder(
      "./discordBot/commends/searchChar/assets/no_char_img.png"
    );
    Embed = {
      image: {
        url: "attachment://no_char_img.png",
      },
      fields: [
        {
          name: `${name} 일치하는 이름이 없습니다.`,
          value: "다시 입력해주세요",
        },
      ],
    };
  } else {
    Embed = {
      author: {
        name: name,
        icon_url: data?.severIcon,
      },
      image: {
        url: "attachment://charImg.png",
      },
      fields: [
        {
          name: "[직업]",
          value: data?.job,
        },
        {
          name: "[레벨]",
          value: data?.lv,
          inline: true,
        },
        {
          name: "[경험치]",
          value: data?.exp + "%",
          inline: true,
        },
        {
          name: "[유니온 레벨]",
          value: data?.union,
        },
        {
          name: "[인기도]",
          value: data?.popularity,
          inline: true,
        },
        {
          name: "[길드]",
          value: data?.guild,
          inline: true,
        },
      ],
    };
    StatsEmbed = {
      fields: [
        {
          name: `${name}의 환산 주스텟`,
          value: `환산 주스텟은 [여기](https://maplescouter.com/info?name=${name})`,
        },
      ],
    };
  }

  await interaction
    .editReply({
      ephemeral: true,
      files: [file],
      embeds: [Embed, StatsEmbed],
    })
    .catch(console.error);
};

module.exports = {
  searchChar: searchChar,
};
