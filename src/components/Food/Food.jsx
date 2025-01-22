import { MainWrapper } from "./styled";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import db from "../../firebase";
import { useState, useEffect } from "react";

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
 * 메인 컴포넌트
 */
const Food = () => {
  
  return (
    <FoodWrapper>
      
    </FoodWrapper>
  );
};

export default Food;
