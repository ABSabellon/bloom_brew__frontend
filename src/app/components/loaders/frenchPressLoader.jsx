import React,{useState} from "react";
import { FrenchPress,LoadingText } from "../../components/imagePath/imagePath";
const FrenchPressLoader = () => {
  
  return (
    <>
      <div className="gif-wrapper">
        <div className="french-press">
            
          <img src={FrenchPress} alt="img" />

          <img src={LoadingText} alt="img" className="load-text" />
        </div>
      </div>
    </>
  );
};

export default FrenchPressLoader;
