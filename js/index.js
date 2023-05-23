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
                            <img src="../img/mbti_intj.png" id="INFJ">
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

// /**
//  * mbti유형별 팀 매칭
//  */
// function mbtiTeamMatching() {
//     const tmpData = JSON.parse(localStorage.getItem('userData'));

//     const data = Object.values(tmpData).reduce((result, value) => {
//         if (Array.isArray(value)) {
//             value.forEach(item => {
//             if (typeof item === 'string') {
//                 const [name, mbti] = item.split(",");
//                 result.push({ name, mbti });
//             }
//             });
//         }
//         return result;
//     }, []);
    
//       // mbti 잘 맞는 유형 배열
//     const matchingTypes = {
//         'ENTJ': ['ISFP', 'INFP', 'ESFP', 'ESTP'],
//         'ENTP': ['ISFJ', 'ISTJ', 'ENTP', 'ESTJ'],
//         'INTJ': ['ESFP', 'ESTP', 'ISFP', 'INFP'],
//         'INTP': ['ESFJ', 'ENFJ', 'ISFJ', 'INFJ'],
//         'ESTJ': ['INFP', 'ISFP', 'INTP', 'ENTP'],
//         'ESFJ': ['INTP', 'ISTP', 'ENTP', 'ENFP'],
//         'ISTJ': ['ENFP', 'ENTP', 'ISFP', 'INFP'],
//         'ISFJ': ['ENTP', 'ENFP', 'INTP', 'ISTP'],
//         'ENFJ': ['ISTP', 'INTP', 'ESTP', 'ESFP'],
//         'ENFP': ['ISTJ', 'ISFJ', 'ESFJ', 'ESTJ'],
//         'INFJ': ['ESTP', 'ESFP', 'ISTP', 'INTP'],
//         'INFP': ['ESTJ', 'ENTJ', 'INTJ', 'ISTJ'],
//         'ESTP': ['INFJ', 'INTJ', 'ENFJ', 'ENTJ'],
//         'ESFP': ['INTJ', 'INFJ', 'ENTJ', 'ENFJ'],
//         'ISTP': ['ENFJ', 'ESFJ', 'INFJ', 'ISFJ'],
//         'ISFP': ['ENTJ', 'ESTJ', 'INTJ', 'ISTJ'],
//     };
    
//     const teamCount = 4;
//     const teams = Array.from({ length: teamCount }, () => []);
    
//       // mbti 유형에 따라 팀에 추가합니다. **** 에러남 로직 수정 필요 2023.05.22
//     for (const d of data) {
//         const { name, mbti } = d;
//         const matchedTypes = matchingTypes[mbti.toUpperCase()];
//         const availableTeams = teams.filter(team => 
//         matchedTypes.some(type => team.every(member => matchingTypes[member.mbti]?.includes(type)))
//         );
//         const team = availableTeams[Math.floor(Math.random() * availableTeams.length)];
//         team.push({ name, mbti });
//     }
    
//     console.log(teams);
// }



/////////////////


/**
 * mbti유형별 팀 매칭
 */
function mbtiTeamMatching() {
    const tmpData = JSON.parse(localStorage.getItem('userData'));

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
    
    // mbti 잘 맞는 유형 배열
    const matchingTypes = {
        // 'ENTJ': ['ISFP', 'INFP', 'ESFP', 'ESTP'],
        // 'ENTP': ['ISFJ', 'ISTJ', 'ENTP', 'ESTJ'],
        // 'INTJ': ['ESFP', 'ESTP', 'ISFP', 'INFP'],
        // 'INTP': ['ESFJ', 'ENFJ', 'ISFJ', 'INFJ'],
        // 'ESTJ': ['INFP', 'ISFP', 'INTP', 'ENTP'],
        // 'ESFJ': ['INTP', 'ISTP', 'ENTP', 'ENFP'],
        // 'ISTJ': ['ENFP', 'ENTP', 'ISFP', 'INFP'],
        // 'ISFJ': ['ENTP', 'ENFP', 'INTP', 'ISTP'],
        // 'ENFJ': ['ISTP', 'INTP', 'ESTP', 'ESFP'],
        // 'ENFP': ['ISTJ', 'ISFJ', 'ESFJ', 'ESTJ'],
        // 'INFJ': ['ESTP', 'ESFP', 'ISTP', 'INTP'],
        // 'INFP': ['ESTJ', 'ENTJ', 'INTJ', 'ISTJ'],
        // 'ESTP': ['INFJ', 'INTJ', 'ENFJ', 'ENTJ'],
        // 'ESFP': ['INTJ', 'INFJ', 'ENTJ', 'ENFJ'],
        // 'ISTP': ['ENFJ', 'ESFJ', 'INFJ', 'ISFJ'],
        // 'ISFP': ['ENTJ', 'ESTJ', 'INTJ', 'ISTJ']

        'ENTJ': ['ISFP', 'INFP'],
        'ENTP': ['ISFJ', 'ISTJ'],
        'INTJ': ['ESFP', 'ESTP'],
        'INTP': ['ESFJ', 'ENFJ'],
        'ESTJ': ['INFP', 'ISFP'],
        'ESFJ': ['INTP', 'ISTP'],
        'ISTJ': ['ENFP', 'ENTP'],
        'ISFJ': ['ENTP', 'ENFP'],
        'ENFJ': ['ISTP', 'INTP'],
        'ENFP': ['ISTJ', 'ISFJ'],
        'INFJ': ['ESTP', 'ESFP'],
        'INFP': ['ESTJ', 'ENTJ'],
        'ESTP': ['INFJ', 'INTJ'],
        'ESFP': ['INTJ', 'INFJ'],
        'ISTP': ['ENFJ', 'ESFJ'],
        'ISFP': ['ENTJ', 'ESTJ']
    };
    
    // mbti 유형에 따라 팀에 추가합니다.
    // 16개의 서로 다른 mbti 비어있는 팀을 만들고
    // 가장 잘 맞는 첫번째 유형과 짝지어준 다음
    // 두번째로 잘 맞는 유형과 묶기
    const teams = Array.from({ length: matchingTypes.length }, () => []);

    for(const d of userData) {
        const {name, mbti} = d;

        for(var i = 0; i < 2; i++) {
            if(typeof userData.find(user => user.mbti == matchingTypes[mbti][i]) !== 'undefined') {
                teams.push(userData.find(user => user.mbti == matchingTypes[mbti][i]));
            }
        }
    }

























    // const teams = [];
    // const remainingMembers = [];
  
    // // 매칭된 팀 구성
    // for (const d of userData) {
    //   const { name, mbti } = d;
    //   let matchedTeam = teams.find(team => matchingTypes[mbti].every(type => matchingTypes[team[0].mbti].includes(type)));
  
    //   if (!matchedTeam) {
    //     matchedTeam = [];
    //     teams.push(matchedTeam);
    //   }
  
    //   matchedTeam.push({ name, mbti });
    // }
  
    // // 초과 인원 처리
    // for (const team of teams) {
    //   if (team.length > 7) {
    //     const remaining = team.splice(7);
    //     remainingMembers.push(...remaining);
    //   }
    // }
  
    // // 추가 팀 구성
    // while (remainingMembers.length > 0) {
    //   const newTeam = remainingMembers.splice(0, Math.min(7, remainingMembers.length));
    //   teams.push(newTeam);
    // }
    
    console.log(teams);
}