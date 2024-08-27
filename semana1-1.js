const axios = require('axios');

async function getToken() {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',           // Reemplaza con tu Client ID
        client_secret: 'ijyo9mk7gz23181ht7imv0ljj168e3',   // Reemplaza con tu Client Secret
        grant_type: 'client_credentials',
      },
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Error al obtener el token:', error.response ? error.response.data : error.message);
  }
}

getToken();
