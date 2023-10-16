const { ApplicationCommandOptionType } = require('discord.js');
const { parsing } = require('../fach/fatching');
const { searchChar } = require('./searchChar')

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
    execute: searchChar()
  },
];

module.exports = {
  commands
}