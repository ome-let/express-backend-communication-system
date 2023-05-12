const firebase = require('firebase/compat/app');
require('dotenv').config();
require ('firebase/compat/firestore');

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports = {
    firestore: firebaseApp.firestore()
}