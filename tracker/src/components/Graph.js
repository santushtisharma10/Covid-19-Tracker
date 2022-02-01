import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"
import numeral from "numeral"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
const options = {

    legend: {

        display: false
    },
    elements: {

        point: {

            radius: 0
        }
    },
    maintainAspectRatio: false,
    tooltips: {

        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {

                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales: {
        xAxes: [
            {

                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes: [
            {

                gridLines: {

                    display: false
                },
                ticks: {

                    callback: function (value, index, values) {

                        return numeral(value).format('0a')
                    }
                }

            }
        ]
    }

}


const Graph = ({caseType}) => {

    const [graphData, setGraphData] = useState([])

    const buildData = (data, caseType) => {

        const ans = []
        let lastData = 0

        for (let date in data[caseType]) {

            if (lastData) {
                const newData = {

                    x: date,
                    y: data[caseType][date] - lastData
                }
                ans.push(newData)
            }

            lastData = data[caseType][date]
        }
        return ans;
    }

    useEffect(() => {

        const fetchData = async() => {
            
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(res => res.json())
                .then((data) => {

                    console.log("Data in Line Graph", data)
                    const lineData = buildData(data, caseType)

                    console.log("Line Data", lineData)
                    setGraphData(lineData)
                    console.log(graphData)
                })
        }
        fetchData()
    }, [caseType])
    return (
        <div className='graph'>
            
            <Line
                
                options={options}
                data={{

                    datasets: [
                        {
                            data: graphData,
                            backgroundColor: "rgb(233, 173, 173)",
                            borderColor:"red"

                        }
                    ]
                }}
            ></Line>
          
        </div>
    );
};

export default Graph;
