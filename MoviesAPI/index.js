const form = document.querySelector('form');
const input = document.querySelector('.search');
const main = document.querySelector('main')

const mainImage = document.querySelector('.main-image');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = input.value;

  fetch(`http://www.omdbapi.com/?apikey=5a9e569f&t=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
          
          mainImage.remove();

          const movie = data;

          // Create movie HTML
          const newMovie = `
              <div class="movie-display">
                  <img class="poster" src="${movie.Poster}">
                  <div>
                      <div class="title-raking">
                          <h1 class="right-space">${movie.Title}</h1>
                          <h4 class="info">⭐ ${movie.Ratings[0]?.Value || "N/A"}</h4>
                      </div>
                      <div class="title-raking">
                          <h4 class="right-space info">${movie.Runtime}</h4>
                          <h4 class="right-space info">${movie.Genre}</h4>
                          <button id="${movie.imdbID}" class="watchlist-btn">
                              <img class="btn-img" src="images/watchlistAdd.png">
                              <span class="btn-text">Watchlist</span>
                          </button>
                      </div>
                      <p class="plot">${movie.Plot}</p>
                  </div>
              </div>
              <hr class="line">
          `;

          main.innerHTML = newMovie + main.innerHTML;

          

          const watchListButton = document.getElementById(movie.imdbID);

          watchListButton.addEventListener('click', () => {
              let watchList = JSON.parse(localStorage.getItem('movieData')) || [];
              
              watchList.push(movie);
              
              localStorage.setItem('movieData', JSON.stringify(watchList));
              window.location.href = 'watchlist.html';
          });
      })
});

  


  


