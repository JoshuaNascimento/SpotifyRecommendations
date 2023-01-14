import './App.css';
import React, { useState, useEffect, useCallback } from "react"
import SpotifyWebApi from 'spotify-web-api-js';

import NowPlaying from './components/NowPlaying'
import GetRecommendations from "./components/GetRecommendations"

const spotifyApi = new SpotifyWebApi()

const PORT = process.env.PORT || 8888
const LOGINURL = `http://localhost:${PORT}/login`

const getTokenFromURL = () => {
  return window.location.hash.substring(1).split("&").reduce((initial, item) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
}

function App() {

  // States
  const [spotifyToken, setSpotifyToken] = useState("")
  const [currentPlayback, setcurrentPlayback] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  // useEffect runs after initial render
  useEffect(() => {
    const spotifyToken = getTokenFromURL().access_token
    window.location.hash = "";

    if (spotifyToken) {
      setSpotifyToken(spotifyToken)
      // Use Spotify Api
      spotifyApi.setAccessToken(spotifyToken)
      spotifyApi.getMe().then((user) => {
        //console.log(user)
      })
      setLoggedIn(true)
    }
  }, [])

  return (
    <div className="App">

        {!loggedIn && 
          <a className="Login" href={LOGINURL}>
            <button className="Login-Button">
              Authenticate With Spotify
            </button>
          </a>}
        

        {loggedIn && <NowPlaying spotifyApi={spotifyApi}/>}

         {/* Use arrow function on button call to prevent it from firing on render and multiple unwanted times */}

        {/* currentPlayback is an array before being set so only display recommendations after current playback has been set.
        There is most likely a better way to do this condition check but this was the first way i got it to work :) */}
        {loggedIn && !Array.isArray(currentPlayback) && <GetRecommendations artistID={currentPlayback.artistID} songID={currentPlayback.songID}/>}

    </div>

  );
}
export default App;
