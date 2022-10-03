'use strict';

(function() {
    const GIPHY_API_KEY = 'M05QHHfe4a3Ofi4Q47FgmiMHmbqJAnqu';
    const img = document.querySelector('#gif-container img');
    const loadingMsg = document.getElementById('loading-msg');

    /**
     * Loads GIF based on searchText and returns promise.
     * @param {String} searchText 
     * @returns {Promise}
     */
    function searchGIF(searchText) {
        // Empty message element
        emptyElement(loadingMsg);

        loadingMsg.textContent = 'Loading';

        return fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + GIPHY_API_KEY + '&s=' + searchText, { mode: 'cors' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was NOT ok');
                }
                return response.json();
            })
            .then((responseData) => {
                img.src = responseData.data.images.original.url;
                displayImgData(responseData);
            })
            .catch((err) => {
                console.error(err);
                loadingMsg.textContent = err;
                img.src = './Blank_Square.svg';
            });
    }

    /**
     * Loads random cat GIF and returns promise.
     * @returns {Promise}
     */
    function randomizeGIF() {
        return searchGIF('cats');
    }

    /**
     * Empties element of any child nodes.
     * @param {HTMLElement} element 
     */
    function emptyElement(element) {
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     * Creates and returns an anchor link HTML element.
     * @param {String} href URL of anchor link 
     * @param {String} textContent Display text for anchor link
     * @returns {HTMLElement}
     */
    function createAnchorElement(href, textContent) {
        const anchorElement = document.createElement('a');

        anchorElement.href = href;
        anchorElement.textContent = textContent;
        anchorElement.target = '_blank';

        return anchorElement;
    }

    /**
     * Displays title, GIPHY url, and source url from GIPHY API request data.
     * @param {Object} imgData Response data from GIPHY API request
     */
    function displayImgData(imgData) {
        // Empty message element
        emptyElement(loadingMsg);

        // Title
        loadingMsg.textContent = imgData.data.title;

        // GIPHY URL
        loadingMsg.appendChild(
            createAnchorElement(imgData.data.url, 'GIPHY URL')
        );

        // Source
        loadingMsg.appendChild(
            createAnchorElement(imgData.data.source, 'Source')
        );
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
})();