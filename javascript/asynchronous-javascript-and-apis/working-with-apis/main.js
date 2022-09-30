'use strict';

(function() {
    const GIPHY_API_KEY = 'M05QHHfe4a3Ofi4Q47FgmiMHmbqJAnqu';
    const img = document.querySelector('#gif-container img');
    const loadingMsg = document.getElementById('loading-msg');

    /**
     * Loads random cat GIF and returns promise.
     * @returns {Promise}
     */
    function randomizeGIF() {
        loadingMsg.classList.remove('hidden');

        return fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + GIPHY_API_KEY + '&s=cats', { mode: 'cors' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was NOT ok');
                }
                return response.json();
            })
            .then((responseData) => {
                img.src = responseData.data.images.original.url;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /**
     * Loads GIF base on searchText and returns promise.
     * @param {String} searchText 
     * @returns {Promise}
     */
    function searchGIF(searchText) {
        loadingMsg.classList.remove('hidden');

        return fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + GIPHY_API_KEY + '&s=' + searchText, { mode: 'cors' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was NOT ok');
                }
                return response.json();
            })
            .then((responseData) => {
                img.src = responseData.data.images.original.url;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // Call randomizeGIF() when window has loaded
    window.addEventListener('load', randomizeGIF);

    // Random cat gif button
    document.getElementById('rand-cat-gif-btn')
        .addEventListener('click', randomizeGIF);

    // Search GIF form
    document.querySelector('form[name="search-gif"')
        .addEventListener('submit', (e) => {
            e.preventDefault();
            const searchText = e.target.elements.namedItem('search').value;
            searchGIF(searchText);
        });

    // When GIF images had finished loading, hide loading message
    img.addEventListener('load', (e) => {
        loadingMsg.classList.add('hidden');
    });
})();