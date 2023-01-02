import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from "react"
import SpotifyWebApi from 'spotify-web-api-js';

import NowPlaying from './components/NowPlaying'
import GetRecommendations from "./components/GetRecommendations"

const spotifyApi = new SpotifyWebApi()

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
        console.log(user)
      })
      setLoggedIn(true)
    }
  })

  // API call to spotify to get the song the user is currently listening too
  const getCurrentPlayback = () => {
    spotifyApi.getMyCurrentPlaybackState().then((trackInfo) => {  // First API call to get user's current playing track
      if (trackInfo.item.artists[0] > 0) {return}
      spotifyApi.getArtist(trackInfo.item.artists[0].id).then((artistInfo) => { // Second API call to get song's main artist to pull their related genres
        if (trackInfo.item.name !== currentPlayback.name) {  // Check if the current tracks name is the same as the track already saved to state
          setcurrentPlayback({ // False; Set currentPlayback state with new track information
            name: trackInfo.item.name,
            albumArt: trackInfo.item.album.images[0].url,
            songID: trackInfo.item.id,
            artistID: trackInfo.item.artists[0].id,
            genres: artistInfo.genres
          })
          pingCurrentPlayback()
        }
      })
    })
  }

  // Every 5 seconds call getCurrentPlayback and update if the user has switched songs
  const pingCurrentPlayback = () => {
    setTimeout(() => {
      console.log("checking player")
      getCurrentPlayback()
    }, 10000);
  }

  return (
    <div className="App">

        {!loggedIn && 
          <a className="Login" href="http://localhost:8888">
            <button className="Login-Button">
              Authenticate With Spotify
            </button>
          </a>}
        

        {loggedIn && <NowPlaying name={currentPlayback.name} albumArt={currentPlayback.albumArt} api={spotifyApi}/>}

         {/* Use arrow function on button call to prevent it from firing on render and multiple unwanted times */}


        {loggedIn && pingCurrentPlayback()}

        {/* currentPlayback is an array before being set so only display recommendations after current playback has been set.
        There is most likely a better way to do this condition check but this was the first way i got it to work :) */}
        {loggedIn && !Array.isArray(currentPlayback) && <GetRecommendations artistID={currentPlayback.artistID} songID={currentPlayback.songID}/>}

    </div>

  );
}
export default App;
