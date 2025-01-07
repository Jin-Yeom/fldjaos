import styled from "styled-components";
import backImg from "../../Assets/main-back.jpg";
import plusImg from "../../Assets/main-plus.png";
import minusImg from "../../Assets/main-minus.png";

export const MainWrapper = styled.div`
  .main {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(${backImg});
    background-size: cover; /* 이미지를 컨테이너에 꽉 차게 채웁니다 */
    background-position: center; /* 이미지를 가운데 정렬합니다 */
    background-repeat: no-repeat; 
  }

  /* clock area */
  .clock-box {
      position: absolute;
      top: 15%;
      width: 100%;
      height: 30px;
      text-align: center;
  }

  .clock-box #clock {
      font-family: 'Arial', sans-serif;
      font-size: 2.5em;
      font-weight: bold;
      color: #818285;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* plus minus area */
  .plmi-box {
      display: flex;
      justify-content: right;
      align-items: center;
      position: absolute;
      top: 21%;
      width: 85%;
      height: 40px;
  }

  .plmi-box #plus {
      width: 40px;
      height: 40px;
      opacity: 0.6;
      background-image: url(${plusImg});
      background-size: cover; /* 이미지를 컨테이너에 꽉 차게 채웁니다 */
      background-position: center; /* 이미지를 가운데 정렬합니다 */
      background-repeat: no-repeat; 
  }

  .plmi-box #minus {
      width: 40px;
      height: 40px;
      opacity: 0.6;
      background-image: url(${minusImg});
      background-size: cover; /* 이미지를 컨테이너에 꽉 차게 채웁니다 */
      background-position: center; /* 이미지를 가운데 정렬합니다 */
      background-repeat: no-repeat; 
  }

  /* app area */
  .container {
      width: 80%;
      height: 40%;
      opacity: 0.8;
      background-color: #f0f0f0; /* 흐린 회색 박스 */
      border-radius: 15px; /* 모서리 둥근 네모난 모양 */
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
  }

  .app-box-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr); /* 4개의 열로 구성 */
      grid-gap: 10px; /* 간격을 10px로 설정 */
  }

  .app-box {
      width: 50px; /* 고정된 크기 */
      height: 50px; /* 고정된 크기 */
      border-radius: 10px; /* 앱처럼 조그마한 네모난 앱 모양 */
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* 앱에 그림자 추가 */
      background-color: #444; /* 흐린 회색 박스 */
      background-size: cover; /* 이미지를 컨테이너에 꽉 차게 채웁니다 */
      background-position: center; /* 이미지를 가운데 정렬합니다 */
      background-repeat: no-repeat; 
      margin-bottom: 10px; /* 각 행 간의 간격 */
      margin-left: -41%;
  }

  .popupContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .popupContainer .popup {
      width: auto;
      height: 100%;
  }

  .popupContainer .popup .popContent {
      position: relative;
      margin-left: 5%;
      width: 90%;
      height: 50%;
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      background-color: #444; /* 흐린 회색 박스 */
      background-size: cover; /* 이미지를 컨테이너에 꽉 차게 채웁니다 */
      background-position: center; /* 이미지를 가운데 정렬합니다 */
      background-repeat: no-repeat; 
  }

  /* 버튼 스타일 */
  .popupContainer .popup button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border-radius: 5px;
      background-color: #3498db; /* 버튼 배경색 */
      color: #fff; /* 버튼 글자색 */
      border: 2px solid #3498db; /* 버튼 테두리 색상 */
      transition: background-color 0.3s, color 0.3s; /* 전환 효과 */
      margin-top: 10%;
  }

  /* Disabled 상태의 버튼 스타일 */
  .popupContainer .popup button:disabled {
      background-color: #bdc3c7; /* Disabled 배경색 */
      color: #7f8c8d; /* Disabled 글자색 */
      border: 2px solid #bdc3c7; /* Disabled 테두리 색상 */
      cursor: not-allowed; /* Disabled 시 마우스 커서 변경 */
  }

  .close-btn {
      cursor: pointer;
      font-family: 'Arial', sans-serif;
      font-size: 2em;
      font-weight: bold;
      color: #444;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* media */
  @media (min-width: 300px) {
      .app-box {
          margin-left: 10%;
      }
  }

  @media (min-width: 400px) {
      .app-box {
          margin-left: 20%;
      }
  }

  @media (min-width: 500px) {
      .app-box {
          margin-left: 30%;
      }
  }

  @media (min-width: 600px){
      .app-box {
          margin-left: 31%;
      }
  }

  @media (min-width: 700px) {
      .app-box {
          margin-left: 33%;
      }
  }
`;