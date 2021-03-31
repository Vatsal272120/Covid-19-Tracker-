import React, { useState, useEffect } from "react";

import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import { sortData, prettyPrintStat } from "./Utils";
import InfoBox from "./Components/InfoBox";
import numeral from "numeral";

function App() {
  // states

  const [countryList, setcountryList] = useState([]);

  const [userSelection, setuserSelection] = useState("worldwide");

  const [countryData, setcountryData] = useState({});

  const [casesType, setcasesType] = useState("cases");

  /* UseEffects */

  // gets the numerical stats - worldwide
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setcountryData(data));
  }, []);

  // gets the numerical data for each country
  useEffect(() => {
    const countryWiseData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          let finalData = sortData(data);

          setcountryList(countries);
        });
    };

    countryWiseData();
  }, []);

  // gets data for the user selected country - when the user selects the country, remove the previos selection from the countrydata and populate it with new one.
  const userSelectedCountryData = async (e) => {
    const userSelection = e.target.value;

    const url =
      userSelection === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${userSelection}?strict=true`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setuserSelection(userSelection);
        setcountryData(data);
      });
  };

  console.log("country Info", countryData);

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>Covid-19</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={userSelection}
              onChange={userSelectedCountryData}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countryList.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox
            onClick={(e) => setcasesType("cases")}
            title='Active Cases'
            cases={prettyPrintStat(countryData.active)}
            total={numeral(countryData.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setcasesType("recovered")}
            title='Recovered Cases'
            total={numeral(countryData.recovered).format("0.0a")}
            cases={prettyPrintStat(countryData.todayRecovered)}
          />

          <InfoBox
            onClick={(e) => setcasesType("deaths")}
            title='Deaths'
            total={numeral(countryData.deaths).format("0.0a")}
            cases={prettyPrintStat(countryData.todayDeaths)}
          />
        </div>

        <div className='app__right'>
          <CardContent>
            <h3>Live Cases</h3>
          </CardContent>
        </div>
      </div>
    </div>
  );
}

export default App;
