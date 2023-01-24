import "./Styles/NowPlaying.css"
import GetRecommendations from "../components/GetRecommendations"

import React, { useEffect, useState } from "react"

import { ReactComponent as QuestionIcon } from "./Assets/question-icon.svg"

import PlayerIcons from "./PlayerIcons.js"

import Popup from "./Popup.js"

const NowPlaying = (props) => {

  const spotifyApi = props.spotifyApi
  const [currentPlayback, setCurrentPlayback] = useState([])
  const [popupVisible, setPopupVisible] = useState(false)

  /**
   * useEffect triggers on initial render and every 5 seconds will call the getCurrentPlayback method to
   * refresh the NowPlaying UI and display the correct and current track playing
   */
  useEffect(() => {
    setTimeout(getCurrentPlayback, 5000)
  })

  /**
   * Call the Spotify API to recieve information on the user's current playing track which is used to set state for CurrentPlayback 
   */
  const getCurrentPlayback = () => {
    // call Spotify API using callback option provided by spotify-web-api-js 
    spotifyApi.getMyCurrentPlayingTrack(function (err, trackInfo) {

      // Check for error code return
      if (err) {
        console.error(err);
      }

      // Else use data recieved from API call to set CurrentPlayback state
      // ? does a condition check for if the value exists, avoiding undefined error readouts in browser console
      setCurrentPlayback({
        name: trackInfo?.item?.name,
        albumArt: trackInfo?.item?.album.images[0].url,
        songID: trackInfo?.item?.id,
        artistID: trackInfo?.item?.artists[0].id,
        genres: trackInfo?.item?.artists.genres,
        isPlaying: trackInfo?.is_playing
      })
    })
  }

  return (
    
    <div className="Card-Container">

      <div className="Playing-Container">

        <Popup trigger={popupVisible} setTrigger={setPopupVisible} />

        <article className="Playing-Card">
          {/* Help icon which shows basic instructions for App use when clicked */}
          <QuestionIcon className="Question-Icon" onClick={() => setPopupVisible(true)} />

          {/* If currentPlayback does not have an artist name then prompt the user to begin listening on their device, 
            otherwise show the track being listened to */}
          {currentPlayback.name === undefined ?
            <header className="Playing-Message">Begin listening on your spotify player...{currentPlayback.name}</header> :
            <header className="Playing-Name">Now Playing: {currentPlayback.name}</header>
          }

          {/* Displays the album art of the current track */}
          <img className="Playing-Img" src={currentPlayback.albumArt} />

          {/* Player to allow Manipulating Spotify player from browser */}
          <PlayerIcons className="Icons-Container" isPlaying={currentPlayback.isPlaying} />
          {currentPlayback.length > 0 && <PlayerIcons className="Icons-Container" isPlaying={currentPlayback.isPlaying} />}

        </article>
      </div>
      {/* Only display recommendations if the currentPlayback state has had an artist ID set */}
      {currentPlayback?.artistID && <GetRecommendations artistID={currentPlayback.artistID} songID={currentPlayback.songID} />}
    </div>
  )
}

export default NowPlaying;