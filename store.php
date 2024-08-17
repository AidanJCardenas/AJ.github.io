<?php

$myfile = fopen("location.txt", "w");
$txt = "Lat: " . $_GET["lat"] . "\nLong: " . $_GET["long"];
fwrite($myfile, $txt);
fclose($myfile);


?>
