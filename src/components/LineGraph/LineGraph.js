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
  const chartData = [];
  let lastDataPoint;
  const casesData = 'timeline' in data ? data.timeline[casesType] : data[casesType];

  for (let date in casesData) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: casesData[date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = casesData[date];
  }

  return chartData;
};


const LineGraph = ({ casesType}) =>  {
  const [data, setData] = useState({});
  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        const data = await response.json();
        let chartData = buildChartData(data, casesType);
        setData(chartData);
      } catch (error) {
        console.error(error);
      }
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

export default LineGraph;
