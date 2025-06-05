import React from "react";
import useAirQuality from "../hooks/useAirQuality";

/**
 * AirQualityCard
 * Displays air quality index (AQI), main pollutant breakdowns, loading spinner, and error feedback.
 *
 * Props:
 *   coords: { lat: number, lon: number }
 *
 * Usage:
 *   <AirQualityCard coords={{ lat: 37.7749, lon: -122.4194 }} />
 */

// PUBLIC_INTERFACE
function AirQualityCard({ coords }) {
  const { data, loading, error, refetch } = useAirQuality(coords);

  // Helper: AQI level visual mapping (colors/icons per OpenWeatherMap AQI scale)
  function aqiLevelInfo(aqi) {
    switch (aqi) {
      case 1:
        return {
          label: "Good",
          color: "#1EAD36",
          emoji: "🟢",
          desc: "Air quality is good.",
        };
      case 2:
        return {
          label: "Fair",
          color: "#A1CF64",
          emoji: "🟡",
          desc: "Air quality is acceptable.",
        };
      case 3:
        return {
          label: "Moderate",
          color: "#FFD600",
          emoji: "🟠",
          desc: "Sensitive may experience effects.",
        };
      case 4:
        return {
          label: "Poor",
          color: "#F67403",
          emoji: "🟧",
          desc: "Everyone may start to feel effects.",
        };
      case 5:
        return {
          label: "Very Poor",
          color: "#D32F2F",
          emoji: "🔴",
          desc: "Health warnings of emergency conditions.",
        };
      default:
        return {
          label: "Unknown",
          color: "#888",
          emoji: "❔",
          desc: "AQI unknown",
        };
    }
  }

  // Helper: pollutant label mapping
  const POLLUTANTS = {
    co: { name: "CO", desc: "Carbon Monoxide" },
    no: { name: "NO", desc: "Nitric Oxide" },
    no2: { name: "NO₂", desc: "Nitrogen Dioxide" },
    o3: { name: "O₃", desc: "Ozone" },
    so2: { name: "SO₂", desc: "Sulfur Dioxide" },
    pm2_5: { name: "PM2.5", desc: "Fine Particles" },
    pm10: { name: "PM10", desc: "Coarse Particles" },
    nh3: { name: "NH₃", desc: "Ammonia" }
  };

  // Spinner Element
  const Spinner = () => (
    <div style={{ textAlign: "center", padding: "1.5em" }}>
      <div className="loader" style={{
        border: "4px solid #eee",
        borderTop: "4px solid #388E3C",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        animation: "spin 1s linear infinite",
        margin: "0 auto"
      }} />
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        `}
      </style>
      <div style={{ color: "#888", fontSize: "0.9em", marginTop: "0.5em" }}>Loading air quality...</div>
    </div>
  );

  // AQI & Pollutant Data Card
  return (
    <div
      className="eco-aq-card"
      style={{
        background: "#212929",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 2px 16px rgba(0,0,0,0.09)",
        maxWidth: 380,
        margin: "2em auto",
        color: "#fff"
      }}
    >
      <div style={{ fontWeight: 700, fontSize: "1.2em", marginBottom: 8, color: "#388E3C" }}>
        Air Quality Index
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div style={{ color: "#D32F2F", margin: "1em 0" }}>
          <span role="img" aria-label="Error">⚠️</span> 
          {typeof error === "string" ? error : (error?.message || "Failed to load air quality.")}
          <button
            className="btn"
            style={{
              marginLeft: "1em",
              background: "#388E3C",
              fontSize: "0.9em",
              padding: "5px 14px",
              borderRadius: 5
            }}
            onClick={refetch}
          >
            Retry
          </button>
        </div>
      ) : !data ? (
        <div style={{ color: "#bbb", margin: "1em 0" }}>
          Awaiting coordinates or no data available.
        </div>
      ) : (
        <>
          {/* AQI Visual */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              margin: "16px 0"
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: aqiLevelInfo(data.aqi).color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2.6em",
                color: "#fff",
                boxShadow: "0 1px 12px rgba(0,0,0,0.12)"
              }}
              title={aqiLevelInfo(data.aqi).desc}
            >
              <span role="img" aria-label={aqiLevelInfo(data.aqi).label}>{aqiLevelInfo(data.aqi).emoji}</span>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "1.8em" }}>{data.aqi ?? "?"}</div>
              <div style={{ color: aqiLevelInfo(data.aqi).color, fontWeight: 500 }}>
                {aqiLevelInfo(data.aqi).label}
              </div>
              <div style={{ fontSize: "0.95em", color: "#ddd" }}>{aqiLevelInfo(data.aqi).desc}</div>
            </div>
          </div>

          {/* Pollutant Components Breakdown */}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 5 }}>Main Pollutants</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "8px 12px"
            }}>
              {Object.entries(POLLUTANTS).map(([key, meta]) => (
                <div
                  key={key}
                  style={{
                    background: "#1c2222",
                    borderRadius: 6,
                    padding: "8px 10px",
                    fontSize: "0.97em",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0
                  }}
                  title={meta.desc}
                >
                  <span style={{ fontWeight: 700, color: "#FFD600", fontSize: "1em", letterSpacing: "0.01em" }}>
                    {meta.name}
                  </span>
                  <span style={{
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: "1.1em"
                  }}>
                    {/* Show value or dash if not present */}
                    {(data.components && typeof data.components[key] === "number")
                      ? data.components[key].toFixed(1)
                      : "--"}
                    <span style={{ fontSize: "0.8em", color: "#ccc", fontWeight: 400, marginLeft: 2 }}>
                      {key === "co" ? " μg/m³" : " μg/m³"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, fontSize: "0.9em", color: "#aaa" }}>
              Powered by <a href="https://openweathermap.org/api/air-pollution" style={{ color: "#388E3C" }} target="_blank" rel="noopener noreferrer">OpenWeatherMap Air Pollution API</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AirQualityCard;
