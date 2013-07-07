<?php
    $errors = "";

	try {
		$to = $_REQUEST["recipientEmail"];
		$subject = $_REQUEST["subject"];
		$from = $_REQUEST["senderEmail"];
		$message = $_REQUEST["message"];

        if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
            $errors = $errors . "Error: " . $to . " is not a valid email address. ";
        }

        if (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
            $errors = $errors . "Error: " . $from . " is not a valid email address. ";
        }

        if (empty($errors)) {
            if (!mail($to, $subject, $message, "From:" . $from)) {
                $errors = $errors . "Error: could not deliver message. ";
            }
        }

	} catch (Exception $e) {
        $errors = $errors . "Error: " . $e->getMessage() . " ";
	}

	echo json_encode(array("errors" => $errors));
?>