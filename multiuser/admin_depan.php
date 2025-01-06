<?php
session_start();
if (!isset($_SESSION['admin_username'])) {
    header("Location: login.php");
    exit();
}

include("inc_koneksi.php");

// Ambil statistik
$post_count = mysqli_num_rows(mysqli_query($koneksi, "SELECT * FROM postings WHERE MONTH(tanggal) = MONTH(CURRENT_DATE())"));
$comment_count = mysqli_num_rows(mysqli_query($koneksi, "SELECT * FROM komentar WHERE MONTH(tanggal) = MONTH(CURRENT_DATE())"));
$visitor_count = 100; // Ganti dengan logika penghitungan pengunjung yang sesungguhnya

// Tambah postingan
if (isset($_POST['add_post'])) {
    $title = mysqli_real_escape_string($koneksi, $_POST['title']);
    $content = mysqli_real_escape_string($koneksi, $_POST['content']);
    $date = date("Y-m-d H:i:s");

    $sql = "INSERT INTO postings (judul, konten, tanggal) VALUES ('$title', '$content', '$date')";
    mysqli_query($koneksi, $sql);
}

// Hapus postingan
if (isset($_GET['delete_post'])) {
    $post_id = $_GET['delete_post'];
    $sql = "DELETE FROM postings WHERE id = $post_id";
    mysqli_query($koneksi, $sql);
}

// Ambil postingan terbaru
$recent_posts = mysqli_query($koneksi, "SELECT * FROM postings ORDER BY tanggal DESC LIMIT 5");

// Ambil komentar
$comments = mysqli_query($koneksi, "SELECT * FROM komentar ORDER BY tanggal DESC");

// Hapus komentar
if (isset($_GET['delete_comment'])) {
    $comment_id = $_GET['delete_comment'];
    $sql = "DELETE FROM komentar WHERE id = $comment_id";
    mysqli_query($koneksi, $sql);
}

// Tambah komentar
if (isset($_POST['add_comment'])) {
    $comment = mysqli_real_escape_string($koneksi, $_POST['comment']); // Mengamankan input
    $date = date("Y-m-d H:i:s");

    $sql = "INSERT INTO komentar (komentar, tanggal) VALUES ('$comment', '$date')";
    if (mysqli_query($koneksi, $sql)) {
        echo "<p>Komentar berhasil ditambahkan!</p>";
    } else {
        echo "<p>Terjadi kesalahan: " . mysqli_error($koneksi) . "</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="app">
        <h1>Dashboard Admin</h1>
        <div class="stats">
            <h2>Statistik Bulan Ini</h2>
            <div class="stat-item">
                <p>Jumlah Postingan <?php echo $post_count; ?></p>
            </div>
            <div class="stat-item">
                <p>Jumlah Komentar <?php echo $comment_count; ?></p>
            </div>
            <div class="stat-item">
                <p>Jumlah Pengunjung <?php echo $visitor_count; ?></p>
            </div>
        </div>

        <h2>Tambah Postingan</h2>
        <form action="" method="post">
            <input type="text" name="title" placeholder="Judul Postingan" required /><br />
            <textarea name="content" placeholder="Konten Postingan" required></textarea><br />
            <input type="submit" name="add_post" value="Tambah Postingan" class="btn-login" />
        </form>

        <h2>Postingan Terbaru</h2>
        <ul>
            <?php while ($post = mysqli_fetch_array($recent_posts)) { ?>
                <li>
                    <?php echo htmlspecialchars($post['judul']); ?> - <?php echo htmlspecialchars($post['tanggal']); ?>
                    <a href="?delete_post=<?php echo $post['id']; ?>" onclick="return confirm('Apakah Anda yakin ingin menghapus postingan ini?');">Hapus</a>
                </li>
            <?php } ?>
        </ul>

        <h2>Komentar</h2>
        <?php if ($comment_count > 0) { // Cek apakah ada komentar ?>
            <ul>
                <?php while ($comment = mysqli_fetch_array($comments)) { ?>
                    <li>
                        <?php echo htmlspecialchars($comment['komentar']); ?> - <?php echo htmlspecialchars($comment['tanggal']); ?>
                        <a href="?delete_comment=<?php echo $comment['id']; ?>" onclick="return confirm('Apakah Anda yakin ingin menghapus komentar ini?');">Hapus</a>
                    </li>
                <?php } ?>
            </ul>
        <?php } else { ?>
            <p>Tidak ada komentar saat ini.</p>
        <?php } ?>

        <h2>Tambah Komentar</h2>
        <form action="" method="post">
            <textarea name="comment" placeholder="Tulis komentar Anda" required></textarea><br />
            <input type="submit" name="add_comment" value="Kirim Komentar" class="btn-login" />
        </form>

        <p><a href="logout.php">Logout</a></p>
    </div>
</body>

</html>

