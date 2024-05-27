const { ApplicationCommandOptionType } = require("discord.js");
const { searchChar } = require("./searchChar/searchChar");
const { boss } = require("./Boss/boss");
const { gild } = require("./gild/gild");
// const { dateList } = require("../commends/searchChar/dateList");
const bossList = require("./Boss/bossList.json");

const commands = [
  {
    name: "검색",
    description: "캐릭정보를 알려줍니다.",
    options: [
      {
        required: true,
        name: "닉네임",
        description: "닉네임을 적어주세요",
        type: ApplicationCommandOptionType.String,
      },
    ],
    execute: searchChar(),
  },
  {
    name: "보스",
    description: "주간/월간 보스의 정보를 알려줍니다.",
    options: [
      {
        required: true,
        name: "보스",
        description: "보스를 선택해주세요",
        type: ApplicationCommandOptionType.String,
        choices: bossList,
      },
    ],
    execute: boss(),
  },
  {
    name: "길드",
    description: "길드 정보를 알려줍니다.",
    options: [
      {
        required: true,
        name: "길드",
        description: "길드명을 적어주세요",
        type: ApplicationCommandOptionType.String,
      },
      // {
      //   required:true,
      //   name:"월드",
      //   description: "월드를 입력해주세요",
      //   type: ApplicationCommandOptionType.String,
      // }
    ],
    execute: gild(),
  },
];

module.exports = {
  commands,
};
