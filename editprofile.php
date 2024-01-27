<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $user_id = $_SESSION["user_id"];
    $name = $_POST["name"];
    $email = $_POST["email"];

    $sql = "UPDATE signup SET name='$name', email='$email' WHERE id = $user_id";

    if (mysqli_query($conn, $sql)) {
        header("Location: profile.php");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

$user_id = $_SESSION["user_id"];
$sql = "SELECT * FROM signup WHERE id = $user_id";
$result = mysqli_query($conn, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Profile</title>
</head>
<body>
    <h1>Edit Profile</h1>
    <form method="post" action="">
        <label>Name:</label>
        <input type="text" name="name" value="<?php echo $row['name']; ?>"><br>

        <label>Email:</label>
        <input type="email" name="email" value="<?php echo $row['email']; ?>"><br>

       

        <input type="submit" value="Save Changes">
    </form>
    <a href="profile.php">Back to Profile</a>
</body>
</html>
