<?php
    $directory = '../doc/minutes';
    $fileNames = scandir($directory, 1);
    echo json_encode($fileNames);
?>