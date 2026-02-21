import { useState } from "react";

function Settings({ defaultFrom, defaultTo, setDefaults, darkMode, setDarkMode }) {
  const [fromCurrency, setFromCurrency] = useState(defaultFrom);
  const [toCurrency, setToCurrency] = useState(defaultTo);

  const currencies = ["USD", "EUR", "GBP", "KES", "JPY"];

  const handleSave = () => {
    setDefaults({ fromCurrency, toCurrency });
    alert("Settings saved!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Settings</h1>

      {/* Default Currencies */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1">Default From Currency</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="p-2 border rounded"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Default To Currency</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="p-2 border rounded"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <label className="font-semibold">Dark Mode</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-6 h-6"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;