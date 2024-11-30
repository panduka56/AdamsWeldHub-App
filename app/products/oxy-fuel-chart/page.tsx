import { OxyFuelChart } from '@/types/product';

async function getChartData(): Promise<OxyFuelChart> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/oxy-fuel-chart`);
  if (!res.ok) throw new Error('Failed to fetch chart data');
  return res.json();
}

export default async function OxyFuelChartPage() {
  const chartData = await getChartData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Oxy-Fuel Gas Chart</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Gas Mixtures and Settings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Gas Mixture</th>
                <th className="border p-2">Metal Type</th>
                <th className="border p-2">Material Thickness</th>
                <th className="border p-2">Process</th>
                <th className="border p-2">Settings</th>
              </tr>
            </thead>
            <tbody>
              {chartData.entries.map((entry, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{entry.gasMixture}</td>
                  <td className="border p-2">{entry.metalType}</td>
                  <td className="border p-2">{entry.materialThickness}</td>
                  <td className="border p-2">{entry.process.join(', ')}</td>
                  <td className="border p-2">
                    <div>O₂: {entry.settings.oxygenFlow}</div>
                    <div>Fuel: {entry.settings.fuelGasFlow}</div>
                    {entry.settings.notes && (
                      <div className="text-sm text-gray-600">{entry.settings.notes}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add additional sections for material recommendations and gas comparisons */}
    </div>
  );
} 