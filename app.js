const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');
const { token, id } = require('./token.json');
const { commands } = require('./commends');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const rest = new REST({ version: '10' }).setToken(token);
const exampleEmbed = new EmbedBuilder()

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
});

client.login(token);