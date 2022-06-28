import React, { memo, useState, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";
import { interpolatePiYG } from "d3-scale-chromatic";

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618",
  ]);

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv("/inflationData.csv").then((counties) => {
      setData(counties);
    });
  }, []);

  console.log(data);

  return (
    <>
      <ComposableMap data-tip="">
        <ZoomableGroup>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const cur = data.find(s => s.Country === geo.properties.name);
                console.log(cur)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(cur ? cur.Last : "#000000")}
                    onMouseEnter={() => {
                      setTooltipContent(`${geo.properties.name} - ${cur.Country} - ${cur.Last} - Last Updated: ${cur.Reference}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
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