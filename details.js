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

  // Fetch superhero data using the /id endpoint
  fetch(`http://localhost:8080/https://superheroapi.com/api/57f7b3392dac3effe0845534a683fd3f/${heroId}`)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then((data) => {
          // Display superhero name
          heroNameElement.textContent = data.name || "Unknown Superhero";

          // Display all superhero data
          heroInfoElement.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">Biography</h5>
                      <p><strong>Full Name:</strong> ${data.biography["full-name"] || "N/A"}</p>
                      <p><strong>Place of Birth:</strong> ${data.biography["place-of-birth"] || "N/A"}</p>
                      <p><strong>First Appearance:</strong> ${data.biography["first-appearance"] || "N/A"}</p>

                      <h5 class="card-title mt-4">Powerstats</h5>
                      <p><strong>Intelligence:</strong> ${data.powerstats.intelligence || "N/A"}</p>
                      <p><strong>Strength:</strong> ${data.powerstats.strength || "N/A"}</p>
                      <p><strong>Speed:</strong> ${data.powerstats.speed || "N/A"}</p>
                      <p><strong>Durability:</strong> ${data.powerstats.durability || "N/A"}</p>
                      <p><strong>Power:</strong> ${data.powerstats.power || "N/A"}</p>
                      <p><strong>Combat:</strong> ${data.powerstats.combat || "N/A"}</p>

                      <h5 class="card-title mt-4">Appearance</h5>
                      <p><strong>Gender:</strong> ${data.appearance.gender || "N/A"}</p>
                      <p><strong>Race:</strong> ${data.appearance.race || "N/A"}</p>
                      <p><strong>Height:</strong> ${data.appearance.height.join(", ") || "N/A"}</p>
                      <p><strong>Weight:</strong> ${data.appearance.weight.join(", ") || "N/A"}</p>
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
