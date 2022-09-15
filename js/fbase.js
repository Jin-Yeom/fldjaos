import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { getFirestore , doc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";


const firebaseConfig = {
	apiKey: "AIzaSyAq9_eXkpuWq5rDAS5oWi9vyI_MsgwO4pI",
	authDomain: "main-32d80.firebaseapp.com",
	projectId: "main-32d80",
	storageBucket: "main-32d80.appspot.com",
	messagingSenderId: "370479894776",
	appId: "1:370479894776:web:8c37b943c9f50b210a6b0d",
	measurementId: "G-B4WYQX7L3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);

//Event Controller
window.addEventListener("DOMContentLoaded", function(){
  if(document.getElementById("firebase-login") != null) {
    document.getElementById("firebase-login").addEventListener("click", function(){
      loginPopup();
    })
  } else {
    document.getElementById("firebase-logout").addEventListener("click", function(){
      logoutPopup();
    })
  }
})

/*******************************************
 * method area
 *******************************************/

/* 
 * 이름 : loginPopup
 * 이벤트 종류 : 클릭
 * 설명 : 로그인 및 로그인 세션스토리지 set
 */
function loginPopup() {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    if(result != null && result.user != null) {
      sessionStorage.setItem("displayName", result.user.displayName);
      sessionStorage.setItem("email", result.user.email);
      sessionStorage.setItem("uid", result.user.uid);
    }

    location.reload();

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

/* 
 * 이름 : logoutPopup
 * 이벤트 종류 : 클릭
 * 설명 : 로그아웃 및 로그인 세션스토리지 remove
 */
function logoutPopup() {
  signOut(auth).then(() => {
    // Sign-out successful.
    sessionStorage.removeItem("displayName");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("uid");
    location.reload();
  }).catch((error) => {
    // An error happened.
  });
}