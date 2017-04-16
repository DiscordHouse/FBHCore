/* Linkable cog */
bot.cogs.set("8ball", "function": function (bot, msg, suffix) {
  var response = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes, definitely', 'You may rely on it',
  'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes',
  'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
  "Don't count on it", 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
  if (suffix) return msg.channel.sendMessage('\u200B:8ball: ' + response[Math.floor(Math.random() * response.length)]);
  return msg.channel.sendMessage('\u200B**I cannot predict, if you don\'t tell me what to predict...**');
});
