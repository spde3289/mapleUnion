const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { parsing } = require('./fatching');

const exampleEmbed = new EmbedBuilder()

/* const exampleEmbed = {
	color: 0x0099ff,
	title: 'Some title',
	description: 'Some description here',
	fields: [
		{
			name: 'Regular field title',
			value: 'Some value here',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
	],

	timestamp: new Date().toISOString(),
	footer: {
		text: 'Some footer text here',
		icon_url: 'https://i.imgur.com/AfFp7pu.png',
	},
}; */

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
        console.log(data);
        msg = `${echoMessage}일치하는 이름이 없습니다.`
      } else {
        exampleEmbed = {
        title: data?.name,
        fields: [
          {
            name: '[직업]',
            value: data?.job
          },
          {
            name: '[유니온 레벨]',
            value: data?.union
          },
          {
            name: '[유니온 전투력]',
            value: data?.power
          }
        ]
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