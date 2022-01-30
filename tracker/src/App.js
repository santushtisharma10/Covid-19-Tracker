import React, { useEffect, useState } from "react"
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core"
import Info from "./components/Info";

function App() {

  const [countryArr, setCountryArr] = useState(["USA", "India", "Bhutan"])
  //countryArr -> array storing list of countries

  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})

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
      
      setCountryInfo(data)
    })

  }


  return (
    <div className="App">
      <div className="col-1">
        <div className="header">
          <h1>Covid Tracker App</h1>
          <FormControl className='appDropdown'>
            <Select variant='outlined' value={country} onChange={handleChange}>
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
          <Info title="coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <Info title="recovered cases" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <Info title="death cases" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
      </div>

      <div className="col-2">
        <Card>
          <CardContent>
            Live Cases By Country
            WorldWide new Cases
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

export default App;
