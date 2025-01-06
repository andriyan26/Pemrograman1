<?php
session_start();
require 'config.php';

if (!isset($_SESSION['loggedin'])) {
    header('Location: index.php');
    exit;
}

// Ambil statistik
$total_posts = $pdo->query("SELECT COUNT(*) FROM posts")->fetchColumn();
$total_comments = $pdo->query("SELECT COUNT(*) FROM comments")->fetchColumn();
$total_visitors = 100; // Ganti dengan logika yang sesuai untuk menghitung pengunjung

?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Dashboard</h1>
    <p>Total Postingan: <?= $total_posts ?></p>
    <p>Total Komentar: <?= $total_comments ?></p>
    <p>Total Pengunjung Bulan Ini: <?= $total_visitors ?></p>

    <h2>Tambah Postingan</h2>
    <a href="add_post.php" class="button">Tambah Postingan Baru</a>

    <h2>Daftar Postingan</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Judul</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $stmt = $pdo->query("SELECT * FROM posts");
            while ($row = $stmt->fetch()) {
                echo "<tr>
                        <td>{$row['id']}</td>
                        <td>{$row['title']}</td>
                        <td>
                            <a href='edit_post.php?id={$row['id']}'>Edit</a>
                        </td>
                    </tr>";
            }
            ?>
        </tbody>
    </table>
</body>
</html>
