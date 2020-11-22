function getSchoolInfo() {
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();

  // get user id
  let userID = "";
  if (user != null) {
    userID = user.uid;
  }

  // get current school
  db.collection("user_data")
    .doc(userID)
    .get()
    .then(function (doc) {
      let schoolName = doc.data().current_school;

      let schoolSelected = schoolName !== undefined;

      // set school name
      document.getElementById("school-name").innerText = schoolSelected
        ? schoolName
        : "Choose school from the profile page!";

      // get school data
      if (schoolSelected) {
        db.collection("school")
          .where("official_name", "==", schoolName)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // note: if multiple schools have the same official name this will
              // populate the page with data from the last school
              console.log(doc.data());
            });
          });
      }
    });
}
