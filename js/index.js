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

    // <div class="col-lg-8 align-self-end" id="mainTxt" style="margin-top: -200px">
    //     <h1 class="text-white font-weight-bold">당신의 MBTI로 성경 속 닮은 인물을 찾아주세요!</h1>
    // </div>
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

    boxId= "";
    
    userData.name = $('#container-step1 input').val();

    $('#mainContainer').children().remove();

    var html = `<div class="class-step2" id="container-step2">
                    <div class="box-container">
                        <div class="box" type="button">
                            <img src="../img/mbti_enfp.png" id="enfp">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_enfj.png" id="enfj">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_esfp.png" id="esfp">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_esfj.png" id="esfj">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_entp.png" id="entp">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_entj.png" id="entj">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_estp.png" id="estp">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_estj.png" id="estj">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_infp.png" id="infp">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_infj.png" id="infj">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_isfp.png" id="isfp">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_isfj.png" id="isfj">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_intp.png" id="intp">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_intj.png" id="infj">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_istp.png" id="istp">
                        </div>
                        <div class="box" type="button">
                            <img src="../img/mbti_istj.png" id="istj">
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
                    //localStorage.setItem('mbti', boxId);
                });
            });

}

function step3() {
    if(boxId == "") {
        alertBox("mbti를 선택해주세요!");
        return;
    }

    userData.mbti = boxId;
    localStorage.setItem('name', userData.name);
    localStorage.setItem('mbti', userData.mbti);
    

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
    const data = [
        { name: '김철수', mbti: 'ENTJ' },
        { name: '박영희', mbti: 'ISFJ' },
        { name: '이민호', mbti: 'ESFP' },
        { name: '김qq', mbti: 'ENTP' },
        { name: '박qq', mbti: 'ISFJ' },
        { name: '이qq', mbti: 'ESFJ' },
        { name: '김ww', mbti: 'ENTJ' },
        { name: '박ww', mbti: 'ISFJ' },
        { name: '이ww', mbti: 'ESFP' },
        { name: '김ee', mbti: 'INFP' },
        { name: '박ee', mbti: 'ISFJ' },
        { name: '이ee', mbti: 'INFP' },
        { name: '김rr', mbti: 'ENTP' },
        { name: '박rr', mbti: 'ISFJ' },
        { name: '이rr', mbti: 'ISFP' },
        { name: '김ㅑㅑ', mbti: 'ENTP' },
        { name: '박ㅑㅑ', mbti: 'ISFJ' },
        { name: '이ㅑㅑ', mbti: 'ESFJ' },
        { name: '김ㅗㅗ', mbti: 'ENTP' },
        { name: '박ㅗㅗ', mbti: 'ESFP' },
        { name: '이ㅗㅗ', mbti: 'INFJ' },
        { name: '김ㅁㅁ', mbti: 'ESFJ' },
        { name: '박ㅁㅁ', mbti: 'ESTP' },
        { name: '이ㅁㅁ', mbti: 'ESFP' },
        { name: '김ㅍㅍ', mbti: 'ENTP' },
        { name: '박ㅍㅍ', mbti: 'INFJ' },
        { name: '이ㅍㅍ', mbti: 'ESTP' },
        { name: '김ㅡㅡ', mbti: 'INFJ' },
        { name: '박ㅡㅡ', mbti: 'ISFJ' },
        { name: '이ㅡㅡ', mbti: 'ISFP' },
        // ... 30 ~ 35명의 데이터를 추가할 수 있습니다.
    ];
    
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
        'ISFP': ['ENTJ', 'ESTJ', 'INTJ', 'ISTJ'],
    };
    
    const teamCount = 4;
    const teams = Array.from({ length: teamCount }, () => []);
    
      // mbti 유형에 따라 팀에 추가합니다.
    for (const d of data) {
        const { name, mbti } = d;
        const matchedTypes = matchingTypes[mbti];
        const availableTeams = teams.filter(team => 
        matchedTypes.some(type => team.every(member => matchingTypes[member.mbti].includes(type)))
        );
        const team = availableTeams[Math.floor(Math.random() * availableTeams.length)];
        team.push({ name, mbti });
    }
    
    console.log(teams);
}