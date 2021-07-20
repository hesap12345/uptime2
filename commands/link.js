const Discord = require('discord.js');
const data = require('quick.db');
const moment = require('moment');
const kontrol = require('node-fetch');
const checker = require('site-checker');
moment.locale('tr');

exports.run = async (client, message, args) => {
let argümanlar = ['ekle', 'sil', 'liste'];
if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● Bir argüman belirtmelisin: \`ekle, sil, liste\`** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬● **`))
if(!argümanlar.includes(args[0].toLowerCase())) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● Bir argüman belirtmelisin: \`ekle, sil, liste\`** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬● **`))

if(args[0].toLowerCase() === 'ekle') {

if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● Bir link belirtmelisin.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`));
if(!args[1].startsWith('https://')) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● \`${args[1]}\`, geçersiz bir link.** \n **● \`HTTPS\` ile başlamasına özen göster.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`))
const linkler = await data.fetch('chimped');
if(linkler) {
if(linkler.find(a => a.site === args[1])) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● \`${linkler.length}\` link arasında senin yazdığın \`${args[1]}\` linkide var. Aynı linki tekrar ekleyemem.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`));
}
data.push('chimped', { site: args[1], sahipID: message.author.id, sahipTag: message.author.tag, sahipName: message.author.username, eklenmeTarihi: moment(Date.now()).format('DD/MM/YYYY HH:mm') })
message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`●▬▬▬▬▬▬▬【 Başarılı!】▬▬▬▬▬▬▬● \n\n **● \`${args[1]}\` linki için \`Uptime\` başladı. Hizmetimizi kullandığınız için teşekkürler!** \n\n ●▬▬▬▬▬▬▬【 ▬▬▬ 】▬▬▬▬▬▬▬● `));


}

if(args[0].toLowerCase() === 'sil') {
const linkler = await data.fetch('chimped');
if(!linkler) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● Daha önce hiç link eklenmemiş.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`));
if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● Bir link belirtmelisin.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`));
if(!args[1].startsWith('https://')) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● \`${args[1]}\`, geçersiz bir link.** \n **● \`HTTPS\` ile başlamasına özen göster.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`))
if(!linkler.filter(a => a.sahipID === message.author.id).find(c => c.site === args[1])) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **Veri tabanımızda sana ait olan \`${linkler.filter(c => c.sahipID === message.author.id).length}\` link arasında \`${args[1]}\` linkini bulamadık.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`))
if(!linkler.find(a => a.site === args[1])) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **Görünüşe göre veritabanımızda \`${linkler.length}\` link içerisinde \`${args[1]}\` linkide bulunmuyor.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`));

if(linkler.length == 1) {
data.delete('chimped');
return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬▬▬▬▬▬▬【 Başarılı!】▬▬▬▬▬▬▬** \n\n **● \`${args[1]}\` linki \`${linkler.length}\` link arasından bulundu ve silindi.** \n\n **●▬ ▬▬ ▬▬【 ▬▬▬ 】▬▬▬▬▬▬▬ **`))
} else {
let ex = [];
linkler.forEach(db => {
if(db.site === args[1]) return;
ex.push(db)
data.set('chimped', ex)
})
message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬ ▬▬【 Başarılı!】▬▬▬▬▬▬▬** \n\n **● \`${args[1]}\` linki \`${linkler.length}\` link arasından bulundu ve silindi. Şu anda senin: \`${linkler.filter(c => c.sahipID === message.author.id).length-1}\` linkin aktif durumda.** \n\n **●▬ ▬▬ ▬▬【 ▬▬▬ 】▬▬▬▬▬▬▬ **`))
}

}

if(args[0].toLowerCase() === 'liste') {
const linkler = await data.fetch('chimped');
if(!linkler) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● Daha önce hiç link eklenmemiş.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`));
  if(!linkler.filter(a => a.sahipID === message.author.id)) return message.channel.send(new Discord.MessageEmbed() .setColor('#5dffd8') .setDescription(`**●▬ ▬▬▬▬▬【 Hata! 】▬▬▬▬▬ ▬● ** \n\n **● Daha önce hiç link Eklememişsin.** \n\n **●▬ ▬▬▬▬▬【 ▬ ▬ 】▬▬▬▬▬ ▬●**`));
if(args[1]) {
if(args[1].toLowerCase() === 'hepsi') {
    if(message.author.id == "813133125836079134" || message.author.id == "497125142590128128" | message.author.id == "708746139092123679" ) {
let a = [];
linkler.forEach(s => a.push(`${s.site} ~ Ekleyen: ${s.sahipTag} ~ Eklenme tarihi: ${s.eklenmeTarihi}`));
message.channel.send('```'+a.join('\n')+'```')
}}
} else {
  
const embed = new Discord.MessageEmbed().setColor('#5dffd8').setAuthor(message.author.username, message.author.avatarURL());
linkler.filter(a => a.sahipID === message.author.id).forEach(s => {
embed.addField(s.site, `**\`• Eklenme tarihi: ${s.eklenmeTarihi}\`**`);
})
message.channel.send(embed.setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Toplamda \`${linkler.length}\` link bulundu.
• Bunlardan \`${linkler.filter(a => a.sahipID === message.author.id).length}\` tanesi senin.**
**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`));
}
}


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'link'
};

