<?php
    $result = "";
    $errors = "";

	try {
		$to = $_REQUEST["to"];
		$from = $_REQUEST["from"];
		$subject = $_REQUEST["subject"];
		$message = $_REQUEST["message"];

        if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
            $result = "ERROR";
            $errors = $errors . "Error: " . $to . " is not a valid email address. ";
        }

        if (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
            $result = "ERROR";
            $errors = $errors . "Error: " . $from . " is not a valid email address. ";
        }

        if (empty($result)) {
            if (mail($to, $subject, $message, "From:" . $from)) {
                $result = "SUCCESS";
            } else {
                $result = "ERROR";
                $errors = $errors . "Error: could not deliver message. ";
            }
        }
	} catch (Exception $e) {
        $result = "ERROR";
        $errors = $errors . "Error: " . $e->getMessage() . " ";
	}

	echo json_encode(array("result" => $result, "errors" => $errors));
?>