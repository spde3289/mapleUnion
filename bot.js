const { REST, Routes } = require('discord.js');
const { token, id } = require('./token.json');

const commands = [
  {
    name: 'dd',
    description: '무야',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(id), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
