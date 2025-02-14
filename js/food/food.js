/****************************
 * firebase db 연결
 ****************************/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
// import { GoogleAuthProvider, getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { arrayUnion, collection, doc, getDoc, getFirestore, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyAq9_eXkpuWq5rDAS5oWi9vyI_MsgwO4pI",
	authDomain: "main-32d80.firebaseapp.com",
	projectId: "main-32d80",
	storageBucket: "main-32d80.appspot.com",
	messagingSenderId: "370479894776",
	appId: "1:370479894776:web:8c37b943c9f50b210a6b0d",
	measurementId: "G-B4WYQX7L3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const provider = new GoogleAuthProvider();
// const auth = getAuth();
const database = getFirestore(app);
const db = collection(database, "fldjaos");

/****************************
 * 전역 변수
 ****************************/

let totoFb = {};
totoFb.param = {};

/****************************
 * slot script
 ****************************/

//제어할 요소선택 후 변수에 담기
let displaySlot = document.querySelector(".menu_slot"); //menu slot
let elem = document.querySelector(".menu_print > h2"); //menu print

//reset check
let resetNum = 1;

//LunchIs 함수선언
function lunchIs() {
    //setTimeout 선언
    setTimeout(timeFunc, 800);

    function timeFunc() {
        //shuffle 메소드 선언
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        //런치리스트 배열생성
        let lunchList = [];

        //배열복사
        let firstLunchList = [];

        // kakao map food search info list
        for(var i = 0; i < $('.slide_box li').length; i++) {
            lunchList.push($('.slide_box li')[i].innerHTML);
        }

        lunchList.forEach(function(item) {
            firstLunchList.push(item);
        });

        //슬롯애니메이션 감추기
        displaySlot.style.display = "none";

        //shuffle 메소드를 사용하여 석은 배열에서 index[0]을 가져오기
        console.log(shuffle(lunchList));
        let lunckPick = shuffle(lunchList)[0];

        //메뉴 노출
        console.log(lunckPick);
        elem.innerHTML = lunckPick;

        //reset 되었을 경우에 숨겨진 메뉴를 다시 노출시킴
        if (resetNum == 0) {
            elem.style.display = "block";
        }
    }
}

//reset 함수선언
function reset() {

    //메뉴 숨기기
    elem.style.display = "none";

    //슬롯애니메이션 노출
    displaySlot.style.display = "block";

    //resetNum으로 reset여부를 구분하기 위해 0 할당
    resetNum = 0;
}

/****************************
 * kakao script
 ****************************/

var markerPosition;	//위치 변수
var infowindow = new kakao.maps.InfoWindow({zIndex:1});	// 마커를 클릭하면 장소명을 표출할 인포윈도우

//중심지 설정
var mapContainer = document.getElementById('map'),
        mapOption = {
                center: new kakao.maps.LatLng(37.5642135, 127.0016985),
                level: 4
        };

//지도 생성
var map = new kakao.maps.Map(mapContainer, mapOption);

//position 사용
navigator.geolocation.getCurrentPosition(function(position) {

    //위치 재설정	
    markerPosition  = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude); 
    
    //중심지 이동
    map.panTo(markerPosition);

    //내 위치 마커 생성
    var marker = new kakao.maps.Marker({
            position: markerPosition
    });

    //지도에 원 생성
    var circle = new kakao.maps.Circle({
            center : markerPosition,  //원의 중심좌표
            radius: 200, //미터 단위의 원의 반지름
            strokeWeight: 5, //선의 두께
            strokeColor: '#75B8FA', //선의 색깔
            strokeOpacity: 1, //선의 불투명도, 1에서 0 사이의 값이며 0에 가까울수록 투명
            strokeStyle: 'dashed', //선의 스타일
            fillColor: '#CFE7FF', //채우기 색깔
            fillOpacity: 0.7  //채우기 불투명도
    });

    //지도에 원을 표시
    circle.setMap(map);

    //장소 검색 객체를 생성
    var ps = new kakao.maps.services.Places(circle); 

    //카테고리로 식당('FD6')을 검색
    ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true});

    //키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB (data, status, pagination) {
        var foodHtml = "";

        if (status === kakao.maps.services.Status.OK) {
                for (var i=0; i<data.length; i++) {
                        displayMarker(data[i]);
                        foodHtml += ("<li>" + data[i].place_name + "</li>"); 
                }

                if(foodHtml != "") {	//주변에 식당이 있다면
                    $('.slide_box').append(foodHtml);
                } else {							//주변에 식당이 없다면
                    $('.slide_box').append("<li>주변에 식당이 없습니다.</li>");
                }
        }
    }

    //지도에 마커를 표시하는 함수
    function displayMarker(place) {
            //마커를 생성하고 지도에 표시
            var marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x),
                    image: new kakao.maps.MarkerImage("../img/food-icon.png", new kakao.maps.Size(35, 40), {offset: new kakao.maps.Point(27, 69)})
            });

            //마커에 클릭 이벤트를 등록
            kakao.maps.event.addListener(marker, 'click', function() {
                    //마커를 클릭 시 장소명이 인포윈도우에 표출
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                    infowindow.open(map, marker);
            });
    }

    //지도에 마커 적용
    marker.setMap(map);
});