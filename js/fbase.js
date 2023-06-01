import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { GoogleAuthProvider, getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { arrayUnion, collection, doc, getDoc, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";



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
const database = getFirestore(app);
const db = collection(database, "fldjaos");

/*******************************************
 * 전역변수
 *******************************************/

let onePlay = true;
let userData = "";
let settingData = "";

/*******************************************/
//Event Controller
window.addEventListener("DOMContentLoaded", function() {
//   setInterval(function() {
// 		// firebase user db update
// 		if((localStorage.getItem('name') != null && localStorage.getItem('name') != "")
// 			&& localStorage.getItem('mbti') != null && localStorage.getItem('mbti') != "") {
// 				updateDoc(doc(db, "user"), {
// 					userData:arrayUnion(localStorage.getItem('name') + "," + localStorage.getItem('mbti'))
// 				}).then(() => {
// 					localStorage.removeItem('mbti');
// 					localStorage.removeItem('name');
// 				})
// 		}

// 		getDataUser();

// 		if(!checkVal(localStorage.getItem('userData'))) {	// 첫 실행 시 로컬스토리지 생성
// 			localStorage.setItem('userData', JSON.stringify(userData));
// 		} else if(checkVal(localStorage.getItem('userData')) && localStorage.getItem('userData') != JSON.stringify(userData)) {	// 데이터가 바뀌었다면 업데이트
// 			localStorage.setItem('userData', JSON.stringify(userData));
// 		}
// 	}, 1000);


// 	var intervalId = setInterval(function() {
// 		if (checkVal(localStorage.getItem('personCnt')) && checkVal(localStorage.getItem('teamCnt'))) {
// 			updateDoc(doc(db, "setting"), {
// 				personCnt: localStorage.getItem('personCnt'),
// 				teamCnt: localStorage.getItem('teamCnt')
// 			});
// 		}
	
// 		getDataSetting();   // 데이터 불러오기
	
// 		if (checkVal(settingData)) {
// 			if (!checkVal(localStorage.getItem('personCnt')) && !checkVal(localStorage.getItem('teamCnt'))) {
// 				// 첫 실행 시 로컬스토리지 생성
// 				localStorage.setItem('personCnt', settingData.personCnt[0]);
// 				localStorage.setItem('teamCnt', settingData.teamCnt[0]);
// 			} else if ((checkVal(localStorage.getItem('personCnt')) && checkVal(localStorage.getItem('teamCnt')))
// 				&& (localStorage.getItem('personCnt') != settingData.personCnt[0] || localStorage.getItem('teamCnt') != settingData.teamCnt[0])) {
// 				// 데이터가 바뀌었다면 업데이트
// 				localStorage.setItem('personCnt', settingData.personCnt[0]);
// 				localStorage.setItem('teamCnt', settingData.teamCnt[0]);
// 			}
// 		}
// 	}, 7500);

	// localstorge에 저장했다 firebase에 저장하는 것이 아니라 바로 firebase에 저장하는 방법으로 변경해보기, 테스트필요!! 
    setInterval(function() {
	onePlay = true;
			$('#select').on('click', function(e) {
				if(onePlay) {
					var dd = "das";
					onePlay = false;
				}
			});
 	}, 1000);
})

/*******************************************
 * method area
 *******************************************/

/**
 * user 데이터 가져오기
 */
async function getDataUser() {
	const querySnapshot1 = await getDoc(doc(db, "user"));
	userData =  querySnapshot1.data();
}

/**
 * user 데이터 가져오기
 */
async function getDataSetting() {
	const querySnapshot2 = await getDoc(doc(db, "setting"));
	settingData =  querySnapshot2.data();
}


//Event Controller
// window.addEventListener("DOMContentLoaded", function() {
//   if(document.getElementById("firebase-login") != null) {
//     document.getElementById("firebase-login").addEventListener("click", function(){
//       loginPopup();
//     })
//   } else {
//     document.getElementById("firebase-logout").addEventListener("click", function(){
//       logoutPopup();
//     })
//   }
// })

// /* 
//  * 이름 : loginPopup
//  * 설명 : 로그인 및 로그인 세션스토리지 set
//  */
// function loginPopup() {
//   signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;

//     sessionStorage.setItem("displayName", result.user.displayName);
//     sessionStorage.setItem("email", result.user.email);
//     sessionStorage.setItem("uid", result.user.uid);

//     updateDoc(doc(db, "user"), {
//       displayName:arrayUnion(result.user.displayName),
//       email:arrayUnion(result.user.email),
//       uid:arrayUnion(result.user.uid),
//     }).then(() => {
//       location.reload();
//     })
    
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//   });
// }

// /* 
//  * 이름 : logoutPopup
//  * 설명 : 로그아웃 및 로그인 세션스토리지 remove
//  */
// function logoutPopup() {
//   signOut(auth).then(() => {
//     // Sign-out successful.
//     sessionStorage.removeItem("displayName");
//     sessionStorage.removeItem("email");
//     sessionStorage.removeItem("uid");

//     location.reload();
//   }).catch((error) => {
//     // An error happened.
//   });
// }


/* fireBaseDb 사용 API */
// await updateDoc(doc(db, "user"), {
//   displayName:arrayUnion("asdasd"),
//   email:arrayUnion("asdasd"),
//   uid:arrayUnion("asdasd")
// })

// await updateDoc(doc(db, "user"), {
//   ff:arrayRemove("qqqqqq"),
//   dd:arrayRemove("wwwwww")
// })

// await getDoc(doc(db, "user")).then((result) => {});

// const querySnapshot = await getDoc(doc(db, "user"));
// const userData =  querySnapshot.data();