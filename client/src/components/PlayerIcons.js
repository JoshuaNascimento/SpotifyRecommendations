import React from 'react'
import "./Styles/PlayerIcons.css"

import {ReactComponent as PlayIcon} from "./Assets/play-icon.svg"
import {ReactComponent as SkipIcon} from "./Assets/skip-icon.svg"
import {ReactComponent as PreviousIcon} from "./Assets/previous-icon.svg"

import SpotifyWebApi from 'spotify-web-api-js';


function PlayerIcons() {

  const spotifyApi = new SpotifyWebApi()

  return (
    <div className="Icons-Container">
      {/* TODO: Use get playback state and the "is_playing" return value to determine whether to display the pause or play icon*/}
          <PreviousIcon className="Player-Icons" onClick={() => spotifyApi.skipToPrevious()}/>
          <PlayIcon className="Player-Icons"/>
          <SkipIcon className="Player-Icons" onClick={() => spotifyApi.skipToNext()}/>
        </div>
  )
}

export default PlayerIcons