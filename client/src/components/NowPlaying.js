import "./Styles/NowPlaying.css"

import React, {useState} from "react"

import {ReactComponent as QuestionIcon} from "./Assets/question-icon.svg"

import PlayerIcons from "./PlayerIcons.js"

import Popup from "./Popup.js"

const NowPlaying = (props) => {

  // TODO: Could do on component mount check for current tracks to speed up initial search

  const [popupVisible, setPopupVisible] = useState(false)

  return (
    <div className="Playing-Container">

      <Popup trigger={popupVisible} setTrigger={setPopupVisible}/>
      
      <article className="Playing-Card">

        <QuestionIcon className="Question-Icon" onClick={ () => setPopupVisible(true) }/>

        {props.name === undefined ?
        <header className="Playing-Message">Begin listening on your spotify player...{props.name}</header> :
        <header className="Playing-Name">Now Playing: {props.name}</header>
        }

        <img className="Playing-Img" src={props.albumArt} />

        {/* Player to allow Manipulating Spotify player from browser */}
        <PlayerIcons className="Icons-Container"/>
        
  
      </article>

      
      
    </div>
  )
}

export default NowPlaying;