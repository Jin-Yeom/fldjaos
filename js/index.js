/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    bootDefault();
    alert("왜 안되니!");
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

    var html =  `<div class="col-lg-8 align-self-end" id="mainTxt">
                    <h1 class="text-white font-weight-bold">당신의 MBTI로 성경 속 닮은 인물을 찾아주세요!</h1>
                </div>
                <div class="col-lg-8 align-self-baseline" id="mainBtn">
                    <p class="text-white-75 mb-5"></p>
                    <a class="btn btn-lunch btn-xl" style="margin: 10px;" onclick="step2()">시작하기</a>
                </div>`;

    $('#mainContainer').append(html);
}

/**
 * mbti 고르기
 */
function step2() {
    $('#mainContainer').children().remove();
    
    $('#mainTxt').css('display','none');
    $('#mainBtn').css('display','none');

    var html = `<div class="box-container">
                    <div class="box" id="enfp">
                        <img src="../img/mbti_enfp.png">
                    </div>
                    <div class="box" id="enfj">
                        <img src="../img/mbti_enfj.png">
                    </div>
                    <div class="box" id="esfp">
                        <img src="../img/mbti_esfp.png">
                    </div>
                    <div class="box" id="esfj">
                        <img src="../img/mbti_esfj.png">
                    </div>
                    <div class="box" id="entp">
                        <img src="../img/mbti_entp.png">
                    </div>
                    <div class="box" id="entj">
                        <img src="../img/mbti_entj.png">
                    </div>
                    <div class="box" id="estp">
                        <img src="../img/mbti_estp.png">
                    </div>
                    <div class="box" id="estj">
                        <img src="../img/mbti_estj.png">
                    </div>
                    <div class="box" id="infp">
                        <img src="../img/mbti_infp.png">
                    </div>
                    <div class="box" id="infj">
                        <img src="../img/mbti_infj.png">
                    </div>
                    <div class="box" id="isfp">
                        <img src="../img/mbti_isfp.png">
                    </div>
                    <div class="box" id="isfj">
                        <img src="../img/mbti_isfj.png">
                    </div>
                    <div class="box" id="intp">
                        <img src="../img/mbti_intp.png">
                    </div>
                    <div class="box" id="infj">
                        <img src="../img/mbti_intj.png">
                    </div>
                    <div class="box" id="istp">
                        <img src="../img/mbti_istp.png">
                    </div>
                    <div class="box" id="istj">
                        <img src="../img/mbti_istj.png">
                    </div>
                </div>
                <a class="btn btn-lunch btn-xl" style="margin: 10px;" onclick="step1()">뒤로가기</a>`;

            $('#mainContainer').append(html);

}

function step3() {
    
}