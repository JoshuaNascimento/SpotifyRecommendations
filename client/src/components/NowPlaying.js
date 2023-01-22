import "./Styles/NowPlaying.css"
import GetRecommendations from "../components/GetRecommendations"

import React, { useEffect, useState } from "react"

import { ReactComponent as QuestionIcon } from "./Assets/question-icon.svg"

import PlayerIcons from "./PlayerIcons.js"

import Popup from "./Popup.js"

const NowPlaying = (props) => {

  // TODO: Could do on component mount check for current tracks to speed up initial search

  const spotifyApi = props.spotifyApi
  const [currentPlayback, setCurrentPlayback] = useState([])
  const [popupVisible, setPopupVisible] = useState(false)

  // Initiate infinite playback check seperated by 5 seconds
  // TODO: Improve the api calling rate by adjusting the logic of this component
  //    Potentially remove completly the suggestion of using the actual spotify player
  //    Instead only using the application. So that the api is only updated when a button is clicked
  useEffect(() => {
    pingCurrentPlayback()
  }, [])

  // API call to spotify to get the song the user is currently listening too
  const getCurrentPlayback = (isPassive) => {
    spotifyApi.getMyCurrentPlaybackState().then((trackInfo) => {  // First API call to get user's current playing track
      if (trackInfo.item.artists[0] > 0) { return }
      spotifyApi.getArtist(trackInfo.item.artists[0].id).then((artistInfo) => { // Second API call to get song's main artist to pull their related genres
        if (trackInfo.item.name !== currentPlayback.name) {  // Check if the current tracks name is the same as the track already saved to state
          setCurrentPlayback({ // False; Set currentPlayback state with new track information
            name: trackInfo.item.name,
            albumArt: trackInfo.item.album.images[0].url,
            songID: trackInfo.item.id,
            artistID: trackInfo.item.artists[0].id,
            genres: artistInfo.genres
          })
        }
      })
    })
    pingCurrentPlayback()
  }

  const pingCurrentPlayback = () => {
    setTimeout(() => {
      getCurrentPlayback()
    }, 5000);

  }


  return (
    <div className="Card-Container">

      <div className="Playing-Container">

        <Popup trigger={popupVisible} setTrigger={setPopupVisible} />

        <article className="Playing-Card">

          <QuestionIcon className="Question-Icon" onClick={() => setPopupVisible(true)} />

          {currentPlayback.name === undefined ?
            <header className="Playing-Message">Begin listening on your spotify player...{currentPlayback.name}</header> :
            <header className="Playing-Name">Now Playing: {currentPlayback.name}</header>
          }

          <img className="Playing-Img" src={currentPlayback.albumArt} />

          {/* Player to allow Manipulating Spotify player from browser */}
          <PlayerIcons className="Icons-Container" getCurrentPlayback={getCurrentPlayback} />




        </article>

      </div>
      
      {currentPlayback.artistID && <GetRecommendations artistID={currentPlayback.artistID} songID={currentPlayback.songID} />}
    </div>
  )
}

export default NowPlaying;