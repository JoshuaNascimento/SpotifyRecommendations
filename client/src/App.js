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
  const [nowPlaying, setNowPlaying] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [recommendations, setRecommendations] = useState([])

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
  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((trackInfo) => {  // First API call to get user's current playing track
      spotifyApi.getArtist(trackInfo.item.artists[0].id).then((artistInfo) => { // Second API call to get song's main artist to pull their related genres
        if (trackInfo.item.name !== nowPlaying.name) {  // Check if the current tracks name is the same as the track already saved to state
          setNowPlaying({ // False; Set nowPlaying state with new track information
            name: trackInfo.item.name,
            albumArt: trackInfo.item.album.images[0].url,
            songID: trackInfo.item.id,
            artistID: trackInfo.item.artists[0].id,
            genres: artistInfo.genres
          })
        } else {          // Otherwise; Track has not changed so wait before checking again
          console.log("Trying again in 500ms")
          setTimeout(getNowPlaying, 5000) 
        }
      })
    })
  }
  
  const getRecommended = () => {
    spotifyApi.getRecommendations({
      seed_artists: nowPlaying.artistID,
      limit: 3
    }).then((recommendations) => {
      setRecommendations(recommendations)
      console.log(recommendations.tracks)
    })
  }

  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888">Login To Spotify</a>}

      {loggedIn && <NowPlaying name={nowPlaying.name} albumArt={nowPlaying.albumArt}/>}

      {loggedIn && (
        <button onClick={() => getNowPlaying()}> Check Now Playing</button>
      )}

      {loggedIn && NowPlaying != null && <GetRecommendations artistID={nowPlaying.artistID}/>}
    </div>

  );
}

export default App;
