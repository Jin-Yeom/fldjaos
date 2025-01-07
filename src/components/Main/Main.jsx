import {MainWrapper} from './styled';


const Main = () => {

  

  return (
    <MainWrapper>
      <div className='main'>
        <div className="clock-box"></div>
        <div className="plmi-box">
          <span id="plus" type="button"></span>
          <span id="minus" type="button"></span>
        </div>
        <div className="container">
          <div className="app-box-container"></div>
        </div>
        <div className="popupContainer" style={{display:'none'}}></div>
      </div>
    </MainWrapper>
  );
}

export default Main;
