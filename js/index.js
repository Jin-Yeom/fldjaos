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

gcm.appFb;
gcm.appArrFb = [];

/****************************
 * Event
 ****************************/

/**
 * onpageload
 */
document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    initialize();
});

/**
 * 모든 이벤트
 */
gcm.eventAll = () => {
    // 앱 클릭 이벤트
    gcm.btn_app_onclick();

    // 팝업 닫기 클릭 이벤트
    gcm.closePopup();
}

/**
 * app icon 클릭, 팝업 띄우기 이벤트
 */
gcm.btn_app_onclick = () => {
    const btn_app = document.querySelectorAll('.app-box');
    btn_app.forEach((item, idx) => {
        item.onclick = () => {
            document.querySelector('.popupContainer').style.display = 'block';
            document.querySelector(`.popup#${gcm.appArrFb[idx].ID}`).style.display = 'block';
        }
    })
}

/**
 * app 클릭, 팝업 닫기 이벤트
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

/****************************
 * FireBase
 ****************************/

/**
 * fireBase Data get
 */
gcm.getDataFb = async () => {
    const querySnapshot1 = await getDoc(doc(db, "app"));
	gcm.appFb = querySnapshot1.data();
}

/**
 * fireBase Data insert
 */
gcm.insertDataFb = async () => {
    await updateDoc(doc(db, "app"), {
        CONTENT:arrayUnion("귀찮은데 대충 먹자..", "이곳은 불법사이트가 아닙니다.</br>안심하고 즐겨주세요."),
        ICON : arrayUnion("../img/app/app_food.png", "../img/app/app_toto.png"),
        ID:arrayUnion("food", "toto"),
        IMAGE:arrayUnion("../img/pop/pop_food.jpg", "../img/pop/pop_toto.png"),
        READY:arrayUnion(1, 0),
        TITLE:arrayUnion("Lunch for us", "당신의 운명에 배팅을!"),
        URL:arrayUnion("../html/food/food.html", "../html/toto/toto.html"),
    }).then(() => {
        // 후처리 로직
        // fireBase Data 재구성
        for(let i = 0; i < gcm.appFb.ID.length; i++) {
            const data = {
                CONTENT : gcm.appFb.CONTENT[i],
                ICON : gcm.appFb.ICON[i],
                ID : gcm.appFb.ID[i],
                IMAGE : gcm.appFb.IMAGE[i],
                READY : gcm.appFb.READY[i],
                TITLE : gcm.appFb.TITLE[i],
                URL : gcm.appFb.URL[i]
            };

            gcm.appArrFb.push(data);
        }
    })
}

/****************************
 * Function
 ****************************/

/**
 * Init Function
 */
const initialize = async () => {
    // fireBase Data get
    await gcm.getDataFb();
    await gcm.insertDataFb();

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

    gcm.appArrFb.forEach((item, idx) => {
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
 * 매핑된 앱의 팝업 생성
 */
gcm.createPopupHTML = () => {
    let html = "";

    gcm.appArrFb.forEach((item, idx) => {
        const {ID:id, TITLE:title, IMAGE:image, CONTENT:content, READY:ready, URL:url} = item;

        html += `<div class="popup" id=${id} style="display: none;">
                    <span class="close-btn">×</span>
                    <h2>${title}</h2>
                    <div class="popContent" style="background-image: url(${image});"></div>
                    <p>${content}</p>
                    ${ready ? `<button class="btn-start" id="btn-start-${id}" onclick="location.href='${url}'">시작하기</button>` : 
                    `<button class="btn-start" id="btn-start-${id}" disabled=true>준비중..</button>`}
                </div>`;
    })


    return html;
}


/***
 * 해야할 것들
 * 날씨 데이터 받아오기
 * 메인화면 꾸미기
 * 날씨 데이터에 따라 배경 바꾸기??
 */