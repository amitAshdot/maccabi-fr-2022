<?

$recepient = "amitashdot@gmail.com,"; 
// $recepient = "amitashdot@gmail.com"; 

$Fname = trim($_POST["Fname"]);
$Sname = trim($_POST["Sname"]);
$id = trim($_POST["id"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$time = trim($_POST["time"]);
$city = trim($_POST["city"]);

$text_3 = trim($_POST["utm_campaign"]);
$text_4 = trim($_POST["keywordBottom"]);

$message = " \n ליד חדש מקמפיין סלולר - מקאן \n
שם: $Fname $Sname \n
טלפון: $phone\n
תעודת זהות: $id \n
אימייל: $email \n
שעה נוחה לחזור: $time \n
עיר: $city \n

קמפיין: $text_3 \n
מילת מפתח : $text_4\n
";

$pagetitle = "פניה חדשה - converteam";
$headers = "From: https://converteam.co.il/ \r\nContent-type: text/plain; charset=utf8 \r\n";
$from = "https://converteam.co.il/";
 if ( mail($recepient, $pagetitle, $message, $headers,$from)) {
      echo("Email successfully sent to $to_email... $recepient");
    } else {
      echo("Email sending failed...");
    }
?>
