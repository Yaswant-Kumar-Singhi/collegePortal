import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDVnuzwd7P0eZOGOPJyJmzZyniUg1HHcQI",
    authDomain: "collegeportal-8abc7.firebaseapp.com",
    projectId: "collegeportal-8abc7",
    storageBucket: "collegeportal-8abc7.appspot.com",
    messagingSenderId: "901511078104",
    appId: "1:901511078104:web:386c06abc3d5a4f21f77ad"

})

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export default app;

