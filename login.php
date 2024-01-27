<!DOCTYPE html>
<html>
<head>
    <title>LOGIN PAGE</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700,800&display=swap" rel="stylesheet">
    <style>
        .error-message {
            color: red;
            font-weight: bold;
        }

        .notification {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    background-color: red;
    color: white;
    text-align: center;
    display: none; 
}

#transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000; 
    opacity: 0; 
    pointer-events: none; 
    z-index: 9999; 
    transition: opacity 0.5s ease-in-out; 
}


    </style>

<script src="https://apis.google.com/js/platform.js" async defer></script>
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">

</head>
<body>

<div class="notification" id="notification">
    <?php if (isset($loginError)) : ?>
        <?php echo $loginError; ?>
    <?php endif; ?>
</div>

<div id="transition-overlay"></div>

<?php
session_start();

$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "news";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sign In Logic
    if (isset($_POST["signin"])) {
        $email = $_POST["email"];
        $password = $_POST["password"];

        $sql = "SELECT * FROM signup WHERE email='$email' AND password='$password'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $_SESSION["user_id"] = $row["id"]; 
            header("Location: index.html");
            exit();
        } else {
            $loginError = "Incorrect email or password. Please enter correct details.";
        }
    }

    }

    

    
    if (isset($_POST["signup"])) {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $confirmPassword = $_POST["confirm_password"];

        if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
            echo "<script>alert('Please fill in all the fields.');</script>";
        } elseif ($password !== $confirmPassword) {
            echo "<script>alert('Passwords do not match.');</script>";
        } else {
            $sql = "INSERT INTO signup (name, email, password, confirmpassword) VALUES ('$name', '$email', '$password', '$confirmPassword')";

            if ($conn->query($sql) === true) {
                
                header("Location: index.html"); 
                exit();
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    }

mysqli_close($conn);
?>



<div class="cont">
    <div class="form sign-in">
        <h2>Sign In</h2>
        <form method="post" action="">
            <label>
                <span>Email</span>
                <input type="email" name="email">
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password">
            </label>
            <button type="submit" class="submit" name="signin" id="signinButton">Sign In Now</button>
            <p class="forgot-pass"><a href="forgot.html">Forgot Password?</a></p>
            <?php if (isset($loginError)) : ?>
    <p class="error-message"><?php echo $loginError; ?></p>
<?php endif; ?>

<div class="social-media">
    <ul>
        <li><a href="https://www.facebook.com"><img src="facebook.png"></a></li>
        <li><a href="https://www.twitter.com"><img src="twitter.png"></a></li>
        <li><a href="https://www.linkedin.com"><img src="linkedin.png"></a></li>
        <li><a href="https://www.instagram.com"><img src="instagram.png"></a></li>
        <li><a href="https://www.google.com"><img src="google.png"></a></li>
    </ul>
</div>

        </form>
    </div>

    <div class="sub-cont">
      <div class="img">
        <div class="img-text m-up">
          <h2>New here?</h2>
          <p>Sign up and discover great amount of new opportunities!</p>
        </div>
        <div class="img-text m-in">
          <h2>One of us?</h2>
          <p>If you already has an account, just sign in. We've missed you!</p>
        </div>
        <div class="img-btn">
          <span class="m-up">Sign Up</span>
          <span class="m-in">Sign In</span>
        </div>
      </div>
      <div class="form sign-up">
    <h2>Sign Up</h2>
    <form method="post" action="">
        <label>
            <span>Name</span>
            <input type="text" name="name">
        </label>
        <label>
            <span>Email</span>
            <input type="email" name="email">
        </label>
        <label>
            <span>Password</span>
            <input type="password" name="password">
        </label>
        <label>
            <span>Confirm Password</span>
            <input type="password" name="confirm_password">
        </label>
        <button type="submit" class="submit" name="signup" id="signupButton">Sign Up Now</button>
    </form>
</div>


    </div>
  </div>
<script type="text/javascript" src="script.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
  const signupButton = document.getElementById("signupButton");

  if (signupButton) {
    signupButton.addEventListener("click", function() {
      
      window.location.href = "index.html";
    });
  }
});


$(document).ready(function() {
    
    $(".submit").click(function(e) {
        e.preventDefault(); 

        
        $("#transition-overlay").css("opacity", 1);

        
        setTimeout(function() {
            
            window.location.href = "index.html"; 
        }, 500); 
    });
});
</script>


</script>
</body>
</html>