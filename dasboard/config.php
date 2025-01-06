<?php
$host = 'localhost';
$db = 'blog'; // Ganti dengan nama database Anda
$user = 'root'; // Ganti dengan username database Anda
$pass = 'admin123'; // Ganti dengan password database Anda

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Koneksi gagal: " . $e->getMessage();
}
?>
