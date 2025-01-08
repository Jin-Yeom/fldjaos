import { MainWrapper } from "./styled";
import { arrayUnion, collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import db from "../../Hooks/firebase";

const querySnapshot1 = await getDoc(doc(db, "app"));

const Main = () => {
  /**
   * 시계 UI 생성, 시간을 불러온다.
   */
  const Clock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

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
debugger;
    return (
      <div className="app-box-container" role="list">
        {appData.map(({ ID, ICON }, idx) => (
          <article key={idx} className="app-box" id={`app-${ID}`} role="listitem" aria-label={`App ${ID}`}>
            <img src={ICON} alt={`${ID} icon`} />
          </article>
        ))}
      </div>
    );
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
          <AppList />
        </section>
        <div className="popupContainer" style={{ display: "none" }}></div>
      </main>
    </MainWrapper>
  );
};

export default Main;
