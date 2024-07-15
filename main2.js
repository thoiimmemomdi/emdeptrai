const { Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios');

const token = "";
const clientId = "1256497884766011534";
const botstatus = "Kurumi Bypass";
const madeby = "Hoàng Long Calisthenic";
const endpoint = "http://45.90.13.151:6041";
const apikey = "YOUR_API_KEY"; // Make sure to set your API key here

const client = new Client({ intents: 3276799 });
const rest = new REST({ version: '9' }).setToken(token);

const commands = [
    {
        name: 'delta',
        description: 'Bypass Delta Links',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Delta link',
                required: true,
            },
        ],
    },
    {
        name: 'fluxus',
        description: 'Bypass Fluxus Links',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Fluxus link',
                required: true,
            },
        ],
    },
    {
        name: 'linkvertise',
        description: 'Bypass Linkvertise Links',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Linkvertise link',
                required: true,
            },
        ],
    },
    {
        name: 'codex',
        description: 'Whitelist Your Codex',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Codex link',
                required: true,
            },
        ],
    },
    {
        name: 'supported',
        description: 'Gets Supported List',
    },
    {
        name: 'apistatus',
        description: 'Gets The API Status',
    },
];

client.once('ready', async () => {
    console.log(`\x1b[36mSuccessfully Logged In As ${client.user.username}\x1b[0m`);

    try {
        console.log('Started refreshing global application (/) commands.');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log('Successfully reloaded global application (/) commands.');
    } catch (error) {
        console.error(error);
    }

    client.user.setPresence({
        activities: [{ name: botstatus }],
        status: 'dnd',
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'delta':
            await bypassDelta(interaction);
            break;
        case 'fluxus':
            await bypassFluxus(interaction);
            break;
        case 'linkvertise':
            await bypassLinkvertise(interaction);
            break;
        case 'codex':
            await codex(interaction);
            break;
        case 'supported':
            await supported(interaction);
            break;
        case 'apistatus':
            await apistatus(interaction);
            break;
        default:
            break;
    }
});

// Existing bypassDelta, bypassFluxus, bypassLinkvertise, supported, and apistatus functions

async function codex(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    await interaction.reply({
        embeds: [{
            title: "Whitelisting Your Codex",
            thumbnail: { url: 'https://play-lh.googleusercontent.com/6kNoyUFDekYr1Z9Yq-Q984J3eEFSqdxbATM6O9L5rBjZANOkXUF6p7z-QBRz1thh0Q0=w240-h480' },
            fields: [
                { name: 'Status', value: '```May take a while...```' }
            ]
        }],
    });

    if (link.startsWith('https://mobile.codex.lol?token=') || link.startsWith('https://mobile.codex.loltoken=')) {
        const token = link.split('=')[1];
        const apiUrl = `https://stickx.top/api-codex/?token=${token}&api_key=${apikey}`;

        try {
            const start = Date.now(); 
            const response = await axios.get(apiUrl);
            const end = Date.now();
            const time = (end - start) / 1000; 

            if (response.data.key === "CodeX completed!!") {
                await interaction.editReply({
                    embeds: [{
                        title: "Successfully Whitelisted Codex",
                        thumbnail: { url: 'https://play-lh.googleusercontent.com/6kNoyUFDekYr1Z9Yq-Q984J3eEFSqdxbATM6O9L5rBjZANOkXUF6p7z-QBRz1thh0Q0=w240-h480' },
                        fields: [
                            { name: 'Status:', value: '```Successfully Whitelisted. Wait Up To A Minute Or Restart Roblox.```' },
                            { name: 'Token:', value: `${box}${token}${box}` },
                            { name: 'Time Taken:', value: `${box}${time} Seconds${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });            
            } else {
                await interaction.editReply({
                    embeds: [{
                        title: "Failed To Whitelist Codex",
                        thumbnail: { url: 'https://play-lh.googleusercontent.com/6kNoyUFDekYr1Z9Yq-Q984J3eEFSqdxbATM6O9L5rBjZANOkXUF6p7z-QBRz1thh0Q0=w240-h480' },
                        fields: [
                            { name: 'Status:', value: '```Either Token Is Invalid Or Api Is Not Working.```' },
                            { name: 'Token:', value: `${box}${token}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });                       
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [{
                    title: "Failed To Whitelist Codex",
                    thumbnail: { url: 'https://play-lh.googleusercontent.com/6kNoyUFDekYr1Z9Yq-Q984J3eEFSqdxbATM6O9L5rBjZANOkXUF6p7z-QBRz1thh0Q0=w240-h480' },
                    fields: [
                        { name: 'Status:', value: '```Either Api Is Offline Or Not Responding.```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                    }
                }],
            });         
        }
    } else {
        await interaction.editReply({
            embeds: [{
                title: "Invalid Codex Link",
                fields: [
                    { name: 'Link', value: `${box}${link}${box}` }
                ]
            }]
        });
    }
}


async function bypassDelta(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    if (!link.startsWith("https://gateway.platoboost.com/a/")) {
        await interaction.reply({
            embeds: [{
                title: "Kurumi Bypass",
                color: 16713222,
                fields: [
                    { name: 'Message:', value: '```ml\n Dùng Lệnh /supported Để Lấy Danh Sách Hỗ Trợ Bypass \n```' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                }
            }],
        });  
        return;
    }

    await interaction.reply({
        embeds: [{
            title: "Kurumi Bypass",
thumbnail: { url: 'https://play-lh.googleusercontent.com/qOluLC7Psrhzemw7xIbApADiUyFLSjDZBewYkkPj8LbkWSptL8Hfay77r7Pnlj0WbQ' },
            color: 587253,
            fields: [
                { name: 'Status', value: '```Vui Lòng Đợi Bypass...```' }
            ],
            footer: {
                text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
            }
        }],
    });

    try {
        const apiUrl = `${endpoint}/?url=${link}`;
        const response = await axios.get(apiUrl);
        const json = response.data;

        if (json.status === "success") {
            await interaction.editReply({
                embeds: [{
                    title: "Kurumi Bypass",
                    color: 458532,
                    thumbnail: { url: 'https://play-lh.googleusercontent.com/qOluLC7Psrhzemw7xIbApADiUyFLSjDZBewYkkPj8LbkWSptL8Hfay77r7Pnlj0WbQ' },
                    fields: [
                        { name: 'Key:', value: `${box}${json.key}${box}` },
                        { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                    }
                }],
            });     
        } else {
            await interaction.editReply({
                embeds: [{
                    title: "Kurumi Bypass",
                    color: 16713222,
                    thumbnail: { url: 'https://play-lh.googleusercontent.com/qOluLC7Psrhzemw7xIbApADiUyFLSjDZBewYkkPj8LbkWSptL8Hfay77r7Pnlj0WbQ' },
                    fields: [
                        { name: 'Message:', value: '```ml\nEither Hwid Is Invalid Or Api Is Not Working.\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                    }
                }],
            });                       
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply({
            embeds: [{
                title: "Kurumi Bypass",
                color: 16713222,
                thumbnail: { url: 'https://play-lh.googleusercontent.com/qOluLC7Psrhzemw7xIbApADiUyFLSjDZBewYkkPj8LbkWSptL8Hfay77r7Pnlj0WbQ' },
                fields: [
                    { name: 'Message:', value: '```ml\n......\n```' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                }
            }],
        });         
    }
}

async function bypassFluxus(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    if (!link.startsWith("https://flux.li/android/external/start.php?HWID=")) {
        await interaction.reply({
            embeds: [{
                title: "Kurumi Bypass",
thumbnail: { url: 'https://play-lh.googleusercontent.com/4BnKk8iK35DaOKhbIvCCTOE3Fl7uokNAvoZNl1HjgFUpvsvcMWNI2HKYaMXMbcryNw' },
                color: 16713222,
                fields: [
                    { name: 'Message:', value: '```ml\n Dùng Lệnh /supported Để Lấy Danh Sách Hỗ Trợ Bypass \n```' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                }
            }],
        });  
        return;
    }

    await interaction.reply({
        embeds: [{
            title: "Kurumi Bypass",
thumbnail: { url: 'https://play-lh.googleusercontent.com/4BnKk8iK35DaOKhbIvCCTOE3Fl7uokNAvoZNl1HjgFUpvsvcMWNI2HKYaMXMbcryNw' },
            color: 587253,
            fields: [
                { name: 'Status', value: '```Vui Lòng Đợi Bypass...```' }
            ],
            footer: {
                text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
            }
        }],
    });

    try {
        const apiUrl = `${endpoint}/?url=${link}`;
        const response = await axios.get(apiUrl);
        const json = response.data;

        if (json.status === "success") {
            await interaction.editReply({
                embeds: [{
                    title: "Kurumi Bypass",
                    color: 458532,
                    thumbnail: { url: 'https://play-lh.googleusercontent.com/4BnKk8iK35DaOKhbIvCCTOE3Fl7uokNAvoZNl1HjgFUpvsvcMWNI2HKYaMXMbcryNw' },
                    fields: [
                        { name: 'Key:', value: `${box}${json.key}${box}` },
                        { name: 'HWID:', value: `${box}yaml\n${HWID}\n${box}` },
                        { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                    }
                }],
            });            
        } else {
            await interaction.editReply({
                embeds: [{
                    title: "Kurumi Bypass",
                    color: 16713222,
                    thumbnail: { url: 'https://play-lh.googleusercontent.com/4BnKk8iK35DaOKhbIvCCTOE3Fl7uokNAvoZNl1HjgFUpvsvcMWNI2HKYaMXMbcryNw' },
                    fields: [
                        { name: 'Message:', value: '```ml\nMost Likely An Invalid HWID/Fluxus Link Or Failed To Bypass. Please Try Again With A Valid Link.\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                    }
                }],
            });                       
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply({
            embeds: [{
                title: "Kurumi Bypass",
                color: 16713222,
                thumbnail: { url: 'https://play-lh.googleusercontent.com/4BnKk8iK35DaOKhbIvCCTOE3Fl7uokNAvoZNl1HjgFUpvsvcMWNI2HKYaMXMbcryNw' },
                fields: [
                    { name: 'Message:', value: '```ml\nEither Api Is Offline Or Not Responding.\n```' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                }
            }],
        });         
    }
}

async function bypassLinkvertise(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    if (!link.startsWith("https://linkvertise.com")) {
        await interaction.reply({
            embeds: [{
                title: "Kurumi Bypass",
thumbnail: { url: 'https://media.licdn.com/dms/image/D4E0BAQGbZqvPriyjiw/company-logo_200_200/0/1701861184487/linkvertise_logo?e=2147483647&v=beta&t=QIUjxpRuRoUjap-nYqyng6vTk34CANbqAQrd53RD1uA' },
                color: 16713222,
                fields: [
                    { name: 'Message:', value: '```ml\n Dùng Lệnh /supported Để Lấy Danh Sách Hỗ Trợ Bypass \n```' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                }
            }],
        });  
        return;
    }

    await interaction.reply({
        embeds: [{
            title: "Kurumi Bypass",
thumbnail: { url: 'https://media.licdn.com/dms/image/D4E0BAQGbZqvPriyjiw/company-logo_200_200/0/1701861184487/linkvertise_logo?e=2147483647&v=beta&t=QIUjxpRuRoUjap-nYqyng6vTk34CANbqAQrd53RD1uA' },
            color: 587253,
            fields: [
                { name: 'Status', value: '```Vui Lòng Đợi Bypass...```' }
            ],
            footer: {
                text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
            }
        }],
    });

    try {
        const apiUrl = `${endpoint}/?url=${link}`;
        const response = await axios.get(apiUrl);
        const json = response.data;

        if (json.status === "success") {
            await interaction.editReply({
                embeds: [{
                    title: "Kurumi Bypass",
                    color: 458532,
                    thumbnail: { url: 'https://media.licdn.com/dms/image/D4E0BAQGbZqvPriyjiw/company-logo_200_200/0/1701861184487/linkvertise_logo?e=2147483647&v=beta&t=QIUjxpRuRoUjap-nYqyng6vTk34CANbqAQrd53RD1uA' },
                    fields: [
                        { name: 'Direct URL:', value: `${json.target}` },
                        { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                    }
                }],
            });           
        } else {
            await interaction.editReply({
                embeds: [{
                    title: "Kurumi Bypass",
                    color: 16713222,
                    thumbnail: { url: 'https://media.licdn.com/dms/image/D4E0BAQGbZqvPriyjiw/company-logo_200_200/0/1701861184487/linkvertise_logo?e=2147483647&v=beta&t=QIUjxpRuRoUjap-nYqyng6vTk34CANbqAQrd53RD1uA' },
                    fields: [
                        { name: 'Message:', value: '```ml\nMost Likely An Api Error. Try Again Later!\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                    }
                }],
            });                       
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply({
            embeds: [{
                title: "Kurumi Bypass",
                color: 16713222,
                thumbnail: { url: 'https://media.licdn.com/dms/image/D4E0BAQGbZqvPriyjiw/company-logo_200_200/0/1701861184487/linkvertise_logo?e=2147483647&v=beta&t=QIUjxpRuRoUjap-nYqyng6vTk34CANbqAQrd53RD1uA' },
                fields: [
                    { name: 'Message:', value: '```ml\nEither Api Is Offline Or Not Responding.\n```' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                }
            }],
        });         
    }
}

async function supported(interaction) {
    await interaction.reply({
        embeds: [{
            title: "Kurumi Bypass",
            color: 3447003,
            fields: [
                { name: 'Supported Links:', value: '```md\n1.Delta\n2.Fluxus\n3.Linkvertise\n```' }
            ],
            footer: {
                text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
            },
            timestamp: new Date()
        }],
    });
}

async function apistatus(interaction) {
    const statusUrl = 'http://45.90.13.151:6041/status';

    try {
        const response = await axios.get(statusUrl);
        const data = response.data;

        if (data.status === 'online') {
            await interaction.reply({
                embeds: [{
                    title: "API Status",
                    color: 3066993,
                    fields: [
                        { name: 'Ping:', value: `\`${data.ping} ms\``, inline: true },
                        { name: 'Uptime:', value: `\`${data.uptime}\``, inline: true }
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                    },
                    timestamp: new Date()
                }],
            });
        } else {
            await interaction.reply({
                embeds: [{
                    title: "API Status",
                    color: 15158332,
                    fields: [
                        { name: 'Status:', value: 'API Hiện Đang Online...' }
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                    },
                    timestamp: new Date()
                }],
            });
        }
    } catch (error) {
        console.error(error);
        await interaction.reply({
            embeds: [{
                title: "API Status",
                color: 15158332,
                fields: [
                    { name: 'Message:', value: 'Failed to retrieve the API status.' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By ${madeby}`
                },
                timestamp: new Date()
            }],
        });
    }
}

client.login(token);
