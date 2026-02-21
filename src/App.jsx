import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);

  const currencies = ["USD", "EUR", "GBP", "KES", "JPY"];

  const API_KEY = "7eda07bf0d2fa6c84f4ce0b5"; // your API key

  const handleConvert = async () => {
    if (!amount) {
      alert("Please enter an amount to convert.");
      return;
    }

    try {
      const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log("API Response:", data); // Check API response in console

      if (data.result !== "success" || !data.conversion_rates[toCurrency]) {
        alert("Conversion failed. API did not return rate.");
        return;
      }

      const converted = amount * data.conversion_rates[toCurrency];
      setResult(converted.toFixed(2));
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error fetching conversion. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Currency Converter
      </h1>

      {/* Amount input */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />

      {/* Currency selectors */}
      <div className="flex gap-4 mb-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="p-2 border rounded"
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="p-2 border rounded"
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      {/* Convert button */}
      <button
        onClick={handleConvert}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Convert
      </button>

      {/* Result display */}
      {result !== null && (
        <div className="mt-4 p-4 border rounded bg-white w-64 text-center text-lg font-semibold text-green-700">
          Converted Amount: {result} {toCurrency}
        </div>
      )}
    </div>
  );
}

export default App;