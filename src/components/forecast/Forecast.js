import React from "react";
import { useContext } from "react";
import DayContext from "../../context/DayContext";
import WeatherContext from "../../context/WeatherContext";
import ForecastADay from "../forecastADay/ForecastADay";
import "./Forecast.css";

const days = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

function Forecast() {
  const { forecast } = useContext(WeatherContext);
  const { day, setDay } = useContext(DayContext);

  const dayInAWeek = new Date().getDay();
  const forecastDays = days
    .slice(dayInAWeek, days.length)
    .concat(days.slice(0, dayInAWeek));

  return (
    <>
      <div className="forecast">
        {forecast.map((item, idx) => (
          <div
            className="daily_item"
            key={idx}
            onClick={() => {
              if (day === idx + 1) {
                setDay(null);
              } else {
                setDay(idx + 1);
              }
            }}
          >
            <label className="daily_item_day">{forecastDays[idx]}</label>
            <img src={`/icons/${item.weather.icon}.png`} alt="weather" />
            <div>
              <p className="maxTemp">{`${Math.floor(
                item.min_temp
              )} / ${Math.ceil(item.max_temp)}`}</p>
            </div>
          </div>
        ))}
      </div>
      <ForecastADay />
    </>
  );
}

export default Forecast;
