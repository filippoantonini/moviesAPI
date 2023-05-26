const main = document.querySelector('main');
const headingDiv = document.getElementById('heading');

let watchList;

document.addEventListener('DOMContentLoaded', function() {
    watchList = JSON.parse(localStorage.getItem('movieData')) || [];

    if (watchList.length > 0) {
        headingDiv.remove();
    }

    watchList.forEach((movie) => {
        const movieDiv = `
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
                        <button id="remove-${movie.imdbID}" class="remove-watchlist-btn" data-imdbid="${movie.imdbID}">
                            <img class="btn-img" src="images/watchlistRemove.png">
                            <span class="btn-text">Remove</span>
                        </button>
                    </div>
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div>
            <hr class="line">
        `;

        main.insertAdjacentHTML('beforeend', movieDiv);
    });

    // Add event listeners after all the buttons have been added to the DOM
    document.querySelectorAll('.remove-watchlist-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const imdbID = event.currentTarget.dataset.imdbid;
            watchList = watchList.filter((m) => m.imdbID !== imdbID);
            localStorage.setItem('movieData', JSON.stringify(watchList));
            document.location.reload();
        });
    });
});