import { scaleSequential } from "d3-scale";
import { interpolatePiYG } from "d3-scale-chromatic";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import "./styles.css";

import MapChart from "./MapChart";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// function generateGdpPerCapita(geographies) {
//   let minGdpPerCapita = Infinity;
//   let maxGdpPercapita = -Infinity;
//   geographies = geographies.map((geography) => {
//     const { GDP_MD_EST, POP_EST } = geography.properties;
//     const gdpPerCapita = Math.round((GDP_MD_EST * 1e6) / POP_EST);
//     if (gdpPerCapita < minGdpPerCapita) {
//       minGdpPerCapita = gdpPerCapita;
//     }
//     if (gdpPerCapita > maxGdpPercapita) {
//       maxGdpPercapita = gdpPerCapita;
//     }
//     geography.properties.gdpPerCapita = gdpPerCapita;
//     return geography;
//   });
//   return { minGdpPerCapita, maxGdpPercapita, modifiedGeographies: geographies };
// }
// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
