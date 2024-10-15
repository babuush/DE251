<!DOCTYPE HTML>
<html lang="en">
<head>
    <style>
        .error {
            color: #FF0000;
        }
    </style>
    <title>Lab 9 - Form Validation</title>
</head>
<body>
<?php
// Define error variables and set to empty values
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $comment = $website = "";

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate Name
    if (empty($_POST["name"])) {
        $nameErr = "Name is required";
    } else {
        $name = test_input($_POST["name"]);
        // Check if name only contains letters and whitespace
        if (!preg_match("/^[a-zA-Z-' ]*$/", $name)) {
            $nameErr = "Only letters and white space allowed";
        }
    }

    // Validate Email
    if (empty($_POST["email"])) {
        $emailErr = "Email is required";
    } else {
        $email = test_input($_POST["email"]);
        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format";
        }
    }

    // Validate Website (Optional)
    if (!empty($_POST["website"])) {
        $website = test_input($_POST["website"]);
        // Validate website URL with regex (ensures it ends in .com)
        if (!preg_match("/\b(?:https?|ftp):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*\.[a-z]{2,6}\b/i", $website)) {
            $websiteErr = "Invalid URL (must start with https:// and end in .com)";
        }
    }

    // Validate Comment (Optional)
    if (!empty($_POST["comment"])) {
        $comment = test_input($_POST["comment"]);
    }

    // Validate Gender
    if (empty($_POST["gender"])) {
        $genderErr = "Gender is required";
    } else {
        $gender = test_input($_POST["gender"]);
    }
}

// Function to sanitize form data
function test_input($data): string
{
    $data = trim($data);
    $data = stripslashes($data);
    return htmlspecialchars($data);
}

?>

<h2>PHP Form Validation Example</h2>
<p><span class="error">* required field</span></p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
    Name: <label>
        <input type="text" name="name" value="<?php echo $name; ?>">
    </label>
    <span class="error">* <?php echo $nameErr; ?></span>
    <br><br>

    E-mail: <label>
        <input type="text" name="email" value="<?php echo $email; ?>">
    </label>
    <span class="error">* <?php echo $emailErr; ?></span>
    <br><br>

    Website: <label>
        <input type="text" name="website" value="<?php echo $website; ?>">
    </label>
    <span class="error"><?php echo $websiteErr; ?></span>
    <br><br>

    Comment: <label>
        <textarea name="comment" rows="2" cols="40"><?php echo $comment; ?></textarea>
    </label>
    <br><br>

    Gender:
    <label>
        <input type="radio" name="gender" <?php if (isset($gender) && $gender == "female") echo "checked"; ?>
               value="female">
        Female
    </label>
    <label>
        <input type="radio" name="gender" <?php if (isset($gender) && $gender == "male") echo "checked"; ?>
               value="male">
        Male
    </label>
    <span class="error">* <?php echo $genderErr; ?></span>
    <br><br>

    <input type="submit" name="submit" value="Submit">
</form>

<?php
// Display the data after submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && empty($nameErr) && empty($emailErr) && empty($websiteErr) && empty($genderErr)) {
    echo "<h2>Final Output:</h2>";
    echo "Name: " . $name . "<br>";
    echo "Email: " . $email . "<br>";
    echo "Website: " . ($website ?: "Not provided") . "<br>";
    echo "Comment: " . ($comment ?: "No comment") . "<br>";
    echo "Gender: " . $gender . "<br>";
}
?>

</body>
</html>
