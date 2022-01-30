import React, { useEffect, useState } from "react"
import './App.css';
import { FormControl, Select, MenuItem } from "@material-ui/core"
import Info from "./components/Info";

function App() {

  const [countryArr, setCountryArr] = useState(["USA", "India", "Bhutan"])
  //cntry-> array storing list of countries

  const [country, setCountry] = useState("worldwide")

  useEffect(()=> {

    const getCountry = async() => {

      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res)=>res.json())
      .then((data)=> {

        const arr = data.map((item)=>(
          {
            name: item.country,
            value: item.countryInfo.iso2
          }
        ))
        
        setCountryArr(arr)
      })
    }

    getCountry()
  }, [])

  const handleChange = (e)=> {

    setCountry(e.target.value)
  }

  return (
    <div className="App">
      
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
        <Info title="coronavirus cases" cases={300} total={56984} />
        <Info title="recovered cases" cases={30040} total={476856984} />
        <Info title="death cases" cases={290} total={4984} />
      </div>

    </div>
  );
}

export default App;
