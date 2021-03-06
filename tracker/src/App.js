import React, { useEffect, useState } from "react"
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core"
import Info from "./components/Info";
import Table from "./components/Table";
import { sortData } from "./util";
import Graph from "./components/Graph";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css"
import { presentNum } from "./util";

function App() {

  const [countryArr, setCountryArr] = useState(["USA", "India", "Bhutan"])
  //countryArr -> array storing list of countries

  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [info, setInfo] = useState([])
  const [center, setCenter] = useState([34.80746, -40.4796])
  const [zoom, setZoom] = useState(2);
  const [mapCountry, setMapCountry] = useState([])
  const [caseType, setCaseType] = useState("cases")

  useEffect(() => {

    const getCountry = async () => {

      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {

          const arr = data.map((item) => (
            {
              name: item.country,
              value: item.countryInfo.iso2
            }
          ))
          setMapCountry(data)
          const sortedData = sortData(data)
          setInfo(sortedData)
          setCountryArr(arr)
        })
    }

    const getCountryInfo = async() => {

      await fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {

        setCountryInfo(data)
      
      })
    }

    getCountry()
    getCountryInfo()
  }, [])

  const handleChange = async(e) => {

    const newCountry = e.target.value
    setCountry(newCountry)

    const url = newCountry === "worldwide" ? "https://disease.sh/v3/covid-19/all": `https://disease.sh/v3/covid-19/countries/${newCountry}`

    await fetch(url)
    .then(res => res.json())
    .then(data =>  {
      
      console.log(newCountry)
      
      
      if(newCountry === "worldwide") {

        setCenter([34.80746, -40.4796])
        setZoom(2)    
      }
      else {

        setCenter([data.countryInfo.lat,  data.countryInfo.long])
        setZoom(4)    
      }
      setCountryInfo(data)
        
    })

  }


  return (
    <div className="App">
      <div className="col-1">
        <div className="header">
          <h1>COVID-19 Tracker App</h1>
          <FormControl className='appDropdown'>
            <Select className="app-dropdown" variant='outlined' value={country} onChange={handleChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countryArr.map(country => (

                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="info-card">
          <Info 
          changeRed
          onClick ={()=>setCaseType("cases")}
          active={caseType === "cases"}
          title="Coronavirus Cases" 
          cases={presentNum(countryInfo.todayCases)}
           total={presentNum(countryInfo.cases)} />
          <Info onClick= {()=>setCaseType("recovered")}
          active={caseType === "recovered"}
           title="Recovered Cases" cases={presentNum(countryInfo.todayRecovered)} total={presentNum(countryInfo.recovered)} />
          <Info changeRed
          onClick = {()=>setCaseType("deaths")}
          active={caseType === "deaths"}
          title="Death Cases" cases={presentNum(countryInfo.todayDeaths)} total={presentNum(countryInfo.deaths)} />
        </div>

        <Map countries={mapCountry} caseType={caseType} center={center} zoom={zoom} />
      </div>

      <div className="col-2">
        <Card>
          <CardContent>
            <h3>Live Cases By Country</h3>
            <Table countriesData={info}/>
            <h3>WorldWide new {caseType}</h3>
            <Graph caseType={caseType}/>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

export default App;
