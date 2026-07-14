/****************************
 * firebase
 ****************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { arrayUnion, collection, doc, getDoc, getFirestore, updateDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

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
const database = getFirestore(app);
const db = collection(database, "fldjaos");

/****************************
 * 전역 변수
 ****************************/
let scoreFb = {};
scoreFb.param = {};

window.adminPage = adminPage;
window.scoreChange = scoreChange;
window.userscoreChange = userscoreChange;


/****************************
 * function
 ****************************/

/**
 * onpageload
 */
document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    initialize();
});

/**
 * Init Function
 */
const initialize = async () => {
    await getDataFb();

    // HTML append
    innerHtmlUpdate();
};

/**
 * HTML 동적 변경
 * @param {number} step 스텝 단계
 * @param {number} addVal 관리자
 */
const innerHtmlUpdate = async () => {
    // 관리자 페이지로 넘어온 경우만 실행
    const containerAdmin = document.getElementById('admin-scoreboard');
    if (containerAdmin) {
        adminPage();
        return;
    }
}

/**
 * fireBase Data get
 */
const getDataFb = async () => {
    const querySnapshot1 = await getDoc(doc(db, "score"));
	scoreFb = querySnapshot1.data();
}

/**
 * fireBase Data update
 */
async function scoreChange(buttonEl, name="", flag) {
    await getDataFb();
    
    const scoreObj = scoreFb ?? (scoreFb = {});
    const userParam = scoreObj["USER"];
    const teamParam = scoreObj["TEAM"];

    if(buttonEl != "team") {
        let userParamObj = userParam.find(e=>e.name == name);
        let teamParamObj = teamParam.find(e=>e.teamNm == userParamObj.team);
        
        if(flag == "PL") {
            userParamObj.score++;
            teamParamObj.teamSc++;
        } else if(flag == "MI") {
            userParamObj.score--;
            teamParamObj.teamSc--;
        }

        // A. 사용자 점수 변경 (클릭된 버튼의 부모 row 안에서 점수 요소를 찾음)
        const rowEl = buttonEl.closest('.member-row');
        const memberScoreEl = rowEl.querySelector('.member-score-val');
        if (userParamObj && memberScoreEl) {
            memberScoreEl.textContent = userParamObj.score;
        }

        // B. 팀 점수 변경 (화면 전체에서 해당 팀 이름을 가진 타이틀을 찾음)
        const teamTitleEl = document.querySelector(`.team-title[data-team="${teamParamObj.teamNm}"]`);
        const teamScoreEl = teamTitleEl ? teamTitleEl.querySelector('.team-score-val') : null;
        if (teamParamObj && teamScoreEl) {
            teamScoreEl.textContent = teamParamObj.teamSc;
        }

        const USER = userParam;
        const TEAM = teamParam;

        await updateDoc(doc(db, "score"), {
            USER, TEAM
        }).then(() => {
        })
    } else {
        // B. 팀 점수 변경 (화면 전체에서 해당 팀 이름을 가진 타이틀을 찾음)
        const teamTitleEl = document.querySelector(`.team-title[data-team="${name}"]`);
        const teamScoreEl = teamTitleEl ? teamTitleEl.querySelector('.team-score-val') : null;
        let teamParamObj = teamParam.find(e=>e.teamNm == name);

        if (teamScoreEl) {
            if(flag == "PL") {
                teamParamObj.teamSc++;
                teamScoreEl.textContent++;
            } else if(flag == "MI") {
                teamParamObj.teamSc--;
                teamScoreEl.textContent--;
            }
        }

        const TEAM = teamParam;

        await updateDoc(doc(db, "score"), {
            TEAM
        }).then(() => {
        })
    }
}


/* ==========================================================================
   [1] index.html (시작 페이지) 로직
   ========================================================================== */
const btnStart = document.getElementById('btn-start');
if (btnStart) {
    btnStart.addEventListener('click', () => {
        const door = document.getElementById('castle-door');
        const flash = document.getElementById('light-flash');

        // 1. 문이 펼쳐지듯 열리는 애니메이션 활성화
        door.classList.add('door-open');

        // 2. 잠시 후 화사한 빛 오버레이 등장
        setTimeout(() => {
            flash.classList.add('active');
        }, 600);

        // 3. 완전히 빛으로 덮였을 때 다음 페이지(user.html)로 이동
        setTimeout(() => {
            window.location.href = '../html/user.html';
        }, 1500);
    });
}


/* ==========================================================================
   [2] user.html (사용자 점수 페이지) 로직
   ========================================================================== */
async function userscoreChange() {
    const container = document.getElementById('user-scoreboard');
    if (!container) return;

    container.innerHTML = '';

    await getDataFb();
    
    const scoreObj = scoreFb ?? (scoreFb = {});
    const userParam = scoreObj["USER"];
    const teamParam = scoreObj["TEAM"];

    teamParam.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('team-card');
        
        card.innerHTML = `
            <h2 class="team-title" data-team="${item.teamNm}">
            <div class="team-title-text-group">
                <span class="team-name-text">${item.teamNm}</span>
                <span class="team-score-wrapper">(<span class="team-score-val">${item.teamSc}</span>점)</span>
            </div>
        </h2>
        `;
        
        userParam.forEach(item2 => {
            // 사용자가 팀 이름과 다른경우 리턴
            if(item.teamNm != item2.team) {
                return;
            }

            const row = document.createElement('div');
            row.classList.add('member-row');
            
            row.innerHTML = `
                <span class="member-name">${item2.name} (<span class="member-score-val">${item2.score}</span>점)</span>
            `;
            card.appendChild(row);
        });
        
        container.appendChild(card);
    });
}

// 띠리리리~ 랜덤 사운드 재생 함수 (사용자 화면에서 실행됨)
function playRandomSound() {
    const sounds = ['sound-1', 'sound-2', 'sound-3'];
    const randomId = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = document.getElementById(randomId);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("재생 대기: 사용자 상호작용 필요", e));
    }
}


/* ==========================================================================
   [3] admin.html (관리자 점수조작 페이지) 로직
   ========================================================================== */
async function adminPage() {
    const container = document.getElementById('admin-scoreboard');
    if (!container) return;
    container.innerHTML = '';

    await getDataFb();
    
    const scoreObj = scoreFb ?? (scoreFb = {});
    const userParam = scoreObj["USER"];
    const teamParam = scoreObj["TEAM"];

    teamParam.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('team-card');
        
        card.innerHTML = `
            <h2 class="team-title" data-team="${item.teamNm}">
            <div class="team-title-text-group">
                <span class="team-name-text">${item.teamNm}</span>
                <span class="team-score-wrapper">(<span class="team-score-val">${item.teamSc}</span>점)</span>
            </div>
            <div class="score-actions">
                <button class="btn-score btn-plus" onclick="scoreChange('team', '${item.teamNm}', 'PL')">+</button>
                <button class="btn-score btn-minus" onclick="scoreChange('team', '${item.teamNm}', 'MI')">-</button>
            </div>
        </h2>
        `;
        
        userParam.forEach(item2 => {
            // 사용자가 팀 이름과 다른경우 리턴
            if(item.teamNm != item2.team) {
                return;
            }

            const row = document.createElement('div');
            row.classList.add('member-row');
            
            row.innerHTML = `
                <span class="member-name">${item2.name} (<span class="member-score-val">${item2.score}</span>점)</span>
                <div class="score-actions">
                    <button class="btn-score btn-plus" onclick="scoreChange(this, '${item2.name}', 'PL')">+</button>
                    <button class="btn-score btn-minus" onclick="scoreChange(this, '${item2.name}', 'MI')">-</button>
                </div>
            `;
            card.appendChild(row);
        });
        
        container.appendChild(card);
    });
}


// 관리자 '점수확인 (전체 알림)' 버튼 이벤트 트리거
const btnBroadcast = document.getElementById('btn-broadcast');
if (btnBroadcast) {
    btnBroadcast.addEventListener('click', () => {
        // TODO: 파이어베이스 DB의 특정 트리거 키값을 갱신하여, 사용자 화면(user.html)에 새로고침 신호를 전달합니다.
        
        alert("📢 사용자 화면에 새로고침 신호가 전송되었습니다!");
    });
}
