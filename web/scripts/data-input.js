function teamAdd() {
  // fill in the data here to easily add a school to the system
  let db = firebase.firestore();

  db.collection("school")
    .doc("ut_tyler")
    .set({
      adminUID: "",
      announcements: {
        "11/11/20": "TJC adopts Parrot IM",
        "11/12/20": "Intramural League Coordinator needed!",
        "11/25/20": "Finals canceled due to prolific lack of caring",
        "12/02/20": "Intramural registration for spring cancelled",
      },
      email_domain: "uttyler.edu",
      official_name: "University of Texas at Tyler",
      leagues: {
        Kickball: {
          activedates: "01/14/2021 - 02/02/2021",
          registrationdeadline: "12/31/2020",
          rules: "https://www.rulesofsport.com/sports/kickball.html",
          teamsize: 10,
          teams: {
            Doves: {
              wins: 3,
              losses: 2,
              members: {},
              nextMatchDate: {
                Elephants: "01/14/2021",
              },
              teamCaptain: "P6nqAINiRHTj0cODuK4OWlCf0W73",
            },
            AcuteAngles: {
              wins: 0,
              losses: 0,
              members: {},
              nextMatchDate: {
                Tigers: "01/14/2021",
              },
              teamCaptain: "P6nqAINiRHTj0cODuK4OWlCf0W73",
            },
          },
        },
        Ultimate: {
          activedates: "01/14/2021 - 02/02/2021",
          registrationdeadline: "12/31/2020",
          rules: "https://www.usaultimate.org/rules/",
          teamsize: 10,
          teams: {
            Tigers: {
              wins: 3,
              losses: 2,
              members: {},
              nextMatchDate: {
                Elephants: "01/14/2021",
              },
              teamCaptain: "P6nqAINiRHTj0cODuK4OWlCf0W73",
            },
            Elephants: {
              wins: 0,
              losses: 0,
              members: {},
              nextMatchDate: {
                Tigers: "01/14/2021",
              },
              teamCaptain: "P6nqAINiRHTj0cODuK4OWlCf0W73",
            },
          },
        },
        Soccer: {
          activedates: "10/14/2020 - 11/02/2020",
          registrationdeadline: "8/31/2020",
          rules: "https://www.rulesofsport.com/sports/tennis.html",
          teamsize: 2,
          teams: {
            Alpha: {
              wins: 4,
              losses: 2,
              members: {},
              nextMatchDate: {
                Beta: "10/18/2020",
              },
              teamCaptain: "P6nqAINiRHTj0cODuK4OWlCf0W73",
            },
            Beta: {
              wins: 6,
              losses: 0,
              members: {},
              nextMatchDate: {
                Alpha: "10/18/2020",
              },
              teamCaptain: "P6nqAINiRHTj0cODuK4OWlCf0W73",
            },
            Gamma: {
              wins: 1,
              losses: 5,
              members: {},
              nextMatchDate: {
                Alpha: "10/19/2020",
              },
              teamCaptain: "P6nqAINiRHTj0cODuK4OWlCf0W73",
            },
          },
        },
      },
    });
}
