function showUsernameChange() {
  let tempUsername = document.getElementById("new-username").value;
  document.getElementById("show-new-username").innerText =
    "New: " + tempUsername;
}

function setMenuView(menuChoice) {
  document.getElementById("chosen-menu-option").style.visibility = "visible";
  let user = firebase.auth().currentUser;
  switch (menuChoice) {
    case "addschool":
      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">\n' +
        "Add School\n" +
        "</h1>" +
        '<div class="field">\n' +
        '  <div class="select">\n' +
        "    <select>\n" +
        "      <option>Select School</option>\n" +
        "      <option>Temporary for testing</option>\n" +
        "    </select>\n" +
        "  </div>\n" +
        "</div>\n" +
        '<div class="field">\n' +
        '  <label class="label">Enter your student email:</label>\n' +
        '  <div class="control">\n' +
        '    <input id="student-email" class="input" type="text" />\n' +
        "  </div>\n" +
        "</div>\n" +
        '<div class="field">\n' +
        '  <div class="control">\n' +
        '    <button class="button is-link" onclick="">Request Access</button>\n' +
        "  </div>\n" +
        "</div>";
      break;

    case "switchschool":
      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">\n' +
        "Switch School\n" +
        "</h1>" +
        '<div class="field">\n' +
        '  <div class="select">\n' +
        "    <select>\n" +
        "      <option>Select School</option>\n" +
        "      <option>Temporary for testing</option>\n" +
        "    </select>\n" +
        "  </div>\n" +
        "</div>\n" +
        '<div class="field">\n' +
        '  <div class="control">\n' +
        '    <button class="button is-link" onclick="">Switch</button>\n' +
        "  </div>\n" +
        "</div>";
      break;

    case "changeusername":
      let username;
      if (user != null) {
        username = user.displayName;
      }
      if (username == null) {
        username = "none";
      }

      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">Change Username</h1>\n' +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter New Username:</label>\n' +
        '                    <div class="control">\n' +
        "                      <input\n" +
        '                        id="new-username"\n' +
        '                        class="input"\n' +
        '                        type="text"\n' +
        '                        onchange="showUsernameChange()"\n' +
        "                      />\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        "                  <h6>Current: " +
        username +
        "</h6>\n" +
        '                  <h6 id="show-new-username" class="subtitle is-6">New:</h6>\n' +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <button class="button is-link" onclick="changeUsername()">\n' +
        "                        Change\n" +
        "                      </button>\n" +
        "                    </div>\n" +
        "                  </div>";
      break;

    case "changepassword":
      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">Change Password</h1>\n' +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter Old Password:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="old-password" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter New Password:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="new-password" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">Confirm New Password:</label>\n' +
        '                    <div class="control">\n' +
        "                      <input\n" +
        '                        id="confirm-new-password"\n' +
        '                        class="input"\n' +
        '                        type="password"\n' +
        "                      />\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <button class="button is-link" onclick="changePassword()">Change</button>\n' +
        "                    </div>\n" +
        "                  </div>";
      break;

    case "deleteaccount":
      document.getElementById("chosen-menu-option").innerHTML =
        '                  <h1 class="title is-5 has-text-centered">Delete Account</h1>\n' +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter Password:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="delete-password" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <label class="checkbox">\n' +
        '                        <input id="delete-checkbox" type="checkbox" />\n' +
        "                        I choose to delete my account and understand that this\n" +
        "                        action cannot be undone.\n" +
        "                      </label>\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <button class="button is-danger" onclick="deleteAccount()">\n' +
        "                        Delete\n" +
        "                      </button>\n" +
        "                    </div>\n" +
        "                  </div>";
      break;

    case "requestschoolaccount":
      // check to see if user already requested account
      let db = firebase.firestore();

      let ref = db.collection("schoolAccountRequests").doc(user.uid);

      ref.get().then(function (doc) {
        if (doc.exists) {
          alert("Account already requested! We'll be in touch soon.");
        } else {
          document.getElementById("chosen-menu-option").innerHTML =
            '<h1 class="title is-5 has-text-centered">\n' +
            "                    Request School Account\n" +
            "                  </h1>\n" +
            '                  <div class="field">\n' +
            '                    <label class="label">School:</label>\n' +
            '                    <div class="control">\n' +
            '                      <input id="school-name" class="input" type="text" />\n' +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <label class="label">Name:</label>\n' +
            '                    <div class="control">\n' +
            '                      <input id="personal-name" class="input" type="text" />\n' +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <label class="label">Position at School:</label>\n' +
            '                    <div class="control">\n' +
            '                      <input id="position" class="input" type="text" />\n' +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <label class="label">Contact Email:</label>\n' +
            '                    <div class="control">\n' +
            '                      <input id="email" class="input" type="text" />\n' +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <div class="control">\n' +
            '                      <label class="checkbox">\n' +
            '                        <input id="term-agree" type="checkbox" />\n' +
            "                        <!-- TODO: create terms and conditions -->\n" +
            '                        I agree to the <a href="#">terms and conditions</a>\n' +
            "                      </label>\n" +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <div class="control">\n' +
            '                      <button class="button is-link" onclick="requestSchoolAccount()">Request</button>\n' +
            "                    </div>\n" +
            "                  </div>";
        }
      });
  }
}

function deleteAccount() {
  // TODO: delete database records associated with user
  let password = document.getElementById("delete-password").value;
  let email = "";
  let isConfirmed = document.getElementById("delete-checkbox").checked;

  let user = firebase.auth().currentUser;

  if (user != null) {
    email = user.email;
  }

  let cred = firebase.auth.EmailAuthProvider.credential(email, password);

  user
    .reauthenticateWithCredential(cred)
    .then(function () {
      if (isConfirmed) {
        user
          .delete()
          .then(function () {
            firebase.auth().signOut();
          })
          .catch(function (error) {
            alert("Error in deleting account!");
            console.log(error);
          });
      } else {
        alert("Must confirm account deletion!");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Error in validating credentials!");
    });
}

function changePassword() {
  let oldPassword = document.getElementById("old-password").value;
  let newPassword = document.getElementById("new-password").value;
  let confirmPassword = document.getElementById("confirm-new-password").value;
  let email = "";

  let user = firebase.auth().currentUser;

  if (user != null) {
    email = user.email;
  }

  let cred = firebase.auth.EmailAuthProvider.credential(email, oldPassword);

  user
    .reauthenticateWithCredential(cred)
    .then(function () {
      if (newPassword === confirmPassword) {
        user
          .updatePassword(newPassword)
          .then(function () {
            alert("Password updated successfully!");
          })
          .catch(function (error) {
            console.log(error);
            alert("Error in updating password!");
          });
      } else {
        alert("New password confirmation error!");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Error in validating credentials!");
    });
}

function changeUsername() {
  let newUsername = document.getElementById("new-username").value;
  let user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: newUsername,
    })
    .then(function () {
      alert("Username updated!");
      this.setMenuView("changeusername");
    })
    .catch(function (error) {
      console.log(error);
      alert("Error updating username!");
    });
}

function requestSchoolAccount() {
  let accountRequestInfo = {
    school: document.getElementById("school-name").value,
    name: document.getElementById("personal-name").value,
    position: document.getElementById("position").value,
    email: document.getElementById("email").value,
  };

  let user = firebase.auth().currentUser;

  let didAgree = document.getElementById("term-agree").checked;

  let didComplete = true;

  for (let key in accountRequestInfo) {
    if (accountRequestInfo[key] == null) {
      didComplete = false;
    }
  }

  if (didAgree && didComplete && user != null) {
    let db = firebase.firestore();

    db.collection("schoolAccountRequests")
      .doc(user.uid)
      .set(accountRequestInfo);

    alert("School account requested! We'll get back to you soon.");
    document.getElementById("chosen-menu-option").style.visibility = "hidden";
  } else if (!didAgree) {
    alert("Must agree to the terms and conditions!");
  } else {
    alert("Must complete all fields!");
  }

  // check to make sure data is included
}
