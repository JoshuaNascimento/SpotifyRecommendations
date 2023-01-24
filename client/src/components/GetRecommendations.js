import React, {useEffect, useState} from "react"
import "./Styles/GetRecommendations.css"

import SpotifyWebApi from 'spotify-web-api-js';
import {ReactComponent as PlayIcon} from "./Assets/play-icon.svg"
import {ReactComponent as LikeIcon} from "./Assets/like-icon.svg"
import {ReactComponent as CheckIcon} from "./Assets/check-icon.svg"

const GetRecommendations = (props) => {

  const spotifyApi = new SpotifyWebApi()
  
  const [seedData, setSeedData] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [likedSongs, setLikedSongs] = useState([false, false, false])

  
  
  const seedRequest = () => {
    // Each request for recommendations will have a random value to use as a +/- for min and max values in recommendation request
    let randomness = (Math.floor(Math.random() * 40) + 1) / 100;

    spotifyApi.getAudioFeaturesForTrack(props.songID).then((response) =>{
      setSeedData({
        seed_artists: props.artistID,
        seed_tracks: props.songID,
        limit: 3,
        market: "CA",
        target_acousticness: response.acousticness,
        target_dancibility: response.danceability,
        //target_energy: response.energy,
        //target_insturmentallness: response.instrumentalness,
        target_key: response.key, // This is combination of above 2 parameters
        target_liveness: response.liveness,
        target_loudness: response.loudness,
        target_mode: response.mode,
        target_speechiness: response.speechiness,
        target_tempo: response.tempo,
        target_time_signature: response.time_signature,
        target_valence: response.valence,
      })
      console.log(seedData)
    })
  }

  const getRecommended = () => {

    // Reset the likedSongs state
    const newLikedSongs = [false, false, false]
    setLikedSongs(newLikedSongs)
    
    spotifyApi.getRecommendations({
      seed_artists: props.artistID,
      limit: 3
    }).then((recommendations) => {
      setRecommendations(recommendations)
      console.log(recommendations)
    })
    

    /* Potentially more detailed way to seek recommendations
   spotifyApi.getRecommendations(seedData).then((recommendations) =>{
    setRecommendations(recommendations)
    console.log(recommendations)
   })
   */
  }

  /**
   *  queueThenPlay fires when a user clicks the play button for a track given in a recommendations card
   *  
   * @param {*} track - The track which will be played
   */
  const queueThenPlay = (track) => {
    spotifyApi.queue(track.uri).then((response, callback) => {
      if (callback == null) {
        spotifyApi.skipToNext()
      }
    })
    console.log("test")
  }

  /**
   * useEffect will update the application every instance the likedSongs state is changed
   * This allows for the application to render either the check or like icon dependent on if it has been clicked already
   */
  useEffect( () => {
  }, [likedSongs])

  // Takes the track displayed at the card index of recommendations and calls spotifyAPI to save it to a user's liked songs playlist
  /**
   * Takes the track displayed at the index of a given recommendations card
   * First, updates likeSongs state to allow the app to render the correct icon 
   * Second, calls the spotify api to add the track to a user's "liked songs" playlist
   * @param {*} track - The track which will be added to liked songs
   * @param {*} index - The index of the track in the recommendations cards
   */
  const addToLikedSongs = (track, index) => {

    // State should be treated as immutable so create a new boolean array using previous states values
    const newLikedSongs = [...likedSongs]
    // Set index of liked song to true in the new likedSongs state
    newLikedSongs[index] = true
    // Set likedSongs state to be this new array
    setLikedSongs(newLikedSongs)
    
    // Call spotifyAPI to add the track to a user's liked songs playlist
    spotifyApi.addToMySavedTracks([`${track.id}`])
    console.log("save called")
  }

  return (
    <div>
      {
      <button className="Recommend-Button" onClick={() => getRecommended()}>Get Recommended Tracks!</button>
      }

      <section className="Card-List">
        
        {/* Need to check firstly if recommendations.tracks exists as an array before calling maps on it */}
        {Array.isArray(recommendations.tracks) && recommendations.tracks.map((tracks, index) => {
          return (
            // Give each track a key of it's index to avoid warnings in the console
            <article className="Card" key={index}>
              <header className="Card-Header">{tracks.name}</header>
              <img className="Card-Img" src={tracks.album.images[0].url}/>
              <div className="Card-Icons">
                <PlayIcon className="Icon" onClick={() => queueThenPlay(tracks)}/>
                { likedSongs[index] === false ?
                <LikeIcon className="Icon" onClick={() => addToLikedSongs(tracks, index)}/>:
                <CheckIcon className="Icon"/>}
              </div>
            </article>
          )
        })}
        
      </section>
    </div>

  )
}
export default GetRecommendations;