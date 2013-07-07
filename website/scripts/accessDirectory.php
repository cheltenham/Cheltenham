<?php
    $VALID_USERNAME = "5f1f7e109c39d4a0691fec571d6d84c679294a655d9dd6293d67f6d511063744";
    $VALID_PASSWORD = "082b9b907c1beb8752e2e5718a50fb3ac5d648b50fb95aa0424e5a9aa8d4f822";

    $resultMessage = "";
    $resultHtml = "";

	try {
        $username = $_REQUEST["username"];
        $password = $_REQUEST["password"];

        if ($username == $VALID_USERNAME && $password == $VALID_PASSWORD) {
            $resultMessage = "SUCCESS";
            $resultHtml = "<a href='doc/directory.pdf' target='_blank'><img src='img/pdf.png' alt='Download Directory PDF'/> Download Directory</a>";
        }
        else {
            $resultMessage = "ERROR";
            $resultHtml = "Invalid username or password.";
        }
    } catch (Exception $e) {
        $resultMessage = "ERROR";
        $resultHtml = "An error occurred. " . $e->getMessage();
    }

    $jsonData = array(
        "resultMessage" => $resultMessage,
        "resultHtml" => $resultHtml
    );

	echo json_encode($jsonData);
?>