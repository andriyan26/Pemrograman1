const posts = []; // Array untuk menyimpan postingan
const images = ['tiktok/gambar/Foto2.JPG', 'tiktok/gambar/Foto3.JPG', 'tiktok/gambar/Foto4.jpg']; // Daftar gambar
let totalComments = 0; // Menyimpan total komentar

function addPost() {
    const title = document.getElementById('post-title').value;
    const image = document.getElementById('image-selector').value;

    if (title && image) {
        const newPost = { title, image, comments: [] };
        posts.push(newPost);
        updatePostStats();
        document.getElementById('post-title').value = '';
        loadRecentPosts(); // Memuat ulang postingan terbaru
        loadPostsToManage(); // Memuat ulang daftar postingan di halaman Kelola Postingan
    }
}

// Menampilkan bagian yang dipilih
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Load posts and comments when showing Kelola Postingan or Kelola Komentar
    if (sectionId === 'kelola-postingan') {
        loadPostsToManage();
    } else if (sectionId === 'kelola-komentar') {
        loadCommentsToManage();
    }
}

// Memuat gambar untuk dropdown
function loadImages() {
    const selector = document.getElementById('image-selector');
    images.forEach(image => {
        const option = document.createElement('option');
        option.value = image;
        option.textContent = image;
        selector.appendChild(option);
    });
}

// Menampilkan gambar yang dipilih di dropdown
function showSelectedImage() {
    const selector = document.getElementById('image-selector');
    const selectedImage = document.getElementById('selected-image');
    selectedImage.src = selector.value;
    selectedImage.style.display = 'block'; // Tampilkan gambar
}

// Memuat postingan terbaru
function loadRecentPosts() {
    const recentPostsDiv = document.getElementById('recent-posts');
    recentPostsDiv.innerHTML = ''; // Kosongkan isi sebelumnya
    posts.forEach((post, postIndex) => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <img src="${post.image}" alt="${post.title}">
            <div class="comments">
                <h4>Komentar:</h4>
                <div id="comments-${postIndex}"></div>
                <input type="text" id="comment-input-${postIndex}" placeholder="Tambah komentar...">
                <button onclick="addComment(${postIndex})">Kirim</button>
            </div>
            <div class="post-actions">
                <button class="like-btn" onclick="likePost(${postIndex})">❤️ Like <span id="like-count-${postIndex}">0</span></button>
                <button class="comment-btn" onclick="toggleCommentInput(${postIndex})">💬 Komentar</button>
                <button class="share-btn" onclick="sharePost(${postIndex})">🔄 Share</button>
            </div>
        `;
        recentPostsDiv.appendChild(postDiv);
    });
}

// Memuat daftar postingan untuk kelola postingan
function loadPostsToManage() {
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = ''; // Kosongkan isi sebelumnya
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <p>${post.title} 
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Hapus</button></p>
            <img src="${post.image}" alt="${post.title}" style="width: 100px; height: auto;"> <!-- Menampilkan gambar -->
        `;
        postsList.appendChild(postDiv);
    });
}

// Mengedit postingan
function editPost(index) {
    const newTitle = prompt("Edit judul postingan:", posts[index].title);
    const newImage = prompt("Edit URL gambar:", posts[index].image);
    if (newTitle) {
        posts[index].title = newTitle;
    }
    if (newImage) {
        posts[index].image = newImage;
    }
    loadRecentPosts(); // Memuat ulang postingan terbaru
    loadPostsToManage(); // Memuat ulang daftar postingan
}

// Menghapus postingan
function deletePost(index) {
    if (confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
        posts.splice(index, 1);
        updatePostStats();
        loadRecentPosts(); // Memuat ulang postingan terbaru
        loadPostsToManage(); // Memuat ulang daftar postingan
    }
}

// Menambahkan komentar
function addComment(postIndex) {
    const commentInput = document.getElementById(`comment-input-${postIndex}`);
    const commentText = commentInput.value;
    if (commentText) {
        posts[postIndex].comments.push(commentText);
        totalComments++; // Tambahkan jumlah komentar
        updatePostStats(); // Update statistik komentar
        loadComments(postIndex);
        commentInput.value = '';
        loadCommentsToManage(); // Refresh komentar di halaman Kelola Komentar
    }
}

// Memuat komentar untuk postingan
function loadComments(postIndex) {
    const commentsDiv = document.getElementById(`comments-${postIndex}`);
    commentsDiv.innerHTML = '';
    posts[postIndex].comments.forEach((comment) => {
        const commentDiv = document.createElement('div');
        commentDiv.textContent = comment;
        commentsDiv.appendChild(commentDiv);
    });
}

// Mengupdate statistik postingan
function updatePostStats() {
    document.getElementById('total-posts').textContent = posts.length;
    document.getElementById('total-comments').textContent = totalComments;
    document.getElementById('total-visitors').textContent = Math.floor(Math.random() * 100); // Simulasi pengunjung
}

// Muat gambar saat halaman dimuat
window.onload = () => {
    loadImages();
    showSection('home'); // Menampilkan beranda secara default
};

// Memuat komentar untuk halaman Kelola Komentar
function loadCommentsToManage() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; // Kosongkan isi sebelumnya
    posts.forEach((post, postIndex) => {
        post.comments.forEach((comment, commentIndex) => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `
                <p>${comment} 
                <button onclick="editComment(${postIndex}, ${commentIndex})">Edit</button>
                <button onclick="deleteComment(${postIndex}, ${commentIndex})">Hapus</button></p>
            `;
            commentsList.appendChild(commentDiv);
        });
    });
}

// Mengedit komentar
function editComment(postIndex, commentIndex) {
    const newComment = prompt("Edit komentar:", posts[postIndex].comments[commentIndex]);
    if (newComment) {
        posts[postIndex].comments[commentIndex] = newComment;
        loadCommentsToManage(); // Refresh komentar di halaman Kelola Komentar
    }
}

// Menghapus komentar
function deleteComment(postIndex, commentIndex) {
    if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
        posts[postIndex].comments.splice(commentIndex, 1);
        totalComments--; // Kurangi jumlah komentar
        updatePostStats(); // Update statistik komentar
        loadCommentsToManage(); // Refresh komentar di halaman Kelola Komentar
    }
}

// Fungsi untuk memberikan like pada postingan
function likePost(postIndex) {
    const likeCountSpan = document.getElementById(`like-count-${postIndex}`);
    let likeCount = parseInt(likeCountSpan.textContent);
    likeCountSpan.textContent = likeCount + 1; // Tambahkan 1 pada jumlah like
}

// Fungsi untuk berbagi postingan
function sharePost(postIndex) {
    alert(`Berbagi postingan: ${posts[postIndex].title}`);
}

// Fungsi untuk toggle input komentar
function toggleCommentInput(postIndex) {
    const commentsDiv = document.getElementById(`comments-${postIndex}`);
    commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
}
