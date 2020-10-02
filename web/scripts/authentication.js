function handleSignUp() {
    // retrieve email/password data
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    //check that the passwords match
    if(password === document.getElementById("confirm-password").value) {
        // check that email and password is long enough
        //TODO: make good requirements for email/password
        if(email.length < 4) {
            alert("Email not valid!");
            return;
        } else if (password.length < 4) {
            alert("Password not valid");
            return;
        }

        // at this point email and password should be checked
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
        });
    } else {
        // passwords don't match, so alert user and return
        // TODO: clear password fields if this happens
        alert("Passwords do not match!")
        return;
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        alert("You signed up! Logging you out.");
        firebase.auth().signOut();
    } else {
        alert("Not signed in")
    }
})