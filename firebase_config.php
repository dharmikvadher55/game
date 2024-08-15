<?php
header('Content-Type: application/json');

$config = [
    'apiKey' => "AIzaSyCCQ0xSFS_IAILVT7CXIS_Ls-cbrXNJ2HE",
    'authDomain' => "dataverse-24803.firebaseapp.com",
    'projectId' =>"dataverse-24803",
    'storageBucket' => "dataverse-24803.appspot.com",
    'messagingSenderId' => "945940897964",
    'appId' =>  "1:945940897964:web:c53d4d5e171f4560fc7f09",
    'vapidKey' =>  'BI4Nmeb2w7hLpWUi01R88fBytDQIV-zW6pi7Rv7qK48XNO5j0MA73lYADCLTqvZXwgZ75FqT0GO2ve1QqJ3qU0c'
];

echo json_encode($config);
?>