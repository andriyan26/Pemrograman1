const movies = [
    {
        title: "AGAK LAEN",
        img: "film1.png", // Jika film1.png berada di folder yang sama dengan HTML
        trailer: "link_trailer_film_a.mp4",
        movieLink: "link_film_a.mp4",
        category: "action",
        description: "Film yang penuh dengan aksi mendebarkan dan pertarungan seru."
    },
    {
        title: "SEKAWAN LIMO",
        img: "film2.jpeg", // Pastikan ini path yang benar
        trailer: "link_trailer_film_b.mp4",
        movieLink: "link_film_b.mp4",
        category: "drama",
        description: "Kisah mendalam tentang persahabatan dan konflik emosional."
    },
    {
        title: "KUPU-KUPU KERTAS",
        img: "film3.jpeg", // Pastikan ini path yang benar
        trailer: "link_trailer_film_c.mp4",
        movieLink: "link_film_c.mp4",
        category: "comedy",
        description: "Sebuah komedi ringan yang menghibur dengan plot yang menggelikan."
    },
    {
        title: "ONDE MANDE",
        img: "film4.jpg", // Pastikan ini path yang benar
        trailer: "link_trailer_film_d.mp4",
        movieLink: "link_film_d.mp4",
        category: "comedy",
        description: "Komedi yang menyoroti kehidupan sehari-hari dengan cara yang lucu."
    },
    {
        title: "PASUNTRI GAJE",
        img: "film5.jpg", // Pastikan ini path yang benar
        trailer: "link_trailer_film_e.mp4",
        movieLink: "link_film_e.mp4",
        category: "comedy",
        description: "Menyajikan kisah konyol seputar kehidupan santri dengan berbagai kejadian lucu."
    },
    {
        title: "DIA YANG BERSAMAKU",
        img: "film6.jpg", // Pastikan ini path yang benar
        trailer: "link_trailer_film_f.mp4",
        movieLink: "link_film_f.mp4",
        category: "comedy",
        description: "Kisah yang menghangatkan hati dengan banyak momen lucu dan menghibur."
    },
    {
        title: "PENANGKAP HANTU",
        img: "film7.jpg", // Pastikan ini path yang benar
        trailer: "link_trailer_film_g.mp4",
        movieLink: "link_film_g.mp4",
        category: "comedy",
        description: "Cerita petualangan lucu seorang anak yang berusaha menangkap hantu."
    },
    {
        title: "KUKIRA KAU RUMAH",
        img: "film8.jpg", // Pastikan ini path yang benar
        trailer: "link_trailer_film_h.mp4",
        movieLink: "link_film_h.mp4",
        category: "comedy",
        description: "Komedi tentang kesalahpahaman yang konyol di antara para karakter."
    },
    {
        title: "SUMALA",
        img: "film9.jpg", // Pastikan ini path yang benar
        trailer: "link_trailer_film_i.mp4",
        movieLink: "link_film_i.mp4",
        category: "comedy",
        description: "Menyajikan kisah yang mengocok perut dengan karakter yang unik dan lucu."
    },
];

const movieContainer = document.getElementById('movieContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const showFavoritesButton = document.getElementById('showFavoritesButton');

let favoriteMovies = [];

// Fungsi untuk menampilkan film
function displayMovies(moviesToDisplay) {
    movieContainer.innerHTML = '';
    moviesToDisplay.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <div class="action-buttons">
                <a href="${movie.trailer}" target="_blank" class="trailer-btn">Trailer</a>
                <a href="${movie.movieLink}" target="_blank" class="watch-btn">Nonton</a>
                <button class="favorite" onclick="toggleFavorite('${movie.title}')">⭐</button>
            </div>
        `;

        movieContainer.appendChild(movieElement);
    });
}

// Fungsi untuk mencari film
function searchMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
}

// Fungsi untuk memfilter film berdasarkan kategori
function filterMoviesByCategory() {
    const selectedCategory = categoryFilter.value;
    const filteredMovies = selectedCategory === "all" ? movies : movies.filter(movie => movie.category === selectedCategory);
    displayMovies(filteredMovies);
}

// Fungsi untuk toggle favorit
function toggleFavorite(title) {
    if (favoriteMovies.includes(title)) {
        favoriteMovies = favoriteMovies.filter(movie => movie !== title);
        alert(`Film "${title}" dihapus dari favorit.`);
    } else {
        favoriteMovies.push(title);
        alert(`Film "${title}" ditambahkan ke favorit.`);
    }
}

// Menampilkan semua film saat pertama kali dibuka
displayMovies(movies);

// Event Listeners
searchInput.addEventListener('input', searchMovies);
categoryFilter.addEventListener('change', filterMoviesByCategory);
showFavoritesButton.addEventListener('click', () => {
    const favoriteMoviesToShow = movies.filter(movie => favoriteMovies.includes(movie.title));
    displayMovies(favoriteMoviesToShow);
});
