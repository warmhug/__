<?php
  header('Content-type: application/json');
  $delFileName = json_decode(file_get_contents("php://input"))->fileName;
  if ($_SERVER['REQUEST_METHOD'] === "DELETE" && $delFileName != '') {
    unlink('uploads/'.$delFileName);
    echo '{"data": true}';
  }
?>
