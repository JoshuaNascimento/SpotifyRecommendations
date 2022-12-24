import React, {useState} from "react"

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi()

const GetRecommendations = (props) => {

  const [recommendations, setRecommendations] = useState([])

  const getRecommended = () => {
    spotifyApi.getRecommendations({
      seed_artists: props.artistID,
      limit: 3
    }).then((recommendations) => {
      setRecommendations(recommendations)
      console.log(recommendations)
    })
  }

  return (
    <div>
      <div>
        {/* Need to check firstly if recommendations.tracks exists as an array before calling maps on it */}
        {Array.isArray(recommendations.tracks) && recommendations.tracks.map((tracks) => {
          return (
            <div>
              <h3>{tracks.name}</h3>
              <img src={tracks.album.images[0].url} style={ {height: 150} }/>
            </div>
          )
        })}
      </div>
      <button onClick={() => getRecommended()}>Get Recommended Tracks!</button>
    </div>
  )
}
export default GetRecommendations;