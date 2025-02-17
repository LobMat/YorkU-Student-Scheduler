

//import "./main.css"
import LeftBody from "./components/LeftBody.jsx";
import Schedule from "./components/Schedule.jsx";

function MainPage() {
  return(
    <>
      <LeftBody />
      <div id='sect2'>
        <Schedule term="FALL"/>
        <Schedule term="WINTER" />
      </div>
    </>
  );
}

export default MainPage

