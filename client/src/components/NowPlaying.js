import "./NowPlaying.css"

const NowPlaying = (props) => {
  return (
    <article className="Playing-Card">

      {props.name === undefined ?
      <header className="Playing-Message">Begin listening on your spotify player...{props.name}</header> :
      <header className="Playing-Name">Now Playing: {props.name}</header>
      }

      <img className="Playing-Img" src={props.albumArt} />
    </article>
  )
}

export default NowPlaying;