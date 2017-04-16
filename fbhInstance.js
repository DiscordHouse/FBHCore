class fbhInstance extends Discord.Client {
  constructor (options) {
    super();
    this.cogs = new Map();
    this.fbhOptions = {};
    this.fbhOptions.prefix = '<<';
    this.fbhOptions.owners = [];
    for (var key in options) {
      this.fbhOptions[key] = options[key];
    }
    this.cogs.set('ping', {"function": function (bot, msg) {
      msg.reply('pong! My ping is ' + Math.floor(bot.ping) + 'ms.');
    }});
    this.cogs.set('say', {"function": function (bot, msg, suffix) {
      msg.channel.sendMessage('\u200B' + suffix.replace(/@/, '@\u200B'));
    }});
    this.cogs.set('eval', {"function": function (bot, msg, suffix) {
      if (bot.fbhOptions.owners.indexOf(msg.author.id) > -1) {
        try {
          var result = eval(suffix);
          msg.channel.sendMessage('Evaluation was successful!\n\n' + result);
        } catch (e) {
          msg.channel.sendMessage('Sorry! The evaluation failed!\n\n```' + e + '```');
        }
      } else {
        msg.reply('Not permitted.');
      }
    }});
    this.on('ready', () => {
      console.log('FBH is ready!');
    });
    this.on('message', m => {
      if (!m.author.bot && m.content.startsWith(this.fbhOptions.prefix)) {
        var base = m.content.substr(this.fbhOptions.prefix.length).split(' ');
        var command = base[0];
        if (this.cogs.has(command)) {
          this.cogs.get(command).function(this, m, m.content.substr(this.fbhOptions.prefix.length + base[0].length + 1));
          console.log('%c[CogHandler] %cExecuted cog %c' + command + '!', 'color: #a0a;', 'color: #000;', 'color: #d0d;')
        }
      }
    });
  }
  setCog (cogResolvable) {
    var bot = this;
    if (typeof cogResolvable === 'object') {
      this.cogs.set(cogResolvable.name, cogResolvable.function);
    } else if (typeof cogResolvable === 'string') {
      if (cogResolvable.startsWith('https://')) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function (evt) {
          if (xhr.responseText.startsWith('/* Linkable cog */')) {
            try {
              eval(xhr.responseText); //eslint-disable-line
              return console.log('%c[CogHandler] %cLoaded cog through link!', 'color: #a0a;', 'color: #000;')
            } catch (e) {
              return console.error('%c[CogHandler] %cInvalid cog!', 'color: #a0a;', 'color: #000;');
            }
          } else {
            return console.error('%c[CogHandler] %cInvalid cog link!', 'color: #a0a;', 'color: #000;');
          }
        }
        xhr.open('GET', cogResolvable, true)
        xhr.send();
      }
    }
  }
}
