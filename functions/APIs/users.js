const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');
const googleProvider = firebase.auth.GoogleAuthProvider();

googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

firebase.initializeApp(config);

exports.loginUser = (request, response) => {
  firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      const credential = result.credential;

      const token = credential.accessToken;
      const user = result.user;
      return user.getIdToken();
    })
    .then((token) => {
      return response.json({token})
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;

      console.error(`Errorcode = ${ errorCode }`);
      console.error(`Error Message = ${ errorMessage }`);
      console.error(`Email = ${ email }`);
      console.error(`Credential = ${ credential }`);
    }); 
}