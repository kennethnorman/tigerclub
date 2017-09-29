<?php
error_reporting(E_ALL);
ini_set("include_path", '/home/sixistco/php:' . ini_get("include_path") );
include('Mail.php');

//$recipients = 'tigerclub@sixist.co.uk';
//$recipients = 'ken@sixist.co.uk';
$recipients = 'ken_norman@ntlworld.com';

$femail = $_POST['Email'];
$fname = $_POST['Name'];
$fmessage = $_POST['Message'];

$headers['From']    = $femail;
$headers['To']      = $recipients;
$headers['Subject'] = $fname;

$body = $fmessage;

// Create the mail object using the Mail::factory method
$mail_object = Mail::factory('mail');

$result = $mail_object->send($recipients, $headers, $body);

header("Location: thanks.html");
exit;

//var_dump($result);

?> 