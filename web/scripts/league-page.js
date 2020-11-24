function getLeagueInfo() {
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();

  // get user id
  let userID = "";
  if (user != null) {
    userID = user.uid;
  }

  // get current league from user data
  db.collection("user_data")
    .doc(userID)
    .get()
    .then(function (doc) {
      let schoolName = doc.data().current_school;
      let leagueName = doc.data().selected_league;

      document.getElementById("league-title").innerText =
        leagueName + " at " + schoolName;

      // get league data
      db.collection("school")
        .where("official_name", "==", schoolName)
        .get()
        .then(function (querySnapshot) {
          // note: if multiple schools have the same official name this will
          // populate the page with data from the last school
          querySnapshot.forEach(function (doc) {
            let schoolID = doc.id;

            let leagueData = doc.data().leagues[leagueName];

            // set up league info
            document.getElementById("league-dates").innerText =
              "Dates: " + leagueData.activedates;
            document.getElementById("team-size").innerText =
              "Max team size: " + leagueData.teamsize;
            document.getElementById("registration-deadline").innerText =
              "Registration Deadline: " + leagueData.registrationdeadline;

            // set rules link button
            let rulesAddress =
              leagueData.rules !== undefined
                ? leagueData.rules
                : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            console.log(rulesAddress);
            document.getElementById("rules-link").href = rulesAddress;

            // set up win/loss ratio dictionary
            let winLossDict = {};
            for (let team in leagueData.teams) {
              // calculate win/loss ratio for each team
              winLossDict[team] =
                leagueData.teams[team].wins / leagueData.teams[team].losses;

              // get first team user is a part of and display the data
              if (
                Object.keys(leagueData.teams[team].members).includes(userID)
              ) {
                if (leagueData.teams[team].teamCaptain === userID) {
                  document.getElementById("edit-team-link").style.visibility =
                    "visible";
                  document.getElementById(
                    "edit-team-link"
                  ).onclick = function () {
                    deleteTeam(schoolID, leagueName, team);
                  };
                }

                let nextMatch = leagueData.teams[team].nextMatchDate;
                let nextMatchTeam = Object.keys(nextMatch)[0];

                document.getElementById("team-name").innerText = team;
                document.getElementById("team-match").innerText =
                  "Next match against team " +
                  nextMatchTeam +
                  " on " +
                  nextMatch[nextMatchTeam];
              }
            }

            let firstPlace = "";
            let secondPlace = "";
            let thirdPlace = "";

            let firstRatio = 0;
            let secondRatio = 0;
            let thirdRatio = 0;

            for (let team in winLossDict) {
              if (winLossDict[team] > firstRatio) {
                // move second place to third place
                thirdRatio = secondRatio;
                thirdPlace = secondPlace;
                // move first place to second place
                secondRatio = firstRatio;
                secondPlace = firstPlace;
                // put new highest team in first
                firstRatio = winLossDict[team];
                firstPlace = team;
              } else if (winLossDict[team] > secondRatio) {
                // move second place to third place
                thirdRatio = secondRatio;
                thirdPlace = secondPlace;
                // put new second highest team in second
                secondRatio = winLossDict[team];
                secondPlace = team;
              } else if (winLossDict[team] > thirdRatio) {
                // put new third highest team in third
                thirdRatio = winLossDict[team];
                thirdPlace = team;
              }
            }

            // update document with places
            document.getElementById("first-place").innerText = firstPlace;
            document.getElementById("second-place").innerText = secondPlace;
            document.getElementById("third-place").innerText = thirdPlace;
          });
        });
    });
}

function deleteTeam(school, league, team) {
  // TODO: delete team
  console.log(school, league, team);
}
