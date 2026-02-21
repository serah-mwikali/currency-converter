import React from "react";

function HistoryScreen({ history, darkMode, goBack }) {
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-4`}>
      <h1 className="text-2xl font-bold mb-4">Conversion History</h1>
      {history.length === 0 ? (
        <p>No conversions yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((h, index) => (
            <li key={index} className={`${darkMode ? "bg-gray-800" : "bg-white"} p-2 rounded shadow`}>
              {h.amount} {h.fromCurrency} → {h.result} {h.toCurrency} ({h.time})
            </li>
          ))}
        </ul>
      )}
      <button onClick={goBack} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Back
      </button>
    </div>
  );
}

export default HistoryScreen;