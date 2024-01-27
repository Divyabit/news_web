<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'news';

$connection = mysqli_connect($host, $username, $password, $database);

if (!$connection) {
  die("Connection failed: " . mysqli_connect_error());
}

$query = "SELECT * FROM profiledata"; 
$result = mysqli_query($connection, $query);

if ($result && mysqli_num_rows($result) > 0) {
  $row = mysqli_fetch_assoc($result);
} else {
  $row = [
    'first_name' => 'John',
    'last_name' => 'Doe',
    'email' => 'john@example.com',
    'phone_number' => '123-456-7890',
    'profile_picture' => 'default.jpg' 
  ];
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

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  opacity: 10px;
}

.profile-card {
  background-color: rgba(247, 249, 252, 0.8);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.profile-picture {
  display: block;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto 20px;
}

h2 {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}

.profile-details {
  margin-top: 20px;
}

.profile-details p {
  font-size: 16px;
  margin-bottom: 10px;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
</head>
<body>
<div class="container">
  <div class="profile-card">
    <?php if (!empty($row['profile_picture'])): ?>
      <img src="<?php echo $row['profile_picture']; ?>" alt="Profile Picture" class="profile-picture">
    <?php else: ?>
      <img src="https://wwwcdn.moovly.com/wp-content/uploads/2021/05/Avatarprofilepurple-1.png" alt="Default Profile Picture" class="profile-picture">
    <?php endif; ?>
    <h2><?php echo $row['first_name'] . ' ' . $row['last_name']; ?></h2>
    <div class="profile-details">
      <p><strong>Email:</strong> <?php echo $row['email']; ?></p>
      <p><strong>Phone:</strong> <?php echo $row['phone_number']; ?></p>
    </div>
    <a href="profile.php" class="btn">Update Profile</a>
  </div>
</div>
</body>
</html>

