import React, {useState, useEffect} from 'react'
import "./Styles/PlayerIcons.css"

import {ReactComponent as PlayIcon} from "./Assets/play-icon.svg"
import {ReactComponent as SkipIcon} from "./Assets/skip-icon.svg"
import {ReactComponent as PreviousIcon} from "./Assets/previous-icon.svg"
import {ReactComponent as PauseIcon} from "./Assets/pause-icon.svg"

import SpotifyWebApi from 'spotify-web-api-js';

/**
 * If NowPlaying detects the user is actively listening to a track then the component renders to allow the user to control their spotify player
 * from within the webapp
 * @param {*} props - isPlaying variable from NowPlaying State
 * @returns 
 */
function PlayerIcons(props) {

  const spotifyApi = new SpotifyWebApi()

  return (
    <div className="Icons-Container">
          <PreviousIcon className="Player-Icons" onClick={() => spotifyApi.skipToPrevious()}/>
          {props.isPlaying === true ? 
            <PauseIcon className="Player-Icons" onClick={() => spotifyApi.pause()}/> 
              :
            <PlayIcon className="Player-Icons" onClick={() => spotifyApi.play()}/>
          }
          <SkipIcon className="Player-Icons" onClick={() => spotifyApi.skipToNext()}/>
        </div>
  )
}

export default PlayerIcons