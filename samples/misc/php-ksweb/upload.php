<?php
// 使用 stream 处理大文件上传
// read contents from the input stream
// $inputHandler = fopen('php://input', "r");
// // create a temp file where to save data from the input stream
// $fileHandler = fopen('/tmp/myfile.tmp', "w+");
// // save data from the input stream
// while(true) {
//   $buffer = fgets($inputHandler, 4096);
//   if (strlen($buffer) == 0) {
//     fclose($inputHandler);
//     fclose($fileHandler);
//     return true;
//   }
//   fwrite($fileHandler, $buffer);
// }

echo "log...";

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        // echo "File is not an image.";
        $uploadOk = 1;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
// if ($_FILES["fileToUpload"]["size"] > 500000) {
//     echo "your file is too large.";
//     $uploadOk = 1;
// }
// $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
// if($imageFileType != "jpg") {
//     // echo "your file type is not jpg";
//     // $uploadOk = 1;
// }
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
  header('HTTP/1.1 451 Not valid');
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
    header('HTTP/1.1 500 Internal Server Error');
  }
}
?>
