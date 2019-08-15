const firebase = require('firebase');

let config = {
  apiKey: "AIzaSyCqpJRMS0Gk0vWAjHaZNrCe_dmrO51xEZ4",
  databaseURL: "https://daniel-nguyen-portfolio.firebaseio.com/",
  projectId: "daniel-nguyen-portfolio\n",
  messagingSenderId: "517703319819"
};

firebase.initializeApp(config);

export const database = firebase.database();