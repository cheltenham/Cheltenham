<?php
    $path = '../' . $_REQUEST["path"];
    $fileNames = scandir($path, 1);
    echo json_encode(array_diff($fileNames, array(".", "..")));
?>