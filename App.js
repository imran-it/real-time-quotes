import React from 'react';
import { MainState } from "./src/context/Quotes/MainState";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return (
    <MainState>
      <Navigation/>
    </MainState>
  );
}
