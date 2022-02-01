import numeral from "numeral";
import React from "react";
import { Circle, Popup } from "react-leaflet"

const caseColour = {

    cases: {

        hex: "#CC1034",
        multiplier: 200
    },
    recovered: {
        hex: "green",
        multiplier: 250
    },
    deaths: {
        hex: "#051495",
        multiplier: 1200
    }
}

export const presentNum = (data) => 
data ? `+${numeral(data).format("0.0a")}` : `+0`

export const sortData = (data) => {

    const sortedData = [...data]

    sortedData.sort((a, b) => {

        if (a.cases > b.cases) {

            return -1;
        }
        else {

            return 1;
        }
    })

    return sortedData;

}

export const mapData = (data, caseType) => (

    data.map((country, index) => (

        <Circle key={index}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{color: caseColour[caseType].hex}}
            radius={Math.sqrt(country[caseType]) * caseColour[caseType].multiplier}
        >
{console.log(caseType, caseColour[caseType].hex)}
            <Popup position={[country.countryInfo.lat, country.countryInfo.long]}>
                <div className="popup-container">

                    <div className="popup-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="popup-name"><b>{country.country}</b></div>
                    <div className="popup-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="popup-recover">Recovered : {numeral(country.recovered).format("0,0")}</div>
                    <div className="popup-death">Deaths : {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>


        </Circle>
    ))

)