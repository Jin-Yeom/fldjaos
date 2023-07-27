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
});

/**
 * 금액 제한
 */
$('#money').on('keyup', function(e) {
    if (e.target.value.length > 12) {
        e.target.value = e.target.value.slice(0, 12);
    }
})

/**
 * 가짜 송금 메시지 전송
 */
$('#sendButton').on('click', function() {
    const moneyTmp = $('#money').val();
    const money = moneyTmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    Kakao.Share.sendCustom({
        templateId : 96527,
        templateArgs: {
            title: money + '원을 보냈어요.'
        }
    });
})