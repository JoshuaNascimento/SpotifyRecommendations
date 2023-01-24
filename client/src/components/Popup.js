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
        <h3>Begin listening to your favourite tracks on Spotify Web or Desktop, clear your song queue and allow the App to detect your session.</h3>
        <br></br>
        <h3>Once the App has detected your currently playing track you can click the Recommend Tracks button to have 3 tracks similar to the current one suggested.</h3>
        <br></br>
        <h3>You may then click the "{<PlayIcon className="Popup-Icon"/>}" Icon to listen to them on your Spotify Player</h3>
        <br></br>
        <h3>If you enjoy the song you may click the "{<LikeIcon className="Popup-Icon"/>}" Icon to add that track to your "Liked Songs" playlist on Spotify</h3>
        <br></br>
        <h3>Your current track is refreshed every 5 seconds otherwise Spotify API police come for me :)</h3>
        

      </div>
    </div>
  ) : "";
}

export default Popup