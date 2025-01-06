<?php
session_start();
require 'config.php';

if (!isset($_SESSION['loggedin'])) {
    header('Location: index.php');
    exit;
}

if (!isset($_GET['id'])) {
    header('Location: dashboard.php');
    exit;
}

$id = $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM posts WHERE id = ?");
$stmt->execute([$id]);
$post = $stmt->fetch();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $content = $_POST['content'];

    $stmt = $pdo->prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?");
    $stmt->execute([$title, $content, $id]);

    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Edit Postingan</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Edit Postingan</h1>
    <form method="POST">
        <input type="text" name="title" value="<?= htmlspecialchars($post['title']) ?>" required>
        <textarea name="content" required><?= htmlspecialchars($post['content']) ?></textarea>
        <button type="submit">Simpan</button>
    </form>
    <a href="dashboard.php">Kembali ke Dashboard</a>
</body>
</html>
