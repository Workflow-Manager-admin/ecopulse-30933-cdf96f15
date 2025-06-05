import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import AirQualityCard from "./AirQualityCard";

// Mock the useAirQuality hook at import level
jest.mock("../hooks/useAirQuality", () => ({
  __esModule: true,
  default: jest.fn(),
  useAirQuality: jest.fn()
}));

import useAirQuality from "../hooks/useAirQuality";

describe("AirQualityCard", () => {
  const coords = { lat: 12, lon: 34 }; // sample coordinates

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    useAirQuality.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });

    render(<AirQualityCard coords={coords} />);

    expect(screen.getByText(/Loading air quality/i)).toBeInTheDocument();
    expect(screen.getByText(/Air Quality Index/i)).toBeInTheDocument();
  });

  it("renders error state with retry button", async () => {
    const refetchMock = jest.fn();
    useAirQuality.mockReturnValue({
      data: null,
      loading: false,
      error: "Something went wrong!",
      refetch: refetchMock
    });

    render(<AirQualityCard coords={coords} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: /retry/i });
    expect(retryBtn).toBeInTheDocument();

    fireEvent.click(retryBtn);
    expect(refetchMock).toHaveBeenCalled();
  });

  it("renders placeholder when no data (but not loading or error)", () => {
    useAirQuality.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    render(<AirQualityCard coords={coords} />);
    expect(screen.getByText(/Awaiting coordinates|no data available/i)).toBeInTheDocument();
  });

  it("renders main data and pollutant components for successful fetch", async () => {
    // Example returned air quality data structure
    const mockData = {
      aqi: 3, // Moderate
      components: {
        co: 250.1, no: 5.1, no2: 7.3, o3: 160.4, so2: 1.2, pm2_5: 13.5, pm10: 20.0, nh3: 0.6
      }
    };
    useAirQuality.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    render(<AirQualityCard coords={coords} />);
    // AQI value, label, emoji, and description
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(/Moderate/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Sensitive may experience effects/i)).toBeInTheDocument();

    // Pollutant values
    expect(screen.getByText("CO")).toBeInTheDocument();
    expect(screen.getByText("250.1")).toBeInTheDocument();
    expect(screen.getByText("NO₂")).toBeInTheDocument();
    expect(screen.getByText("7.3")).toBeInTheDocument();

    // Powered by OpenWeatherMap mention
    expect(
      screen.getByText(/Powered by/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /OpenWeatherMap/i })
    ).toHaveAttribute("href", expect.stringContaining("openweathermap.org/api/air-pollution"));
  });

  it("shows 'Unknown' label and emoji when AQI is undefined", () => {
    useAirQuality.mockReturnValue({
      data: { aqi: undefined, components: {} },
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    render(<AirQualityCard coords={coords} />);
    expect(screen.getByText(/Unknown/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unknown/)).toBeInTheDocument();
  });

  it("renders all pollutant fields with '--' when not present", () => {
    useAirQuality.mockReturnValue({
      data: { aqi: 1, components: {} },
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    render(<AirQualityCard coords={coords} />);
    // All pollutant fields show '--'
    expect(screen.getAllByText("--").length).toBeGreaterThan(0);
  });
});
