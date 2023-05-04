/********************
 * 전역변수
 ********************/
let boxId = "";


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

    var html =  `<div class="col-lg-8 align-self-baseline" id="container-step1" style="margin-top: 150px">
                    <div>                
                        <input type="text" placeholder="이름">
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
    boxId= "";
    
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
                        <a class="btn btn-mbti btn-xl" style="margin: 10px;" onclick="step3()">선택하기</a>
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
        alert('mbti를 선택해주세요!')
        return;
    }

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