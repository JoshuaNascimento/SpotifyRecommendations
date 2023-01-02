import React from 'react'
import "./Styles/Popup.css"
import {ReactComponent as CloseIcon} from "./Assets/close-icon.svg"
import {ReactComponent as PlayIcon} from "./Assets/play-icon.svg"
import {ReactComponent as LikeIcon} from "./Assets/like-icon.svg"

function Popup(props) {
  return (props.trigger) ? (
    <div className="Popup-Container">
      <div className="Popup-Content">
        <CloseIcon className="Popup-Close" onClick={ () => props.setTrigger(false)}/>
        <h3>Begin listening to your favourite tracks either on Spotify or by pressing the "{<PlayIcon className="Popup-Icon"/>}" Icon on the main card </h3>
        <br></br>
        <h3>Once you begin listening you may click on the Recommend Tracks button to have 3 tracks similar to the one you are currently listening to suggested</h3>
        <br></br>
        <h3>You may then click the "{<PlayIcon className="Popup-Icon"/>}" Icon to listen to them on your Spotify Player</h3>
        <br></br>
        <h3>If you enjoy the song you may click the "{<LikeIcon className="Popup-Icon"/>}" Icon to add that track to your "Liked Songs" playlist on Spotify</h3>
        

      </div>
    </div>
  ) : "";
}

export default Popup