import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
// import { GoogleAuthProvider, getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { arrayUnion, collection, doc, getDoc, getFirestore, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

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
 * 전역 변수
 ****************************/
let totoFb = {};
totoFb.param = {};

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
const eventAll = () => {
    regUser();
}

/**
 * 사용자 등록 이벤트
 */
const regUser = () => {
    const bnt_reg = document.querySelector('.button#btn-reg');
    
    if(bnt_reg == null || typeof bnt_reg === "undefined") {
        return;
    }

    bnt_reg.onclick = async() => {
        const userId = document.querySelector('.input-box#userId').value;
        const objNm = "USER";
        const obj = {
            USERID : userId,
            COIN : "10"
        };
    
        await insertDataFb(objNm, obj);
        
        setItem("USER", obj);

        innerHtmlUpdate(2);
        // getItem(userId);
    }
}

/****************************
 * FireBase
 ****************************/

/**
 * fireBase Data get
 */
const getDataFb = async () => {
    const querySnapshot1 = await getDoc(doc(db, "toto"));
	totoFb = querySnapshot1.data();
}

/**
 * fireBase Data insert
 */
const insertDataFb = async (objNm, obj) => {
    await getDataFb();
    const totoParam = totoFb.param ?? (totoFb.param = {});
    totoParam[objNm] = totoParam[objNm] ?? [];
    const param = {};

    switch(objNm) {
        case "USER":
            if( Object.keys(totoParam)?.find(e => e == objNm) ?? false) {    // 있을 시
                totoParam.USER.push(obj);
                param[objNm] = totoParam.USER;
            } else {    // 없을 시
                return;
            }

            break;
        default:
            break;
    }
    
    await updateDoc(doc(db, "toto"), {
        param
    }).then(() => {
    })
}

/****************************
 * Function
 ****************************/

/**
 * Init Function
 */
const initialize = async () => {
    await getDataFb();

    // HTML append
    innerHtmlUpdate(1);

    eventAll();
};

/**
 * HTML 동적 변경
 * @param {number} step 
 */
const innerHtmlUpdate = (step) => {
    const step1_container = document.querySelector('.step1-container');
    const step2_container = document.querySelector('.step2-container');

    switch(step) {
        case 1:
            step1_container.innerHTML = step1tHTML();
            step1_container.style.display = 'block';
            step2_container.style.display = 'none';

            setTimeout(() => {
                document.querySelector('.step1-container').className = "step1-container show";
            }, 100);

            break;

        case 2:
            step2_container.innerHTML = step2tHTML();
            step2_container.style.display = 'block';
            step1_container.style.display = 'none';
            
            setTimeout(() => {
                document.querySelector('.step2-container').className = "step2-container show";
            }, 100);
            
            break;
        default:
            break;
    }
}

/**
 * 시작 시 사용자 등록 페이지
 * @returns html
 */
const step1tHTML = () => {
    const html = `<input type="text" class="input-box" id="userId" placeholder="이름을 입력해주세요.">
                <button class="button" id="btn-reg">등록</button>`;

    return html;
}

/**
 * 시작 시 사용자 등록 페이지
 * @returns html
 */
const step2tHTML = () => {
    const user = getItem("USER");

    const html = `<div class="container-title">어둠에 물든 자</div>
                    <div class="name" id="name">${user.USERID}</div>
                    <div class="center-container">
                        <button class="bet-button">배팅</button>
                    </div>
                    <div class="bottom-left-container">
                        coin: <span class="coin" id="coin">${user.COIN}원</span>
                  </div>`;

    return html;
}

/**
 * sessionStorage set obj
 * @param {key} key 
 * @param {jsonObj} obj 
 */
const setItem = (key, obj) => {
    sessionStorage.setItem(key, JSON.stringify(obj));
}

/**
 * sessionStorage get obj
 * @param {key} key 
 * @returns jsonObj
 */
const getItem = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}