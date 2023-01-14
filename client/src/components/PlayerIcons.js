import React, {useState, useEffect} from 'react'
import "./Styles/PlayerIcons.css"

import {ReactComponent as PlayIcon} from "./Assets/play-icon.svg"
import {ReactComponent as SkipIcon} from "./Assets/skip-icon.svg"
import {ReactComponent as PreviousIcon} from "./Assets/previous-icon.svg"
import {ReactComponent as PauseIcon} from "./Assets/pause-icon.svg"

import SpotifyWebApi from 'spotify-web-api-js';

function PlayerIcons() {

  const spotifyApi = new SpotifyWebApi()

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect( () => {
    const timer = setTimeout( () => {
    }, 5000);
    spotifyApi.getMyCurrentPlaybackState().then( (response) => {
      //console.log(response.is_playing)
      setIsPlaying(response.is_playing)
      return () => setTimeout(timer)
    }, [])

  })

  return (
    <div className="Icons-Container">
      {/* TODO: Use get playback state and the "is_playing" return value to determine whether to display the pause or play icon*/}
          <PreviousIcon className="Player-Icons" onClick={() => spotifyApi.skipToPrevious()}/>
          {isPlaying === true ? 
            <PauseIcon className="Player-Icons" onClick={() => spotifyApi.pause()}/> 
              :
            <PlayIcon className="Player-Icons" onClick={() => spotifyApi.play()}/>
          }
          <SkipIcon className="Player-Icons" onClick={() => spotifyApi.skipToNext()}/>
        </div>
  )
}

export default PlayerIcons