<?php
	$retJson = array();

	try {
		$to = $_REQUEST["recipientEmail"];
		$subject = $_REQUEST["subject"];
		$from = $_REQUEST["senderEmail"];
		$fromName = $_REQUEST["senderName"];
		$fromPhone = $_REQUEST["senderPhone"];
		$message = "From: " . $fromName . "\r\n" . "Phone: " . $fromPhone . "\r\n\r\n" . $_REQUEST["message"];

		if (mail($to, $subject, $message, "From:" . $from)) {
			$retJson['errors'] = "";
		} else {
			$retJson['errors'] = "Error: could not deliver message.";
		}

	} catch (Exception $e) {
		$retJson['errors'] = "Error: " . $e->getMessage();
	}

	echo json_encode($retJson);
?>