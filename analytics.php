<?php
$conn = new mysqli("localhost", "root", "", "ai_chatbot");

$result = $conn->query(
    "SELECT user_message, COUNT(*) AS total
     FROM chat_logs
     GROUP BY user_message
     ORDER BY total DESC
     LIMIT 5"
);

while ($row = $result->fetch_assoc()) {
    echo "Question: " . $row['user_message'] .
         " | Asked: " . $row['total'] . " times<br>";
}
?>
