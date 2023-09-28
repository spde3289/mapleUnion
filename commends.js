const { ApplicationCommandOptionType } = require('discord.js');
const { parsing } = require('./fatching');

const commands = [
  {
    name: "안녕",
    description: "인사입니다.",
    execute: async (_, interaction) => {
      await interaction.followUp({
        ephemeral: true,
        content: `${interaction.user.globalName} 반가워`
      });
    }
  },
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
      let msg
      if (data === null) {
        console.log(data);
        msg = `${echoMessage}일치하는 이름이 없습니다.`
      } else {
        msg = `${data?.name}의 유니온 레벨은 ${data?.union}이고 전투력은${data?.power} 직업은 ${data?.job}입니다.`
      }
      await interaction.followUp({
        ephemeral: true,
        content: msg
      });
    }
  }
];

module.exports = {
  commands
}