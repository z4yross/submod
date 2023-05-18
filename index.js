import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Client, Events, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import tokenConfig from './config.json' assert { type: "json" };

import * as exaroton from './exaroton/manageUserLists.js';

import * as Messages from './messages/messages.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    let filePath = path.join(commandsPath, file);

    if (process.platform === 'win32') {
        filePath = `file:///${filePath.replace(/\\/g, '/')}`;
    }

    console.log(`Loading command file: ${filePath}`);

    const module = await import(filePath);
    const command = module.default;

    console.log(`Loaded command ${command.data.name}`);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Invalid command file: ${filePath}`);
    }
}

const rest = new REST().setToken(tokenConfig.token);

(async () => {
    try {
        console.log(`Started refreshing ${client.commands.size} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(tokenConfig.clientId, tokenConfig.guildId),
            { body: client.commands.map(command => command.data.toJSON()) },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
    const oldMemberRoles = oldMember.roles.cache.map(role => role.name);
    const newMemberRoles = newMember.roles.cache.map(role => role.name);

    const newMemberNickname = newMember.nickname;

    if (!oldMemberRoles.includes(tokenConfig.role) && !newMemberRoles.includes(tokenConfig.role)) return;
    if (oldMemberRoles.includes(tokenConfig.role) && newMemberRoles.includes(tokenConfig.role)) return;

    if (newMemberNickname === null) {
        const message = Messages.warning(`**submod log warning**: ***${newMember.user.username}*** does not have a nickname, are you sure you want to add them to the whitelist?`);
        const modlogChannel = newMember.guild.channels.cache.find(channel => channel.name === 'modlog');
        if (modlogChannel) {
            modlogChannel.send(message);
        }
    }

    const userNameToAdd = newMemberNickname === null ? newMember.user.username : newMemberNickname;

    if (newMemberRoles.includes(tokenConfig.role) && !oldMemberRoles.includes(tokenConfig.role)) {
        const modlogChannel = newMember.guild.channels.cache.find(channel => channel.name === 'modlog');
        if (modlogChannel) {
            let message = Messages.success(`**submod log**:*** ${userNameToAdd}*** added to whitelist.`);

            try {
                await exaroton.addUserToWhitelist(userNameToAdd);
            } catch (error) {
                message = Messages.error(`**submod log __error__**: ***${userNameToAdd}*** could not be added to whitelist. Error: *${error}*`);
            }

            modlogChannel.send(message);
        }
    } else if (!newMemberRoles.includes(tokenConfig.role) && oldMemberRoles.includes(tokenConfig.role)) {
        const modlogChannel = newMember.guild.channels.cache.find(channel => channel.name === 'modlog');
        if (modlogChannel) {
            let message = Messages.success(`**submod log**: ***${userNameToAdd}*** removed from whitelist.`);

            try {
                await exaroton.removeUserFromWhitelist(userNameToAdd);
            } catch (error) {
                message = Messages.error(`**submod log __error__**: ***${userNameToAdd}*** could not be removed from whitelist. Error: *${error}*`);
            }

            modlogChannel.send(message);
        }
    }
});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(tokenConfig.token);