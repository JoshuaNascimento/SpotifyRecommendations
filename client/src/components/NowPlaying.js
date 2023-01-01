import "./NowPlaying.css"

import React, {useState, useEffect} from "react"
import {ReactComponent as QuestionIcon} from "./Assets/question-icon.svg"

import InformationBox from "./InformationBox.js"
import Popup from "./Popup.js"

const NowPlaying = (props) => {

  const [popupVisible, setPopupVisible] = useState(false)

  return (
    <div className="Playing-Container">

      <Popup trigger={popupVisible} setTrigger={setPopupVisible}/>
      
      <article className="Playing-Card">

        <QuestionIcon className="question-icon" onClick={ () => setPopupVisible(true) }/>

        {props.name === undefined ?
        <header className="Playing-Message">Begin listening on your spotify player...{props.name}</header> :
        <header className="Playing-Name">Now Playing: {props.name}</header>
        }

        <img className="Playing-Img" src={props.albumArt} />
      </article>
    </div>
  )
}

export default NowPlaying;