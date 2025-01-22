import styled from "styled-components";
import backImg from "../../Assets/food-back.jpg";

export const FoodWrapper = styled.div`
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