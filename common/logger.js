const axios = require("axios");
require("dotenv").config();

module.exports = {
    notify: async (title, message) => {
    try {
      const discordWebHook = process.env.discordWebhookAPI;
      const data = {
        embeds: [
          {
            title: title,
            description: message,
            color: 14177041,
          },
        ],
      };
      await axios.post(discordWebHook, data);
    } catch (error) {
      console.error(error);
    }
  },
};
