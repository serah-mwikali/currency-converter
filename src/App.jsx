import React, { useState, useEffect } from "react";
import HistoryScreen from "./HistoryScreen";
import SettingsScreen from "./SettingsScreen";
import ErrorScreen from "./ErrorScreen";

// Replace this with your real API key
const API_KEY = "7eda07bf0d2fa6c84f4ce0b5";

function App() {
  // App states
  const [currentScreen, setCurrentScreen] = useState("home"); // home, history, settings, error
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Handle conversion
  const handleConvert = async () => {
    setConverted(null);

    if (!amount || isNaN(amount)) {
      setErrorMessage("Please enter a valid number.");
      setCurrentScreen("error");
      return;
    }

    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
      );
      const data = await res.json();

      if (!data.conversion_rates) {
        setErrorMessage("Conversion failed. API did not return rate.");
        setCurrentScreen("error");
        return;
      }

      const rate = data.conversion_rates[toCurrency];
      const result = (amount * rate).toFixed(2);
      setConverted(result);

      // Add to history
      const entry = {
        fromCurrency,
        toCurrency,
        amount,
        result,
        time: new Date().toLocaleString(),
      };
      setHistory([entry, ...history]);
    } catch (err) {
      setErrorMessage("Conversion failed. Please try again.");
      setCurrentScreen("error");
    }
  };

  // Home Screen JSX
  const HomeScreen = () => (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen flex flex-col items-center justify-center p-4`}
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Currency Converter</h1>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-2 rounded border w-32"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="px-4 py-2 rounded border"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
          <span className="text-xl font-bold self-center">→</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="px-4 py-2 rounded border"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Convert
        </button>

        {converted && (
          <div
            className={`mt-4 p-4 rounded ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-md`}
          >
            <p className="text-lg font-bold">
              {amount} {fromCurrency} = {converted} {toCurrency}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => setCurrentScreen("history")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          History
        </button>
        <button
          onClick={() => setCurrentScreen("settings")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Settings
        </button>
      </div>
    </div>
  );

  // Render screens conditionally
  return (
    <>
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "history" && (
        <HistoryScreen history={history} darkMode={darkMode} goBack={() => setCurrentScreen("home")} />
      )}
      {currentScreen === "settings" && (
        <SettingsScreen
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          defaults={{ fromCurrency, toCurrency }}
          setDefaults={({ from, to }) => {
            setFromCurrency(from);
            setToCurrency(to);
          }}
          goBack={() => setCurrentScreen("home")}
        />
      )}
      {currentScreen === "error" && (
        <ErrorScreen
          message={errorMessage}
          darkMode={darkMode}
          goBack={() => setCurrentScreen("home")}
        />
      )}
    </>
  );
}

export default App;