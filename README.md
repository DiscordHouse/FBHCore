# FBHCore
FBHCore is a Discord.js webpack injector, that can be used with "Cogs/Extensions", that extend functionality of your bot. Additions to the library are welcome.

## Using it
```js
var bot = new fbhInstance();
bot.login('token');
bot.setCog('cog link');
```
NOTE: You'll have to bundle your own interface with the core.

## Features
Injects a layer of FBH options and cogs in Discord.js webpack version

## Cogs
Cogs are the "commands" or "brains" of the bot, which should make the bot more functional than before. Using cogs, it's possible to convert your existing Discord.js bot to a FBH cog.
