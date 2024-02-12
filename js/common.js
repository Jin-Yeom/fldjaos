var showPopup = function(pageNm) {
	// 팝업을 가운데 위치시키기 위해 아래와 같이 값 구하기

	var _width = '700';
	var _height = '800';

	var _left = Math.ceil((window.screen.width / 2) - (_width / 2));
	var _top = Math.ceil((window.screen.height / 2) - (_height / 2));

	window.open("../html/" + pageNm + ".html", "popup", 'width=' + _width + ', height=' + _height + ', left=' + _left + ', top=' + _top);
}

/**
 * alert
 * @param {alert text} text 
 */
var alertBox = function(text) {
	var html =  `<div class="overlay"></div>
				<div id="alertBox">
					<div id="alertHeader">
						<span type="button" id="closeButton" onclick="closeAlert()">&times;</span>
					</div>
					<div id="alertContent">
						<p>${text}</p>
					</div>
				</div>`;
				
	$("body").append(html);
}

/**
 * alert close
 */
var closeAlert = function() {
	$('.overlay').remove();
	$('#alertBox').remove();
}

/**
 * null, type, 빈값 체크
 * @param {val} val 
 * @returns 
 */
var checkVal = function(val) {
	if(val != null && typeof val !== "undefined" && val != "") {
		return true;
	} else {
		return false;
	}
}

/**
 * 배열의 요소를 무작위로 섞기
 * @param {배열} array 
 * @returns 
 */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

/**
* type="number" maxLength
* @param {this} object 
*/
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
			object.value = object.value.slice(0, object.maxLength);
	}    
}