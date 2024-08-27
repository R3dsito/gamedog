const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importar CORS
const path = require('path');  // Necesario para manejar rutas de archivos en Express

const app = express();
const PORT = 3306;

app.use(cors({
    origin: 'http://localhost:3306'
  }));
  
// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Ruta para servir el archivo HTML en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Cambia 'index.html' al nombre de tu archivo HTML si es diferente
});

// Ruta para hacer la solicitud a la API de IGDB
app.get('/search', async (req, res) => {
  const gameName = req.query.name;

  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `search "${gameName}"; fields name, genres, platforms, rating, release_dates, cover; limit 10;`,
      {
        headers: {
            'Client-ID': 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',
            'Authorization': 'Bearer gh0dw6k4pgvc9kbdlhmjguob1k7w6e',  
        }
      }
    );

    res.json(response.data);  // Devolver la respuesta al cliente
  } catch (error) {
    res.status(500).send(error.response ? error.response.data : error.message);
  }
});

app.get('/game/:id', async (req, res) => {
    const gameId = req.params.id;
  
    try {
      const response = await axios.post(
        'https://api.igdb.com/v4/games',
        `fields name, genres.name, platforms.name, rating, release_dates.human, cover.image_id; where id = ${gameId};`,
        {
          headers: {
            'Client-ID': 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',
            'Authorization': 'Bearer gh0dw6k4pgvc9kbdlhmjguob1k7w6e',  
          }
        }
      );
  
      res.json(response.data[0]); // Devolver los detalles del juego
    } catch (error) {
      res.status(500).send(error.response ? error.response.data : error.message);
    }
  });
  

// Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});
