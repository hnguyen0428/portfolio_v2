import {auth} from '../config/firebase';
const firebase = require('firebase');


export function loginWithEmail(email, password, onSuccess, onFailure) {
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      auth.signInWithEmailAndPassword(email, password)
        .then((user => {
          console.log('Successfully logged in.');
          if (onSuccess) {
            onSuccess(user);
          }
        }))
        .catch((error) => {
          console.log('Failed logging in.');
          if (onFailure) {
            onFailure(error);
          }
        });
    }).catch((error) => {
      console.log('Failed logging in.');
    });
}

export function logout(onSuccess, onFailure) {
  auth.signOut().then(onSuccess).catch(onFailure)
}

export async function fetchLoginState(onSuccess) {
  let user = auth.currentUser;
  if (user) {
    if (onSuccess) {
      onSuccess(true);
    }
    return new Promise((resolve, _) => resolve(true));
  }

  user = await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (onSuccess) {
        onSuccess(true);
      }
    } else {
      if (onSuccess) {
        onSuccess(false);
      }
    }
  });

  return new Promise((resolve, _) => resolve(user !== null && user !== undefined));
}