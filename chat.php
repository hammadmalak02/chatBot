<?php

$conn = new mysqli("localhost", "root", "", "ai_chatbot");
sleep(1);

// LOG EVERY USER MESSAGE (for analytics)
$logStmt = $conn->prepare(
    "INSERT INTO chat_logs (user_message) VALUES (?)"
);
$logStmt->bind_param("s", $userMsg);
$logStmt->execute();

$userMsg = strtolower(trim($_POST['message']));
$response = "";
$found = false;

// Search in knowledge base
$sql = "SELECT * FROM chatbot_data";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    if (strpos($userMsg, strtolower($row['question'])) !== false) {
        $response = $row['answer'];
        $found = true;
        break;
    }
}

// Fallback learning (if no answer found)
if (!$found) {
    $response = "🤖 Sorry, I don't know this yet. I will learn it soon!";

    // Save unknown question
    $stmt = $conn->prepare(
        "INSERT INTO unknown_questions (question) VALUES (?)"
    );
    $stmt->bind_param("s", $userMsg);
    $stmt->execute();
}

echo $response;
?>
