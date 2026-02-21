import { useState, useEffect } from "react";

// Home Screen Component
function HomeScreen({ defaults, darkMode, addHistory }) {
  const currencies = ["USD", "EUR", "GBP", "KES", "JPY"];
  const [fromCurrency, setFromCurrency] = useState(defaults.fromCurrency);
  const [toCurrency, setToCurrency] = useState(defaults.toCurrency);
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setFromCurrency(defaults.fromCurrency);
    setToCurrency(defaults.toCurrency);
  }, [defaults]);

  const handleConvert = async () => {
    setError("");
    setConverted(null);

    if (!amount || isNaN(amount)) {
      setError("Please enter a valid number.");
      return;
    }

    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/7eda07bf0d2fa6c84f4ce0b5/latest/${fromCurrency}`
      );
      const data = await res.json();

      if (!data.conversion_rates) {
        setError("Conversion failed. API did not return rate.");
        return;
      }

      const rate = data.conversion_rates[toCurrency];
      const result = (amount * rate).toFixed(2);
      setConverted(result);
      addHistory({ fromCurrency, toCurrency, amount, result, time: new Date() });
    } catch (err) {
      setError("Conversion failed. Please try again.");
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center justify-center p-4`}>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Currency Converter</h1>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1">From</label>
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
          <label className="block mb-1">To</label>
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

      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded mb-4 w-48 text-black"
      />

      <button
        onClick={handleConvert}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Convert
      </button>

      {converted && (
        <div className="p-4 bg-green-100 text-green-800 rounded mb-4 w-48 text-center">
          {amount} {fromCurrency} = {converted} {toCurrency}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4 w-64 text-center">
          {error}
        </div>
      )}
    </div>
  );
}

// History Screen Component
function HistoryScreen({ history, darkMode }) {
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-4`}>
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Conversion History</h1>
      {history.length === 0 ? (
        <p className="text-center">No conversions yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li key={index} className="p-3 border rounded bg-gray-200 dark:bg-gray-800">
              {item.amount} {item.fromCurrency} → {item.result} {item.toCurrency} <br />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.time.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Settings Screen Component
function SettingsScreen({ defaults, setDefaults, darkMode, setDarkMode }) {
  const [fromCurrency, setFromCurrency] = useState(defaults.fromCurrency);
  const [toCurrency, setToCurrency] = useState(defaults.toCurrency);
  const currencies = ["USD", "EUR", "GBP", "KES", "JPY"];

  const handleSave = () => {
    setDefaults({ fromCurrency, toCurrency });
    alert("Settings saved!");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center justify-center p-4`}>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Settings</h1>

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

// Main App Component
function App() {
  const [currentScreen, setCurrentScreen] = useState("home"); // 'home', 'history', 'settings'
  const [history, setHistory] = useState([]);
  const [defaults, setDefaults] = useState({ fromCurrency: "USD", toCurrency: "EUR" });
  const [darkMode, setDarkMode] = useState(false);

  const addHistory = (conversion) => {
    setHistory([conversion, ...history]);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      {/* Top Navigation */}
      <div className="flex justify-center gap-4 p-4 bg-gray-300 dark:bg-gray-800">
        <button onClick={() => setCurrentScreen("home")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Home</button>
        <button onClick={() => setCurrentScreen("history")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">History</button>
        <button onClick={() => setCurrentScreen("settings")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Settings</button>
      </div>

      {/* Screen Rendering */}
      {currentScreen === "home" && <HomeScreen defaults={defaults} darkMode={darkMode} addHistory={addHistory} />}
      {currentScreen === "history" && <HistoryScreen history={history} darkMode={darkMode} />}
      {currentScreen === "settings" && <SettingsScreen defaults={defaults} setDefaults={setDefaults} darkMode={darkMode} setDarkMode={setDarkMode} />}
    </div>
  );
}

export default App;