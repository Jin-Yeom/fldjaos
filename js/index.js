
/****************************
 * global common object
 ****************************/
const gcm = {};

gcm.openPage = function() {
    const createHtml = () => {
        const clockHtml = () => {
            const clock = document.querySelector('#clock');
            const toDate = new Date();
            clock.innerText = `${toDate.getHours()}:${toDate.getMinutes()}`;
        }

        const appHtml = () => {
            const appBox = document.querySelector('.app-box-container');
            let html = "";

            for(let i = 0; i < 5; i++) {
                html += `<div class="app-box" id="app-${i}"></div>`;
            }

            appBox.innerHTML = html;
        }

        setInterval(() => {clockHtml()}, 100);
        appHtml();
    }

    const init = () => {
        createHtml();
    }

    return init;
}();

/**
 * 첫 page loading 시 실행
 */
gcm.openPage();