const bossInfo = require("./bossInfo.json")

const boss = () => async (_, interaction) => {
  const currentBoss = (interaction.options.get("보스")?.value || '');

  let fields = []

  let str = `**`

  bossInfo.map(el => {
    if (el.name === currentBoss) {
      el.mode.map(property => {
        for (const value in property) str += `${property[value]} \n`
        fields.push({
          name: "",
          value: str,
        })
        str = `** ` 
      })
    }
  })

  let Embed = {
    color: 0x0099FF,
    author: {
      name: currentBoss,
    },
    fields: fields

  }

  await interaction.editReply({
    ephemeral: true,
    embeds: [Embed]
  });
}

module.exports = {
  boss: boss
}