/*******************************************
 * 전역변수
 *******************************************/


/*******************************************
 * firebase
 *******************************************/


/*******************************************
 * javascript
 *******************************************/

/**
 * onReady
 */
window.addEventListener('DOMContentLoaded', event => {
    // 초기화
    Kakao.init('369cbfe9e265030d709d3af757bee96b');
    Kakao.Link.sendCustom({
        templateId : 96527
        // 'title' :  '하하하',
        // 'desc' :  '호호호',
        // 'img_url' :  '../img/coin.png',
        // 'height' :  '100',
        // 'width' :  '300',
        // 'btn_url' :  'https://jin-yeom.github.io/fldjaos/html/kakao.html'
    });

    // Kakao.Auth.login({
    //     success: function(response) {
    //         Kakao.API.request({
    //             url: 'https://jin-yeom.github.io/fldjaos/html/kakao.html'
    //         })
    //     }
    // })
    
    // // 로그인
    // Kakao.Auth.authorize({
    //     redirectUri: 'https://jin-yeom.github.io/fldjaos/html/kakao.html'
    // });
    
    // // 로그인 토큰 값 받아오기
    // displayToken();

    // // 로그인사용자 정보 받아오기
    // userInfo();
});

/**
 * kakao 유저정보
 */
function userInfo() {
    Kakao.API.request({
        url: '/v2/user/me',
    }).then(function(res) {
        alert('success to request user information: ' + JSON.stringify(res));
    }).catch(function(err) {
        alert('failed to request user information: ' + JSON.stringify(err));
    });
}

/**
 * kakao 토큰
 */
function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
        Kakao.Auth.setAccessToken(token);
        Kakao.Auth.getStatusInfo().then(function(res) {
            if (res.status === 'connected') {
                console.log(res)
            }
        }).catch(function(err) {
            Kakao.Auth.setAccessToken(null);
        });
    }
}

/**
 * kakao 쿠키
 * @param {kakao 토큰명} name 
 * @returns 
 */
function getCookie(name) {
    var parts = document.cookie.split(name + '=');

    if (parts.length === 2) {
        return parts[1].split(';')[0];
    }
}