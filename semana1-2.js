 const axios = require('axios');


 async function getRandomGames() {
   try {

     const response = await axios.post(
       'https://api.igdb.com/v4/games',
       'fields name, genres, platforms, rating, release_dates, cover; limit 100;',
       {
         headers: {
           'Client-ID': 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',
          'Authorization': 'Bearer gh0dw6k4pgvc9kbdlhmjguob1k7w6e',  
         },
       }
     );
    
     const games = response.data;


     const randomGames = selectRandomGames(games, 5);


     randomGames.forEach(game => {
       if (game.cover) {
         getCoverImage(game.cover, game.name);
       } else {
         console.log(`El juego ${game.name} no tiene portada.`);
       }
     });

   } catch (error) {
     console.error('Error al hacer la petición:', error.response ? error.response.data : error.message);
   }
 }


 function selectRandomGames(games, count) {
   const shuffled = games.sort(() => 0.5 - Math.random());
   return shuffled.slice(0, count);
 }


 async function getCoverImage(coverId, gameName) {
   try {
     const response = await axios.post(
       'https://api.igdb.com/v4/covers',
       `fields url; where id = ${coverId};`,
       {
         headers: {
           'Client-ID': 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',
          'Authorization': 'Bearer gh0dw6k4pgvc9kbdlhmjguob1k7w6e',  
         },
       }
     );
    

     console.log(`Juego: ${gameName}, Portada: ${response.data[0].url}`);
   } catch (error) {
     console.error(`Error al obtener la portada para el juego ${gameName}:`, error.response ? error.response.data : error.message);
   }
 }

 getRandomGames();

// const axios = require('axios');

// async function searchGamesByName(gameName) {
//   try {
//     const response = await axios.post(
//       'https://api.igdb.com/v4/games',
//       `search "${gameName}"; fields name, genres, platforms, rating, release_dates, cover; limit 5;`,
//       {
//         headers: {
//           'Client-ID': 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',
//           'Authorization': 'Bearer e3gdqb2d8t9yux9rjey8rzrezhxtxb',
//         },
//       }
//     );
    
//     const games = response.data;
    

//     games.forEach(game => {
//       if (game.cover) {
//         getCoverImage(game.cover, game.name);
//       } else {
//         console.log(`El juego ${game.name} no tiene portada.`);
//       }
//     });

//   } catch (error) {
//     console.error('Error al hacer la búsqueda:', error.response ? error.response.data : error.message);
//   }
// }


// async function getCoverImage(coverId, gameName) {
//   try {
//     const response = await axios.post(
//       'https://api.igdb.com/v4/covers',
//       `fields url; where id = ${coverId};`,
//       {
//         headers: {
//           'Client-ID': 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',
//           'Authorization': 'Bearer 8emk9yfmn350pgnzcylsge9r3h8g02',
//         },
//       }
//     );
    

//     console.log(`Juego: ${gameName}, Portada: ${response.data[0].url}`);
//   } catch (error) {
//     console.error(`Error al obtener la portada para el juego ${gameName}:`, error.response ? error.response.data : error.message);
//   }
// }

// searchGamesByName('Red dead');

//---

//  // Función para buscar juegos por nombre
//  async function searchGames() {
//   // Obtener el valor del input
//   const gameName = document.getElementById('gameName').value;
  
//   // Verificar si el usuario ingresó algo
//   if (!gameName) {
//     alert('Por favor ingresa el nombre de un juego.');
//     return;
//   }

//   try {
//     // Realizar la petición a la API de IGDB
//     const response = await axios.post(
//       'https://api.igdb.com/v4/games',
//       `search "${gameName}"; fields name, genres, platforms, rating, release_dates, cover; limit 10;`,
//       {
//         headers: {
//           'Client-ID': 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',
//           'Authorization': 'Bearer gh0dw6k4pgvc9kbdlhmjguob1k7w6e',  
//         },
//       }
//     );
    
//     // Limpiar el div de resultados antes de mostrar los nuevos
//     document.getElementById('results').innerHTML = '';

//     const games = response.data;

//     // Mostrar los resultados en la página
//     games.forEach(async (game) => {
//       const gameElement = document.createElement('div');
//       gameElement.innerHTML = `<h2>${game.name}</h2>`;
      
//       // Si el juego tiene una portada, obtenerla
//       if (game.cover) {
//         const coverUrl = await getCoverImage(game.cover);
//         gameElement.innerHTML += `<img src="${coverUrl}" alt="${game.name} cover">`;
//       } else {
//         gameElement.innerHTML += `<p>Este juego no tiene portada.</p>`;
//       }

//       document.getElementById('results').appendChild(gameElement);
//     });

//   } catch (error) {
//     console.error('Error al hacer la búsqueda:', error.response ? error.response.data : error.message);
//   }
// }

// // Función para obtener la URL de la portada usando el ID de `cover`
// async function getCoverImage(coverId) {
//   try {
//     const response = await axios.post(
//       'https://api.igdb.com/v4/covers',
//       `fields url; where id = ${coverId};`,
//       {
//         headers: {
//           'Client-ID': 'iolxb0ko3a9qqfjadk5w7lldd5gyyg',
//           'Authorization': 'Bearer gh0dw6k4pgvc9kbdlhmjguob1k7w6e',  
//         },
//       }
//     );
    
//     return response.data[0].url;  // Devolver la URL de la portada

//   } catch (error) {
//     console.error('Error al obtener la portada:', error.response ? error.response.data : error.message);
//   }
// }