const axios = require("axios");
require("dotenv").config();

module.exports = {
    notify: async (title, message, color=14177041) => {
    try {
      const discordWebHook = process.env.discordWebhookAPI;
      const url = process.env.frontendURL;
      const data = {
        embeds: [
          {
            title: title,
            description: message,
            color: color,
            url: url
          },
        ],
      };
      await axios.post(discordWebHook, data);
    } catch (error) {
      console.error(error);
    }
  },
};
