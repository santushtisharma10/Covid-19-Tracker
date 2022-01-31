import numeral from "numeral";
import React from "react";
import { Circle, Popup } from "react-leaflet"

const caseColour = {

    cases: {

        hex: "#CC1034",
        multiplier: 80
    },
    recovered: {
        hex: "#CC1034",
        multiplier: 1200
    },
    deaths: {
        hex: "#CC1034",
        multiplier: 2000
    }
}

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

export const mapData = (data, caseType = "cases") => (

    data.map(country => (




        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={caseColour[caseType].hex}
            radius={Math.sqrt(country[caseType]) * caseColour[caseType].multiplier}
        >

            <Popup position={[country.countryInfo.lat, country.countryInfo.long]}>
                <div className="popup-container">

                    <div className="popup-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="popup-name">{country.country}</div>
                    <div className="popup-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="popup-recover">Recovered : {numeral(country.recovered).format("0,0")}</div>
                    <div className="popup-death">Deaths : {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>


        </Circle>
    ))

)