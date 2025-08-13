import { useEffect, useState } from "react";

export default function MultimeterSimulator() {
  const [mode, setMode] = useState("DC Volt");
  const [scenario, setScenario] = useState("Battery");
  const [reading, setReading] = useState("---");

  const scenarios = {
    Battery: { "DC Volt": "12.6 V", "AC Volt": "0 V", "Ohm": "∞" },
    "Lamp Circuit": { "DC Volt": "12.6 V", "AC Volt": "0 V", "Ohm": "5 Ω" }
  };

  useEffect(() => {
    setReading(scenarios[scenario]?.[mode] ?? "---");
  }, [mode, scenario]);

  return (
    <div className="p-4 bg-gray-200 rounded">
      <h3 className="font-semibold mb-2">Multimeter Simulator</h3>
      <div className="flex items-center gap-4">
        <label className="font-medium">Mode:</label>
        <select value={mode} onChange={e => setMode(e.target.value)} className="px-2 py-1 border rounded">
          <option>DC Volt</option>
          <option>AC Volt</option>
          <option>Ohm</option>
        </select>
        <label className="font-medium">Scenario:</label>
        <select value={scenario} onChange={e => setScenario(e.target.value)} className="px-2 py-1 border rounded">
          {Object.keys(scenarios).map(k => <option key={k}>{k}</option>)}
        </select>
      </div>
      <div className="mt-4 bg-black text-green-500 font-mono text-xl p-3 text-center rounded">{reading}</div>
    </div>
  );
}
