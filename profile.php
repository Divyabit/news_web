<?php
$message = ""; // Initialize the $message variable

if (isset($_POST['updateProfile'])) {
  $host = 'localhost';
  $username = 'root';
  $password = '';
  $database = 'news';

  $connection = mysqli_connect($host, $username, $password, $database);

  if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
  }

  // Assuming you have other profile fields in the form, retrieve them here
  $firstName = mysqli_real_escape_string($connection, $_POST['firstName']);
  $lastName = mysqli_real_escape_string($connection, $_POST['lastName']);
  $email = mysqli_real_escape_string($connection, $_POST['email']);
  $phoneNumber = mysqli_real_escape_string($connection, $_POST['phoneNumber']);

  // Handle file upload
  $targetDirectory = "profile_pictures/"; // Directory where you want to store profile pictures
  $targetFile = $targetDirectory . basename($_FILES["profilePicture"]["name"]);
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

  // Check if the file is an image
  $check = getimagesize($_FILES["profilePicture"]["tmp_name"]);
  if ($check === false) {
    $message = "File is not an image.";
    $uploadOk = 0;
  }

  // Check file size (optional)
  if ($_FILES["profilePicture"]["size"] > 500000) { // Adjust the size limit as needed
    $message = "File is too large.";
    $uploadOk = 0;
  }

  // Allow only certain file formats (e.g., jpg, jpeg, png)
  if ($imageFileType != "jpg" && $imageFileType != "jpeg" && $imageFileType != "png") {
    $message = "Only JPG, JPEG, and PNG files are allowed.";
    $uploadOk = 0;
  }

  if ($uploadOk == 0) {
    $message = "File was not uploaded.";
  } else {
    // Move the uploaded file to the target directory
    if (move_uploaded_file($_FILES["profilePicture"]["tmp_name"], $targetFile)) {
      // File was uploaded successfully, so update the database with the file path
      $query = "INSERT INTO profiledata (first_name, last_name, email, phone_number, profile_picture) 
                VALUES ('$firstName', '$lastName', '$email', '$phoneNumber', '$targetFile')";

if (mysqli_query($connection, $query)) {
  $message = "Profile updated successfully.";
  
  // Redirect to viewprofile.php
  header("Location: viewprofile.php");
  exit; // Make sure to exit to prevent further script execution
} else {
  $message = "Error updating profile: " . mysqli_error($connection);
}
    } else {
      $message = "Error uploading file.";
    }
  }

  mysqli_close($connection);
}
?>


<!DOCTYPE html>
<html>
<head>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-image: url('https://wallpapers.com/images/hd/plain-white-abstract-awo1d2g8wroebjsy.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.profile-settings {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.profile-picture {
  display: block;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto 10px;
  border: 2px solid #007bff;
}

h3 {
  text-align: center;
  font-weight: bold;
  font-size: larger;
  margin-top: 15px;
}

.form-group label {
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
  display: block;
}

.form-control {
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 0;
  padding: 8px;
  width: 100%;
  margin-bottom: 15px;
  transition: border-color 0.3s ease-in-out;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  margin-right: 10px;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-light {
  background-color: #f0f0f0;
  color: #555;
  border: none;
}

.btn-light:hover {
  background-color: #d9d9d9;
}

.feedback-message {
  text-align: center;
  font-weight: bold;
  color: green;
  margin-top: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animated {
  animation: fadeIn 1s ease-in-out;
}
</style>
</head>
<body>
<div class="container">
  <div class="profile-settings animated">
    <div class="profile-picture-container">
      <img src="usericon.jpg" alt="" class="profile-picture" id="preview">
    </div>
    <h3 class="mb-3">PROFILE SETTINGS</h3>
    <form class="row" method="post" enctype="multipart/form-data" onsubmit="return validateForm()">

      <div class="col-md-12">
        <div class="form-group">
          <label>Profile Picture</label>
          <input type="file" class="form-control" name="profilePicture" id="profilePicture" accept="image/*">

        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label>First Name</label>
          <input type="text" class="form-control" name="firstName">
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" class="form-control" name="lastName">
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" name="email">
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label>Phone Number</label>
          <input type="text" class="form-control" name="phoneNumber">
        </div>
      </div>
    <div class="text-center">
    <button class="btn btn-primary" name="updateProfile">Update</button>

      <button class="btn btn-light">Cancel</button>
    </div>
    <div class="feedback-message">
  <?php echo $message; ?>
</div>
</form>
</div>
</div>

<script>
const profilePictureInput = document.getElementById('profilePicture');
const previewImage = document.getElementById('preview');
const feedbackMessage = document.querySelector('.feedback-message');

const savedImageURL = localStorage.getItem('profileImageURL');
if (savedImageURL) {
  previewImage.src = savedImageURL;
}

profilePictureInput.addEventListener('change', function() {
  const file = profilePictureInput.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    previewImage.src = imageURL;

    localStorage.setItem('profileImageURL', imageURL);
  } else {
    previewImage.src = 'usericon.jpg';

    localStorage.removeItem('profileImageURL');
  }
});

if (feedbackMessage.textContent !== "") {
  setTimeout(function() {
    feedbackMessage.textContent = "";
  }, 3000);
}

function validateForm() {
    const firstName = document.querySelector('[name="firstName"]').value;
    const lastName = document.querySelector('[name="lastName"]').value;
    const email = document.querySelector('[name="email"]').value;
    const phoneNumber = document.querySelector('[name="phoneNumber"]').value;
    const profilePictureInput = document.getElementById('profilePicture');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !profilePictureInput.files[0]) {
        alert("Please fill in all required fields.");
        return false;
    }

    // Validate the phone number
    const phoneNumberPattern = /^\d{10}$/; // Match exactly 10 digits
    if (!phoneNumber.match(phoneNumberPattern)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    return true;
}

</script>

</body>
</html>
