import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

import { ButtonPrimary } from "./styles/ButtonStyled";
import { mediaQueries } from "./styles/mediaQueries";

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
import { RootState } from "../app/store";


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


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.font = {weight: 600, size: 20, family: "system-ui"};
defaults.plugins.title.fullSize = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.color = "#eee";


const ChartWrapper = styled.section`
  border: 1px solid #555;
  border-radius: 0.3rem;
  padding: 0.5rem;
`;

const ChartContainer = styled.article`
  height: 50%;
  height: 15rem;
  ${mediaQueries("sm")`
    height: 17rem;
  `};
  ${mediaQueries("md")`
    height: 19rem;
  `};
  ${mediaQueries("lg")`
    height: 20rem;
  `};
  ${mediaQueries("xl")`
    height: 23rem;
  `};
  ${mediaQueries("xxl")`
    height: 25rem;
  `};
`;


const ControlsContainer = styled.div`
  margin: 0.5rem;
`;


const Controls = styled.article`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;


const options = {
  plugins: {
    legend:true,
  },
  scales: {
    x: {
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
  },
};

const data = {
  datasets: [
    {
      label: "Buy",
      data: [],
      borderColor: "#2b8f44",
      borderWidth: 1,
      backgroundColor: "#cbffc1",
      pointBorderColor: "#78c68b",
    },
    {
      label: "Sell",
      data: [],
      borderColor: "#8f2b2b",
      borderWidth: 1,
      backgroundColor: "#ffc1c1",
      pointBorderColor: "#c67878",
    }
  ]
};


export default function RateChart() {

  const chartRef = useRef<ChartJS>(null);

  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const buyRates = useSelector((state: RootState) => state.history.orders[pair as keyof typeof state.history.orders].history.timeseries.Buy);
  const sellRates = useSelector((state: RootState) => state.history.orders[pair as keyof typeof state.history.orders].history.timeseries.Sell);


  // change chart title on currency change
  useEffect(() => {
    defaults.plugins.title.text = pair;
    
    chartRef.current!.data.datasets[0].data = buyRates;
    chartRef.current!.data.datasets[1].data = sellRates;
    chartRef.current!.update();
    }, [pair, buyRates, sellRates]);


  const setTimeUnit = (range: string) => {
    if(chartRef.current)
    // @ts-expect-error chart type
      chartRef.current!.options.scales.x.time.unit = range;

    chartRef.current!.update();
  };


  return (
    <ChartWrapper>
      <ChartContainer>
        {/* @ts-expect-error styled component types */}
        <Line options={options} data={data} ref={chartRef} />
      </ChartContainer>
      <ControlsContainer>
        <Controls>
        {/* @ts-expect-error styled component types */}
          <ButtonPrimary danger="true" onClick={() => {setTimeUnit("millisecond")}}>default</ButtonPrimary>
        {/* @ts-expect-error styled component types */}
          <ButtonPrimary onClick={() => {setTimeUnit("minute")}}>minutes</ButtonPrimary>
        {/* @ts-expect-error styled component types */}
          <ButtonPrimary onClick={() => {setTimeUnit("day")}}>days</ButtonPrimary>
        </Controls>
      </ControlsContainer>
    </ChartWrapper>
  );
}