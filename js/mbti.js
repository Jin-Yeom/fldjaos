import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { GoogleAuthProvider, getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { arrayUnion, collection, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

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
 * fireBaseDb API 정의서
 * updateDoc() - update or add
 * getDoc() - get
 *******************************************/

// await updateDoc(doc(db, "user"), {
//   displayName:arrayUnion("asdasd"),
//   email:arrayUnion("asdasd"),
//   uid:arrayUnion("asdasd")
// }).then(() => {
// 	후처리 로직
// })

// await updateDoc(doc(db, "user"), {
//   ff:arrayRemove("qqqqqq"),
//   dd:arrayRemove("wwwwww")
// })

// await getDoc(doc(db, "user")).then((result) => {});

// const querySnapshot = await getDoc(doc(db, "user"));
// const userData =  querySnapshot.data();

/*******************************************
 * 전역변수
 *******************************************/

let userFb = "";
let settingFb = "";
let userData = {
    name : "",
    mbti : ""
};

/*******************************************
 * firebase
 *******************************************/
async function getDataFb() {
	const querySnapshot1 = await getDoc(doc(db, "user"));
	userFb =  querySnapshot1.data();

	const querySnapshot2 = await getDoc(doc(db, "setting"));
	settingFb =  querySnapshot2.data();
}

/*******************************************
 * javascript
 *******************************************/

/**
 * onReady
 */
window.addEventListener('DOMContentLoaded', event => {
    bootDefault();
    step1();

    setInterval(function() {
        // firebase 이벤트 리스너 등록, user 데이터가 변경 시 실행
        onSnapshot(doc(db, "user"), (docSnapshot) => {
            userFb = docSnapshot.data();
        }, (error) => {
            console.error("user 이벤트 리스너 등록 실패:", error);
        });
    }, 2000);

	mbtiTeamMatching()  // 임시
});



/**
 * 부트스트랩 기본 함수
 */
function bootDefault() {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });
}

/**
 * 시작하기
 */
function step1() {
    $('#mainContainer').children().remove();

    var html =  `<div class="col-lg-8 align-self-baseline" id="container-step1" style="margin-top: 142px">
                    <div>                
                        <input type="text" id="name" placeholder="이름">
                    </div>
                    <div>       
                        <a class="btn btn-mbti btn-xl" id="start" style="margin: 10px;">시작하기</a>
                    </div>
                </div>`;

    $('#mainContainer').append(html);
	$('#name').val(""); 	// 이름 초기화

    setTimeout(() => {
        $('#container-step1')[0].classList.add('show');
    }, 100);

    // event
    try {
        document.getElementById('start').addEventListener('click', function() {
            step2();
        });
    } catch(e) {
        console.log("Not Error : " + e)
    }
}

/**
 * mbti 고르기
 */
function step2() {
    if($('#name').val() == "") {
        alertBox("이름을 입력해주세요!");
        return;
    }

    if($('#name').val() == "admin") {
        $('#mainContainer').children().remove();

			var html = `<div class="form-container sign-in-container">
                                <h1>Setting</h1>
                                <input type="number" id="personCnt" maxlength="3" oninput="maxLengthCheck(this)" placeholder="인원수">
                                <input type="number" id="teamCnt"  maxlength="1" oninput="maxLengthCheck(this)" placeholder="팀개수">
                                <button class="btn btn-mbti btn-xl" style="margin: 10px;" id="success">완료</button>
                        </div>`;

        $('#mainContainer').append(html);

        // event
        try {
            document.getElementById('success').addEventListener('click', function() {
                adminSet();
            });
        } catch(e) {
            console.log("Not Error : " + e)
        }
    } else {
        userData.name = $('#container-step1 input').val();
				userData.mbti = "";
				
        $('#mainContainer').children().remove();

        var html = `<div class="class-step2" id="container-step2">
                        <div class="box-container">
                            <div class="box" type="button" id="ENFP" style="border-color: goldenrod; color: goldenrod;">
                                <h2>ENFP<br><span>스파크형</span></h2>
                            </div>
                            <div class="box" type="button" id="ENFJ" style="border-color: darkblue; color: darkblue;">
                                <h2>ENFJ<br><span>언변능숙형</span></h2>
                            </div>
                            <div class="box" type="button" id="ESFP" style="border-color: green; color: green;">
                                <h2>ESFP<br><span>사교적인 유형</span></h2>
                            </div>
                            <div class="box" type="button" id="ESFJ" style="border-color: deeppink; color: deeppink;">
                                <h2>ESFJ<br><span>친선도모형</span></h2>
                            </div>
                            <div class="box" type="button" id="ENTP" style="border-color: cadetblue; color: cadetblue;">
                                <h2>ENTP<br><span>발명가형</span></h2>
                            </div>
                            <div class="box" type="button" id="ENTJ" style="border-color: chocolate; color: chocolate;">
                                <h2>ENTJ<br><span>지도자형</span></h2>
                            </div>
                            <div class="box" type="button" id="ESTP" style="border-color: darkturquoise; color: darkturquoise;">
                                <h2>ESTP<br><span>수완좋은<br>활동가형</span></h2>
                            </div>
                            <div class="box" type="button" id="ESTJ" style="border-color: mediumseagreen; color: mediumseagreen;">
                                <h2>ESTJ<br><span>사업가형</span></h2>
                            </div>
                            <div class="box" type="button" id="INFP" style="border-color: orange; color: orange;">
                                <h2>INFP<br><span>잔다르크형</span></h2>
                            </div>
                            <div class="box" type="button" id="INFJ" style="border-color: lightsalmon; color: lightsalmon;">
                                <h2>INFJ<br><span>예언자형</span></h2>
                            </div>
                            <div class="box" type="button" id="ISFP" style="border-color: crimson; color: crimson;">
                                <h2>ISFP<br><span>성인군자형</span></h2>
                            </div>
                            <div class="box" type="button" id="ISFJ" style="border-color: mediumaquamarine; color: mediumaquamarine;">
                                <h2>ISFJ<br><span>임금 뒷편의<br>권력형</span></h2>
                            </div>
                            <div class="box" type="button" id="INTP" style="border-color: purple; color: purple;">
                                <h2>INTP<br><span>아이디어<br>뱅크형</span></h2>
                            </div>
                            <div class="box" type="button" id="INTJ" style="border-color: burlywood; color: burlywood;">
                                <h2>INTJ<br><span>과학자형</span></h2>
                            </div>
                            <div class="box" type="button" id="ISTP" style="border-color: blueviolet; color: blueviolet;">
                                <h2>ISTP<br><span>백과사전형</span></h2>
                            </div>
                            <div class="box" type="button" id="ISTJ" style="border-color: olive; color: olive;">
                                <h2>ISTJ<br><span>세상의 소금형</span></h2>
                            </div>
                        </div>
                        <div class="btn_area">
                            <a class="btn btn-mbti btn-xl" style="margin: 10px;" id="back">뒤로가기</a>
                            <a class="btn btn-mbti btn-xl" style="margin: 10px;" id="select">선택하기</a>
                        </div>
                    </div>`;

        $('#mainContainer').append(html);

        setTimeout(() => {
            $('#container-step2')[0].classList.add('show');
        }, 100);

        // 모든 box 엘리먼트를 선택
        const boxes = document.querySelectorAll('.box');

        // 각 box 엘리먼트에 클릭 이벤트 리스너 추가
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {
                // 모든 box 엘리먼트에서 'selected' 클래스 제거
                boxes.forEach(box => {
                box.classList.remove('selected');
                });

                // 현재 클릭한 box 엘리먼트에 'selected' 클래스 추가
                box.classList.add('selected');
                
                userData.mbti = (e.target.id == "" ? (e.target.parentElement.id == "" ? e.target.parentElement.parentElement.id : e.target.parentElement.id) : e.target.id);
            });
        });

        // event
        try {
            document.getElementById('back').addEventListener('click', function() {
                step1();
            });
    
            document.getElementById('select').addEventListener('click', function() {
                step3();
            });
        } catch(e) {
            console.log("Not Error : " + e)
        }
    }
}

/**
 * 인원 loading
 */
async function step3() {
    if(checkVal(userData) && userData.mbti == "") {
        alertBox("mbti를 선택해주세요!");
        return;
    }
		
    // firebase userDB에 insert
    await updateDoc(doc(db, "user"), {
        userData:arrayUnion(userData.name + "," + userData.mbti)
    })
    
    $('#mainContainer').children().remove();
    
    var html =  `<div class="loading-container">
                    <div class="loading"></div>
                    <div id="loading-text">loading</div>
                </div>`;

    $('#mainContainer').append(html);
		
    setInterval(function() {
        // firebase 이벤트 리스너 등록, setting 데이터가 변경 시 실행
        onSnapshot(doc(db, "setting"), (docSnapshot) => {
            const data = docSnapshot.data();

            // 변경된 데이터를 활용하는 로직을 작성하세요
            const personCnt = data.personCnt;
            const teamCnt = data.teamCnt;

            // 데이터 변경에 따른 처리 로직 실행
            $('#loading-text').text(userFb.userData.length + '/' + personCnt);
        }, (error) => {
            console.error("setting 이벤트 리스너 등록 실패:", error);
        });
    }, 2000);
}

function step4() {
    $('#mainContainer').children().remove();
    
    var html = `<div class="col-lg-8 align-self-end" id="mainTxt" style="margin-top: -200px">
                    <h1 class="text-white font-weight-bold">퀴즈!!</h1>
                </div>
                <div class="btn_area">
                    <a class="btn btn-mbti btn-xl" style="margin: 10px;" id="back">뒤로가기</a>
                    <a class="btn btn-mbti btn-xl" style="margin: 10px;" id="ok">정답</a>
                </div>`;

    $('#mainContainer').append(html);
}

/**
 * mbti유형별 팀 매칭
 */
async function mbtiTeamMatching() {
    await getDataFb();
		
    // firebase 데이터 가공
    const userData = Object.values(userFb).reduce((result, value) => {
        if (Array.isArray(value)) {
            value.forEach(item => {
            if (typeof item === 'string') {
                const [name, mbti] = item.split(",");
                result.push({ name, mbti });
            }
            });
        }
        return result;
    }, []);

    // 항상 같은 결과를 주지 않기 위한 데이터 셔플
    shuffleArray(userData);

    // mbti 잘 맞는 유형 배열
    const matchingTypes = {
        'ENTJ': ['ISFP', 'INFP', 'ESFP', 'ESTP'],
        'ENTP': ['ISFJ', 'ISTJ', 'ENTP', 'ESTJ'],
        'INTJ': ['ESFP', 'ESTP', 'ISFP', 'INFP'],
        'INTP': ['ESFJ', 'ENFJ', 'ISFJ', 'INFJ'],
        'ESTJ': ['INFP', 'ISFP', 'INTP', 'ENTP'],
        'ESFJ': ['INTP', 'ISTP', 'ENTP', 'ENFP'],
        'ISTJ': ['ENFP', 'ENTP', 'ISFP', 'INFP'],
        'ISFJ': ['ENTP', 'ENFP', 'INTP', 'ISTP'],
        'ENFJ': ['ISTP', 'INTP', 'ESTP', 'ESFP'],
        'ENFP': ['ISTJ', 'ISFJ', 'ESFJ', 'ESTJ'],
        'INFJ': ['ESTP', 'ESFP', 'ISTP', 'INTP'],
        'INFP': ['ESTJ', 'ENTJ', 'INTJ', 'ISTJ'],
        'ESTP': ['INFJ', 'INTJ', 'ENFJ', 'ENTJ'],
        'ESFP': ['INTJ', 'INFJ', 'ENTJ', 'ENFJ'],
        'ISTP': ['ENFJ', 'ESFJ', 'INFJ', 'ISFJ'],
        'ISFP': ['ENTJ', 'ESTJ', 'INTJ', 'ISTJ']
    };
    
    // mbti 유형에 따라 팀에 추가합니다.
    const teams = Array.from({}, () => []);
    const delName = Array.from({}, () => []);
    const etcTeam = Array.from({}, () => []);

    // 잘 맞는 mbti 유형
    Loop1 :
    for(const d of userData) {
        var team = [];
        const {name, mbti} = d;

        // 사용된 이름 건너뛰기
        Loop2 :
        for(var i = 0; i < delName.length; i++) {
            if(delName[i].name == name) {
                continue Loop1;
            }
        }

        // 기준점이 되는 가장 잘맞는 mbti유형의 두명을 배열에 생성
        if(checkVal(userData.filter(user => !delName.some(delUser => delUser.name === user.name)).find(user => user.mbti == matchingTypes[mbti][0]))) {
            team.push(userData.find(user => user.name == name));
            team.push(userData.filter(user => !delName.some(delUser => delUser.name === user.name)).find(user => user.mbti == matchingTypes[mbti][0]));

            delName.push(userData.find(user => user.name == name));
            delName.push(userData.filter(user => !delName.some(delUser => delUser.name === user.name)).find(user => user.mbti == matchingTypes[mbti][0]));

            teams.push(team);

            // 두번째, 세번째, 네번째 잘 맞는 mbti 유형
            for(var i = 1; i < 4; i++) {    // matchingTypes 배열의 1,2,3 요소
                for(var j = 0; j < 2; j++) {
                    if(checkVal(userData.filter(user => !delName.some(delUser => delUser.name === user.name)).find(user => user.mbti == matchingTypes[teams[teams.length-1][j].mbti][i]))) {
                        teams[teams.length-1].push(userData.filter(user => !delName.some(delUser => delUser.name === user.name)).find(user => user.mbti == matchingTypes[teams[teams.length-1][j].mbti][i]));
                        delName.push(userData.filter(user => !delName.some(delUser => delUser.name === user.name)).find(user => user.mbti == matchingTypes[teams[teams.length-1][j].mbti][i]));   
                    }
                }
            }
        }
    }

    // 그 외..
    for(var i = 0; i < userData.length; i++) {
        if(!checkVal(delName.find(user => user.name == userData[i].name))) {
            etcTeam.push(userData[i]);
        }
    }
    
    if(etcTeam.length > 0) {
        teams.push(etcTeam);
    }


    // teams와 userData개수가 맞지 않아서 찾는중.....
    var ss = 0;
    userData.forEach(e => {
        try{
            var dd = teams.flat().filter(user => user.name == userData[ss].name);
            var qe = teams.flat().filter(item => !userData.includes(item));
            ss++;
            console.log("index["+ss+"]" + dd[0].name + "," + dd[0].mbti);
        } catch(ed) {
            console.log("error : " + e.name);
        }
        
    })

    console.log(teams);
}

/**
 * admin setting
 */
function adminSet() {
    if($('#personCnt').val() == "") {
        alertBox("인원수를 입력해주세요!");
        return;
    }

    if($('#teamCnt').val() == "") {
        alertBox("팀 개수를 입력해주세요!");
        return;
    }

    updateDoc(doc(db, "setting"), {
        personCnt: $('#personCnt').val(),
        teamCnt: $('#teamCnt').val()
    });
}


// teams와 userData개수가 맞지 않아서 찾는중.....
// 팀 병합 기준
// 팀 개수 제한
// 팀 개수만큼 팀 병함
// 인원차면 자동으로 팀 배치
// setting 완료하면 배치된 팀 조회 가능하도록 페이지 생성
// 