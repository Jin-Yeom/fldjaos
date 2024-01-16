
/****************************
 * Global Common Object
 ****************************/
const gcm = {};


/****************************
 * Event
 ****************************/
document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    initialize();


    // 데이터 불러오기 필요
    const btn_app = document.querySelectorAll('.app-box');
    btn_app.forEach((item) => {
        item.onclick = () => document.querySelector('.popup').style.display = 'block';
    })
});


/****************************
 * Function
 ****************************/
/**
 * Init Function
 */
const initialize = () => {
    // 시계 업데이트
    setInterval(gcm.updateClock, 100);
    
    // HTML 삽입
    const appBoxContainer = document.querySelector('.app-box-container');
    const clockBox = document.querySelector('.clock-box');
    clockBox.innerHTML = gcm.createClockHTML('00', '00');
    appBoxContainer.innerHTML = gcm.createAppBoxHTML(5);
};

/**
 * HTML 템플릿, clock
 * @param {시간} hours 
 * @param {분} minutes 
 * @returns 
 */
gcm.createClockHTML = (hours, minutes) => `<div id="clock">${hours}:${minutes}</div>`;

/**
 * HTML 템플릿, app
 * @param {app 개수} count 
 * @returns 
 */
gcm.createAppBoxHTML = count => {
    let html = "";

    for (let i = 0; i < count; i++) {
        html += `<div class="app-box" id="app-${i}"></div>`;
    }

    return html;
};

/**
 * 시계 업데이트
 */
gcm.updateClock = () => {
    const clockElement = document.querySelector('#clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}`;
};

gcm.closePopup = () => {
    // 팝업을 감추도록 설정
    document.querySelector('.popup').style.display = 'none';
}