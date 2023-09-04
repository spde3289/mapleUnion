const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const { REST, Routes } = require('discord.js');
const { token, id } = require('./token.json');
const { commands } = require('./commends');

const rest = new REST({ version: '10' }).setToken(token);

try {
  console.log('Started refreshing application (/) commands.');
  rest.put(Routes.applicationCommands(id), { body: commands });
  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  
  if (!interaction.isChatInputCommand()) return;
  
  if (interaction.isCommand()) {
    //등록한 명령어를 찾아서
    const currentCommand = commands.find(({name}) => name === interaction.commandName);
    if(currentCommand){
      await interaction.deferReply();
      //실행해준다. 
      currentCommand.execute(client, interaction);
      console.log(`info: command ${currentCommand.name} handled correctly`)
    }
  }
  
/*   if (interaction.commandName === '유니온') {
    const data = await parsing()
    await interaction.reply(`${data.name}의 유니온 레벨은 ${data.union}이고 전투력은${data.power} 직업은 ${data.job}입니다.`);
  }; */
});

client.login(token);