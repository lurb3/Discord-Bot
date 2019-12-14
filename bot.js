var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var jQuery = require('jquery');
const fetch = require('node-fetch');

// Configure logger settings
logger.remove(new logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt, channelID, message) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});



bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        const currentDate = Date();
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'I WILL NOT HELP YOU MOFO!',
                });
            break;

            case 'time':
                bot.sendMessage({
                    to: channelID,
                    message: currentDate,
                })
				
			case 'meme':
				fetch('https://meme-api.herokuapp.com/gimme', {
					method: 'GET',
				})
					.then(response => response.json())
					.then(json => bot.sendMessage({to: channelID, message: json['url']}))
					
            // Just add any case commands if you want to..
         }
     }
});