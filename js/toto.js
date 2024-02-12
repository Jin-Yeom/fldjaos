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

let timer;
let minutes = 10;
let seconds = 0;

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

    adminStart();
    adminStats();
    adminBack();

    userStart();
    teamSelect();
    userBack();
    btnOK();
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

        if(userId == "") {
            alertBox("이름을 입력해주세요!");
            return;
        }
    
        await insertDataFb(objNm, obj);
        
        setItem("USER", obj);

        innerHtmlUpdate(2);
        // getItem(userId);
    }
}

/**
 * 사용자 등록 이벤트
 */
const adminStart = () => {
    const admin_start = document.querySelector('#admin_start');
    
    if(admin_start == null || typeof admin_start === "undefined") {
        return;
    }

    admin_start.onclick = async () => {
        innerHtmlUpdate(2, 1);

        const objNm = "ADMIN";
        const obj = {
            STARTFLAG : "Y"
        };
    
        await insertDataFb(objNm, obj);
    }
}

/**
 * 사용자 등록 이벤트
 */
const adminStats = () => {
    const admin_stats = document.querySelector('#admin_stats');
    
    if(admin_stats == null || typeof admin_stats === "undefined") {
        return;
    }

    admin_stats.onclick = () => {
        innerHtmlUpdate(2, 2);
    }
}

/**
 * 사용자 등록 이벤트
 */
const adminBack = () => {
    const admin_back = document.querySelector('#admin_back');
    
    if(admin_back == null || typeof admin_back === "undefined") {
        return;
    }

    admin_back.onclick = () => {
        innerHtmlUpdate(2);
        eventAll();
    }
}

/**
 * 사용자 등록 이벤트
 */
const userBack = () => {
    const btn_userBack = document.querySelector('#btn_userBack');
    
    if(btn_userBack == null || typeof btn_userBack === "undefined") {
        return;
    }

    btn_userBack.onclick = () => {
        innerHtmlUpdate(3);
        eventAll();
    }
}

/**
 * 사용자 등록 이벤트
 */
const userStart = () => {
    const user_start = document.querySelector('#user_start');
    
    if(user_start == null || typeof user_start === "undefined") {
        return;
    }

    user_start.onclick = () => {
        innerHtmlUpdate(3);
    }
}

/**
 * 사용자 등록 이벤트
 */
const teamSelect = () => {
    const btn_container = document.querySelectorAll('#btn_container .bet-button');
    
    if(btn_container == null || typeof btn_container === "undefined") {
        return;
    }
    btn_container.forEach((item, idx) => {
        item.onclick = () => {
            innerHtmlUpdate(4, idx+1);
        }
    })
}

/**
 * 
 * @returns 
 */
const btnOK = () => {
    const btn_ok = document.querySelector('#btn_ok');
    
    if(btn_ok == null || typeof btn_ok === "undefined") {
        return;
    }

    btn_ok.onclick = () => {
        if(document.querySelector('#coinInput').value == "") {
            alertBox("배팅을 해주세요!");
            return;
        }

        innerHtmlUpdate(5);
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
    const totoParam = totoFb ?? (totoFb = {});
    totoParam[objNm] = totoParam[objNm] ?? [];

    if( Object.keys(totoParam)?.find(e => e == objNm) ?? false) {
        switch(objNm) {
            case "USER":

                if(totoParam.USER.find(e => e.USERID == obj.USERID) ?? false) { // 중복체크
                    return;
                }

                const USER = [...totoParam[objNm], obj];
                totoParam[objNm] = USER;

                await updateDoc(doc(db, "toto"), {
                    USER
                }).then(() => {
                })
    
                break;
            case "ADMIN":

                const ADMIN = [obj];

                await updateDoc(doc(db, "toto"), {
                    ADMIN
                }).then(() => {
                })
                
                break;
            case "BAT":

                for(let i = 0; i < totoParam[objNm].length; i++) {  // 중복제거
                    if(totoParam[objNm][i].USERID === obj.USERID)  {
                        totoParam[objNm].splice(i, 1);
                        i--;
                    }
                }

                const BAT = [...totoParam[objNm], obj];
                totoParam[objNm] = BAT;

                await updateDoc(doc(db, "toto"), {
                    BAT
                }).then(() => {
                })
                
                break;
            default:
                break;
        }
    } else {
        return;
    }
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
 * @param {number} step 스텝 단계
 * @param {number} addVal 관리자
 */
const innerHtmlUpdate = async (step, addVal) => {
    const step1_container = document.querySelector('.step1-container');
    const step2_container = document.querySelector('.step2-container');
    const user = getItem("USER");
    const clockBox = document.querySelector('.clock-box');

    switch(step) {
        case 1:
            step1_container.innerHTML = step1HTML();
            step1_container.style.display = 'block';
            step2_container.style.display = 'none';

            setTimeout(() => {
                document.querySelector('.step1-container').className = "step1-container show";
            }, 100);

            break;
        case 2:
            const admin = getItem("USER");
            let adminHtml = "";

            if(admin.USERID === "admin" && addVal === 1) {
                
                adminHtml = `<div class="container-title">우승팀을 골라주세요.</div>
                                <div class="clock-box" style="display: none;"></div>
                                </br>
                                <div class="center-container">
                                    <button class="bet-button">1팀</button>
                                    </br>
                                    </br>
                                    </br>
                                    <button class="bet-button">2팀</button>
                                    </br>
                                    </br>
                                    </br>
                                    <button class="bet-button">3팀</button>
                                    </br>
                                    </br>
                                    </br>
                                    <button class="bet-button" id="admin_back" style="width:100%;">뒤로</button>
                                </div>`;

                step2_container.innerHTML = adminHtml;
                // startTimer();
            } else if(admin.USERID === "admin" && addVal === 2) {
                let userHtml = "";

                totoFb.USER.forEach((item, idx) => {
                    const {USERID:userId, COIN:coin} = item;
                    if(userId == "admin") {
                        return;
                    }
                    userHtml += `${userId}: <span class="coin" id="coin">${coin}달란트</span>
                                </br></br>`;
                });

                adminHtml = `<div class="container-title">통계</div>
                                <div class="center-container-scroll">
                                    ${userHtml}
                                </div>
                                <div class="bottom-left-container">
                                    <button class="bet-button" id="admin_back" style="width:100%;">뒤로</button>
                                </div>`;

                step2_container.innerHTML = adminHtml;
            } else {
                step2_container.innerHTML = step2HTML();
            }

            step2_container.style.display = 'block';
            step1_container.style.display = 'none';
            
            setTimeout(() => {
                eventAll();
                userStartYn();
                document.querySelector('.step2-container').className = "step2-container show";
            }, 100);
            
            break;
        case 3:
            step2_container.innerHTML = step3HTML();
            step2_container.style.display = 'block';
            step1_container.style.display = 'none';

            setTimeout(() => {
                eventAll();
                document.querySelector('.step2-container').className = "step2-container show";
            }, 100);

            break;
        case 4:
            step2_container.innerHTML = step4HTML(addVal);
            step2_container.style.display = 'block';
            step1_container.style.display = 'none';


            const coinInput = document.querySelector('#coinInput');
            coinInput.addEventListener("keyup", (e) => {
                if(Number(e.target.value) > Number(user.COIN)) {
                    e.target.value = user.COIN;
                }
            })

            setTimeout(() => {
                eventAll();
                document.querySelector('.step2-container').className = "step2-container show";
            }, 100);

            break;
        case 5:
            step2_container.innerHTML = step5HTML();    // 준비중 화면
            step2_container.style.display = 'block';
            step1_container.style.display = 'none';

            setTimeout(() => {
                document.querySelector('.step2-container').className = "step2-container show";
            }, 100);

            break;
        case 6:
            step2_container.innerHTML = step6HTML();
            step2_container.style.display = 'block';
            step1_container.style.display = 'none';

            setTimeout(() => {
                btnOK();
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
const step1HTML = () => {
    const html = `<input type="text" class="input-box" id="userId" placeholder="이름을 입력해주세요.">
                <button class="button" id="btn-reg">등록</button>`;

    return html;
}

/**
 * 시작 시 사용자 등록 페이지
 * @returns html
 */
const step2HTML = () => {
    const user = getItem("USER");
    let html = "";


    if(user.USERID == "admin") {
        html = `<div class="container-title">관리자</div>
                <div class="center-container">
                    <button class="bet-button" id="admin_start">시작하기</button>
                    </br>
                    </br>
                    </br>
                    <button class="bet-button" id="admin_stats">통계보기</button>
                </div>`;
    } else {
        html = `<div class="container-title">어둠에 물든 자</div>
                    <div class="name" id="name">${user.USERID}</div>
                    <div class="center-container">
                        <button class="bet-button" id="user_start">시작하기</button>
                    </div>
                    <div class="bottom-left-container">
                        달란트: <span class="coin" id="coin">${user.COIN}</span>
                </div>`;
    }

    return html;
}

const userStartYn = () => {
    setInterval( async () => {
        await getDataFb();
        
        const user_start = document.querySelector('#user_start');

        if(user_start == null || typeof user_start === "undefined") {
            return;
        }

        if((totoFb?.ADMIN[0].STARTFLAG ?? false) && totoFb.ADMIN[0].STARTFLAG == "Y") {
            user_start.disabled = false;
        } else {
            user_start.disabled = true;
        }

    }, 100);
}

/**
 * 사용자가 배팅하기
 */
const step3HTML = () => {
    const user = getItem("USER");
    const html = `<div class="container-title">우승팀을 골라주세요.</div>
                </br>
                <div class="center-container" id="btn_container">
                    <button class="bet-button">1팀</button>
                    </br>
                    </br>
                    </br>
                    <button class="bet-button">2팀</button>
                    </br>
                    </br>
                    </br>
                    <button class="bet-button">3팀</button>
                    </br>
                    </br>
                    </br>
                </div>
                <div class="bottom-left-container" style="margin-top:10%;">
                    달란트: <span class="coin" id="coin">${user.COIN}</span>
                </div>`;

    return html;
}

/**
 * 
 */
const step4HTML = (teamIdx) => {
    const user = getItem("USER");
    const html = `<div class="container-title" id="teamIdx">${teamIdx}팀</div>
                </br>
                <div class="center-container" id="btn_container" style="display:flex;">
                    <input class="input-box" placeholder="달란트를 적어주세요." type="number" id="coinInput"></input>
                    <button class="bet-button" id="btn_ok" style="margin-left:10%; padding: 6px; 20px; height: 10%;">확인</button>
                </div>
                <div class="bottom-left-container" style="margin-top:5%; margin-left: 3px;">
                    달란트: <span class="coin" id="coin">${user.COIN}</span>
                </div>
                <button class="bet-button" style="width: 100%; margin-top:50%;" id="btn_userBack">뒤로</button>`;

    return html;
}

/**
 * 준비중 
 * @returns 
 */
const step5HTML = () => {
    
    const html = `<div class="loading-container">
                    <div class="loading"></div>
                    <p id="loading-text">배팅중..</p>
                </div>`;

    return html;
}

/**
 * 
 */
const step6HTML = async () => {
    const user = getItem("USER");

    await battingOk();

    let allCoin = 0;
    let parseNum = 0;
    let team1Num = 0;
    let team2Num = 0;
    let team3Num = 0;

    let team1Coin = 0;
    let team2Coin = 0;
    let team3Coin = 0;

    // 배당률 : (1/(건코인/코인합))*건코인
    totoFb.BAT.forEach((item, idx) => {
        const {USERID:userId, TEAM:team, BATCOIN:batCoin} = item;
        allCoin += Number(batCoin);
        parseNum++;

        switch(team) {
            case "1팀":
                team1Num++;
                team1Coin += Number(batCoin);
                break;
            case "2팀":
                team2Num++;
                team2Coin += Number(batCoin);
                break;
            case "3팀":
                team3Num++;
                team3Coin += Number(batCoin);
                break;
            default:
                break;
        }
    })

    const html = `<div class="container-title">배팅을 완료하셨습니다.</div>
                <div class="center-container" id="btn_container">
                    <button class="bet-button">1팀</button>
                    <div style="margin-left: 10%; text-align: left;">
                        <a>배율 : ${(team1Coin/allCoin).toString().substring(0, 4)}</a>
                        </br>
                        <a>인원 : ${team1Num}명</a>
                        </br>
                        <a>총 달란트 : ${team1Coin}</a>
                        </br>
                    </div>
                    <button class="bet-button">2팀</button>
                    <div style="margin-left: 10%; text-align: left;">
                        <a>배율 : ${(team2Coin/allCoin).toString().substring(0, 4)}</a>
                        </br>
                        <a>인원 : ${team2Num}명</a>
                        </br>
                        <a>총 달란트 : ${team2Coin}</a>
                        </br>
                    </div>
                    <button class="bet-button">3팀</button>
                    <div style="margin-left: 10%; text-align: left;">
                        <a>배율 : ${(team3Coin/allCoin).toString().substring(0, 4)}</a>
                        </br>
                        <a>인원 : ${team3Num}명</a>
                        </br>
                        <a>총 달란트 : ${team3Coin}</a>
                        </br>
                    </div>
                </div>
                <div class="bottom-left-container" style="margin-top:10%;">
                    달란트: <span class="coin" id="coin">${user.COIN}</span>
                </div>`;

    return html;
}

/**
 * 
 */
const battingOk = async () => {
    const user = getItem("USER");
    const objNm = "BAT";
    const coin = document.querySelector('#coinInput').value;
    const team = document.querySelector('#teamIdx').innerText;
    
    const obj = {
        USERID: user.USERID,
        TEAM: team,
        BATCOIN: coin
    };

    await insertDataFb(objNm, obj);
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

/**
 * 
 */
const updateTimer = () => {
    const timerElement = document.querySelector('.clock-box');
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert("타이머 종료!");
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    }
}

/**
 * 
 */
const startTimer = () => {
    clearInterval(timer); // 기존에 실행 중인 타이머가 있으면 초기화
    const timerElement = document.querySelector('.clock-box');
    timerElement.style.display = "block";
    timer = setInterval(updateTimer, 1000);
}

/**
 * 
 */
const stopTimer = () => {
    clearInterval(timer);
}