export default function ContentRec(props){
    return(
      <div id="inicioRec" style={{
          display: "flex",
          backgroundColor: props.bgcolor, padding: "10px", 
          fontSize: "2.5vmax", lineHeight: "3vmax",
          width: "50vmax", height: "20vmax",
          justifyContent: "center", alignItems: "center",
        }}>
      {props.title} <br/> {props.contenido}
      </div>
    )
  }