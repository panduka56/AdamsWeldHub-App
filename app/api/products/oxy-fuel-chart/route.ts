import { NextResponse } from 'next/server';

const oxyFuelChartData = {
  entries: [
    {
      gasMixture: "Oxygen (O₂) / Acetylene (C₂H₂)",
      metalType: "Mild Steel, Cast Iron",
      materialThickness: "0.5–12 mm (welding); > 12 mm (cutting); any for heating",
      process: ["Welding", "Cutting", "Heating", "Brazing"],
      settings: {
        oxygenFlow: "Cutting: 20–50, Welding: 5–15, Heating: 50–100",
        fuelGasFlow: "Cutting: 3–10, Welding: 2–5, Heating: 20–50",
        notes: "High-temperature flame; ideal for welding and cutting."
      }
    },
    // Add other entries...
  ],
  materialRecommendations: {
    welding: {
      "Mild Steel": {
        gasMixture: "O₂ / Acetylene",
        thickness: "0.5–12 mm",
        oxygenFlow: "5–15 L/min",
        fuelGasFlow: "2–5 L/min",
        notes: "Use a neutral flame for clean, strong welds"
      },
      // Add other materials...
    },
    // Add other processes...
  },
  gasComparisons: [
    {
      gas: "Acetylene",
      welding: true,
      cutting: true,
      heating: true,
      brazing: true,
      advantages: "High flame temperature; precise control.",
      limitations: "Expensive, flammable, unstable."
    },
    // Add other gases...
  ]
};

export async function GET() {
  return NextResponse.json(oxyFuelChartData);
} 