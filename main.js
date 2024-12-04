document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
  
    // Handle form submission
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload
        const query = searchInput.value.trim();
  
        if (!query) {
            searchResults.innerHTML = '<p class="text-danger">Please enter a superhero name.</p>';
            return;
        }
  
        searchResults.innerHTML = '<p>Loading...</p>';
  
        // Construct AllOrigins proxy URL
        const apiUrl = `https://superheroapi.com/api/57f7b3392dac3effe0845534a683fd3f/search/${query}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
  
        // Fetch data from the superhero API through AllOrigins
        fetch(proxyUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Parse the response from AllOrigins
                const actualData = JSON.parse(data.contents);
  
                if (actualData.response === "error") {
                    searchResults.innerHTML = `<p class="text-danger">${actualData.error}</p>`;
                } else {
                    displayResults(actualData.results);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                searchResults.innerHTML = '<p class="text-danger">Error fetching superhero data. Please try again later.</p>';
            });
    });
  
    // Display search results
    function displayResults(results) {
        searchResults.innerHTML = "";
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-warning">No superheroes found.</p>';
            return;
        }
  
        results.forEach((result) => {
            const resultCard = document.createElement("div");
            resultCard.className = "card mb-3";
            resultCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${result.name}</h5>
                    <p class="card-text"><strong>ID:</strong> ${result.id}</p>
                    <a href="details.html?id=${result.id}" class="btn btn-primary">View Details</a>
                </div>
            `;
            searchResults.appendChild(resultCard);
        });
    }
  });
  