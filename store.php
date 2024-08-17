<?php

$myfile = fopen("location.txt", "w");
$txt = "Lat: " . $_GET["lat"];
fwrite($myfile, $txt);
fclose($myfile);


?>
