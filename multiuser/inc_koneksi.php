<?php
// Konfigurasi koneksi database
$db_host = "localhost";
$db_user = "root"; // Sesuaikan dengan username database Anda
$db_pass = ""; // Sesuaikan dengan password database Anda
$db_name = "multiuser";

// Mencoba untuk menghubungkan ke database
$koneksi = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Cek koneksi
if (!$koneksi) {
    die("Koneksi Gagal: " . mysqli_connect_error());
}
?>
