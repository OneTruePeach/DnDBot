const { SlashCommandBuilder } = require('discord.js');
const { DiceRoller, DiscordRollRenderer } = require('dice-roller-parser');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls a die or set of dice")
    .addStringOption((option) =>
      option.setName("roll")
        .setDescription("This works the same way roll20 does.")
        .setRequired(true)),

  async execute(interaction) {
    var rollString = await interaction.options.getString("roll");
    console.log(`${new Date().toLocaleString()} - Main     | Rolling ${rollString}`);

    const diceRoller = new DiceRoller();
    const rollRenderer = new DiscordRollRenderer();
    
    const rollObject = diceRoller.roll(rollString);
    const render = rollRenderer.render(rollObject);
    console.log(`${new Date().toLocaleString()} - Main     | Result: ${render}`);

    await interaction.reply({ content: render });
  },
};