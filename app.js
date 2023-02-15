const express = require("express");
const app = express();
const fs = require("fs");
const readExcel = require('read-excel-file/node');

const { Client, Location, List, Buttons, LocalAuth, qrcode, MessageMedia } = require('whatsapp-web.js');


app.get("/", (req, res) => {

    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: false }
    });

    client.initialize();

    client.on('loading_screen', (percent, message) => {
        console.log('LOADING SCREEN', percent, message);
    });


    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });

    });

    client.on('authenticated', () => {
        console.log('AUTHENTICATED');
    });

    client.on('auth_failure', msg => {
        // Fired if session restore was unsuccessful
        console.error('AUTHENTICATION FAILURE', msg);
    });


    client.on('ready', async () => {


        readExcel('./mobileData.xlsx').then(async (data) => {
            for (i in data) {

                let caption = "Hello Sir";
                let number = data[i][0];
                const chatId = number.substring(1) + "@c.us";

                const media = MessageMedia.fromFilePath('./img.png');

                client.sendMessage(chatId, media, { caption: caption });

                console.log(`Messages Sent to Clients ${data[i][0]}`);
            }
        })
    });
    res.send("Please Check Your Console");
})





app.listen(1111, () => {
    console.log("Please Open 👇 Server is Running");
    console.log("http://localhost:1111");
})