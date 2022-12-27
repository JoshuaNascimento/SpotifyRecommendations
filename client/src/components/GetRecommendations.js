import React, {useState} from "react"
import "./GetRecommendations.css"

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
      {
      <button onClick={() => getRecommended()}>Get Recommended Tracks!</button>
      }

      <section className="Card-List">
        
        {/* Need to check firstly if recommendations.tracks exists as an array before calling maps on it */}
        {Array.isArray(recommendations.tracks) && recommendations.tracks.map((tracks) => {
          return (
            <article className="Card">
              <header className="Card-Header">{tracks.name}</header>
              <img className="Card-Img" src={tracks.album.images[0].url}/>
            </article>
          )
        })}
        
      </section>
    </div>

  )
}
export default GetRecommendations;