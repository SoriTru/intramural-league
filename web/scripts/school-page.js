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
            // note: if multiple schools have the same official name this will
            // populate the page with data from the last school
            querySnapshot.forEach(function (doc) {
              // set announcement data
              let announcements = doc.data().announcements;

              // sort dates from announcements
              let announcementDates = Object.keys(announcements).sort();

              // get announcement list element
              let listOne = document.getElementById("announcement-list-one");
              let listTwo = document.getElementById("announcement-list-two");
              let currentListIsOne = true;

              // add announcements to list
              for (let date of announcementDates) {
                let li = document.createElement("li");
                li.appendChild(
                  document.createTextNode(`${date}: ${announcements[date]}`)
                );

                if (currentListIsOne) {
                  listOne.appendChild(li);
                  currentListIsOne = false;
                } else {
                  listTwo.appendChild(li);
                  currentListIsOne = true;
                }
              }
            });
          });
      }
    });
}
