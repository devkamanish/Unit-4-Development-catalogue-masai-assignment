const searchBox = document.getElementById("search");
const resultsDiv = document.getElementById("results");

let debounceTimer;

searchBox.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  
  debounceTimer = setTimeout(() => {
    const query = searchBox.value.trim();
    if (query) {
      fetchMovies(query);
    } else {
      resultsDiv.innerHTML = "";
    }
  }, 500);
});

async function fetchMovies(query) {
  const apiKey = "9b9b876e";
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      resultsDiv.innerHTML = `<p>No results found</p>`;
    }
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = `<p>Error fetching data</p>`;
  }
}

function displayMovies(movies) {
  resultsDiv.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `<strong>${movie.Title}</strong> (${movie.Year})`;
    resultsDiv.appendChild(div);
  });
}
