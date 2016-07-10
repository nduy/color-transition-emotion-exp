<?php
   $dbhost = 'localhost:3306';
   $dbuser = 'duynd';
   $dbpass = '123456';
//   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
   date_default_timezone_set("UTC"); 
  
   echo 'Connected successfully';
   print_r ($_GET);
    if( $_GET["uid"] ||$_GET["uage"] || $_GET["fcolor"] || $_GET["lcolor"]|| $_GET["mode"]|| $_GET["udec"]|| $_GET["stistar"]|| $_GET["usrclck"])
    {
        $id = $_GET["uid"];
        $uage = $_GET["uage"];
        $ugender = $_GET["ugender"];
        $fc = $_GET["fcolor"] ;
        $lc = $_GET["lcolor"];
        $mo= $_GET["mode"];
        $ud= $_GET["udec"];
        if ($mo=="advance"){
            $ud= explode(",",$_GET["udec"]);
            if (count($ud)==8)
                for ($x = 0; $x <8; $x++) {
                    $ud[$x] = floatval($ud[$x]);
                }
        }
        elseif ($mo=="intermediate") {
            $ud= explode(",",$_GET["udec"]);
            if (count($ud)==8)
                for ($x = 0; $x <8; $x++) {
                    $ud[$x] = $ud[$x] == 'true'? 1: 0;
                }
        }
        $sti= $_GET["stistar"];
        $uclk= $_GET["usrclck"];
        $link = mysqli_connect($dbhost, $dbuser, $dbpass, "cedata");
        if(! $link )
        {
          die('Could not connect: ' . mysql_error());
        }
        if($mo==='simple' || $mo==='basic'){
            $sql = "INSERT INTO expdatasimple (userID, userAge, userGender, timeStamp, formerColor, latterColor,expMode,userEmotion,stimulusStart,userClick) VALUES ('$id','$uage','$ugender',NOW(),'$fc','$lc','$mo',$ud,$sti,$uclk)";
            if(mysqli_query($link, $sql)){
                echo "Records added successfully.";
            } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }
        } elseif ($mo==='advance' || $mo==='intermediate') {
            $sql = "INSERT INTO expdataadvance (userID, userAge, userGender, timeStamp, formerColor, latterColor,expMode, userEmotion1, userEmotion2,userEmotion3,userEmotion4,userEmotion5,userEmotion6,userEmotion7,userEmotion8,userEmotion9,stimulusStart,userClick) VALUES ('$id','$uage','$ugender',NOW(),'$fc','$lc','$mo',$ud[0],$ud[1],$ud[2],$ud[3],$ud[4],$ud[5],$ud[6],$ud[7],$ud[8],$sti,$uclk)";
            if(mysqli_query($link, $sql)){
                echo "Records added successfully.";
            } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }
        }
        
            // Close connection
        mysqli_close($link);
    }