import React, {useState} from "react"
import "./GetRecommendations.css"

import SpotifyWebApi from 'spotify-web-api-js';
import {ReactComponent as PlayIcon} from "./Assets/play-icon.svg"

const GetRecommendations = (props) => {

  const spotifyApi = new SpotifyWebApi()
  
  const [seedData, setSeedData] = useState([])
  const [recommendations, setRecommendations] = useState([])
  
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

  const queueThenPlay = (track) => {
    spotifyApi.queue(track.uri).then((response, callback) => {
      if (callback == null) {
        spotifyApi.skipToNext()
      }
    })
    console.log("test")
  }

  return (
    <div>
      {
      <button className="Recommend-Button" onClick={() => getRecommended()}>Get Recommended Tracks!</button>
      }

      <section className="Card-List">
        
        {/* Need to check firstly if recommendations.tracks exists as an array before calling maps on it */}
        {Array.isArray(recommendations.tracks) && recommendations.tracks.map((tracks) => {
          return (
            <article className="Card">
              <header className="Card-Header">{tracks.name}</header>
              <img className="Card-Img" src={tracks.album.images[0].url}/>
              <div className="Card-Icons">
                <PlayIcon className="Icon-Play" onClick={() => queueThenPlay(tracks)}/>
              </div>
            </article>
          )
        })}
        
      </section>
    </div>

  )
}
export default GetRecommendations;