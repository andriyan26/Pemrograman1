<?php
session_start();
include("inc_koneksi.php");

$username = "";
$password = "";
$err = "";

if (isset($_POST['register'])) {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if ($username == '') {
        $err .= "<li>Silakan masukkan username</li>";
    }

    if ($password == '') {
        $err .= "<li>Silakan masukkan password</li>";
    }

    if (empty($err)) {
        // Simpan ke database (pastikan tabel dan kolom sudah ada)
        $password_hashed = md5($password);
        $sql = "INSERT INTO admin (username, password) VALUES ('$username', '$password_hashed')";
        if (mysqli_query($koneksi, $sql)) {
            header("Location: login.php?success=1");
            exit();
        } else {
            $err .= "<li>Gagal mendaftar: " . mysqli_error($koneksi) . "</li>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrasi</title>
    <link rel="stylesheet" href="style.css">
    <script>
        function showPasswordCheckbox() {
            const passwordInput = document.getElementById('password');
            const checkbox = document.getElementById('showPassword');
            passwordInput.type = checkbox.checked ? 'text' : 'password';
        }
    </script>
</head>
<body>
    <div id="app">
        <h1>Registrasi Akun Baru</h1>
        <?php
        if (!empty($err)) {
            echo "<ul class='error-message'>$err</ul>";
        }
        if (isset($_GET['success'])) {
            echo "<ul class='success-message'><li>Registrasi berhasil! Silakan login.</li></ul>";
        }
        ?>
        <form action="" method="post">
            <input type="text" value="<?php echo htmlspecialchars($username); ?>" name="username" class="input" placeholder="Isikan Username..." required /><br />
            <input type="password" id="password" name="password" class="input" placeholder="Isikan Password" required /><br />
            <label><input type="checkbox" id="showPassword" onclick="showPasswordCheckbox()"> Tampilkan Password</label><br /><br />
            <input type="submit" name="register" value="Daftar" class="btn-register" />
        </form>
        <p>Sudah punya akun? <a href="login.php">Login di sini</a></p>
    </div>
</body>
</html>
