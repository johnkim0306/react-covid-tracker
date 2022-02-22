import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Chart from "./Chart";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    const getWorldData = async () => {
      const { data } = await axios.get("https://disease.sh/v3/covid-19/all");
      setCountryInfo(data);
    };

    getWorldData();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      console.log(data);

      const countries = data.map((country) => ({
        name: country.country,          // United States, United Kindom
        value: country.countryInfo.iso2,  // striping UK, USA, FR
      }));

      let sortedData = sortData(data);
      setCountries(countries);
      setMapCountries(data);
      setTableData(sortedData);
    };

    getCountriesData();
  }, []);

  console.log(countryInfo);

  const onCountryChange = async (country) => {
    console.log("onCountryChange satrting")

    const countryCode = await country;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const { data } = await axios.get(url);

    setInputCountry(countryCode);
    setCountryInfo(data);
    setMapZoom(4);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
  
  };

  return (
    <div className="app">
  
      <div className="navbar">
        <section>
          <img src="/covid-19-virus.jpeg" alt="image" width="200px"/>
          <h1>CORONA LIVE</h1>
          <button class="button">Button</button>
          <button class="button">Button</button>
        </section>
        <nav>
          <header>swag</header>
          <ul>
            <li> <a className= "nav-link" href="#japan"> Japan</a></li>
          </ul>
        </nav>
      </div>
  
      <div className="app__left">
        <div className="app__header">
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
  
          <Chart casesType={casesType} recovered={countryInfo.todayRecovered} deaths={countryInfo.todayDeaths} cases={countryInfo.todayCases}/>
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
            <h3>Total cases</h3>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
