const discord = require('discord.js');
exports.run = async(client, message, args) => {
message.channel.send(new discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`

**●▬▬▬▬▬▬▬【 Yardım Menüm 】▬▬▬▬▬▬▬● **

**● \`u!link ekle (Link)\` ➜ Sisteme Link Eklersiniz.**
**● \`u!link sil (Link)\` ➜ Sistemden Link Silersiniz.**
**● \`u!link liste\` ➜ Linklerinize Bakarsınız.**

**●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●**
`))
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'yardım'
};
