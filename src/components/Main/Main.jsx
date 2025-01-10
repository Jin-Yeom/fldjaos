import { MainWrapper } from "./styled";
import { arrayUnion, collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import db from "../../Hooks/firebase";
import { useState } from "react";

const querySnapshot1 = await getDoc(doc(db, "app"));
const appFb = querySnapshot1.data();
const appData = appFb.ID.map((_, i) => ({
  CONTENT: appFb.CONTENT[i],
  ICON: appFb.ICON[i],
  ID: appFb.ID[i],
  IMAGE: appFb.IMAGE[i],
  READY: appFb.READY[i],
  TITLE: appFb.TITLE[i],
  URL: appFb.URL[i],
}));

const Main = () => {
  /**
   * 시계 UI 생성, 시간을 불러온다.
   */
  const Clock = () => {
    let now = new Date();
    const [hours, setHours] = useState(now.getHours().toString().padStart(2, "0"));
    const [minutes,setMinutes] = useState(now.getMinutes().toString().padStart(2, "0"));

    // 시간 갱신
    setInterval(() => {
      now = new Date();
      setHours(now.getHours().toString().padStart(2, "0"));
      setMinutes(now.getMinutes().toString().padStart(2, "0"));
    },300);
    
    return (
      <section className="clock-box" aria-label="Current Time">
        <time id="clock" aria-live="polite">
          {hours}:{minutes}
        </time>
      </section>
    );
  };

  /**
   * app box 생성
   */
  const AppList = () => {
    return (
      <div className="app-box-container" role="list">
        {appData.map(({ ID, ICON }, idx) => (
          <div key={idx} id={`app-${ID}`} className="app-box" style={ {backgroundImage:`url(${ICON})`} } alt={`${ID} icon`}></div>
        ))}
      </div>
    );
  };

  const appPopup = () => {
    
    // return (
    //   <div class="popup" id=${id} style="display: none;">
    //     <span class="close-btn">×</span>
    //     <h2>${title}</h2>
    //     <div class="popContent" style="background-image: url(${image});"></div>
    //     <p>${content}</p>
    //     ${ready ? `<button class="btn-start" id="btn-start-${id}" onclick="location.href='${url}'">시작하기</button>` : 
    //     `<button class="btn-start" id="btn-start-${id}" disabled=true>준비중..</button>`}
    //   </div>
    // );
  }

  return (
    <MainWrapper>
      <main className="main" role="main">
        <Clock />
        <div className="plmi-box">
          <span id="plus" aria-label="Increase"></span>
          <span id="minus" aria-label="Decrease"></span>
        </div>
        <section className="container">
          <AppList />
        </section>
        <div className="popupContainer" style={{ display: "none" }}></div>
      </main>
    </MainWrapper>
  );
};

export default Main;
