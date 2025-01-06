<?php
session_start();
require 'config.php';

if (!isset($_SESSION['loggedin'])) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $content = $_POST['content'];

    $stmt = $pdo->prepare("INSERT INTO posts (title, content) VALUES (?, ?)");
    $stmt->execute([$title, $content]);

    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tambah Postingan</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Tambah Postingan</h1>
    <form method="POST">
        <input type="text" name="title" placeholder="Judul" required>
        <textarea name="content" placeholder="Konten" required></textarea>
        <button type="submit">Tambah</button>
    </form>
    <a href="dashboard.php">Kembali ke Dashboard</a>
</body>
</html>
