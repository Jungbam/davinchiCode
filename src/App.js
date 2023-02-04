import React from "react";
import Router from "./share/Router";
import "./App.css";
import useSounds from "./hooks/useSounds";

function App() {
  const SoundEffect = useSounds();
  return (
    <div className="App" onClick={SoundEffect.Click}>
      <Router />
    </div>
  );
}

export default App;
