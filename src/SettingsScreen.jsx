import React, { useState } from "react";

function SettingsScreen({ darkMode, setDarkMode, defaults, setDefaults, goBack }) {
  const [from, setFrom] = useState(defaults.fromCurrency);
  const [to, setTo] = useState(defaults.toCurrency);

  const saveDefaults = () => {
    setDefaults({ from, to });
    goBack();
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-4`}>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="mb-4">
        <label className="mr-2">Default From Currency:</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="px-2 py-1 rounded border">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Default To Currency:</label>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="px-2 py-1 rounded border">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Dark Mode:</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
      </div>

      <button onClick={saveDefaults} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2">
        Save
      </button>

      <button onClick={goBack} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        Cancel
      </button>
    </div>
  );
}

export default SettingsScreen;