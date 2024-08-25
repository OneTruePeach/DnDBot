const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls a die or set of dice")
    .addStringOption((option) =>
      option.setName("roll").setDescription("This works the same way roll20 does.").setRequired(true)),

  async execute(interaction) {
    var roll = await interaction.options.getString("roll");

    var total = 0;
    var totals = [];
    var rollComponents = roll.toLowerCase().replace(/\s+/g, "").match(/([+-]?\d*[d]?\d*)/g).filter(n => n);
    try {
        for (let i = 0; i < rollComponents.length; i++) {
            negative = rollComponents[i].startsWith("-");
            if (rollComponents[i].includes("d")){
                let [numDice, dieFaces] = rollComponents[i].split("d");
                if (!parseInt(numDice)) {numDice = 1;}
                var rollTotal = 0;
                for (let i = 0; i < Math.abs(numDice); i++) {
                    rollTotal += (Math.floor(Math.random() * dieFaces) + 1) * (negative ? -1 : 1);
                }
                totals[i] = rollTotal;
                total += rollTotal;
            } else {
                rollTotal = parseInt(rollComponents[i]);
                totals[i] = rollTotal;
                total += rollTotal;
            }
        }
    } catch(e) {
        interaction.reply("Sorry, but I have no idea what you just asked me to roll.");
        console.error(e);
    }

    let diceRolledValue = ``;
    let diceResultsValue = ``;
    for (let i = 0; i < rollComponents.length; i++) {
        diceRolledValue += `${rollComponents[i]}\n`;
        diceResultsValue += `${totals[i]}\n`;
    }

    const embed = new EmbedBuilder()
      .setTitle(`Rolling ${roll}:`)
      .setColor(`#0a560c`)
      .addFields(
        { name: "Dice Rolled:", value: diceRolledValue.toString(), inline: true },
        { name: "Result:", value: diceResultsValue.toString(), inline: true },
        { name: "Total:", value: total.toString(), inline: false },
      )
      .setFooter({ text: "Ping Lily with any issues"});
      await interaction.reply({ embeds: [embed] });
  },
};
