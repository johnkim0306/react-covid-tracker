import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
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

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;

  console.log(data);

  if ('timeline' in data) {
    console.log("data.timeline activated");
    for (let date in data.timeline.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data["timeline"][casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data["timeline"][casesType][date];
    }
  }
  else {
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data["timeline"][casesType][date];
    }
  }

  return chartData;
};


function GraphCanada({ casesType, countryName }) {
  const [data, setData] = useState({});

  useEffect(() => { 
    console.log("useffect getting called")
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/canada?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let chartData = buildChartData(data, casesType);
          console.log(chartData);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default GraphCanada;
