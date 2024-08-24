// Initialize an empty array to hold the articles
let articles = [];

// Fetch the articles from the articles.json file
fetch('articles.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Articles loaded:', data);
        articles = data;  // Store the articles in the global articles array
        searchArticles();  // Perform the initial search to display all articles
    })
    .catch(error => console.error('Error loading articles:', error));  // Handle errors

// Function to search and filter articles based on user input
function searchArticles() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();
    const monthFilter = document.getElementById('monthFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;

    // Filter the articles based on the search input and selected filters
    const filteredArticles = articles.filter(article => {
        const articleDateParts = article.date.split('/');
        const articleMonth = articleDateParts[1];
        const articleYear = articleDateParts[2];

        // Check if the article matches the search input, category, month, and year filters
        const matchesSearch = article.description.toLowerCase().includes(searchInput);
        const matchesCategory = (categoryFilter === "" || article.category.toLowerCase() === categoryFilter.toLowerCase());
        const matchesMonth = (monthFilter === "" || articleMonth === monthFilter);
        const matchesYear = (yearFilter === "" || articleYear === yearFilter);

        return matchesSearch && matchesCategory && matchesMonth && matchesYear;
    });

    displayArticles(filteredArticles);  // Display the filtered articles
}

// Function to display the filtered articles in the HTML
function displayArticles(articles) {
    const articleList = document.getElementById('articleList');
    articleList.innerHTML = "";  // Clear the existing articles

    articles.forEach(article => {
        const li = document.createElement('li');
        li.classList.add('article-item');
        li.innerHTML = `
            <p class="article-description">${article.description}</p>
            <p class="article-date">Date: ${article.date}</p>
            <p class="article-category">Category: ${article.category}</p>
            <p class="article-page">Page: ${article.page}</p>
        `;
        articleList.appendChild(li);  // Append the list item to the article list
    });

    if (articles.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No articles found for the given criteria.';
        articleList.appendChild(noResultsMessage);
    }
}

// Perform an initial search when the document is loaded
document.addEventListener("DOMContentLoaded", function() {
    const searchQuery = new URLSearchParams(window.location.search).get('search');
    if (searchQuery) {
        document.getElementById('searchInput').value = searchQuery;  // Set the search input value to the query parameter
    }
    searchArticles();  // Perform the search with the loaded articles
});

function fetchArticles() {
    fetch('articles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            articles = data;
            searchArticles(); // Initialize with all articles
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            const articleList = document.getElementById('articleList');
            articleList.innerHTML = `<p class="error-message">Unable to load articles at this time. Please try again later.</p>`;
        });
}
