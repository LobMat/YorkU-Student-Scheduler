const Account = require("../src/business-objects/Account"); // Import the Account class
const readline = require("readline");

// Setup command-line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt user input
const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("\n🔥 Welcome to the Account Console Tester 🔥\n");

  const choice = await askQuestion(
    "Do you want to create a new account? (yes/no): "
  );

  const username = await askQuestion("Enter username: ");
  const password = await askQuestion("Enter password: ");

  let isNewAccount = choice.toLowerCase() === "yes";

  console.log("\n🔄 Processing your request...\n");

  // Create or fetch the account
  try {
    const account = new Account(username, password, isNewAccount);

    // Wait for async initialization (needed due to constructor logic)
    setTimeout(async () => {
      console.log("\n✅ Account initialized!");

      // Show user data
      console.log(`👤 Username: ${account.getUsername}`);
      console.log(`🔑 Password: ${account.getPassword}`);
      console.log(`📚 Courses: ${JSON.stringify(account.getCourses)}`);

      // Option to add a course
      const addCourse = await askQuestion(
        "Would you like to add a course? (yes/no): "
      );
      if (addCourse.toLowerCase() === "yes") {
        const courseName = await askQuestion("Enter course name: ");
        account.addCourse = { name: courseName };
        console.log(`📌 Added Course: ${courseName}`);
      }

      // Option to change username
      const changeUsername = await askQuestion(
        "Would you like to change your username? (yes/no): "
      );
      if (changeUsername.toLowerCase() === "yes") {
        const newUsername = await askQuestion("Enter new username: ");
        account.changeUsername = newUsername;
        console.log(`🔄 Username changed to: ${newUsername}`);
      }

      // Option to change password
      const changePassword = await askQuestion(
        "Would you like to change your password? (yes/no): "
      );
      if (changePassword.toLowerCase() === "yes") {
        const newPassword = await askQuestion("Enter new password: ");
        account.changePassword = newPassword;
        console.log(`🔄 Password changed successfully!`);
      }

      // Save updated account data
      await account.saveToDB();
      console.log("\n💾 Changes saved to Firestore!");

      // Close the readline interface
      rl.close();
    }, 2000);
  } catch {
    console.error("Error. Will not run tests:", error.message);
  }
}

// Run the main function
main();
