<?php
$conn = new mysqli("localhost", "root", "", "ai_chatbot");

$message = strtolower(trim($_POST['message']));

$stmt = $conn->prepare(
    "INSERT INTO chat_logs (user_message) VALUES (?)"
);
$stmt->bind_param("s", $message);
$stmt->execute();
?>
