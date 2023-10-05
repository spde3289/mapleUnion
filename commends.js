const { ApplicationCommandOptionType } = require('discord.js');
const { parsing } = require('./fatching');



const commands = [
  {
    name: "검색",
    description: "캐릭정보를 알려줍니다.",
    options:[
      {
        required:true,
        name:"닉네임",
        description: "닉네임을 적어주세요",
        type:ApplicationCommandOptionType.String
      }
    ],
    execute: async (_, interaction) => {
      const echoMessage = (interaction.options.get("닉네임")?.value || '');
      const data = await parsing(echoMessage);
      let exampleEmbed
      if (data === null) {
        msg = `${echoMessage}일치하는 이름이 없습니다.`
      } else {
        console.log(data)
        exampleEmbed = {
        author: {
          name: echoMessage,
          icon_url: data?.charImg,
          url: data?.charImg,
        },
        data: {
          image: {
          URL: data?.charImg,
          height: 200,
          width: 200
        },
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
            value: data?.exp,
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
      await interaction.followUp({
        ephemeral: true,
        embeds: [exampleEmbed]
      });
    }
  }
];

module.exports = {
  commands
}