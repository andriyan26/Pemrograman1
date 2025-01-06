<?php
session_start();
include("inc_koneksi.php");

$username = "";
$password = "";
$err = "";

if (isset($_POST['login'])) {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if ($username == '') {
        $err .= "<li>Silakan masukkan username</li>";
    }

    if ($password == '') {
        $err .= "<li>Silakan masukkan password</li>";
    }

    if (empty($err)) {
        $sql1 = "SELECT * FROM admin WHERE username = '$username'";
        $q1 = mysqli_query($koneksi, $sql1);

        if (!$q1) {
            die("Kueri gagal: " . mysqli_error($koneksi));
        }

        if (mysqli_num_rows($q1) > 0) {
            $r1 = mysqli_fetch_array($q1);
            if ($r1['password'] != md5($password)) {
                $err .= "<li>Password salah</li>";
            } else {
                $_SESSION['admin_username'] = $username;
                header("Location: admin_depan.php");
                exit();
            }
        } else {
            $err .= "<li>Akun tidak ditemukan</li>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
        <h1>Halaman Login</h1>
        <?php if (!empty($err)): ?>
            <div class="error-message">
                <ul><?php echo $err; ?></ul>
            </div>
        <?php endif; ?>
        <form action="" method="post">
            <input type="text" value="<?php echo htmlspecialchars($username); ?>" name="username" class="input" placeholder="Isikan Username..." required /><br />
            <input type="password" id="password" name="password" class="input" placeholder="Isikan Password" required /><br />
            <label>
                <input type="checkbox" id="showPassword" onclick="showPasswordCheckbox()"> Tampilkan Password
            </label><br /><br />
            <input type="submit" name="login" value="Login" class="btn-login" />
        </form>
        <p>Belum punya akun? <a href="register.php">Daftar di sini</a></p>
    </div>
</body>
</html>
