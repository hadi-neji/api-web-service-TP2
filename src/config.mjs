// src/Agg/config.mjs
export default {
  development: {
    type: 'development',
    port: 3000,

    // 🔑 Clé API Randommer
    RANDOMMER_API_KEY: 'b6ce01fad9b744baaced2db5088fedc6',

    // 🔧 Headers pour les appels axios
    RANDOMMER_HEADERS: {
      'X-Api-Key': 'b6ce01fad9b744baaced2db5088fedc6'
    }
  },

  production: {
    type: 'production',
    port: 3000,

    RANDOMMER_API_KEY: 'b6ce01fad9b744baaced2db5088fedc6',
    RANDOMMER_HEADERS: {
      'X-Api-Key': 'b6ce01fad9b744baaced2db5088fedc6'
    }
  }
};
