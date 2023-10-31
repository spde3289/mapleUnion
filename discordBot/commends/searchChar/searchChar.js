const { AttachmentBuilder } = require('discord.js');
const { parsing } = require('../../fach/fatching');

const searchChar = () => async (_, interaction) => {
  const echoMessage = (interaction.options.get("닉네임")?.value || '');
  const data = await parsing(echoMessage);
  
  let file = new AttachmentBuilder('./discordBot/commends/searchChar/assets/charImg.png');

  if (data === null) {
    file = new AttachmentBuilder('./discordBot/commends/searchChar/assets/no_char_img.png');
    Embed = {
      image: {
        url: "attachment://no_char_img.png",
      },
      fields: [
        {
          name: `${echoMessage} 일치하는 이름이 없습니다.`,
          value: "다시 입력해주세요",
        }
      ],
    }
  } else {
    Embed = {
      author: {
        name: echoMessage,
        icon_url: data?.severIcon,
      },
      image: {
        url: "attachment://charImg.png",
      },
      fields: [
        {
          name: '[직업]',
          value: data?.job,
        },
        {
          name: '[레벨]',
          value: data?.lv,
          inline: true
        },
        {
          name: '[경험치]',
          value: data?.exp + "%",
          inline: true
        },
        {
          name: '[유니온 레벨]',
          value: data?.union,
        }, 
        {
          name: '[유니온 전투력]',
          value: data?.power,
        },
        {
          name: '[인기도]',
          value: data?.popularity,
          inline: true
        },
        {
          name: '[길드]',
          value: data?.guild,
          inline: true
        },
      ],
    };
  }

  await interaction.editReply({
    ephemeral: true,
    files: [file],
    embeds: [Embed],
  }).catch(console.error);
}

module.exports = {
  searchChar: searchChar
}