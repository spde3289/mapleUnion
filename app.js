const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//const { token } = require('./token.json');
const { REST, Routes } = require('discord.js');
const { token, id } = require('./token.json');
const cheerio = require('cheerio');
const axios = require("axios");

const commands = [
  {
    name: 'ping',
    description: 'pong',
  },
  {
    name: '이름',
    description: '이름임',
  },
  {
    name: '유니온',
    description: '유니온임',
  },
];

const getHTML = async () => {
  try {
    return await axios.get('https://maplestory.nexon.com/N23Ranking/World/Union?c=%EA%B3%B5%EB%8F%8C%EC%A7%80%EB%A0%81mk1&w=0')
  } catch (error) {
    console.log(error);
  }
}

// 파싱
const parsing = async () => {

  const html = await getHTML();

  const $ = cheerio.load(html.data);

  const $trs = $(".search_com_chk");
  /** 닉네임 */
  const name = $trs.find("td > dl > dt").text(); 
  /** 직업 */
  const job = $trs.find("td > dl > dd").text(); 
  /** 유니온 레벨 */
  const union = $trs.find("td:nth-child(3)").text(); 
  /** 유니온 전투력 */
  const power = $trs.find("td:nth-child(4)").text(); 

  dataArr = {
    name: name,
    job: job,
    union: union,
    power: power
  };
  console.log(dataArr);
  return union;
}
parsing()
const rest = new REST({ version: '10' }).setToken(token);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands(id), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('pong');
  }
  if (interaction.commandName === '이름') {

    const user = interaction.options.getUser('target');
    await interaction.reply(`${user}입니다.`);
  }
  if (interaction.commandName === '유니온') {
    const html = await axios.get('https://maplestory.nexon.com/N23Ranking/World/Union?c=%EA%B3%B5%EB%8F%8C%EC%A7%80%EB%A0%81mk1&w=0')

    const $ = cheerio.load(html.data);

    const $trs = $(".search_com_chk");
    /** 닉네임 */
    const name = $trs.find("td > dl > dt").text(); 
    /** 직업 */
    const job = $trs.find("td > dl > dd").text(); 
    /** 유니온 레벨 */
    const union = $trs.find("td:nth-child(3)").text(); 
    /** 유니온 전투력 */
    const power = $trs.find("td:nth-child(4)").text(); 

    await interaction.reply(`${name}의 유니온 레벨은 ${union}이고 전투력은${power} 직업은 ${job}입니다.`);
  }


});

client.login(token);