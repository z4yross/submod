import { ExarotonClient } from './client.js';

export async function addUserToWhitelist(user) {
    try {
        const exarotonClient = await ExarotonClient.getInstance();

        const client = exarotonClient.client;
        const serverID = exarotonClient.server;
        const server = await client.server(serverID);

        const whitelist = await server.getPlayerList("whitelist");
        await whitelist.addEntry(user);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function removeUserFromWhitelist(user) {
    try {
        const exarotonClient = await ExarotonClient.getInstance();

        const client = exarotonClient.client;
        const serverID = exarotonClient.server;
        const server = await client.server(serverID);

        const whitelist = await server.getPlayerList("whitelist");
        await whitelist.deleteEntry(user);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function getWhitelistUsers(){
    try {
        const exarotonClient = await ExarotonClient.getInstance();

        const client = exarotonClient.client;
        const serverID = exarotonClient.server;
        const server = await client.server(serverID);

        const whitelist = await server.getPlayerList("whitelist");
        return await whitelist.getEntries();
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function getAllServers() {
    const client = (await ExarotonClient.getInstance()).client;
    const servers = await client.getServers();

    const serverNames = servers.map(server => `${server.name} (${server.id})`).join('\n');
    return serverNames;
}

export async function setClientServer(serverid) {
    const exaroton = await ExarotonClient.getInstance();
    exaroton.server = serverid;
}