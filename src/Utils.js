import React from "react";
import numeral from "numeral";
/* import { Circle, Popup } from "react-leaflet"; */

export const sortData = (data) => {
  let sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `${numeral(stat).format("0.0a")}` : "+0";
