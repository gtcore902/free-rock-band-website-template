<?php
$mail = strip_tags($_POST['mail']);
$checkRobot = strip_tags($_POST['checkRobot']);

// Text to send
$text = "Hi there,<br /><br />";
$text = $text . "Inscription from yoursitename.<br />";
$text = $text . "The elements entered in the form are as follows :<br />";
$text = $text . "Email :  $mail<br /><br />";
$text = $text . "This is an automatic message, do not reply to it.";

$text = stripslashes($text);

/// Recipient and subject of the message
$recipient = "contact@gmail.com"; // input your email here
$object = "Newsletter subscription from your < site name >"; // input your domain name here

//Headers
$headers = array(
    'Content-type' => 'text/html',
    'From' => 'form@yourbandname.com', // input your email from here
    'X-Mailer' => 'PHP/' . phpversion()
);

// Send the message then return data to current page with ajax
if ($checkRobot == 7) {
    $conf = ini_set('mail', 'mail.gmail.com'); // update yours informations here
    $sending_ok = mail($recipient, $object, $text, $headers);
    if ($sending_ok) {
        echo "<p class=\"hardLight\">Thank you for your registration !</p>";
    } else {
        echo "<p class=\"hardLight\">There seems to be a problem ...</p>";
    }

} else {
    echo "<p class=\"hardLight\">There seems to be a problem with the anti robot control ...</p>";
}
