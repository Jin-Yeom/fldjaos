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


r('DOMContentLoaded', () => {
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

// 1. 임시 데이터 저장 공간 (실제 개발 시 파이어베이스 DB 데이터가 여기에 들어갑니다)
// 기본 4개 조 구성
let currentScoreData = [
    {
        teamName: "🛡️ 1조 (아서왕)",
        members: [
            { name: "가웨인", score: 0 },
            { name: "랜슬롯", score: 0 },
            { name: "갤러해드", score: 0 }
        ]
    },
    {
        teamName: "🏹 2조 (로빈후드)",
        members: [
            { name: "로빈", score: 0 },
            { name: "리틀존", score: 0 }
        ]
    },
    {
        teamName: "🧙‍♂️ 3조 (멀린)",
        members: [
            { name: "멀린", score: 0 },
            { name: "모르가나", score: 0 }
        ]
    },
    {
        teamName: "🦁 4조 (리처드)",
        members: [
            { name: "리처드", score: 0 },
            { name: "존왕", score: 0 }
        ]
    }
];

// 로컬스토리지에 저장하여 페이지가 넘어가도 점수가 유지되도록 임시 처리 (파이어베이스 연동 전 테스트용)
if (!localStorage.getItem('scoreData')) {
    localStorage.setItem('scoreData', JSON.stringify(currentScoreData));
} else {
    currentScoreData = JSON.parse(localStorage.getItem('scoreData'));
}

function saveData(data) {
    localStorage.setItem('scoreData', JSON.stringify(data));
    // TODO: 파이어베이스 DB에도 함께 쓰기(Write) 하시면 됩니다.
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
function renderUserScoreboard() {
    const container = document.getElementById('user-scoreboard');
    if (!container) return;

    // 로컬스토리지(혹은 파이어베이스)에서 최신 데이터를 가져옵니다.
    const data = JSON.parse(localStorage.getItem('scoreData')) || currentScoreData;
    container.innerHTML = '';

    data.forEach(team => {
        const card = document.createElement('div');
        card.classList.add('team-card');
        
        card.innerHTML = `<h2 class="team-title">${team.teamName}</h2>`;
        
        team.members.forEach(member => {
            const row = document.createElement('div');
            row.classList.add('member-row');
            row.innerHTML = `
                <span class="member-name">${member.name}</span>
                <span class="member-score">${member.score}점</span>
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
function renderAdminScoreboard() {
    const container = document.getElementById('admin-scoreboard');
    if (!container) return;

    const data = JSON.parse(localStorage.getItem('scoreData')) || currentScoreData;
    container.innerHTML = '';

    data.forEach((team, teamIdx) => {
        const card = document.createElement('div');
        card.classList.add('team-card');
        
        card.innerHTML = `<h2 class="team-title">${team.teamName}</h2>`;
        
        team.members.forEach((member, memIdx) => {
            const row = document.createElement('div');
            row.classList.add('member-row');
            
            row.innerHTML = `
                <span class="member-name">${member.name} (${member.score}점)</span>
                <div class="score-actions">
                    <button class="btn-score btn-minus" onclick="adjustScore(${teamIdx}, ${memIdx}, -1)">-</button>
                    <button class="btn-score btn-plus" onclick="adjustScore(${teamIdx}, ${memIdx}, 1)">+</button>
                </div>
            `;
            card.appendChild(row);
        });
        
        container.appendChild(card);
    });
}

// 점수 증감 처리 함수
function adjustScore(teamIdx, memIdx, amount) {
    const data = JSON.parse(localStorage.getItem('scoreData')) || currentScoreData;
    
    data[teamIdx].members[memIdx].score += amount;
    if (data[teamIdx].members[memIdx].score < 0) {
        data[teamIdx].members[memIdx].score = 0; // 마이너스 점수 방지
    }

    saveData(data);
    renderAdminScoreboard(); // 관리자 화면 업데이트
}

// 관리자 '점수확인 (전체 알림)' 버튼 이벤트 트리거
const btnBroadcast = document.getElementById('btn-broadcast');
if (btnBroadcast) {
    btnBroadcast.addEventListener('click', () => {
        // TODO: 파이어베이스 DB의 특정 트리거 키값을 갱신하여, 사용자 화면(user.html)에 새로고침 신호를 전달합니다.
        
        alert("📢 사용자 화면에 새로고침 신호가 전송되었습니다!");
    });
}
