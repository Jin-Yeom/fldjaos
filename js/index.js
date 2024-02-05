import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
// import { GoogleAuthProvider, getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
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
// const provider = new GoogleAuthProvider();
// const auth = getAuth();
const database = getFirestore(app);
const db = collection(database, "fldjaos");


/****************************
 * Global Common Object
 ****************************/
const gcm = {};

/****************************
 * gcm 전역 변수
 ****************************/

gcm.appFb = "";
gcm.tmpArr = [];

/****************************
 * Event
 ****************************/
document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    initialize();
});


/****************************
 * Function
 ****************************/
/**
 * Init Function
 */
const initialize = async () => {
    // fireBase Data get
    await gcm.getDataFb();

    // 임시 배열, fireBase Data array로 변환 후 수정 예정
    gcm.tmpArr.push(gcm.appFb);

    // HTML append
    const appBoxContainer = document.querySelector('.app-box-container');
    const clockBox = document.querySelector('.clock-box');
    const popupContainer = document.querySelector('.popupContainer');

    clockBox.innerHTML = gcm.createClockHTML('00', '00');
    appBoxContainer.innerHTML = gcm.createAppBoxHTML(16);
    popupContainer.innerHTML = gcm.createPopupHTML();

    // event
    gcm.eventAll();

    // 시계 업데이트
    setInterval(gcm.updateClock, 100);
};

/**
 * 모든 이벤트
 */
gcm.eventAll = () => {
    // 앱 클릭 이벤트
    gcm.btn_app_onclick();

    // 앱 팝업 닫기 이벤트
    gcm.closePopup();
}

/**
 * HTML 템플릿, clock
 * @param {시간} hours 
 * @param {분} minutes 
 * @returns 
 */
gcm.createClockHTML = (hours, minutes) => `<div id="clock">${hours}:${minutes}</div>`;

/**
 * HTML 템플릿, app
 * @param {app 개수} count 
 * @returns 
 */
gcm.createAppBoxHTML = count => {
    let html = "";

    gcm.tmpArr.forEach((item, idx) => {
        const {ID:id, ICON:icon} = item;

        html += `<div class="app-box" id="app-${id}" style="background-image: url(${icon});"></div>`;
    })

    return html;
};

/**
 * 시계 업데이트
 */
gcm.updateClock = () => {
    const clockElement = document.querySelector('#clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}`;
};

/**
 * app 클릭 팝업 닫기
 */
gcm.closePopup = () => {
    const btn_app = document.querySelectorAll('.close-btn');

    btn_app.forEach((item, idx) => {
        item.onclick = () => {
            document.querySelectorAll('.popup')[idx].style.display = 'none';
            document.querySelector('.popupContainer').style.display = 'none';
        }
    })
}

/**
 * fireBase Data get
 */
gcm.getDataFb = async () => {
    const querySnapshot1 = await getDoc(doc(db, "app"));
	gcm.appFb =  querySnapshot1.data();
}

/**
 * 매핑된 앱의 팝업 생성
 */
gcm.createPopupHTML = () => {
    let html = "";

    gcm.tmpArr.forEach((item, idx) => {
        const {ID:id, TITLE:title, IMAGE:image, CONTENT:content} = item;

        html += `<div class="popup" id=${id} style="display: none;">
                    <span class="close-btn">×</span>
                    <h2>${title}</h2>
                    <div class="popContent" style="background-image: url(${image});"></div>
                    <p>${content}</p>
                 </div>`;
    })


    return html;
}

/**
 * app icon 클릭 이벤트
 */
gcm.btn_app_onclick = () => {
    const btn_app = document.querySelectorAll('.app-box');
    btn_app.forEach((item, idx) => {
        item.onclick = () => {
            document.querySelector('.popupContainer').style.display = 'block';
            document.querySelector(`.popup#${gcm.tmpArr[idx].ID}`).style.display = 'block';
        }
    })
}