import { useState } from "react";

function App() {
  // States for amount, fromCurrency, toCurrency, and result
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Currency Converter
      </h1>

      {/* Input Amount */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />

      {/* Currency Dropdowns */}
      <div className="flex gap-4 mb-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      {/* Convert Button */}
      <button className="bg-blue-600 text-white px-6 py-2 rounded mb-4 hover:bg-blue-700">
        Convert
      </button>

      {/* Result Display */}
      {result && (
        <div className="mt-4 p-4 border rounded bg-white w-64 text-center">
          Converted Amount: {result}
        </div>
      )}
    </div>
  );
}

export default App;