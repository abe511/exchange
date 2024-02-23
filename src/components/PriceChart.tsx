import { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  TimeScale,
  TimeSeriesScale,
  defaults,
} from "chart.js";

import "chartjs-adapter-date-fns";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  TimeScale,
  TimeSeriesScale,
);


defaults.maintainAspectRatio = true;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.font = {weight: "bold", size: 20, family: "Arial"};
defaults.plugins.title.fullSize = true;
defaults.plugins.title.padding = 20;

defaults.plugins.title.text = "Price chart";
defaults.plugins.title.align = "center";
defaults.plugins.title.color = "darkgray";


export default function PriceChart() {

  const dataPointsLimit = 100;

  const chartRef = useRef<ChartJS>(null);

  const options = {
    plugins: {
      legend:true,
    },
    scales: {
      x: {
        ticks: {
          // maxTicksLimit: 10,
        },
        type: "timeseries",
        time: {
          unit: "millisecond",
          displayFormats: {
            millisecond: "HH:mm:ss.SSS",
            minute: "HH:mm",
            day: "LLL-dd",
          }
        }
      },
      y: {
      }
    },
  };
  
  const data = {
    // labels: [],
    datasets: [
      {
        label: "Buy",
        data: [],
        borderColor: "lightblue",
        borderWidth: 1,
        backgroundColor: "lightblue",
        pointBorderColor: "blue",
        // tension: 0.2,
      },
      {
        label: "Sell",
        data: [],
        borderColor: "lightpink",
        borderWidth: 1,
        backgroundColor: "lightpink",
        pointBorderColor: "red",
        // tension: 0.2,
      }
    ]
  };


  const setTimeUnit = (range: string) => {
    if(chartRef.current)
      chartRef.current!.options.scales.x.time.unit = range;
    chartRef.current.update();
  };


  const setTickLimit = (limit: string) => {
    if(chartRef.current) {
      chartRef.current!.options.scales.x.ticks.maxTicksLimit = limit;
    }
    chartRef.current.update();
  };


  const addData = (datasetIdx: number, limit: number) => {
    
    chartRef.current!.data.datasets.forEach((dataset) => {
      if(dataset.data.length >= limit)
        dataset.data.shift();
    })
    
    chartRef.current!.data.datasets[datasetIdx].data.push({x: Date.now(), y: Math.random() * 100});

    chartRef.current!.update();
  }


  return (
    <>
      <Line options={options} data={data} ref={chartRef} />
      <button onClick={() => {setTimeUnit("millisecond")}}>default</button>
      <button onClick={() => {setTimeUnit("minute")}}>minutes</button>
      <button onClick={() => {setTimeUnit("day")}}>days</button>
      <button onClick={() => {addData(0, dataPointsLimit)}}>buy</button>
      <button onClick={() => {addData(1, dataPointsLimit)}}>sell</button>
      <label htmlFor="max-ticks">Ticks shown:</label>
      <select name="max-ticks" id="max-ticks" onChange={(event) => {setTickLimit(event.target.value)}} value={dataPointsLimit}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={dataPointsLimit}>All</option>
      </select>
    </>
  );
}