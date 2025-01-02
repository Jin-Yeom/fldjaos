const com = {};

/**
 * 팝업 오픈
 * @param {String:Y} url에 들어가는 html 파일명 
 */
com.openPopup = fileNm => {

	if(com.isEmpty(fileNm)) {
		return;
	}

	// 팝업을 가운데 위치시키기 위해 아래와 같이 값 구하기
	var _width = '700';
	var _height = '800';

	var _left = Math.ceil((window.screen.width / 2) - (_width / 2));
	var _top = Math.ceil((window.screen.height / 2) - (_height / 2));

	window.open("../html/" + fileNm + ".html", "popup", 'width=' + _width + ', height=' + _height + ', left=' + _left + ', top=' + _top);
}

/**
 * 얼롯창 오픈
 * @param {String:Y} 얼롯창 텍스트 문구
 */
com.alert = text => {

	if(com.isEmpty(text)) {
		return;
	}

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
 * 얼롯창 닫기
 */
com.closeAlert = () => {
	$('.overlay').remove();
	$('#alertBox').remove();
}

/**
 * 배열의 요소를 무작위로 섞기
 * @param {Array:Y} 섞고자 하는 배열 객체
 * @returns 섞인 배열 객체
 */
com.shuffleArray = array => {

	if(com.isEmpty(array)) {
		return;
	}

	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

/**
* type="number" maxLength check
* @param {Object:Y} this 객체
*/
com.maxLengthCheck = object => {

	if(com.isEmpty(object)) {
		return;
	}

	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}
}

/**
* 빈값 체크
* @param {All:Y} 빈값인지 확인 하고자 하는 값
* @returns 값이 존재하면 true, 값이 존재하지 않으면 false
*/
com.isEmpty = obj => {
	if(obj === null || typeof obj === "undefined" || obj == "") {
		return true;
	} else {
		return false;
	}
}