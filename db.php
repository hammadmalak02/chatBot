<?php
$conn = new mysqli("localhost", "root", "", "ai_chatbot");
if ($conn->connect_error) {
    die("DB Error");
}
