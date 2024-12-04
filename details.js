document.addEventListener("DOMContentLoaded", () => {
    const heroNameElement = document.getElementById("hero-name");
    const heroInfoElement = document.getElementById("hero-info");
  
    // Get the ID from the URL query string
    const params = new URLSearchParams(window.location.search);
    const heroId = params.get("id");
  
    if (!heroId) {
        heroNameElement.textContent = "No superhero ID provided!";
        return;
    }
  
    // Construct the API URL and proxy it through AllOrigins
    const apiUrl = `https://superheroapi.com/api/57f7b3392dac3effe0845534a683fd3f/${heroId}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
  
    // Fetch superhero data using AllOrigins
    fetch(proxyUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Parse the wrapped response from AllOrigins
            const actualData = JSON.parse(data.contents);
  
            // Display superhero name
            heroNameElement.textContent = actualData.name || "Unknown Superhero";
  
            // Display all superhero data
            heroInfoElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Biography</h5>
                        <p><strong>Full Name:</strong> ${actualData.biography["full-name"] || "N/A"}</p>
                        <p><strong>Place of Birth:</strong> ${actualData.biography["place-of-birth"] || "N/A"}</p>
                        <p><strong>First Appearance:</strong> ${actualData.biography["first-appearance"] || "N/A"}</p>
  
                        <h5 class="card-title mt-4">Powerstats</h5>
                        <p><strong>Intelligence:</strong> ${actualData.powerstats.intelligence || "N/A"}</p>
                        <p><strong>Strength:</strong> ${actualData.powerstats.strength || "N/A"}</p>
                        <p><strong>Speed:</strong> ${actualData.powerstats.speed || "N/A"}</p>
                        <p><strong>Durability:</strong> ${actualData.powerstats.durability || "N/A"}</p>
                        <p><strong>Power:</strong> ${actualData.powerstats.power || "N/A"}</p>
                        <p><strong>Combat:</strong> ${actualData.powerstats.combat || "N/A"}</p>
  
                        <h5 class="card-title mt-4">Appearance</h5>
                        <p><strong>Gender:</strong> ${actualData.appearance.gender || "N/A"}</p>
                        <p><strong>Race:</strong> ${actualData.appearance.race || "N/A"}</p>
                        <p><strong>Height:</strong> ${actualData.appearance.height.join(", ") || "N/A"}</p>
                        <p><strong>Weight:</strong> ${actualData.appearance.weight.join(", ") || "N/A"}</p>
                    </div>
                </div>
            `;
        })
        .catch((error) => {
            console.error("Error fetching superhero details:", error);
            heroNameElement.textContent = "Error loading superhero details!";
            heroInfoElement.innerHTML = `<p class="text-danger">Could not fetch superhero data. Please try again later.</p>`;
        });
  });
  