/********************
 * 전역변수
 ********************/
let boxId = "";
let userData = {
    name : "",
    mbti : ""
};

/**
 * onReady
 */
window.addEventListener('DOMContentLoaded', event => {
    bootDefault();
    step1();
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
                        <a class="btn btn-mbti btn-xl" style="margin: 10px;" onclick="step2()">시작하기</a>
                    </div>
                </div>`;

    $('#mainContainer').append(html);

    setTimeout(() => {
        $('#container-step1')[0].classList.add('show');
    }, 100);
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

        var html =  `<div class="col-lg-8" id="container-admin">
                        <div>                
                            <input type="number" id="personCnt" maxlength="3" oninput="maxLengthCheck(this)" placeholder="인원수">
                        </div>
                        <br/>
                        <div>                
                            <input type="number" id="teamCnt"  maxlength="1" oninput="maxLengthCheck(this)" placeholder="팀개수">
                        </div>
                        <div>       
                            <a class="btn btn-mbti btn-xl" style="margin: 10px;" onclick="adminSet()">완료</a>
                        </div>
                    </div>`;

        $('#mainContainer').append(html);
    } else {
        boxId= "";
        
        userData.name = $('#container-step1 input').val();

        $('#mainContainer').children().remove();

        var html = `<div class="class-step2" id="container-step2">
                        <div class="box-container">
                            <div class="box" type="button">
                                <img src="../img/mbti_enfp.png" id="ENFP">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_enfj.png" id="ENFJ">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_esfp.png" id="ESFP">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_esfj.png" id="ESFJ">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_entp.png" id="ENTP">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_entj.png" id="ENTJ">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_estp.png" id="ESTP">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_estj.png" id="ESTJ">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_infp.png" id="INFP">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_infj.png" id="INFJ">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_isfp.png" id="ISFP">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_isfj.png" id="ISFJ">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_intp.png" id="INTP">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_intj.png" id="INTJ">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_istp.png" id="ISTP">
                            </div>
                            <div class="box" type="button">
                                <img src="../img/mbti_istj.png" id="ISTJ">
                            </div>
                        </div>
                        <div class="btn_area">
                            <a class="btn btn-mbti btn-xl" style="margin: 10px;" onclick="step1()">뒤로가기</a>
                            <a class="btn btn-mbti btn-xl" style="margin: 10px;" id="select" onclick="step3()">선택하기</a>
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

                boxId = e.target.id;
            });
        });
    }

}

/**
 * 인원 loading
 */
function step3() {
    if(boxId == "") {
        alertBox("mbti를 선택해주세요!");
        return;
    }
    
    userData.mbti = boxId;
    localStorage.setItem('name', userData.name);
    localStorage.setItem('mbti', userData.mbti);
    
    
    $('#mainContainer').children().remove();
    
    var html =  `<div class="loading-container">
                    <div class="loading"></div>
                    <div id="loading-text">loading</div>
                </div>`;

    $('#mainContainer').append(html);

    setInterval(function(e) {
    if(checkVal(localStorage.getItem('personCnt'))) {
        $('#loading-text').text(JSON.parse(localStorage.getItem('userData')).userData.length + '/' + localStorage.getItem('personCnt'));
    }
    }, 1000)
}

function step4() {
    $('#mainContainer').children().remove();
    
    var html = `<div class="col-lg-8 align-self-end" id="mainTxt" style="margin-top: -200px">
                    <h1 class="text-white font-weight-bold">퀴즈!!</h1>
                </div>
                <div class="btn_area">
                    <a class="btn btn-mbti btn-xl" style="margin: 10px;" onclick="step2()">뒤로가기</a>
                    <a class="btn btn-mbti btn-xl" style="margin: 10px;" onclick="step3()">정답</a>
                </div>`;

    $('#mainContainer').append(html);
}

/**
 * mbti유형별 팀 매칭
 */
function mbtiTeamMatching() {
    const tmpData = JSON.parse(localStorage.getItem('userData'));

    // firebase 데이터 가공
    const userData = Object.values(tmpData).reduce((result, value) => {
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

    localStorage.setItem('personCnt', $('#personCnt').val());
    localStorage.setItem('teamCnt', $('#teamCnt').val());
}