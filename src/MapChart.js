import React, { memo, useState, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { scaleQuantize, scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import { interpolatePiYG } from "d3-scale-chromatic";

import { interpolateHcl } from "d3-interpolate";

const colorScale = scaleQuantize()
  .domain([1, 20])
  .range([
    "#ffffd9",
    "#edf8b1",
    "#c7e9b4",
    "#7fcdbb",
    "#41b6c4",
    "#1d91c0",
    "#225ea8",
    "#253494",
    "#081d58",
    "#081d58",
  ]);

// [
//   "#ffedea",
//   "#ffcec5",
//   "#ffad9f",
//   "#ff8a75",
//   "#ff5533",
//   "#e2492d",
//   "#be3d26",
//   "#9a311f",
//   "#782618",
// ]

const colorScale2 = scaleLinear()
  .domain([0, 90])
  .range(["#EBFAFF", "cornflowerblue"])
  .interpolate(interpolateHcl);

const colorScale3 = scaleLinear()
  .domain([0, 10])
  .range(interpolatePiYG)
  .interpolate(interpolateHcl);

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv("/inflationData.csv").then((inflation) => {
      setData(inflation);
    });
  }, []);

  //console.log(data);

  return (
    <>
      <ComposableMap data-tip="">
        <ZoomableGroup>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const cur = data.find((s) => s.Country === geo.properties.name);
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(cur ? cur.Last : "#fcba03")}
                    onMouseEnter={() => {
                      setTooltipContent(
                        `${geo.properties.name} - ${cur.Country} - ${cur.Last} -  Last Updated: ${cur.Reference}`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      hover: {
                        fill: "#27FB6B", 
                        outline: "none", 
                      },
                      pressed: {
                        fill: "#C2F970",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);

//https://codesandbox.io/s/o73pb?file=/src/MapChart.js:1087-1137
//https://academy.datawrapper.de/article/134-what-to-consider-when-creating-choropleth-maps
