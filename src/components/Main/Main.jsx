import { MainWrapper } from "./styled";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import db from "../../firebase";
// import Food from "../Food/Food";
import { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom";

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

/**
 * 시계 UI 생성
 */
const Clock = () => {
  const [time, setTime] = useState({
    hours: new Date().getHours().toString().padStart(2, "0"),
    minutes: new Date().getMinutes().toString().padStart(2, "0"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours().toString().padStart(2, "0"),
        minutes: now.getMinutes().toString().padStart(2, "0"),
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="clock-box" aria-label="Current Time">
      <time id="clock" aria-live="polite">
        {time.hours}:{time.minutes}
      </time>
    </section>
  );
};

/**
 * 앱 목록 컴포넌트
 */
const AppList = ({ onAppClick }) => {
  return (
    <section className="app-box-container" role="list">
      {appData.map(({ ID, ICON }, idx) => (
        <img
          key={idx}
          id={`app-${ID}`}
          className="app-box"
          src={ICON}
          alt={`${ID} icon`}
          onClick={() => onAppClick(ID)}
        />
      ))}
    </section>
  );
};

/**
 * 팝업 컴포넌트
 */
const AppPopup = ({ appDetails, onClose }) => {
  if (!appDetails) return null; // 팝업을 닫은 상태에서는 렌더링하지 않음

  const { TITLE, CONTENT, IMAGE, READY, URL } = appDetails;

  return (
    <Router>
      <div className="popupContainer">
        <div className="popup">
          <span className="close-btn" onClick={onClose}>
            ×
          </span>
          <h2>{TITLE}</h2>
          <div
            className="popContent"
            style={{ backgroundImage: `url(${IMAGE})` }}
          ></div>
          <p>{CONTENT}</p>
          {READY ? (
              <Link
                className="btn-start"
                to='/Food'
              >
                시작하기
              </Link>
            ) : (
              <button className="btn-start" disabled>
                준비중..
              </button>
          )}
        </div>
      </div>
    </Router>
  );
};

/**
 * 메인 컴포넌트
 */
const Main = () => {
  const [selectedApp, setSelectedApp] = useState(null); // 현재 선택된 앱 데이터 관리

  const handleAppClick = (appId) => {
    const appDetails = appData.find((app) => app.ID === appId);
    setSelectedApp(appDetails); // 선택된 앱의 데이터를 상태에 저장
  };

  const handleClosePopup = () => {
    setSelectedApp(null); // 팝업 닫기
  };

  return (
    <MainWrapper>
      <main className="main" role="main">
        <Clock />
        <div className="plmi-box">
          <span id="plus" aria-label="Increase"></span>
          <span id="minus" aria-label="Decrease"></span>
        </div>
        <section className="container">
          <AppList onAppClick={handleAppClick} />
        </section>
        {selectedApp && (
          <AppPopup appDetails={selectedApp} onClose={handleClosePopup} />
        )}
      </main>
    </MainWrapper>
  );
};

export default Main;
