<?php

$to = 'rayhanrwa1@gmail.com';

// Fungsi untuk mendapatkan URL situs
function url() {
    return sprintf(
        "%s://%s",
        isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http',
        $_SERVER['SERVER_NAME']
    );
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validasi dan sanitasi input
    $name = trim(htmlspecialchars(stripslashes($_POST['name'] ?? '')));
    $email = trim(htmlspecialchars(stripslashes($_POST['email'] ?? '')));
    $subject = trim(htmlspecialchars(stripslashes($_POST['subject'] ?? 'Contact Form Submission')));
    $contact_message = trim(htmlspecialchars(stripslashes($_POST['message'] ?? '')));

    // Cek apakah input penting terisi
    if (empty($name) || empty($email) || empty($contact_message)) {
        echo "Semua kolom wajib diisi.";
        exit;
    }

    // Validasi email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email tidak valid.";
        exit;
    }

    // Inisialisasi dan isi pesan email
    $message = "Email from: " . $name . "<br />";
    $message .= "Email address: " . $email . "<br />";
    $message .= "Message: <br />" . nl2br($contact_message);
    $message .= "<br /> ----- <br /> This email was sent from your site " . url() . " contact form. <br />";

    // Header email
    $from = $name . " <" . $email . ">";
    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Untuk server Windows (opsional)
    ini_set("sendmail_from", $to);

    // Kirim email
    if (mail($to, $subject, $message, $headers)) {
        echo "OK";
    } else {
        echo "Something went wrong. Please try again.";
    }
}
?>
