const readExcel = require("read-excel-file/node");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on("loading_screen", (percent, message) => {
    console.log("LOADING SCREEN", percent, message);
});

client.on("authenticated", () => {
    console.log("AUTHENTICATED");
});

client.on("ready", () => {
    console.log("Client is ready!");

    readExcel("./public/blast.xlsx").then(async (data) => {
        data.shift();

        for (i in data) {
            const name = data[i][0];
            const phone = data[i][1];

            const msg = "Selamat malam";
            const chatId = phone.substring(1) + "@c.us";

            const timeout = i * 1000;

            setTimeout(() => {
                client.sendMessage(chatId, msg);
                console.log(`Message Sent to Client ${name}`);
            }, timeout);
        }
    });
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.initialize();
