var showPopup = function(pageNm) {
	// 팝업을 가운데 위치시키기 위해 아래와 같이 값 구하기

	var _width = '700';
	var _height = '800';

	var _left = Math.ceil((window.screen.width / 2) - (_width / 2));
	var _top = Math.ceil((window.screen.height / 2) - (_height / 2));

	window.open("../html/" + pageNm + ".html", "popup", 'width=' + _width + ', height=' + _height + ', left=' + _left + ', top=' + _top);
}