const NowPlaying = (props) => {
  return (
    <div>
      <div>Now Playing: {props.name}</div>
      <div>
        <img src={props.albumArt} style={{ height: 150 }} />
      </div>  
    </div>
  )
}

export default NowPlaying;