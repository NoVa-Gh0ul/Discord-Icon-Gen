const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { createCanvas, registerFont, loadImage } = require('canvas');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('icon')
        .setDescription('Generate a custom profile icon.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to display on the profile icon')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('size')
                .setDescription('The size of the text in integer format (e.g., 50).')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color of the text in hex format (e.g., #FF0000)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('glow')
                .setDescription('The intensity of the font glow.')
                .setRequired(false)
                .addChoices(
                    { name: "Low", value: "5" },
                    { name: "Medium", value: "10" },
                    { name: "High", value: "15" }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('background')
                .setDescription('Choose a background option.')
                .setRequired(true)
                .addChoices(
                    { name: "Plain", value: "plain" },
                    { name: "Custom Background 1", value: "custom1" },
                    { name: "Custom Background 2", value: "custom2" }
                )),
    async execute(interaction) {
        const initialEmbed = new EmbedBuilder()
            .setColor('#808080')
            .setDescription('Generating your icon. . .');

        const initialReply = await interaction.reply({ embeds: [initialEmbed] });

        // Users Format: TEXT / SIZE / COLOR / GLOW / BACKGROUND
        const text = interaction.options.getString('text');
        const size = interaction.options.getInteger('size');
        const color = interaction.options.getString('color');
        const glowIntensity = interaction.options.getString('glow') || '5';
        const background = interaction.options.getString('background');

        const shadowBlur = parseInt(glowIntensity);

        // Canvas Settings
        const canvasWidth = 400;
        const canvasHeight = 400;
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');

        // Load font
        const fontPath = path.resolve(__dirname, '..', 'fonts', 'font.otf');
        registerFont(fontPath, { family: 'Another Danger' });

        // Load Background Image based on the chosen option
        let backgroundImage;
        if (background === 'custom1') {
            const background1Path = path.resolve(__dirname, '..', 'images', 'background1.jpg');
            backgroundImage = await loadImage(background1Path);
        } else if (background === 'custom2') {
            const background2Path = path.resolve(__dirname, '..', 'images', 'background2.jpg');
            backgroundImage = await loadImage(background2Path);
        } else {
            // For plain or unrecognized background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        if (backgroundImage) {
            ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
        }

        // Text Settings
        ctx.font = `${size}px 'Another Danger'`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(-Math.PI / 20);
        ctx.shadowColor = color;
        ctx.shadowBlur = shadowBlur;
        ctx.fillStyle = color;
        ctx.fillText(text, 0, 0);

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.fillStyle = color;
        ctx.fillText(text, 0, 0);

        // Convert canvas to buffer
        const attachment = canvas.toBuffer();

        await initialReply.edit({
            embeds: [new EmbedBuilder().setColor('#808080').setImage('attachment://profile_icon.png')],
            files: [{ attachment, name: 'profile_icon.png' }]
        });
    },
};

// echo bot sucks lol
