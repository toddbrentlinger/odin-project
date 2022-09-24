'use strict';

(function() {
    const GIPHY_API_KEY = '';

    function randomizeGIF() {
        const img = document.querySelector('#rand-cat-gif-container .gif-img');
        const loadingMsg = document.querySelector('#rand-cat-gif-container .loading-msg');

        loadingMsg.classList.remove('hidden');

        fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + GIPHY_API_KEY + '&s=cats', { mode: 'cors' })
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

    function searchGIF(searchText) {
        const img = document.querySelector('#search-gif-container .gif-img');
        const loadingMsg = document.querySelector('#search-gif-container .loading-msg');

        loadingMsg.classList.remove('hidden');

        fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + GIPHY_API_KEY + '&s=' + searchText, { mode: 'cors' })
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

    window.addEventListener('load', randomizeGIF);
    document.querySelector('#rand-cat-gif-container button')
        .addEventListener('click', randomizeGIF);

    document.querySelector('form[name="search-gif"')
        .addEventListener('submit', (e) => {
            e.preventDefault();
            const searchText = e.target.elements.namedItem('search').value;
            searchGIF(searchText);
            console.log(searchText);
        });

    document.querySelectorAll('.gif-img')
        .forEach((gifImg) => {
            gifImg.addEventListener('load', (e) => {
                e.currentTarget.parentElement.querySelector('.loading-msg')
                    .classList.add('hidden');
            });
        });
})();