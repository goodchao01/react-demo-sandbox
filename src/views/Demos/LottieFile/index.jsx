import React from "react";
import { Player } from '@lottiefiles/react-lottie-player';

import animateData from '../../../assets/files/animation.json';
import image from '../../../assets/images/woman.png';


import './style.scss';

export default function LottieFile(props) {
  return (
    <div className="animate_box">
      <Player
        autoplay
        loop
        // src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
        src={animateData}
        style={{ height: '300px', width: '300px' }}
      >
      </Player>
      <img className="cover_img" src={image} alt="" />
    </div>
  );
}
