import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Paper
} from "@material-ui/core";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import GraphCanada from "./GraphCanada";
import Chart from "./Chart";
import Table from "./Table";
import Table2 from "./Table2";
import DataTable from './components/DataTable';

import Papers from "./components/Papers/Papers";


import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import axios from "axios";
import Header from "./components/Header";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countryName, setCountryName] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [isActive, setisActive] = useState(true);

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

  const onCountryChange = async (country) => {
    const countryCode = await country;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const { data } = await axios.get(url);

    setInputCountry(countryCode);
    setCountryInfo(data);
    setCountryName(data.country);
    setMapZoom(4);
    if (countryCode === "worldwide") {
      setMapCenter({ lat: 34.80746, lng: -40.4796 })
      setMapZoom(3);
    } else {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    }
  
  };

  const activateCountryInfo = () => {
    setisActive(state => false)
  }

  const activateCases = () => {
    setisActive(state => true)
  }

  const activateCanada = () => {
    console.log("activating Canada data");
    onCountryChange('CA')
  }

  const activateWorldWide = () => {
    console.log("activating Canada data");
    onCountryChange('worldwide')
  }


  return (
    <div className="app">
      <div className="app__top">
        <Header />
      </div>


      <Papers />


      <div className="middle">

      <div className="container">
        <div className="sidebar">
          <div className="sidebar__title">
            <h1 className="sidebar__title--text"> CORONA LIVE </h1>
          </div>

          <section>
            <div className="btn-group">
              <Button variant="outlined" color="secondary" size="large" onClick={activateCanada}>Canada</Button>
              <Button variant="outlined" color="secondary" size="large" onClick={activateWorldWide}>Worldwide</Button>
            </div>
          </section>

          <Button variant="outlined" color="secondary" size="large" onClick={activateCases}>Cases</Button>
          <Button variant="outlined" color="secondary" size="large" onClick={activateCountryInfo}>Death</Button>

          <Button variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
          <Card>
            <CardContent>
              <div className="app__information">
                <h3>money</h3>
              </div>
            </CardContent>            
          </Card>


        </div>
      </div>

      <div className="app__body">
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
      
        <div className="app__body-map">
          <Card className="app__right">
            <CardContent>
              <div className="app__information">
                <h3>Live Cases by Country</h3>
                <DataTable countries={tableData}  />
              </div>
            </CardContent>
          </Card>

          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
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
        </div>

        <div className="article">
          <h3>{countryName} new {casesType}</h3>
            {countryName==="Canada" ? <GraphCanada casesType={casesType} countryName={countryName} /> : <LineGraph casesType={casesType} countryName={countryName} />     }
          <h3>Total cases</h3>

          <div className="graph">
            <Chart casesType={casesType} recovered={countryInfo.todayRecovered} deaths={countryInfo.todayDeaths} cases={countryInfo.todayCases}/>
          </div>
        </div>

        {isActive ? <Table countries={tableData} /> : <Table2 countries={tableData} /> }
        
      </div>
    </div>

    </div>
  );
};

export default App;
