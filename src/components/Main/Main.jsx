import {MainWrapper} from "./styled";
import { arrayUnion, collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import db from '../../Hooks/firebase';

const querySnapshot1 = await getDoc(doc(db, "app"));

const Main = () => {

  /**
   * 시계 UI 생성, 시간을 불러온다.
   */
  const ClockBox = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return <div className="clock-box">
      <div id="clock">{hours}:{minutes}</div>
    </div>;
}

  /**
   * app box 생성
   */
  const AppBox = () => {
      const appFb = querySnapshot1.data();
      let html = [];
      let appArrFb = [];

      for(let i = 0; i < appFb.ID.length; i++) {
        const data = {
            CONTENT : appFb.CONTENT[i],
            ICON : appFb.ICON[i],
            ID : appFb.ID[i],
            IMAGE : appFb.IMAGE[i],
            READY : appFb.READY[i],
            TITLE : appFb.TITLE[i],
            URL : appFb.URL[i]
        };

        appArrFb.push(data);
      }
      
      appArrFb.forEach((item, idx) => {
          const {ID:id, ICON:icon} = item;

          html.push(<div key={idx} className="app-box" id={"app-"+id} ></div>);
      })

      return html;
  };

  /**
   * 매핑된 앱의 팝업 생성
   */
  // const createPopupHTML = () => {
  //     let html = "";

  //     appArrFb.forEach((item, idx) => {
  //         const {ID:id, TITLE:title, IMAGE:image, CONTENT:content, READY:ready, URL:url} = item;

  //         html += `<div class="popup" id=${id} style="display: none;">
  //                     <span class="close-btn">×</span>
  //                     <h2>${title}</h2>
  //                     <div class="popContent" style="background-image: url(${image});"></div>
  //                     <p>${content}</p>
  //                     ${ready ? `<button class="btn-start" id="btn-start-${id}" onclick="location.href='${url}'">시작하기</button>` : 
  //                     `<button class="btn-start" id="btn-start-${id}" disabled=true>준비중..</button>`}
  //                 </div>`;
  //     })


  //     return html;
  // }

  return (
    <MainWrapper>
      <div className='main'>
        <ClockBox></ClockBox>
        <div className="clock-box"></div>
        <div className="plmi-box">
          <span id="plus" type="button"></span>
          <span id="minus" type="button"></span>
        </div>
        <div className="container">
          <div className="app-box-container">
            <AppBox></AppBox>
          </div>
        </div>
        <div className="popupContainer" style={{display:'none'}}></div>
      </div>
    </MainWrapper>
  );
}

export default Main;
