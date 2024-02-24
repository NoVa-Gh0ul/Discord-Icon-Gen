# Discord-Icon-Gen
A simple Discord Bot that allows users to generate a customized icon! Follow the instructions below to both setup, configurate, and use this application :D

oh no! how did i find their secret font 😧
<p align="left">
  <a href="https://www.dafont.com/another-danger.font">
  <img alt="Font Source / Download" title="profile icon font source"
    src="https://custom-icon-badges.demolab.com/just%20the%20message-8A2BE2"/></a>
</p>
oops.


# INSTALLATION 

- clone this repository at https://github.com/NoVa-Gh0ul/Discord-Icon-Gen
- run `npm install`
- create an application on the discord developer portal and fill the config.json file with the required values (Bot Token, Client ID, and the Guild ID)

Now your application is ready to use! For those who don't know how to start the bot, follow the steps below:

# STARTUP

- in your terminal, run `cd path_to_your_project_folder_here/src`
- now press enter and run `node index.js`



# DISCLAIMER

This is my own creation and not directly stolen from any third party sources. There is **NOT** a license on this code, do whatever you want! No credit needed. Why make this? Because gatekeeping a profile picture is childish, and it's also crazy to charge people $1 for something that took 30 minutes to make.


# CONFIGURATION ASSISTANCE

- If you wish to add / change the custom background images, just delete or add the appropriate files under the images folder.

- To change how much the text is slanted, go to *line 93* of `icon.js`, there you'll see `ctx.rotate(-Math.PI / 20);`. To increase the slant, decrease the number (i.e: `ctx.rotate(-Math.PI / 12);`). To decrease the slant, increase the number (i.e: `ctx.rotate(-Math.PI / 26);`)

- To change the font, replace the `.otf` file under fonts with the desired font. **NOTE:** Some fonts will not work and return the following error (`(process:18700): Pango-WARNING **: 21:32:57.339: couldn't load font "NAME_OF_FONT FONT_ROTATION", falling back to "Sans FONT_ROTATION", expect ugly output.`)

  
