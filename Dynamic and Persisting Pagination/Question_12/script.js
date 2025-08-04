const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

let start = 0;
const limit = 10;
let isLoading = false;

async function fetchImages() {
  if (isLoading) return;
  isLoading = true;
  loader.style.display = "block";

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
    );
    const data = await response.json();

    data.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.thumbnailUrl;
      img.alt = photo.title;
      gallery.appendChild(img);
    });

    start += limit;
  } catch (error) {
    console.error("Error fetching images:", error);
  }

  isLoading = false;
  loader.style.display = "none";
}

// Infinite scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchImages();
  }
});

// Initial load
fetchImages();
