importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
    apiKey: "AIzaSyCuV_exr2cUt_Lh-oWfuNQI0EhLVTowG8E",
    authDomain: "gark-3f58e.firebaseapp.com",
    projectId: "gark-3f58e",
    storageBucket: "gark-3f58e.appspot.com",
    messagingSenderId: "206447721130",
    appId: "1:206447721130:web:e815efea0b6deda9906ed3",
    measurementId: "G-12H4GM7T4T"
});
// Initialize Firebase
const messaging = firebase.messaging();
