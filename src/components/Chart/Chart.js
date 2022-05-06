import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import numeral from "numeral";
import './chart.scss'

const options = {
    legend: {
      display: true,
      labels: {
        color: 'rgb(255, 99, 132)'
    }
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    responsive: false,
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

let style = {
  position: "relative",
  width:"100%",
  height:"40vh"
}

const Chart = ({ casesType = "cases", cases, recovered, deaths } ) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const getCountriesData = async () => {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=160"
      );


      let chartData = buildChartData(data, casesType);

      setData(chartData);
    };

    getCountriesData();
  }, []);

  const buildChartData = (data, casesType) => {
    let chartData = [];
    for (let date in data.cases) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date],
          z: data.deaths[date]
        };
        chartData.push(newDataPoint);
    }
    return chartData;
  };

  const lineChart = (
    data.length &&
    <Line
      data={{
        labels: data.map((data) => data.x),
        datasets: [
          {
            label: "Infected",
            data: data.map((data) => data.y),
            borderColor: "#3333ff",
            fill: true,
          }, {
            data: data.map((data) => data.z),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
        ],
      }}
      width={1000}
      height={300}
      options={options}
    />
  );

  const PieChart = (
    cases ? 
      <Pie
        data={{
            labels: [
                'Deaths',
                'recovered',
                'cases'
              ],
            datasets: [{
            data: [deaths, recovered, cases],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
          },
          ],
        }}
        style={style}
        width={1000}
        height={300}
      /> : null
  );

  return (
    <div className="container">
      <div className="container__piechart">
        <h3>Today's Case</h3>
        {PieChart}
      </div>
      <div className="container__linechart">
        <h3>Total cases</h3>
        {lineChart}
      </div>
    </div>
  );
};

export default Chart;
