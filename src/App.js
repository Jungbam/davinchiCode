import React from "react";
import Router from "./share/Router";
import useSound from "use-sound";
import { Sounds } from "./helpers/sounds";
import "./App.css";

function App() {
  const [click] = useSound(Sounds.Click);
  return (
    <div className="App" onClick={click}>
      <Router />
    </div>
  );
}

export default App;
